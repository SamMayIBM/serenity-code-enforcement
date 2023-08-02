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

  try {
    // Here's where the magic happens! Let's start validating against the rules
    const result = {
      validated: true,
      failureReasons: []
    }

    if (enforcementOptions.allFilesStartWithLowerCase) {
      const testResult = checks.allFilesStartWithLowerCase(directoryTree)
      

      if (testResult !== "") {
        result.validated = false
        result.failureReasons.push(testResult + "file(s) do not start with a lower case letter.")
        
      }
    }

    if (enforcementOptions.allFilesEndWithNewLine) {
      const testResult = checks.allFilesEndWithNewLine(directoryTree)

      if (testResult !==  "") {
        result.validated = false
        result.failureReasons.push(testResult+"file(s) don't end with a new line")
      }
    }
    if (enforcementOptions.useStrictEverywhere) {
      const testResult = checks.useStrictEverywhere(directoryTree)

      if (testResult !== "") {
        result.validated = false
        result.failureReasons.push(testResult+"are .js file(s) which don't contain 'use strict'")
      }
      
    }
   if (enforcementOptions.functionKeywordForFunction) {
     const testResult = checks.functionKeywordForFunction(directoryTree)

      if (testResult !== "") {
        result.validated = false
        result.failureReasons.push("On "+testResult+  "the function(s) is/are not in the format, function x () {}")
     }
      
   }
    if (enforcementOptions.noConsoleLogs) {
      const testResult = checks.noConsoleLogs(directoryTree)

      if (testResult !== "") {
        result.validated = false
        result.failureReasons.push("On "+testResult+ "there is/are a console.log or console.error ")
        
      }
      
    }
    if (enforcementOptions.noIstanbulIgnores) {
      const testResult = checks.noIstanbulIgnores(directoryTree)

      if (testResult !== "") {
        result.validated = false
        result.failureReasons.push("On "+testResult+ "there is/are an 'istanbul ignore'")
        
      }
    }
    if (enforcementOptions.numberOfParamFunctionJSDoc) {
      const testResult = checks.numberOfParamFunctionJSDoc(directoryTree)
      if (testResult !== "") {
        result.validated = false
        result.failureReasons.push(testResult)
          
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