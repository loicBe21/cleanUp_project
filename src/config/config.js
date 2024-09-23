const { resolve } = require("path");

const config = {
  foldersToClean: [
    {
      path: resolve("D:\\forTest\\dir"),
      keepRecentFiles: 1,
      extensionsToDelete: [".whtt", ".odt", ".txt" ,".odg"], // Extensions à supprimer
    },

   /* {
      path: resolve("D:\\forTest\\dir2"),
      keepRecentFiles: 1,
      extensionsToDelete: [".log", ".tmp", ".bak"], // Extensions à supprimer
    },
    */
    // Ajouter d'autres dossiers ici si nécessaire
  ],
};

module.exports = config;
