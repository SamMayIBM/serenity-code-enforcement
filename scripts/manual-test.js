const { exec } = require("child_process")
const utils = require('util')
const execute = utils.promisify(exec)

async function main () {
  try {
    await execute('rm -rf ../../faulty-repo/node_modules/serenity-code-enforcement')
  } catch (error) {
    console.error(`Error removing the old project ${error}`)
  }

  try {
    await execute('npm run build')
  } catch (error) {
    console.error(`Error compiling the project! ${error}`)
  }

  try {
    await execute('cp -r ../dist ../../faulty-repo/node_modules/serenity-code-enforcement')
  } catch (error) {
    console.error(`Error copying the project ${error}`)
  }
}

main()