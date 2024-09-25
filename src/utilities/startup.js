const fs = require("fs");
const path = require("path");
const config = require("../config/config"); // Import de la configuration
const log = require("./logger"); // Import du service de log

// Fonction pour vérifier si un fichier existe
function configExists(configPath) {
  return fs.existsSync(configPath);
}

// Fonction pour démarrer le programme avec journalisation
function startProgram() {
  log.info("Démarrage du programme..."); // Premier log

  const configPath = path.resolve(__dirname, "../config/config.js");

  log.info("Vérification de l'existence du fichier de configuration..."); // Vérification

  if (!configExists(configPath)) {
    log.error("Le fichier de configuration config.js est introuvable.");
    console.error("Le fichier de configuration config.js est introuvable.");
    process.exit(1); // Arrête le programme si le fichier de config est manquant
  }

  if (!config.foldersToClean || config.foldersToClean.length === 0) {
    log.error("La configuration est vide. Aucun dossier à nettoyer.");
    console.error("La configuration est vide. Aucun dossier à nettoyer.");
    process.exit(1); // Arrête le programme si la configuration est vide
  }

  log.info(
    "Le fichier de configuration existe et la configuration est valide."
  );
  //log.info("Démarrage des opérations de nettoyage...");

  // Tu peux ajouter ici l'appel à la logique de nettoyage si nécessaire
  // config.foldersToClean.forEach(folder => cleanFolder(folder));

  log.info("Le programme a démarré avec succès.");
}

module.exports = startProgram;
