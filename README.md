
# Clean Up Directory

Clean Up Directory is a Node.js project designed to automate the cleaning of directories. It recursively checks through directories, deleting old files and keeping only a specified number of the most recent files. The program also logs its operations, including files deleted, errors, and the total number of files retained.

## Table of Contents

- [Clean Up Directory](#clean-up-directory)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Usage](#usage)
    - [Sample Output](#sample-output)
  - [Logging](#logging)
  - [Folder Structure](#folder-structure)
  - [Contributing](#contributing)
  - [License](#license)

## Features

- Recursive cleaning of directories.
- Keeps only a user-specified number of the most recent files.
- Skips empty directories.
- Logs all operations, including errors and successful file deletions.
- Modular code structure for easy maintenance and extension.

## Installation

1. Ensure you have [Node.js](https://nodejs.org/) installed.
2. Clone this repository to your local machine using:
   ```bash
   git clone https://github.com/loicBe21/clean_up_dir.git
   ```
3. Navigate into the project directory:
   ```bash
   cd clean_up_dir
   ```
4. Install the dependencies:
   ```bash
   npm install
   ```

## Configuration

To configure the directories to be cleaned and the number of files to retain, modify the `config.js` file located in the root directory.

Example `config.js`:

```js
const { resolve } = require("path");

const config = {
  foldersToClean: [
    {
      path: resolve("D:\forTest"), // Specify the directory path
      keepRecentFiles: 2,           // Specify how many recent files to keep
    },
    {
      path: resolve("D:\forTest\dir2"),
      keepRecentFiles: 1,
    }
    // Add more directories here if needed
  ],
};

module.exports = config;
```

- `path`: The directory to be cleaned.
- `keepRecentFiles`: The number of recent files to retain.

## Usage

1. Ensure the `config.js` file is properly configured with the directories you want to clean.
2. Run the program using the following command:
   ```bash
   node src/main.js
   ```

The program will process each directory as per the configuration, retaining the specified number of recent files and deleting the rest.

### Sample Output

The program logs its operations in the console as well as in a log file. Example console output:

```
Dossiers à analyser : [...folder details...]
Début de l'analyse pour le dossier : D:\forTest
Fichier à SUPPRIMER : D:\forTest\old_file1.txt
Fichier à SUPPRIMER : D:\forTest\old_file2.txt
Nettoyage terminé pour le dossier : D:\forTest
```

## Logging

The application uses a logging mechanism to track its operations. All logs are stored in the `logs/` directory. The logging system is divided into two types:

- `info`: Logs general information, such as files deleted and operations performed.
- `error`: Logs any errors encountered during the directory cleaning process.

## Folder Structure

```bash
clean_up_dir/
│
├── src/
│   ├── cleaningService.js   # Handles the core logic for cleaning directories
│   ├── main.js              # Main entry point for the application
│   └── config.js            # Configuration file for specifying directories
│
├── logs/                    # Contains log files generated by the application
│
├── utilities/
│   └── logger.js            # Utility for logging information and errors
│
├── package.json             # Node.js project manifest
├── README.md                # Project documentation (this file)
└── .gitignore               # Specifies files and directories to ignore in Git
```

## Contributing

Contributions are welcome! Here's how you can contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
