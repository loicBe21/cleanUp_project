const fs = require("fs");
const path = require("path");

// Définir le fichier de log
const logFilePath = path.resolve(__dirname, "../../logs/app.log");

// Fonction pour écrire dans le fichier de log
function writeLog(level, message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}\n`;

  // Écrire dans le fichier de log
  fs.appendFileSync(logFilePath, logMessage, "utf8");
}

// Exporter les fonctions de journalisation
module.exports = {
  info: (message) => writeLog("info", message),
  error: (message) => writeLog("error", message),
};
