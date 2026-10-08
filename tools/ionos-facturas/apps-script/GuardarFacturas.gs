/**
 * Revisa TODOS los correos reenviados desde IONOS a Gmail y guarda en Drive
 * los adjuntos PDF/XML:
 *   - Facturas/AAAA-MM/      si hay pistas claras de que es una factura
 *   - Por revisar/AAAA-MM/   el resto de PDF/XML, para revisarlos a mano o con Claude
 *
 * Instalación (una vez): pega este código en script.google.com, rellena CONFIG
 * y ejecuta la función `instalar`. A partir de ahí se ejecuta solo cada hora.
 */
const CONFIG = {
  // ID de la carpeta de Drive: la parte final del enlace .../folders/ESTE_ID
  CARPETA_ID: 'PEGA_AQUI_EL_ID_DE_LA_CARPETA',
  // Etiqueta que se pone en Gmail a los correos ya revisados
  ETIQUETA_OK: 'facturas-revisado',
  // Palabras que delatan una factura (en asunto, texto, nombre del archivo o remitente)
  PISTAS: [
    'factura', 'fra.', 'invoice', 'recibo', 'receipt', 'rechnung', 'facture',
    'iva', 'nif', 'cif', 'base imponible', 'importe', 'total a pagar', 'billing', 'pago',
  ],
  // Guardar también los PDF/XML sin pistas en "Por revisar" (true/false)
  GUARDAR_DUDOSOS: true,
};

function guardarFacturas() {
  const raiz = DriveApp.getFolderById(CONFIG.CARPETA_ID);
  const carpetas = { factura: subcarpeta(raiz, 'Facturas'), dudoso: subcarpeta(raiz, 'Por revisar') };
  const etiqueta = GmailApp.getUserLabelByName(CONFIG.ETIQUETA_OK) || GmailApp.createLabel(CONFIG.ETIQUETA_OK);
  const busqueda = `has:attachment (filename:pdf OR filename:xml) -label:${CONFIG.ETIQUETA_OK}`;
  const zona = Session.getScriptTimeZone();
  const inicio = Date.now();
  const cuenta = { factura: 0, dudoso: 0 };

  for (const hilo of GmailApp.search(busqueda, 0, 50)) {
    if (Date.now() - inicio > 5 * 60 * 1000) break; // margen ante el límite de 6 min; sigue en la próxima hora
    for (const msg of hilo.getMessages()) {
      const adjuntos = msg.getAttachments({ includeInlineImages: false })
        .filter(a => /\.(pdf|xml)$/i.test(a.getName()));
      if (!adjuntos.length) continue;

      const textoCorreo = [msg.getSubject(), msg.getFrom(), msg.getPlainBody().slice(0, 5000)].join(' ');
      const fecha = Utilities.formatDate(msg.getDate(), zona, 'yyyy-MM-dd');

      for (const adjunto of adjuntos) {
        const tipo = tienePistas(textoCorreo + ' ' + adjunto.getName()) ? 'factura' : 'dudoso';
        if (tipo === 'dudoso' && !CONFIG.GUARDAR_DUDOSOS) continue;
        const destino = subcarpeta(carpetas[tipo], fecha.slice(0, 7));
        const nombre = `${fecha}_${adjunto.getName()}`;
        if (destino.getFilesByName(nombre).hasNext()) continue;
        destino.createFile(adjunto.copyBlob().setName(nombre))
          .setDescription(`De: ${msg.getFrom()}\nAsunto: ${msg.getSubject()}`);
        cuenta[tipo]++;
      }
    }
    hilo.addLabel(etiqueta);
  }
  console.log(`Facturas: ${cuenta.factura} · Por revisar: ${cuenta.dudoso}`);
}

function tienePistas(texto) {
  texto = texto.toLowerCase();
  return CONFIG.PISTAS.some(p => new RegExp(`(^|[^a-záéíóúñ])${p.replace('.', '\\.')}`).test(texto));
}

function subcarpeta(padre, nombre) {
  const existentes = padre.getFoldersByName(nombre);
  return existentes.hasNext() ? existentes.next() : padre.createFolder(nombre);
}

/** Ejecutar una vez: programa la revisión cada hora y hace la primera pasada. */
function instalar() {
  ScriptApp.getProjectTriggers()
    .filter(t => t.getHandlerFunction() === 'guardarFacturas')
    .forEach(t => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger('guardarFacturas').timeBased().everyHours(1).create();
  guardarFacturas();
}
