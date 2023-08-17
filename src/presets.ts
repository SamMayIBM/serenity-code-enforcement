'use strict'

import { dollarSignForStrConcat } from "./checks"

export interface EnforcementOptions {
    /*
    Specifies that the names of all files in the repository start with
    a lower case letter, except where there is no way around the name of
    the file (for instance with Dockerfile)
    */
    allFilesStartWithLowerCase?: boolean,

    /*
      Definitions of functions should use the function keyword at the start
      of the line to specify the start of the function, not using anonymous
      functions or the like, for example the following is valid
  
      function x () {}
  
      Where the following would NOT be valid
  
      const x = () => {}
  
      const x = function () {}
    */
    functionKeywordForFunction?: boolean,
  
    /*
      All JS Source files should start with the 'use strict' identifier
  
      https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
    */
    useStrictEverywhere?: boolean,
  
    /*
      All files should end with a new line character (\n and nothing else on the final line)
    */
    allFilesEndWithNewLine?: boolean,
  
    /*
      No console log in the source
    */
    noConsoleLogs?: boolean,
  
    /*
      There are no instanbul ignore <any> in the source code
    */
    noIstanbulIgnores?: boolean,
  
    /*
      The number of parameters in all JS Doc comments align with the number of actual 
      parameters in the function
    */
    numberOfParamFunctionJSDoc?: boolean
  
    /*
      All strings concatenation should use `${}` and not use the + 
    */
    dollarSignForStrConcat?: boolean
  
    /*
      All asynchronous processing should use the await keyword and not the .then() method
    */
    awaitKeywordForAsync?: boolean
  
}
  

export const DefaultEnforcementOptions: EnforcementOptions = {
  allFilesStartWithLowerCase: true,
  functionKeywordForFunction: true,
  useStrictEverywhere: true,
  allFilesEndWithNewLine: true,
  noConsoleLogs: true,
  noIstanbulIgnores: true,
  numberOfParamFunctionJSDoc: true,
  dollarSignForStrConcat: true,
  awaitKeywordForAsync: true
}
