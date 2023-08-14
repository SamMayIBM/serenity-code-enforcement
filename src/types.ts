'use strict'

export interface Discrepancy {
  fileName: string,
  path: string,
  lineNumber?: number,
  message: string
}

export interface FileInformation {
  path: string,
  fileName: string,
  content: string
}