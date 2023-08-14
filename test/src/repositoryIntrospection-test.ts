'use strict'

import { expect } from 'chai'
import { getFileTree } from '../../src/repositoryIntrospection'
import { FileInformation } from '../../src/types'

import * as sinon from 'sinon'
import fs from 'fs'

describe('Repository Introspection Tests', () => {
  describe('getFileTree', () => {
    /*
      We gotta do some fancy mocking here to make this work as intended for the test.
      Essentially, we're wanting to replicate the below file system and then check that
      the code is able to read it in in the correct format:

      src/
        - node_modules/
        - test/
          - a.js
          - b.js
        c.js
        .ignore
    */


    let lstatSyncStub: sinon.SinonStub
    let readdirSyncStub: sinon.SinonStub
    let readFileSyncStub: sinon.SinonStub
    
    beforeEach(() => {

      readdirSyncStub = sinon.stub(fs, 'readdirSync')

      // @ts-ignore (We don't care about strict types when we're faking up a function)
      readdirSyncStub.onCall(0).returns(['node_modules', 'test', 'c.js', '.ignore'])

      // @ts-ignore (We don't care about strict types when we're faking up a function)
      readdirSyncStub.onCall(1).returns(['a.js', 'b.js']) 

      // @ts-ignore (We don't care about strict types when we're faking up a function)
      lstatSyncStub = sinon.stub(fs, 'lstatSync').callsFake((path: string) => {
        if (path === 'src' || path === 'src/test') {
          return {
            isDirectory: function () {
              return true
            }
          }
        } else {
          return {
            isDirectory: function () {
              return false
            }
          }
        }
      })

      // We don't really care about the content here
      readFileSyncStub = sinon.stub(fs, 'readFileSync').returns('')
    })

    afterEach(() => {
      lstatSyncStub.restore()
      readdirSyncStub.restore()
      readFileSyncStub.restore()
    })

    it('Should return the expect file system when called as a flattened array', () => {
      const files: FileInformation[] = getFileTree('src')
      expect(files.length).to.equal(3)
    })
  })
})