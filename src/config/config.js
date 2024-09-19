const { resolve } = require("path");

const config = {
    foldersToClean: [
  
    {
      path: resolve("D:\\forTest\\dir"),
      keepRecentFiles: 1,
    },
   
    {
      path: resolve("D:\\forTest\\dir2"),
      keepRecentFiles: 1,
    }
    // Ajouter d'autres dossiers ici si nécessaire
  ],
};

module.exports = config;
