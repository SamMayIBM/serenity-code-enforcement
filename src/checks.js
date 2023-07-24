'use strict'

/**
 * Checks all of the files in the tree start with a lower case character 
 * @param {Array<Object>} fileTree - The file tree for the repo
 * @param {boolean} - True/False depending on if the check passes 
 */
function allFilesStartWithLowerCase (fileTree) {
  for (const fileAndContent of fileTree) {
    // We can use Regex here to ensure that the first character is lowercase,
    // research how to do that in JS and then use that code here, we should return
    // true if the first character is lower case and false if not
    const startChar = fileAndContent.fileName[0]
  }
}

/**
 * Checks that all of the files end with a newline (\n) character 
 * @param {Array<Object>} fileTree - The file tree for the repo
 * @param {boolean} - True/False depending on if the check passes 
 */
function allFilesEndWithNewLine (fileTree) {
  return true
}

module.exports = {
  allFilesStartWithLowerCase,
  allFilesEndWithNewLine
}