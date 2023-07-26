'use strict'

/**
 * Checks all of the files in the tree start with a lower case character 
 * @param {Array<Object>} fileTree - The file tree for the repo
 * @param {boolean} - True/False depending on if the check passes 
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
 * @param {boolean} - True/False depending on if the check passes 
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
 * @param {boolean} - True/False depending on if the check passes 
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
 * @param {boolean} - True/False depending on if the check passes 
 */
function functionKeywordForFunction(fileTree){
 
  //declare string to store 
  //lines with an error
  //loop through all files
  //split each file into array
  //where each line is an element
  //if '= function' or
  //') => ' located
  //add filename and fileline
  //to the error string
  //if not
  //leave error string as it is
  //return error string
  //if empty there are no errors in files
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
 * Checks that there are no console.log
 * @param {Array<Object>} fileTree - The file tree for the repo
 * @param {boolean} - True/False depending on if the check passes 
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
  noConsoleLogs
}