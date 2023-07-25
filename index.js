const {
  defaultPreset,
  suproPreset
} = require('./src/presets')

const { getFileTree } = require('./src/repositoryIntrospection')

const checks = require('./src/checks')

/**
 * Runs a check against the code base to ensure it matches the provided enforcement options
 * @param {string} rootDirectory - The root directory to start running the rules from
 * @param {Object} enforcementOptions - Enforcement Options to validate against 
 * @returns {Object} - An object indicating if the code passes or fails and reasons for failure
 */
function matchesEnforcementOptions (rootDirectory, enforcementOptions) {
  const directoryTree = getFileTree(rootDirectory)
  console.log('JAMIE')

  try {
    // Here's where the magic happens! Let's start validating against the rules
    const result = {
      validated: true,
      failureReasons: []
    }

    if (enforcementOptions.allFilesStartWithLowerCase) {
      const testResult = checks.allFilesStartWithLowerCase(directoryTree)
      

      if (testResult === false) {
        result.validated = false
        result.failureReasons.push('Not all of the files started with a lower case letter')
        
      }
    }

    if (enforcementOptions.allFilesEndWithNewLine) {
      const testResult = checks.allFilesEndWithNewLine(directoryTree)

      if (testResult === false) {
        result.validated = false
        result.failureReasons.push('Not all of the files ended with a new line')
      }
    }
    if (enforcementOptions.useStrictEverywhere) {
      const testResult = checks.useStrictEverywhere(directoryTree)

      if (testResult === false) {
        result.validated = false
        result.failureReasons.push('Not all of the files with suffix .js contain "use strict"')
      }
    }

    return result
  } catch (error) {
    // We shouldn't be relying on this code, this in the case one of the functions above
    // throws some kind of error, just to make sure the failure is seen

    console.error('Something went wrong when trying to introspect against the rules!')
    return {
      validated: false,
      failureReasons: [
        'One of the handlers threw an exception!'
      ]
    }
  }
}

module.exports = {
  matchesEnforcementOptions,
  presets: {
    defaultPreset,
    suproPreset
  }
}