const startProgram = require("./utilities/startup"); // Import de la fonction de démarrage
const cleaningService = require('./services/cleaningService'); // Import du service de nettoyage
const config = require("./config/config");

// Fonction principale pour démarrer le programme
function main() {
  try {
    startProgram(); // Appelle la fonction de démarrage
    console.log("Le programme a démarré avec succès."); // Affiche le succès dans la console
    // console.log("Début des opérations de nettoyage...");
    // console.log(" conf " + config.foldersToClean)
    cleaningService.cleanAllFolders(config.foldersToClean);
    console.log("Opérations de nettoyage terminées."); 
      
  } catch (error) {
    console.error(`Erreur lors du démarrage du programme : ${error.message}`);
    process.exit(1); // Arrête le programme en cas d'erreur
  }
}

// Appelle la fonction principale
main();
