'use strict'

import fs from 'fs'
import { FileInformation } from "./types"

/**
 * Introspects the file system of the owning repository, and produces a file tree
 * @param rootDirectory - The root directory on the File System to start scanning from
 * @param fileList - Used internally for recursive list of total files
 * @returns - An Array containing file information on all target files in the sub dirs
 */
export function getFileTree (rootDirectory: string, fileList: FileInformation[] = []): FileInformation[] {
  const subFiles: string[] = fs.readdirSync(rootDirectory)
  
  for (const file of subFiles) {
    const path: string = `${rootDirectory}/${file}`

    // Don't bother indexing hidden directories or files
    if (file.startsWith('.')) {
      continue
    }

    // And don't scan any node_modules found along the way either
    if (file === 'node_modules') {
      continue
    }

    if (fs.lstatSync(path).isDirectory()) {
      // If it's a directory, recurse into it
      fileList.push(...getFileTree(path))
    } else {
      // Otherwise, push the content
      const discoveredInformation: FileInformation = {
        path,
        fileName: file,
        content: fs.readFileSync(path, 'utf8') 
      }

      fileList.push(discoveredInformation)
    }
  }

  return fileList
}