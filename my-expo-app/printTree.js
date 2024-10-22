const fs = require("fs");
const path = require("path");

function printTree(dir, depth = 0) {
  const items = fs.readdirSync(dir);

  items.forEach((item) => {
    const itemPath = path.join(dir, item);
    const isDirectory = fs.statSync(itemPath).isDirectory();

    // Skip the node_modules directory
    if (item === "node_modules") {
      return;
    }

    // Indentation based on depth
    const indent = " ".repeat(depth * 2);

    console.log(`${indent}- ${item}`);

    // If item is a directory, recursively print its contents
    if (isDirectory) {
      printTree(itemPath, depth + 1);
    }
  });
}

// Start from the current directory (root of your project)
printTree(process.cwd());
