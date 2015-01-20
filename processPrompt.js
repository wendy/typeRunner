var fs = require('fs');
var fileName = 'lib/each.js';

var isWord = function (word) {
    return word[0] !== ' ';
};

// var wrapWord = function (word) {
//     if (word[word.length-1] === '\n') {
//         return '<span class="word">' + word.slice(0, word.length-1) + '</span>\n';
//     }

//     return '<span class="word">' + word + '</span>';
// };

fs.readFile(fileName, 'utf8', function (error, data) {
    var newStr = 'var prompt = \'';
    var word = '';
    var wordRegex = /\S/;
    for (var i = 0; i < data.length; i++) {
        if (wordRegex.test(data[i])) {
            if (data[i] === "'") {
                word += '\\';
            }
            word += data[i];
        } else {
            if (word === '') {
                newStr += data[i];
            } else {
                if (data[i] === '\n') {
                    newStr += '<span class="word new-line">' + word + '</span>' + data[i];
                } else {
                    newStr += '<span class="word">' + word + '</span>' + data[i];
                }
                word = '';
            }
        }
    }

    fs.writeFile('prompt1-processed.js', newStr + '\';');
});
