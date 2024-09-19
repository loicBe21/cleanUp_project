const fs = require("fs");
const path = require("path");
const log = require("../utilities/logger");

/**
 * Fonction pour obtenir les fichiers d'un dossier récursivement
 * @param {string} folderPath - Chemin du dossier
 * @returns {Array} - Liste des fichiers dans le dossier
 */
function getFilesInFolder(folderPath) {
  let filesInFolder = [];

  const items = fs.readdirSync(folderPath);
  if (items.length === 0) {
    log.info(`Le dossier est vide : ${folderPath}`);
    return filesInFolder; // Retourne une liste vide si le dossier est vide
  }

  items.forEach((item) => {
    const itemPath = path.join(folderPath, item);
    const stats = fs.statSync(itemPath);

    if (!stats.isDirectory()) {
      // Si c'est un fichier, on l'ajoute à la liste
      filesInFolder.push({
        path: itemPath,
        stat: stats,
      });
    }
  });

  return filesInFolder;
}

/**
 * Fonction pour récupérer et supprimer les fichiers dans un dossier et ses sous-dossiers récursivement
 * @param {string} folderPath - Chemin du dossier
 * @param {number} keepCount - Nombre de fichiers à garder
 */
function listAndDeleteFilesRecursively(folderPath, keepCount) {
  try {
    // Obtenir les fichiers du dossier actuel
    let filesInCurrentFolder = getFilesInFolder(folderPath);

    // Trier les fichiers par date de création (les plus anciens en premier)
    filesInCurrentFolder.sort(
      (a, b) => a.stat.birthtimeMs - b.stat.birthtimeMs
    );

    // Si le nombre de fichiers est supérieur à keepCount, récupérer ceux à supprimer
    let filesToDelete = [];
    if (filesInCurrentFolder.length > keepCount) {
      filesToDelete = filesInCurrentFolder.slice(
        0,
        filesInCurrentFolder.length - keepCount
      );
    }

    // Supprimer les fichiers
    filesToDelete.forEach((file) => {
      try {
        fs.unlinkSync(file.path); // Suppression du fichier
        log.info(`Fichier supprimé : ${file.path}`);
        console.log(`Fichier supprimé : ${file.path}`);
      } catch (error) {
        log.error(
          `Erreur lors de la suppression du fichier : ${file.path} - ${error.message}`
        );
        console.error(
          `Erreur lors de la suppression du fichier : ${file.path} - ${error.message}`
        );
      }
    });

    // Parcourir récursivement les sous-dossiers
    const items = fs.readdirSync(folderPath);
    items.forEach((item) => {
      const itemPath = path.join(folderPath, item);
      const stats = fs.statSync(itemPath);

      if (stats.isDirectory()) {
        listAndDeleteFilesRecursively(itemPath, keepCount);
      }
    });

    log.info(
      `Nettoyage du dossier ${folderPath} terminé. ${filesToDelete.length} fichiers supprimés, ${keepCount} fichiers conservés.`
    );
  } catch (error) {
    log.error(
      `Erreur lors du nettoyage du dossier ${folderPath} : ${error.message}`
    );
    throw error;
  }
}

/**
 * Fonction pour nettoyer tous les dossiers spécifiés dans la configuration
 * @param {Array} folders - Liste des dossiers à nettoyer avec les paramètres
 */
function cleanAllFolders(folders) {
  console.log("Dossiers à nettoyer : ", folders); // Affiche la configuration des dossiers dans la console

  folders.forEach((folderConfig) => {
    if (fs.existsSync(folderConfig.path)) {
      console.log(`Début du nettoyage pour le dossier : ${folderConfig.path}`);
      log.info(`Début du nettoyage pour le dossier : ${folderConfig.path}`);

      // Nettoyage récursif des fichiers avec suppression réelle
      listAndDeleteFilesRecursively(
        folderConfig.path,
        folderConfig.keepRecentFiles
      );

      console.log(`Nettoyage terminé pour le dossier : ${folderConfig.path}`);
      log.info(`Nettoyage terminé pour le dossier : ${folderConfig.path}`);
    } else {
      console.log(`Le dossier spécifié n'existe pas : ${folderConfig.path}`);
      log.error(`Le dossier spécifié n'existe pas : ${folderConfig.path}`);
    }
  });
}

module.exports = {
  cleanAllFolders,
};
