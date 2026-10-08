/**
 * Guarda en Google Drive las facturas que llegan reenviadas desde IONOS a Gmail.
 *
 * Instalación (una vez): pega este código en script.google.com, rellena CONFIG
 * y ejecuta la función `instalar`. A partir de ahí se ejecuta solo cada hora.
 */
const CONFIG = {
  // ID de la carpeta de Drive: la parte final del enlace .../folders/ESTE_ID
  CARPETA_ID: 'PEGA_AQUI_EL_ID_DE_LA_CARPETA',
  // Dirección de IONOS desde la que se reenvían las facturas
  CORREO_IONOS: 'tu@tudominio.com',
  // Etiqueta que se pone en Gmail a los correos ya procesados
  ETIQUETA_OK: 'facturas-guardadas',
};

function guardarFacturas() {
  const carpeta = DriveApp.getFolderById(CONFIG.CARPETA_ID);
  const etiqueta = GmailApp.getUserLabelByName(CONFIG.ETIQUETA_OK) || GmailApp.createLabel(CONFIG.ETIQUETA_OK);
  const busqueda = `to:${CONFIG.CORREO_IONOS} has:attachment (filename:pdf OR filename:xml) -label:${CONFIG.ETIQUETA_OK}`;
  const zona = Session.getScriptTimeZone();
  let guardadas = 0;

  GmailApp.search(busqueda, 0, 50).forEach(hilo => {
    hilo.getMessages().forEach(msg => {
      const fecha = Utilities.formatDate(msg.getDate(), zona, 'yyyy-MM-dd');
      const subcarpeta = obtenerSubcarpeta(carpeta, fecha.slice(0, 7));
      msg.getAttachments({ includeInlineImages: false }).forEach(adjunto => {
        if (!/\.(pdf|xml)$/i.test(adjunto.getName())) return;
        const nombre = `${fecha}_${adjunto.getName()}`;
        if (subcarpeta.getFilesByName(nombre).hasNext()) return;
        subcarpeta.createFile(adjunto.copyBlob().setName(nombre));
        guardadas++;
      });
    });
    hilo.addLabel(etiqueta);
  });
  console.log(`Facturas guardadas: ${guardadas}`);
}

function obtenerSubcarpeta(padre, nombre) {
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
