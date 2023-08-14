'use strict'

import { expect } from 'chai'
import { Discrepancy } from '../../src/types'
import { filesMustStartWithLowerCaseChar, fileMustUseStrictIfECMA, fileMustEndWithEmptyNewLine } from '../../src/checks'

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
        fileName: 'a.ab',
        content: `
`,
        path: 'b/a.ab'
      })
      expect(result).to.equal(undefined)
    })

    it('Should return a discrepancy if the file does not end with a new line', () => {
      const result: Discrepancy | undefined = fileMustEndWithEmptyNewLine({
        fileName: 'a.ab',
        content: ``,
        path: 'b/a.ab'
      })
      expect(result).to.not.equal(undefined)
      expect(result?.message).to.satisfy(message => message.includes('All files must end with an empty line'))
    })
  })
})