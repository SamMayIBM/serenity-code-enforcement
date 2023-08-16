'use strict'

import { expect } from 'chai'
import { Discrepancy } from '../../src/types'
import { filesMustStartWithLowerCaseChar, fileMustUseStrictIfECMA, fileMustEndWithEmptyNewLine, functionKeywordForFunction, allFunctionsShouldHaveAJsdoc, noIstanbulIgnores, noConsoleLogs, dollarSignForStrConcat, awaitKeywordForAsync } from '../../src/checks'


describe('File System Inspection Checks', () => {
  describe('filesMustStartWithLowerCaseChar', () => {
    it('Should not return a discrepancy if the file starts with a lower case character', () => {
      const result: Discrepancy | undefined = filesMustStartWithLowerCaseChar({
        fileName: 'a.js',
        content: 'helloworld',
        path: 'b/a.js'
      })
      expect(result).to.equal(undefined)
    })

    it('Should return a discrepancy if the file does not start with a lower case character', () => {
      const result: Discrepancy | undefined = filesMustStartWithLowerCaseChar({
        fileName: 'B.js',
        content: 'helloworld',
        path: 'b/a.js'
      })
      expect(result).to.not.equal(undefined)
      expect(result?.message).to.satisfy(message => message.includes('All files must start with a lower case character'))
    })

    it('Should not return a discrepancy if the file is on the allow list', () => {
      const result: Discrepancy | undefined = filesMustStartWithLowerCaseChar({
        fileName: 'Dockerfile',
        content: 'helloworld',
        path: 'b/Dockerfile'
      })
      expect(result).to.equal(undefined)
    })
  })

  describe('fileMustUseStrictIfECMA', () => {
    it('Should not return a discrepancy if the file has a .js or .ts extension and contains use strict', () => {
      let result: Discrepancy | undefined = fileMustUseStrictIfECMA({
        fileName: 'a.js',
        content: 'use strict',
        path: 'b/a.js'
      })
      expect(result).to.equal(undefined)

      result = fileMustUseStrictIfECMA({ 
        fileName: 'a.ts',
        content: 'use strict',
        path: 'b/a.ts'
      })
      expect(result).to.equal(undefined)
    })

    it('Should return a discrepancy if the file has a .js or .ts extension and does not contain use strict', () => {
      let result: Discrepancy | undefined = fileMustUseStrictIfECMA({
        fileName: 'a.js',
        content: 'use',
        path: 'b/a.js'
      })
      expect(result).to.not.equal(undefined)
      expect(result?.message).to.satisfy(message => message.includes('All JS or TS files must include "use strict"'))

      result = fileMustUseStrictIfECMA({
        fileName: 'a.ts',
        content: 'use',
        path: 'b/a.ts'
      })
      expect(result).to.not.equal(undefined)
      expect(result?.message).to.satisfy(message => message.includes('All JS or TS files must include "use strict"'))
    })

    it('Should not run the check if the extension of the file is not for TS or JS', () => {
      const result: Discrepancy | undefined = fileMustUseStrictIfECMA({
        fileName: 'a.ab',
        content: 'use',
        path: 'b/a.ab'
      })
      expect(result).to.equal(undefined)
    })
  })

  describe('fileMustEndWithEmptyNewLine', () => {
    it('Should not return a discrepancy if the file ends with a new line', () => {
      const result: Discrepancy | undefined = fileMustEndWithEmptyNewLine({
        fileName: 'a.js',
        content: `
        a
        b
`,
        path: 'b/a.js'
      })
      expect(result).to.equal(undefined)
    })

    it('Should return a discrepancy if the file does not end with a new line', () => {
      // true for any extensions like .ab
      const result: Discrepancy | undefined = fileMustEndWithEmptyNewLine({
        fileName: 'a.ab', 
        content: ``,
        path: 'b/a.ab'
      })
      expect(result).to.not.equal(undefined)
      expect(result?.message).to.satisfy(message => message.includes('All files must end with an empty line'))
    })
  })

  describe('functionKeywordForFunction', () => {
    it('Should not return a discrepancy if the file does not break the function format rule', () => {
      let result: Discrepancy | undefined = functionKeywordForFunction({
        fileName: 'a.js',
        content: `function myfunc(a,b) {
          return a + b
        }`,
        path: 'b/a.js'
      })
      expect(result).to.equal(undefined)
    })
    it('Should return a discrepancy if the file defines a function with = function', () => {
      let result: Discrepancy | undefined = functionKeywordForFunction({
        fileName: 'a.js',
        content: `const multiply = function (a, b) {
          return a * b
        }
        `,
        path: 'b/a.js'
      })
      expect(result).to.not.equal(undefined)
      expect(result?.message).to.satisfy(message => message.includes('All function definitions must use the function keyword'))
    })
    it('Should return a discrepancy if the file defines a function with ) =>', () => {
      let result: Discrepancy | undefined = functionKeywordForFunction({
        fileName: 'a.js',
        content: `const divide = (a, b) => {
          return a / b
        }
        `,
        path: 'b/a.js'
      })
      expect(result).to.not.equal(undefined)
      expect(result?.message).to.satisfy(message => message.includes('All function definitions must use the function keyword'))
    })
  })

  describe('allFunctionsShouldHaveAJsdoc', () => {
    it('Should not return a discrepancy if the file does not contain any functions with missing JSDoc style commenets above it', () => {
      let result: Discrepancy | undefined = allFunctionsShouldHaveAJsdoc({
        fileName: 'a.js',
        content: `/**
        * Subtracts the second parameter from the first
        * @param {number} a - The First Number 
        * @param {number} b - The Second Number 
        * @returns {number} - The result of the second number subtracted from the first
        */
        function subtract (a, b) {
        return a - b
       }`,
        path: 'b/a.js'
      })
      expect(result).to.equal(undefined)
    })
    it('Should return a discrepancy if the file contains any functions with missing JSDoc style comments above it', () => {
      let result: Discrepancy | undefined = allFunctionsShouldHaveAJsdoc({
        fileName: 'a.js',
        content: `
        function subtract (a, b) {
          return a - b
        }
        `,
        path: 'b/a.js'
      })
      expect(result).to.not.equal(undefined)
      expect(result?.message).to.satisfy(message => message.includes('All function definitions should be preceeded by a JSDoc comment'))
    })
  })

  describe('noIstanbulIgnores', () => {
    it('Should not return a discrepancy if the file does not have any istanbul ignores', () => {
      let result: Discrepancy | undefined = noIstanbulIgnores({
        fileName: 'a.js',
        content: 'hello world',
        path: 'b/a.js'
      })
      expect(result).to.equal(undefined)
    })
    it('Should return a discrepancy if the file has istanbul ignores', () => {
      let result: Discrepancy | undefined = noIstanbulIgnores({
        fileName: 'a.js',
        content: `hello world
        istanbul ignore
        bye
        `,
        path: 'b/a.js'
      })
      expect(result).to.not.equal(undefined)
      expect(result?.message).to.satisfy(message => message.includes('There should be no istanbul ignores in the code'))
    })
  })

  describe('noConsoleLogs', () => {
    it('Should not return a discrepancy if the file does not have any console logs', () => {
      let result: Discrepancy | undefined = noConsoleLogs({
        fileName: 'a.js',
        content: 'hello world',
        path: 'b/a.js'
      })
      expect(result).to.equal(undefined)
    })
    it('Should return a discrepancy if the file has console logs', () => {
      let result: Discrepancy | undefined = noConsoleLogs({
        fileName: 'a.js',
        content: `hello world
        console.log("hello")
        bye
        `,
        path: 'b/a.js'
      })
      expect(result).to.not.equal(undefined)
      expect(result?.message).to.satisfy(message => message.includes('There should be no console logs in the code'))
    })
  })

  describe('dollarSignForStrConcat', () => {
    it('Should not return a discrepancy if the file does not have any " + " string concacatenations ', () => {
      let result: Discrepancy | undefined = dollarSignForStrConcat({
        fileName: 'a.js',
        content: '(Your name is `${name}`)',
        path: 'b/a.js'
      })
      expect(result).to.equal(undefined)
    })
    it('Should return a discrepancy if the file has any " + " string concatenations', () => {
      let result: Discrepancy | undefined = dollarSignForStrConcat({
        fileName: 'a.js',
        content: ' "hello" + "world" ',
        path: 'b/a.js'
      })
      expect(result).to.not.equal(undefined)
      expect(result?.message).to.satisfy(message => message.includes('All string concatenations should be in the format `${}`'))
    })
    it('Should return a discrepancy if the file has any \' + \' string concatenations', () => {
      let result: Discrepancy | undefined = dollarSignForStrConcat({
        fileName: 'a.js',
        content: ' "hello\' + \'world" ',
        path: 'b/a.js'
      })
      expect(result).to.not.equal(undefined)
      expect(result?.message).to.satisfy(message => message.includes('All string concatenations should be in the format `${}`'))
    })

  })

  describe('awaitKeywordForAsync', () => {
    it('Should not return a discrepancy if the file does not contain any occurences of .then', () => {
      let result: Discrepancy | undefined = awaitKeywordForAsync({
        fileName: 'a.js',
        content: 'hello world',
        path: 'b/a.js'
      })
      expect(result).to.equal(undefined)
    })
    it('Should return a discrepancy if the file has any occurences of .then', () => {
      let result: Discrepancy | undefined = awaitKeywordForAsync({
        fileName: 'a.js',
        content: 'score.then(value => {})',
        path: 'b/a.js'
      })
      expect(result).to.not.equal(undefined)
      expect(result?.message).to.satisfy(message => message.includes('All asynchronous processing should use the await keyword'))
    })
  })
 
})
