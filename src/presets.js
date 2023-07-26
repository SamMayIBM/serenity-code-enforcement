const { allFunctionsInCorrectFormat } = require("./checks")

const defaultPreset = {
  
  /*
    Specifies that the names of all files in the repository start with
    a lower case letter, except where there is no way around the name of
    the file (for instance with Dockerfile)
  */
  allFilesStartWithLowerCase: true,

  /*
    Definitions of functions should use the function keyword at the start
    of the line to specify the start of the function, not using anonymous
    functions or the like, for example the following is valid

    function x () {}

    Where the following would NOT be valid

    const x = () => {}

    const x = function () {}
  */
  functionKeywordForFunction: true,

  /*
    All JS Source files should start with the 'use strict' identifier

    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
  */
  useStrictEverywhere: true,

  /*
    All files should end with a new line character (\n and nothing else on the final line)
  */
  allFilesEndWithNewLine: true,

  /*
    No console log in the source
  */
  noConsoleLogs:true,

  noIstanbulIgnores:true


  
}

const suproPreset = JSON.parse(JSON.stringify(defaultPreset))

module.exports = {
  defaultPreset,
  suproPreset
}