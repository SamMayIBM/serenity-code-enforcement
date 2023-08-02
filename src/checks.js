'use strict'

/**
 * Checks all of the files in the tree start with a lower case character 
 * @param {Array<Object>} fileTree - The file tree for the repo
 * @returns {string} - The files where the filename doesn't start with a lower case character 
 */
function allFilesStartWithLowerCase (fileTree) {
  let listFileNames=""
  for (const fileAndContent of fileTree) {
    // We can use Regex here to ensure that the first character is lowercase,
    // research how to do that in JS and then use that code here, we should return
    // true if the first character is lower case and false if not
    const startChar = fileAndContent.fileName[0]
    

    if(fileAndContent.fileName!=="README.md"&&fileAndContent.fileName!=="Dockerfile"){
         if(startChar.match(/[A-Z]/)){
          listFileNames=fileAndContent.fileName +", "+listFileNames
         }
    }

  }
  return listFileNames
  
}

/**
 * Checks that all files with .js suffix have "use strict" phrase
 * @param {Array<Object>} fileTree - The file tree for the repo
 * @returns {string} - The .js files which don't have thet 'use strict' phrase  
 */
function useStrictEverywhere (fileTree) {
  let listFileNames=""
  //for loop of all files
  //if file has .js suffix 
  //search through file contents
  //if there is not "use strict" in file
  //return false
  //if all files have use "strict"
  //return true
  const word ='use strict'
  for (const fileAndContent of fileTree){
    if(fileAndContent.fileName.slice(-3)===".js"){
      if(fileAndContent.content.includes(word)===false){
        listFileNames=fileAndContent.fileName+", "+listFileNames
      }
    }
  }
  return listFileNames
}

/**
 * Checks that all of the files end with a newline (\n) character 
 * @param {Array<Object>} fileTree - The file tree for the repo
 * @returns {string} - The files that don't end with a new line
 */
function allFilesEndWithNewLine (fileTree) {
let listFileNames=""
  for (const fileAndContent of fileTree){
    
  if(!fileAndContent.content.endsWith("\r\n"))
    {
      listFileNames=fileAndContent.fileName+", "+listFileNames
      
    }
   }
  return listFileNames
}
/**
 * Checks that all of the functions are in the format function x () {}
 * @param {Array<Object>} fileTree - The file tree for the repo
 * @returns {string} - The file lines on which a function is in the incorrect format
 */
function functionKeywordForFunction(fileTree){
  let listFileNameAndLine=""
  for (const fileAndContent of fileTree){
    let filelines=fileAndContent.content.split("\r\n")
    for(const fileline of filelines)
    {
      if(fileline.includes('= function') || fileline.includes(') =>')){
        listFileNameAndLine="Line "+(filelines.indexOf(fileline)+1)+" in "+fileAndContent.fileName+", "+listFileNameAndLine
      }      
      
    }
  }
  return listFileNameAndLine
}
/**
 * Checks that all functions have the a jsdoc
 * @param {Array<Object>} fileTree - The file tree for the repo
 * @returns {string} - The file lines in which the function doesn't have a jsdoc
 */
function functionjsDocCheck(fileTree){
  let listFileNameAndLine=""
  for (const fileAndContent of fileTree){
    let filelines=fileAndContent.content.split("\r\n")
    for(const fileline of filelines){
      if (fileline.includes('= function')){
        filelineFunction=fileline
        fileline=fileline-1      
        if (fileline.includes(!'*/')){
          listFileNameAndLine="Line "+(fileline+1) +" in "+fileAndContent.fileName+", "+listFileNameAndLine
        }
    }
  } 
  }
  return listFileNameAndLine
  
}
/**
 * Checks that all functions have correct number of parameters in jsdoc
 * @param {Array<Object>} fileTree - The file tree for the repo
 * @returns {string} - The file lines in which the function doesn't have correct number of parameters in jsdoc
 */
function numberOfParamFunctionJSDoc(fileTree){
let listFileNameAndLine=""
  for (let fileAndContent of fileTree){
    
    let commentLines=[]
    let functionStartLines=[]
    let functionStartLinesWithoutJSDOC=[] 
    let commentStartChecker=0
    let filelines=fileAndContent.content.split("\r\n")
    for(let indexOfFileLine=0; indexOfFileLine<(filelines.length-1);indexOfFileLine++){
      
      if(filelines[indexOfFileLine].includes('/**')&& commentStartChecker===0){
        commentLines.push(indexOfFileLine)
        commentStartChecker=1
      }
      if(filelines[indexOfFileLine].includes('*/')){
        commentStartChecker=0
        if(filelines[indexOfFileLine+1].includes('function')){
          commentLines.push(indexOfFileLine)
          functionStartLines.push(indexOfFileLine+1)
        }
      }
      if(filelines[indexOfFileLine].includes('function')){
        if(!filelines[indexOfFileLine-1].includes('*/')){
          functionStartLinesWithoutJSDOC.push(indexOfFileLine)
        }
      }
    }
    
    for(let i=0; i<((functionStartLines.length)*2)-1; i=i+2){
      let numberOfParams=0
      let numberOfCommentParams=0
      if(filelines[functionStartLines[i/2]].match(',')===null){
        if (filelines[functionStartLines[i/2]].includes("()")){
        numberOfParams=0
        }
        else{
          numberOfParams=1
        }
      } 
      else {
        numberOfParams=(filelines[functionStartLines[i/2]].match(',').length)+1
      }
      for(let j=commentLines[i];j<commentLines[i+1]; j++){
        if(filelines[j].match('@param')!==null){
        numberOfCommentParams=numberOfCommentParams+(filelines[j].match('@param').length)
        }
      }
      if(numberOfCommentParams!==numberOfParams){
        listFileNameAndLine=listFileNameAndLine+"In the "+ (fileAndContent.fileName)+ " file on line "+ (functionStartLines[i/2]+1)+ " the function doesn't have the correct number of parameters in its JSDOC, "
      
    }
    }
      if((commentLines.length/2)!==functionStartLines.length+functionStartLinesWithoutJSDOC.length){
       for(let n=0;n<functionStartLinesWithoutJSDOC.length;n++){
        listFileNameAndLine=listFileNameAndLine+"In the "+ (fileAndContent.fileName)+ " file on line "+ (functionStartLinesWithoutJSDOC[n]+1)+ " the function doesn't have a JSDOC, "
      }
    
    }  
    console.log('hello')
  }
  return listFileNameAndLine    
}

   
  



/**
 * Checks that there are no console.log
 * @param {Array<Object>} fileTree - The file tree for the repo
 * @returns {string} - The file lines in which console.log appear
 */
function noConsoleLogs(fileTree) {
  //declare string to store 
  //lines with an error
  //loop through all files
  //split each file into array
  //where each line is an element
  //if console.log or 
  //console.error located 
  //add filename and fileline
  //to the error string
  //if not
  //leave error string as it is
  //return error string
  //if empty there are no errors in files
  let listFileNameAndLine=""
  for (const fileAndContent of fileTree){
    let filelines=fileAndContent.content.split("\r\n")
    for(const fileline of filelines){
        if(fileline.includes('console.log')||fileline.includes('console.error')){
          listFileNameAndLine="Line "+(filelines.indexOf(fileline)+1)+" in "+fileAndContent.fileName+", "+listFileNameAndLine
        }      
      }
    }
    return listFileNameAndLine
    
}
/**
 * Checks that there are no console.log
 * @param {Array<Object>} fileTree - The file tree for the repo
 * @returns {string} - The file lines in which Istanbul Ignores
 */
function noIstanbulIgnores(fileTree){
  let listFileNameAndLine=""
  for (const fileAndContent of fileTree){
    let filelines=fileAndContent.content.split("\r\n")
    for(const fileline of filelines){
        if(fileline.includes('istanbul ignore')){
          listFileNameAndLine="Line "+(filelines.indexOf(fileline)+1)+" in "+fileAndContent.fileName+", "+listFileNameAndLine
        }      
      }
    }
    return listFileNameAndLine

}




module.exports = {
  allFilesStartWithLowerCase,
  allFilesEndWithNewLine,
  useStrictEverywhere,
  functionKeywordForFunction,
  noConsoleLogs,
  noIstanbulIgnores,
  functionjsDocCheck,
  numberOfParamFunctionJSDoc
}