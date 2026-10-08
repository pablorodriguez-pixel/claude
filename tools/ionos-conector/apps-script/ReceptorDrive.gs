/**
 * Receptor de facturas para Google Drive.
 *
 * El conector de Vercel envía aquí cada factura y este script la guarda en tu carpeta,
 * en subcarpetas como Facturas/2026-10 o Por revisar/2026-10. Si ya existe, no la duplica.
 * Solo puede escribir dentro de la carpeta que indiques en CARPETA_ID.
 *
 * Instalación: ver README.md → «Paso 2».
 */
const CONFIG = {
  // ID de la carpeta de Drive: la parte final del enlace .../folders/ESTE_ID
  CARPETA_ID: 'PEGA_AQUI_EL_ID_DE_LA_CARPETA',
  // Clave larga y aleatoria. La misma que pondrás en Vercel como DRIVE_SECRET
  SECRETO: 'PEGA_AQUI_UNA_CLAVE_LARGA',
};

function doPost(e) {
  try {
    const datos = JSON.parse(e.postData.contents);
    if (!secretoValido(datos.secreto)) return responder({ estado: 'error', mensaje: 'No autorizado' });

    const carpeta = subcarpetas(DriveApp.getFolderById(CONFIG.CARPETA_ID), datos.ruta);
    const nombre = String(datos.nombre).replace(/[\\/]/g, '_').slice(0, 200);

    const existentes = carpeta.getFilesByName(nombre);
    if (existentes.hasNext()) return responder({ estado: 'ya_existia', url: existentes.next().getUrl() });

    const blob = Utilities.newBlob(Utilities.base64Decode(datos.base64), datos.mime, nombre);
    const archivo = carpeta.createFile(blob).setDescription(String(datos.descripcion || '').slice(0, 1000));
    return responder({ estado: 'creado', url: archivo.getUrl() });
  } catch (err) {
    return responder({ estado: 'error', mensaje: String(err) });
  }
}

function doGet() {
  return responder({ estado: 'ok', mensaje: 'Receptor de facturas activo' });
}

/** Solo se permiten rutas tipo "Facturas/2026-10": nombres sencillos, máximo 3 niveles. */
function subcarpetas(raiz, ruta) {
  const partes = String(ruta || '').split('/').filter(Boolean);
  if (partes.length > 3 || partes.some(p => !/^[\wÀ-ÿ .-]{1,60}$/.test(p) || p === '..')) {
    throw new Error('Ruta no permitida');
  }
  return partes.reduce((padre, nombre) => {
    const it = padre.getFoldersByName(nombre);
    return it.hasNext() ? it.next() : padre.createFolder(nombre);
  }, raiz);
}

function secretoValido(recibido) {
  const esperado = CONFIG.SECRETO;
  if (!esperado || esperado.indexOf('PEGA_AQUI') === 0 || esperado.length < 32) return false;
  if (typeof recibido !== 'string' || recibido.length !== esperado.length) return false;
  let diff = 0;
  for (let i = 0; i < esperado.length; i++) diff |= esperado.charCodeAt(i) ^ recibido.charCodeAt(i);
  return diff === 0;
}

function responder(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/** Ejecuta esta función una vez desde el editor para dar permisos y comprobar la carpeta. */
function probar() {
  const carpeta = DriveApp.getFolderById(CONFIG.CARPETA_ID);
  console.log('Carpeta OK: ' + carpeta.getName());
  console.log(secretoValido(CONFIG.SECRETO) ? 'Secreto OK' : 'Pon un SECRETO de al menos 32 caracteres');
}
