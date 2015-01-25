$(document).ready(function() {
  $inputBox = $('.inputBox');
  var arrayIndex = 0;
  var beginTime = null;
  var seconds = 0;
  var minutes = 0;
  
  // surround each word in a span with `word` class. Add a `new-line` class for last word in a line
  var processPrompt = function(data) {
    var newStr = '';
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
    return newStr;
  };

  // pick a random prompt and show the prompt title
  var promptName = pickRandomPrompt(window.prompts);
  $('#promptTitle').text(promptName);

  // decode the content of the prompt into a readable string. Put the string into the pre element
  var promptContent = window.atob(window.prompts[promptName]);
  $('#prompt').html(processPrompt(promptContent));

  var $words = $('.word');
  $($words[0]).addClass('redBg');

  //timer
  var setTimer = function() {
    start = window.setInterval(function() {
      seconds += 1;
      if (seconds === 60) {
        minutes += 1;
        seconds = 0;
      }
      $('.timer').text(setString(minutes) + ":" + setString(seconds));
    }, 1000);
  };

  var setString = function(time) {
      if (time < 10) {
        return "0" + time;
      } else {
        return time.toString();
      }
  };

  //Input box 
  $inputBox.on('keypress',function(e) {
    var message = $inputBox.val();
    var target = $($words[arrayIndex]);
    var wordsLength = $words.length;


    var correct = function() {
      $inputBox.val('');
      target.removeClass('redBg');
      arrayIndex += 1;
      $($words[arrayIndex]).addClass('redBg');
    };

    if (!beginTime) {
      beginTime = Date.now();
      setTimer();
    }

    if (e.keyCode == 32) {
      e.preventDefault();
      if (message === target.text() && !target.hasClass('new-line')) {
        correct();
      }
    } else if(e.keyCode == 13){
      e.preventDefault();
      if(message === target.text() && target.hasClass('new-line')) {
        correct();
        if (arrayIndex === wordsLength) {
          clearInterval(start);
          $('.duration').text("Time took " + (Date.now() - beginTime)/1000 + "seconds");
        }
      }
    }
  });
});
