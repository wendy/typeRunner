$(document).ready(function() {
  $txtInput = $('.txtInput');
  var arrayIndex = 0;

  
  var $words = $('.word');
  //making the htmlDiv and appending it
  // var htmlDiv = makePromptElement(each);
  // $('.currentDiv').append(htmlDiv);
  $($words[0]).addClass('redBg');

  
  //Input box 
  $txtInput.on('keypress',function(e) {
    var target = $($words[arrayIndex]);

    var correct = function() {
      $txtInput.val('');
      target.removeClass('redBg');
      arrayIndex += 1;
      $($words[arrayIndex]).addClass('redBg');
    };

    var message = $txtInput.val();
    if (e.keyCode == 32) {
      e.preventDefault();
      if (message === target.text() && !target.hasClass('new-line')) {
        correct();
      }
    } else if(e.keyCode == 13){
      e.preventDefault();
      if(message === target.text() && target.hasClass('new-line')) {
        correct();
      }
    }

  });
});
