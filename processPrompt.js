/*** node modules ***/

// promise library
var q = require('q');

// file system promise library
var FS = require("q-io/fs");

/*** variables ***/
var promptsDirName = 'prompts';
var destFileName = 'prompts.js';

/*** helper functions ***/

// read a file and return bas64-encoded string
var readAFile = function (fileName) {
  return FS.read(promptsDirName + '/' + fileName, {charset: 'base64'});
};

// take a list of file names, call readAFile on each file. When all finished, save it into a file as windows.prompt
var readFiles = function (fileNames) {
  var fileContentPromises = [];
  fileNames.forEach(function (fileName) {
    fileContentPromises.push(readAFile(fileName));
  });

  return fileContentPromises;
};

// combine the file names and their contents into a string. i.e. "window.prompts = {prompt1: 'aldfjslhzn', prompt2: 'afknanzv'};"
var makePromptsObj = function (fileNames, fileContents) {
  fileContents = fileContents.map(function (fileContent, i) {
    return "  '" + fileNames[i] + "': " +  "'" + fileContent + "'";
  });

  return 'window.prompts = {\n' + fileContents.join(',\n') + '\n};';
};

/*** main function ***/

// list all of the file names in a directory
FS.list(promptsDirName)
  .then(function (fileNames) {
    var fileContentPromises = readFiles(fileNames);
    
    // when all of the files are read
    q.all(fileContentPromises)
      .then(function (fileContents) {
        // combine the contents into a string
        var promptsObj = makePromptsObj(fileNames, fileContents);

        // write to a file
        FS.write(destFileName, promptsObj);
      });
  });
