'use strict'

import { Discrepancy } from '../src/types'
import { runTest, TestResults } from '../index'
import { DefaultEnforcementOptions, EnforcementOptions } from '../src/presets'
import * as repoIntrospection from '../src/repositoryIntrospection'
import * as fsInspectionChecks from '../src/checks'

import * as sinon from 'sinon'
import { expect } from 'chai'

describe('Exported Test Runner tests', () => {
  describe('runTest', () => {
    context('When running the FS Processing Rules', () => {
      let getFileTreeStub: sinon.SinonStub
      let fileMustEndWithEmptyNewLineStub: sinon.SinonStub
      let filesMustStartWithLowerCaseCharStub: sinon.SinonStub
      let fileMustUseStrictIfECMAStub: sinon.SinonStub
      let functionKeywordForFunctionStub: sinon.SinonStub
      let allFunctionsShouldHaveAJsdocStub: sinon.SinonStub
      let noIstanbulIgnoresStub: sinon.SinonStub
      let noConsoleLogsStub: sinon.SinonStub

      beforeEach(() => {
        getFileTreeStub = sinon.stub(repoIntrospection, 'getFileTree').returns([
          {
            fileName: 'a.js',
            content: '',
            path: 'b/a.js'
          }
        ])

        fileMustEndWithEmptyNewLineStub = sinon.stub(fsInspectionChecks, 'fileMustEndWithEmptyNewLine')
        filesMustStartWithLowerCaseCharStub = sinon.stub(fsInspectionChecks, 'filesMustStartWithLowerCaseChar')
        fileMustUseStrictIfECMAStub = sinon.stub(fsInspectionChecks, 'fileMustUseStrictIfECMA')
        functionKeywordForFunctionStub = sinon.stub(fsInspectionChecks, 'functionKeywordForFunction')
        allFunctionsShouldHaveAJsdocStub = sinon.stub(fsInspectionChecks, 'allFunctionsShouldHaveAJsdoc')
        noIstanbulIgnoresStub = sinon.stub(fsInspectionChecks, 'noIstanbulIgnores')
        noConsoleLogsStub = sinon.stub(fsInspectionChecks, 'noConsoleLogs')
      })

      afterEach(() => {
        getFileTreeStub.restore()
        fileMustEndWithEmptyNewLineStub.restore()
        filesMustStartWithLowerCaseCharStub.restore()
        fileMustUseStrictIfECMAStub.restore()
        functionKeywordForFunctionStub.restore()
        allFunctionsShouldHaveAJsdocStub.restore()
        noIstanbulIgnoresStub.restore()
        noConsoleLogsStub.restore()
      })

      it('Should return test passed if none of the checks return a discrepancy', () => {
        const result: TestResults = runTest('src', DefaultEnforcementOptions)
        expect(result.hasPassed).to.equal(true)
        expect(result.failures.length).to.equal(0)
      })

      it('Should return failed when the tests fail', () => {
        const testDiscrepancy: Discrepancy = {
          fileName: 'test',
          path: 'a/b',
          message: 'test discrepancy'
        }

        fileMustEndWithEmptyNewLineStub.returns(testDiscrepancy)
        filesMustStartWithLowerCaseCharStub.returns(testDiscrepancy)
        fileMustUseStrictIfECMAStub.returns(testDiscrepancy)
        functionKeywordForFunctionStub.returns(testDiscrepancy)
        allFunctionsShouldHaveAJsdocStub.returns(testDiscrepancy)
        noIstanbulIgnoresStub.returns(testDiscrepancy)
        noConsoleLogsStub.returns(testDiscrepancy)

        const result: TestResults = runTest('src', DefaultEnforcementOptions)
        expect(result.hasPassed).to.equal(false)
        expect(result.failures.length).to.equal(7)
      })

      it('Should throw an exception if one of the internal checks throws an error', () => {
        const err = new Error('bang!')
        fileMustEndWithEmptyNewLineStub.throws(err)

        try {
          runTest('src', DefaultEnforcementOptions)
          expect.fail()
        } catch (error) {
          expect(error.message).to.equal('Internal error when running the test suite, Error: bang!')
        }
      })

      it('Should not run the checks if they are disabled', () => {
        const disabledOptions: EnforcementOptions = {
          allFilesStartWithLowerCase: false,
          functionKeywordForFunction: false,
          useStrictEverywhere: false,
          allFilesEndWithNewLine: false,
          noConsoleLogs: false,
          noIstanbulIgnores: false,
          numberOfParamFunctionJSDoc: false
        }

        const result: TestResults = runTest('src', disabledOptions)
        expect(result.hasPassed).to.equal(true)
        expect(result.failures.length).to.equal(0)
      })
    })
  })
})