# serenity-code-enforcement

This repository runs checks against the file system for another repository (loaded through a Unit Test) and then returns true/false with some failure reasons (if applicable) if the repository does not match the rules.

## Getting started

Firstly, follow the steps for the faulty-repo and then run `npm i` within this repository.

## Architecture

`index.js` - Runs the actual test against the current directory to ensure it conforms to the rules defined in the other files

`src/presets.js` - Contains the object that defines the mappings and different teams' preset options (this is because some teams might not want to use the same options that we do!)

`src/checks.js` - This is the file you should be working on the most, this is where you take the input file tree and you write the code that does each of the checks!

`src/repositoryIntrospection.js` - You shouldn't need this file all things being well, it houses the [voodoo-witchcraft](https://en.wikipedia.org/wiki/Recursion) function that generates the file tree for you to use.