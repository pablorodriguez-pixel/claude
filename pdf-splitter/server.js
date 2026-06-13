const express = require('express');
const multer = require('multer');
const { PDFDocument } = require('pdf-lib');
const archiver = require('archiver');
const path = require('path');
const fs = require('fs');
const fsp = fs.promises;
const { execSync } = require('child_process');
const { execFile } = require('child_process');
const { promisify } = require('util');
const execFileAsync = promisify(execFile);

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Directories ──────────────────────────────────────────────────────────────
const TMP = path.join(__dirname, '.tmp');
const DIRS = {
  uploads: path.join(TMP, 'uploads'),
  output:  path.join(TMP, 'output'),
  chunks:  path.join(TMP, 'chunks'),
};
Object.values(DIRS).forEach(d => fs.mkdirSync(d, { recursive: true }));

// ─── Tool detection (prefer CLI tools for memory efficiency) ──────────────────
function hasCmd(cmd) {
  try { execSync(`which ${cmd}`, { stdio: 'ignore' }); return true; }
  catch { return false; }
}
const TOOL = hasCmd('qpdf') ? 'qpdf' : hasCmd('gs') ? 'gs' : hasCmd('pdftk') ? 'pdftk' : 'pdflib';
console.log(`PDF backend: ${TOOL}`);

// ─── Progress (SSE) ───────────────────────────────────────────────────────────
const sseClients = new Map();
const progressCache = new Map();

function broadcast(sessionId, data) {
  progressCache.set(sessionId, data);
  const clients = sseClients.get(sessionId) || [];
  const msg = `data: ${JSON.stringify(data)}\n\n`;
  clients.forEach(res => { try { res.write(msg); } catch {} });
}

// ─── Multer (50 MB per chunk) ─────────────────────────────────────────────────
const chunkStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, DIRS.chunks),
  filename: (req, file, cb) => {
    const { sessionId, chunkIndex } = req.body;
    cb(null, `${sessionId}_${String(chunkIndex).padStart(6, '0')}`);
  },
});
const upload = multer({ storage: chunkStorage, limits: { fileSize: 50 * 1024 * 1024 } });

app.use(express.json({ limit: '1mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// ─── SSE endpoint ─────────────────────────────────────────────────────────────
app.get('/api/progress/:sessionId', (req, res) => {
  const { sessionId } = req.params;
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  const clients = sseClients.get(sessionId) || [];
  clients.push(res);
  sseClients.set(sessionId, clients);

  const cached = progressCache.get(sessionId);
  if (cached) res.write(`data: ${JSON.stringify(cached)}\n\n`);

  req.on('close', () => {
    const updated = (sseClients.get(sessionId) || []).filter(c => c !== res);
    sseClients.set(sessionId, updated);
  });
});

// ─── Upload chunk ─────────────────────────────────────────────────────────────
app.post('/api/upload-chunk', upload.single('chunk'), async (req, res) => {
  const { sessionId, chunkIndex, totalChunks, fileName } = req.body;
  const current = parseInt(chunkIndex) + 1;
  const total = parseInt(totalChunks);

  broadcast(sessionId, {
    stage: 'upload',
    progress: Math.round((current / total) * 45),
    message: `Subiendo ${current} de ${total} bloques…`,
  });

  if (current < total) return res.json({ ok: true, assembled: false });

  // Last chunk received → assemble
  broadcast(sessionId, { stage: 'assembly', progress: 48, message: 'Ensamblando archivo…' });

  const outputPath = path.join(DIRS.uploads, `${sessionId}.pdf`);
  try {
    const ws = fs.createWriteStream(outputPath);
    for (let i = 0; i < total; i++) {
      const chunkPath = path.join(DIRS.chunks, `${sessionId}_${String(i).padStart(6, '0')}`);
      await new Promise((ok, fail) => {
        const rs = fs.createReadStream(chunkPath);
        rs.on('data', d => ws.write(d));
        rs.on('end', ok);
        rs.on('error', fail);
      });
      await fsp.unlink(chunkPath).catch(() => {});
    }
    await new Promise(ok => ws.end(ok));

    broadcast(sessionId, { stage: 'reading', progress: 55, message: 'Leyendo estructura del PDF…' });

    const pageCount = await getPageCount(outputPath);

    broadcast(sessionId, { stage: 'ready', progress: 100, message: 'Archivo listo', pageCount, sessionId });

    // Auto-cleanup after 2 h
    setTimeout(() => cleanupSession(sessionId), 2 * 60 * 60 * 1000);

    res.json({ ok: true, assembled: true, sessionId, pageCount, fileName });
  } catch (err) {
    await fsp.unlink(outputPath).catch(() => {});
    broadcast(sessionId, { stage: 'error', message: err.message });
    res.status(400).json({ error: err.message });
  }
});

// ─── Split ────────────────────────────────────────────────────────────────────
app.post('/api/split', async (req, res) => {
  const { sessionId, method, value, ranges } = req.body;
  const inputPath = path.join(DIRS.uploads, `${sessionId}.pdf`);
  if (!fs.existsSync(inputPath)) return res.status(404).json({ error: 'Archivo no encontrado' });

  res.json({ ok: true });
  processSplit(sessionId, inputPath, method, value, ranges).catch(err => {
    broadcast(sessionId, { stage: 'error', message: err.message });
  });
});

// ─── Download single file ─────────────────────────────────────────────────────
app.get('/api/download/:sessionId/:fileName', (req, res) => {
  const fp = path.join(DIRS.output, req.params.sessionId, req.params.fileName);
  if (!fs.existsSync(fp)) return res.status(404).json({ error: 'No encontrado' });
  res.download(fp);
});

// ─── Download ZIP ─────────────────────────────────────────────────────────────
app.get('/api/download-zip/:sessionId', (req, res) => {
  const dir = path.join(DIRS.output, req.params.sessionId);
  if (!fs.existsSync(dir)) return res.status(404).json({ error: 'Sesión no encontrada' });
  res.setHeader('Content-Type', 'application/zip');
  res.setHeader('Content-Disposition', 'attachment; filename="pdf_dividido.zip"');
  const arc = archiver('zip', { zlib: { level: 1 } });
  arc.pipe(res);
  arc.directory(dir, false);
  arc.finalize();
});

// ─── Cleanup ──────────────────────────────────────────────────────────────────
app.delete('/api/session/:sessionId', async (req, res) => {
  await cleanupSession(req.params.sessionId);
  res.json({ ok: true });
});

async function cleanupSession(sessionId) {
  const targets = [
    path.join(DIRS.uploads, `${sessionId}.pdf`),
    path.join(DIRS.output, sessionId),
  ];
  for (const t of targets) {
    try {
      const s = await fsp.stat(t);
      if (s.isDirectory()) await fsp.rm(t, { recursive: true });
      else await fsp.unlink(t);
    } catch {}
  }
  progressCache.delete(sessionId);
  sseClients.delete(sessionId);
}

// ─── Page count ───────────────────────────────────────────────────────────────
async function getPageCount(filePath) {
  if (TOOL === 'qpdf') {
    const { stdout } = await execFileAsync('qpdf', ['--show-npages', filePath]);
    return parseInt(stdout.trim());
  }
  if (TOOL === 'gs') {
    const { stdout } = await execFileAsync('gs', [
      '-q', '-dNODISPLAY', '-dBATCH', '-dNOPAUSE',
      '-c', `(${filePath}) (r) file runpdfbegin pdfpagecount = quit`,
    ]);
    return parseInt(stdout.trim());
  }
  if (TOOL === 'pdftk') {
    const { stdout } = await execFileAsync('pdftk', [filePath, 'dump_data']);
    const m = stdout.match(/NumberOfPages: (\d+)/);
    return m ? parseInt(m[1]) : 0;
  }
  // pdf-lib fallback
  const bytes = await fsp.readFile(filePath);
  const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
  return doc.getPageCount();
}

// ─── Build page groups ────────────────────────────────────────────────────────
function buildGroups(method, value, ranges, total) {
  const groups = [];
  if (method === 'parts') {
    const n = Math.max(1, Math.min(parseInt(value) || 2, total));
    const per = Math.ceil(total / n);
    for (let i = 0; i < n; i++) {
      const start = i * per;
      if (start >= total) break;
      const end = Math.min(start + per, total);
      groups.push({ start, end, label: `parte_${String(i + 1).padStart(2, '0')}` });
    }
  } else if (method === 'pages') {
    const per = Math.max(1, parseInt(value) || 10);
    let i = 0, n = 1;
    while (i < total) {
      const end = Math.min(i + per, total);
      groups.push({ start: i, end, label: `parte_${String(n).padStart(2, '0')}_pp${i + 1}-${end}` });
      i = end; n++;
    }
  } else if (method === 'ranges') {
    (ranges || '').split(',').map(r => r.trim()).filter(Boolean).forEach((r, idx) => {
      const parts = r.split('-').map(x => parseInt(x.trim()));
      const start = (isNaN(parts[0]) ? 1 : parts[0]) - 1;
      const end = isNaN(parts[1]) ? start + 1 : parts[1];
      if (start >= 0 && end > start && end <= total) {
        groups.push({ start, end, label: `parte_${String(idx + 1).padStart(2, '0')}_pp${start + 1}-${end}` });
      }
    });
  }
  return groups;
}

// ─── Split logic ──────────────────────────────────────────────────────────────
async function processSplit(sessionId, inputPath, method, value, ranges) {
  broadcast(sessionId, { stage: 'splitting', progress: 0, message: 'Analizando PDF…' });

  const total = await getPageCount(inputPath);
  const groups = buildGroups(method, value, ranges, total);

  if (groups.length === 0) {
    broadcast(sessionId, { stage: 'error', message: 'No se encontraron rangos válidos' });
    return;
  }

  const outDir = path.join(DIRS.output, sessionId);
  fs.mkdirSync(outDir, { recursive: true });

  const files = [];

  if (TOOL !== 'pdflib') {
    // CLI tools: process each group independently (memory-efficient)
    for (let i = 0; i < groups.length; i++) {
      const g = groups[i];
      broadcast(sessionId, {
        stage: 'splitting',
        progress: Math.round((i / groups.length) * 95),
        message: `Generando parte ${i + 1} de ${groups.length}…`,
      });
      const fileName = `${g.label}.pdf`;
      const outPath = path.join(outDir, fileName);
      const s1 = g.start + 1, e1 = g.end; // 1-based for CLI tools
      if (TOOL === 'qpdf') {
        await execFileAsync('qpdf', ['--pages', inputPath, `${s1}-${e1}`, '--', outPath]);
      } else if (TOOL === 'gs') {
        await execFileAsync('gs', [
          '-dBATCH', '-dNOPAUSE', '-sDEVICE=pdfwrite',
          `-dFirstPage=${s1}`, `-dLastPage=${e1}`,
          `-sOutputFile=${outPath}`, inputPath,
        ]);
      } else if (TOOL === 'pdftk') {
        await execFileAsync('pdftk', [inputPath, 'cat', `${s1}-${e1}`, 'output', outPath]);
      }
      const stat = await fsp.stat(outPath);
      files.push({ name: fileName, pages: g.end - g.start, size: stat.size });
    }
  } else {
    // pdf-lib: load source once, copy pages per group
    broadcast(sessionId, { stage: 'splitting', progress: 5, message: 'Cargando PDF en memoria…' });
    const pdfBytes = await fsp.readFile(inputPath);
    const src = await PDFDocument.load(pdfBytes, { ignoreEncryption: true });

    for (let i = 0; i < groups.length; i++) {
      const g = groups[i];
      broadcast(sessionId, {
        stage: 'splitting',
        progress: 5 + Math.round((i / groups.length) * 90),
        message: `Generando parte ${i + 1} de ${groups.length}…`,
      });
      const newDoc = await PDFDocument.create();
      const indices = Array.from({ length: g.end - g.start }, (_, j) => g.start + j);
      const copied = await newDoc.copyPagesFrom(src, indices);
      copied.forEach(p => newDoc.addPage(p));
      const outBytes = await newDoc.save();
      const fileName = `${g.label}.pdf`;
      await fsp.writeFile(path.join(outDir, fileName), outBytes);
      files.push({ name: fileName, pages: g.end - g.start, size: outBytes.byteLength });
    }
  }

  broadcast(sessionId, {
    stage: 'done',
    progress: 100,
    message: `¡Listo! ${files.length} archivos generados`,
    files,
    sessionId,
  });
}

app.listen(PORT, () => {
  console.log(`PDF Splitter → http://localhost:${PORT}`);
});
