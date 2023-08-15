'use strict'

import { FileInformation, Discrepancy } from "./types"

/**
 * Generates a human-readable string containing details of the error
 * @param fileName - Name of the offending file
 * @param ruleTitle - Title and purpose of the test that has been breached
 * @returns - A human-readable string containing the details of the error
 */
function generateFailureMessage (fileName: string, ruleTitle: string, lineNumber?: number): string {
  return `${fileName} contravenes the rule "${ruleTitle}"${lineNumber ? `on line ${lineNumber}` : ''}`
}

/**
 * Checks that the given file name starts with a lower case character
 * @param file - Information for the provided file
 * @returns - A discrepancy with more information, or nothing if it does not break the rule
 */
export function filesMustStartWithLowerCaseChar (file: FileInformation): Discrepancy | undefined {
  const exemptions: string[] = ['README.md', 'Dockerfile']

  if (exemptions.includes(file.fileName) === true) {
    return 
  }

  if (file.fileName[0].match(/[A-Z]/)) {
    return {
      fileName: file.fileName,
      path: file.path,
      message: generateFailureMessage(file.fileName, 'All files must start with a lower case character')
    }
  }

  return
}


/**
 * Checks that all .js or .ts files use the 'use strict' option
 * @param file - Information for the provided file
 * @returns - A discrepancy with more information, or nothing if it does not break the rule
 */
export function fileMustUseStrictIfECMA (file: FileInformation): Discrepancy | undefined {
  if (file.content.includes('use strict')) {
    return
  }

  if (file.fileName.endsWith('.js') || file.fileName.endsWith('.ts')) {
    return {
      fileName: file.fileName,
      path: file.path,
      message: generateFailureMessage(file.fileName, 'All JS or TS files must include "use strict"')
    }
  }
}

/**
 * Checks that all files end with an empty new line character
 * @param file - Information for the provided file
 * @returns - A discrepancy with more information, or nothing if it does not break the rule
 */
export function fileMustEndWithEmptyNewLine (file: FileInformation): Discrepancy | undefined {
  if (!file.content.endsWith('\n')) {
    return {
      fileName: file.fileName,
      path: file.path,
      message: generateFailureMessage(file.fileName, 'All files must end with an empty line')
    }
  }
}

/**
 * Checks that all of the functions are in the format function x () {}
 * @param file - Information for the provided file
 * @returns - A discrepancy with more information, or nothing if it does not break the rule
 */
export function functionKeywordForFunction (file: FileInformation): Discrepancy | undefined {
  const lines: string[] = file.content.replace(/\r\n/g,'\n').split('\n')
  for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
    if (lines[lineIndex].includes('= function') || lines[lineIndex].includes(') =>')) {
      return {
        fileName: file.fileName,
        path: file.path,
        message: generateFailureMessage(file.fileName, 'All function definitions must use the function keyword', lineIndex),
        lineNumber: lineIndex
      }
    }
  }
}

/**
 * Checks that all functions have a JSDoc style comment above it
 * @param file - Information for the provided file
 * @returns - A discrepancy with more information, or nothing if it does not break the rule
 */
export function allFunctionsShouldHaveAJsdoc (file: FileInformation): Discrepancy | undefined {
  const lines: string[] = file.content.replace(/\r\n/g,'\n').split('\n')
  for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
    if (lines[lineIndex].includes('function')) {
      if (!lines[lineIndex-1].includes('*/')) {
        return {
          fileName: file.fileName,
          path: file.path,
          message: generateFailureMessage(file.fileName, 'All function definitions should be preceeded by a JSDoc comment', lineIndex),
          lineNumber: lineIndex
        }
      }
    }
  }
}

/**
 * Checks to ensure there are no istanbul ignores in the code
 * @param file - Information for the provided file
 * @returns - A discrepancy with more information, or nothing if it does not break the rule
 */
export function noIstanbulIgnores (file: FileInformation): Discrepancy | undefined {
  const lines: string[] = file.content.replace(/\r\n/g,'\n').split('\n')
  for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
    if (lines[lineIndex].includes('istanbul ignore')) {
      return {
        fileName: file.fileName,
        path: file.path,
        message: generateFailureMessage(file.fileName, 'There should be no istanbul ignores in the code', lineIndex),
        lineNumber: lineIndex
      }
    }
  }
}

/**
 * Checks to ensure there are no console logs in the code
 * @param file - Information for the provided file
 * @returns - A discrepancy with more information, or nothing if it does not break the rule
 */
export function noConsoleLogs (file: FileInformation): Discrepancy | undefined {
  const lines: string[] = file.content.replace(/\r\n/g,'\n').split('\n')
  for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
    if (lines[lineIndex].includes('console.log') || lines[lineIndex].includes('console.error')) {
      return {
        fileName: file.fileName,
        path: file.path,
        message: generateFailureMessage(file.fileName, 'There should be no console logs in the code', lineIndex),
        lineNumber: lineIndex
      }
    }
  }
}
