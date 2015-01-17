$(document).ready(function() {
  $txtInput = $('.txtInput');
  var arrayIndex = 0;
  var spanIndex = 0;

 var makePromptElement = function(array) {
    var newArray = [];
    var index = 1;
    for (var i = 0; i < array.length; i++) {
      newArray.push('<p class="p' + index + '"> ');
      var tempArray = array[i].split(' ');
      for (var j = 0; j < tempArray.length; j++) {
        if (j === tempArray.length - 1) {
          newArray.push(tempArray[j]);
        } else {
          newArray.push('<span>' + tempArray[j] + '</span>');
        }      
      }
      var lastLetter = array[i][array[i].length - 6]
      if (lastLetter === '{') { 
        index += 1;
      } else if (lastLetter === ';' || array[i][0] === '}') {
        if (array[i + 1] === undefined) {
        } else if (array[i + 1][0] === '}') {
          index -= 1;
        }
      }  
    }
    return $.parseHTML(newArray.join(' '));
  }

  //each definition
  var each = ["var each = function(collection, iterator) { </p>",
    "if (Array.isArray(collection)) { </p>",
      "for (var i = 0; i < collection.length; i++) { </p>",
        "iterator(collection[i], i, collection); </p>",
      "} </p>",
    "} else if (typeof collection === 'object') { </p>",
      "for (var key in collection) { </p>",
        "iterator(collection[key], key, collection); </p>",
      "} </p>",
    "} </p>",
  "}; </p>"];
  

  //making the htmlDiv and appending it
  var htmlDiv = makePromptElement(each);
  $('.currentDiv').append(htmlDiv);
  $($('span')[0]).addClass('redBg');
  var eachArray = each.join(' ').split(' ')
  
  //Input box 
  $txtInput.on('keypress',function(e) {
    var target = eachArray[arrayIndex];
    var nextTarget = eachArray[arrayIndex + 1];

    var correct = function(extra) {
      $txtInput.val('');
      $($('span')[spanIndex]).removeClass('redBg');
      arrayIndex += 1 + extra;
      spanIndex += 1;
      $($('span')[spanIndex]).addClass('redBg');
    };

    var message = $txtInput.val();
    if (e.keyCode == 32) {
      e.preventDefault()
      if (message === target && nextTarget !== "</p>") {
        correct(0);
      }
    } else if(e.keyCode == 13){
      e.preventDefault()
      if(nextTarget === "</p>" && message === target) {
        correct(1);
      }
    }

  });
});
