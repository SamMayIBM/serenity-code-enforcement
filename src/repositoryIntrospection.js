'use strict'

const fs = require('fs')

/**
 * Recursively calls to get all of the files and their content from a root directory
 * @param {string} rootDirectory - The root directory of the repository 
 * @param {Array<Object>} fileList - Should not be provided by the caller 
 * @returns {Array<Object} - The names of the files and their content
 */
function getFileTree (rootDirectory, fileList = []) {
  const subFiles = fs.readdirSync(rootDirectory)

  for (const file of subFiles) {
    const path = `${rootDirectory}/${file}`

    // Don't bother indexing hidden directories or files
    if (file.startsWith('.')) {
      continue
    }

    // Only recurse for directories
    if (fs.lstatSync(path).isDirectory()) {
      fileList.push(...getFileTree(path))
    } else {

      // Read in the content of the files
      fileList.push({
        path,
        fileName: file,
        content: fs.readFileSync(path, 'utf8') 
      })
    }
  }

  return fileList
}

module.exports = {
  getFileTree
}
