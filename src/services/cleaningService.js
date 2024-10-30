const fs = require("fs");
const path = require("path");
const log = require("../utilities/logger");

/**
 * Filtrer les fichiers en fonction des extensions autorisées pour la suppression
 * @param {Array} files - Liste des fichiers à filtrer
 * @param {Array} allowedExtensions - Extensions autorisées
 * @returns {Array} - Liste des fichiers filtrés
 */
function filterFilesByExtension(files, allowedExtensions) {
  return files.filter((file) => {
    const fileExtension = path.extname(file.path);
    return allowedExtensions.includes(fileExtension);
  });
}

/**
 * Trier les fichiers par date de création (les plus anciens en premier)
 * @param {Array} files - Liste des fichiers à trier
 * @returns {Array} - Liste triée
 */
function sortFilesByDate(files) {
  return files.sort((a, b) => a.stat.birthtimeMs - b.stat.birthtimeMs);
}

/**
 * Obtenir les fichiers d'un dossier
 * @param {string} folderPath - Chemin du dossier
 * @returns {Array} - Liste des fichiers avec leurs statistiques
 */
function getFilesInFolder(folderPath) {
  const files = [];
  const items = fs.readdirSync(folderPath);

  items.forEach((item) => {
    const itemPath = path.join(folderPath, item);
    const stats = fs.statSync(itemPath);

    // Si c'est un fichier, on récupère ses statistiques
    if (stats.isFile()) {
      files.push({
        path: itemPath,
        stat: stats,
      });
    }
  });

  return files;
}

/**
 * Obtenir les fichiers à supprimer dans un dossier
 * @param {string} folderPath - Chemin du dossier
 * @param {number} keepCount - Nombre de fichiers à garder
 * @param {Array} allowedExtensions - Extensions autorisées à supprimer
 * @returns {Array} - Liste des fichiers à supprimer
 */
function getFilesToDelete(folderPath, keepCount, allowedExtensions) {
  // Récupérer tous les fichiers dans le dossier
  let filesInFolder = getFilesInFolder(folderPath);

  // Filtrer les fichiers par extension
  let filesToConsider = filterFilesByExtension(
    filesInFolder,
    allowedExtensions
  );

  // Trier les fichiers par date
  let sortedFiles = sortFilesByDate(filesToConsider);

  // Sélectionner les fichiers à supprimer
  if (sortedFiles.length > keepCount) {
    return sortedFiles.slice(0, sortedFiles.length - keepCount);
  }
  return [];
}



/**
 * Supprimer un fichier avec gestion des erreurs
 * @param {string} filePath - Chemin du fichier à supprimer
 */
function deleteFile(filePath) {
  try {
    // Vérifier si le fichier existe avant de tenter de le supprimer
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath); // Supprimer le fichier
      log.info(`Fichier supprimé avec succès : ${filePath}`);
      console.log(`Fichier supprimé avec succès : ${filePath}`);
    } else {
      log.error(`Le fichier n'existe pas : ${filePath}`);
      console.error(`Le fichier n'existe pas : ${filePath}`);
    }
  } catch (error) {
    // En cas d'erreur lors de la suppression
    log.error(`Erreur lors de la suppression du fichier ${filePath} : ${error.message}`);
    console.error(`Erreur lors de la suppression du fichier ${filePath} : ${error.message}`);
    throw error;
  }
}

/**
 * Parcourir les dossiers de manière récursive et supprimer les fichiers
 * @param {string} folderPath - Chemin du dossier à analyser
 * @param {number} keepCount - Nombre de fichiers récents à garder
 * @param {Array} allowedExtensions - Extensions de fichiers autorisées à supprimer
 * @param {boolean} simulateDeletion - Si true, affiche les fichiers à supprimer sans les supprimer
 */
function deleteFilesRecursively(folderPath, keepCount, allowedExtensions, simulateDeletion = false) {
  try {
    // Obtenir les fichiers à supprimer
    let filesToDelete = getFilesToDelete(folderPath, keepCount, allowedExtensions);
    // Afficher ou supprimer les fichiers sélectionnés
    filesToDelete.forEach((file) => {
      if (simulateDeletion) {
        console.log(`Fichier à SUPPRIMER (simulation) : ${file.path}`);
      } else {
        log.info(`Fichier à SUPPRIMER : ${file.path}`);
        console.log(`Fichier à SUPPRIMER : ${file.path}`);
        deleteFile(file.path); // Appelle la fonction pour supprimer le fichier
      }
    });

    // Lire les sous-dossiers pour traitement récursif
    const items = fs.readdirSync(folderPath);
    items.forEach((item) => {
      const itemPath = path.join(folderPath, item);
      const stats = fs.statSync(itemPath);

      // Si c'est un dossier, appeler récursivement la fonction
      if (stats.isDirectory()) {
        deleteFilesRecursively(itemPath, keepCount, allowedExtensions, simulateDeletion);
      }
    });

    log.info(`Analyse terminée pour le dossier ${folderPath}.`);
  } catch (error) {
    log.error(`Erreur lors de l'analyse du dossier ${folderPath} : ${error.message}`);
    throw error;
  }
}



/**
 * Nettoyer tous les dossiers définis dans la configuration
 * @param {Array} folders - Liste des dossiers à nettoyer
 */
function cleanAllFolders(folders , simulateDeletion) {
  folders.forEach((folderConfig) => {
    // Vérifier si le dossier existe
    if (fs.existsSync(folderConfig.path)) {
      log.info(`Début de l'analyse pour le dossier : ${folderConfig.path}`);

      // Appeler la fonction pour analyser et supprimer les fichiers
      deleteFilesRecursively(
        folderConfig.path,
        folderConfig.keepRecentFiles,
        folderConfig.extensionsToDelete,
        simulateDeletion
      );

      log.info(`Analyse terminée pour le dossier : ${folderConfig.path}`);
    } else {
      log.error(`Le dossier spécifié n'existe pas : ${folderConfig.path}`);
    }
  });
}

// Exporter la fonction de nettoyage pour l'utiliser dans le fichier principal
module.exports = { cleanAllFolders };
