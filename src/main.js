const startProgram = require("./utilities/startup"); // Import de la fonction de démarrage
const cleaningService = require('./services/cleaningService'); // Import du service de nettoyage
const config = require("./config/config");


/**
 * Fonction pour vérifier si le programme doit simuler la suppression
 * @returns {boolean} true si `--simulate` est passé en argument, sinon false
 */
function parseArguments() {
  const args = process.argv.slice(2); // Récupère les arguments passés en ligne de commande
  return args.includes('--simulate'); // Retourne true si --simulate est présent, sinon false
}

// Fonction principale pour démarrer le programme
function main() {
  try {
    const simulateDeletion = parseArguments(); // Récupère la valeur de simulateDeletion depuis les arguments
    console.log("SIMULATION MODE : " + simulateDeletion);
    startProgram(); // Appelle la fonction de démarrage
    console.log("Le programme a démarré avec succès."); // Affiche le succès dans la console
    // console.log("Début des opérations de nettoyage...");
    // console.log(" conf " + config.foldersToClean)
    cleaningService.cleanAllFolders(config.foldersToClean, simulateDeletion);
    console.log("Opérations de nettoyage terminées.");
  } catch (error) {
    console.error(`Erreur lors du démarrage du programme : ${error.message}`);
    process.exit(1); // Arrête le programme en cas d'erreur
  }
}

// Appelle la fonction principale
main();
