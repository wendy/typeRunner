$(document).ready(function() {
  $inputBox = $('.inputBox');
  var $words = $('.word');
  var arrayIndex = 0;
  var beginTime = null;
  var seconds = 0;
  var minutes = 0;
  

  //making the htmlDiv and appending it
  // var htmlDiv = makePromptElement(each);
  // $('.currentDiv').append(htmlDiv);
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
