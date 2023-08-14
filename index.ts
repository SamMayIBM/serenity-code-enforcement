import { getFileTree } from './src/repositoryIntrospection'
import { 
  filesMustStartWithLowerCaseChar,
  fileMustUseStrictIfECMA,
  fileMustEndWithEmptyNewLine
 } from './src/checks'
import { EnforcementOptions } from './src/presets'
import { FileInformation, Discrepancy } from "./src/types"

export interface TestResults {
  hasPassed: boolean,
  failures: Discrepancy[]
}

/**
 * Runs the individual checks against all of the files sequentially
 * @param directoryTree - A flattened array of all of the files in the directory
 * @param enforcementOptions - The choice of enforcement options to run
 * @returns - A Test Result indicating if all of the checks have been met by the code
 */
function runEnforcementChecks (directoryTree: FileInformation[], enforcementOptions: EnforcementOptions): TestResults { 
  const results: TestResults = {
    hasPassed: true,
    failures: []
  }

  for (const file of directoryTree) {
    if (enforcementOptions.allFilesEndWithNewLine) {
      const result = fileMustEndWithEmptyNewLine(file)
      if (result) {
        results.failures.push(result)
      }
    }

    if (enforcementOptions.allFilesStartWithLowerCase) {
      const result = filesMustStartWithLowerCaseChar(file)
      if (result) {
        results.failures.push(result)
      }
    }

    if (enforcementOptions.useStrictEverywhere) {
      const result = fileMustUseStrictIfECMA(file)
      if (result) {
        results.failures.push(result)
      }
    }
  }

  if (results.failures.length > 0) {
    results.hasPassed = false
  }

  return results
}

/**
 * Runs the code introspection checks against the target directory
 * @param rootDirectory - The Root Directory to start the enforcement scanning from
 * @param enforcementOptions - The enforcement options to scan with
 * @returns a results object indicating if all of the tests have passed
 */
export function runTest (rootDirectory: string, enforcementOptions: EnforcementOptions): TestResults {
  const directoryTree: FileInformation[] = getFileTree(rootDirectory)

  try {
    const results: TestResults = runEnforcementChecks(directoryTree, enforcementOptions) 
    return results
  } catch (error) {
    throw new Error(`Internal error when running the test suite, ${error}`)
  }
}
