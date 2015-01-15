$(document).ready(function() {
  $txtInput = $('.txtInput');
  var index = 0;
  var array = $('.currentDiv').text().split(' ');
  var enterSign = array.shift();
  console.log(array);
  
  for(var i = 0; i < array.length; i++) {
    var lastChar = array[i].length - 1;
    if(array[i] === "") {
      array.splice(i, 1);
      i -= 1;
    } else if (array[i][lastChar] === enterSign) {
      array[i] = array[i].slice(0, lastChar);
    }  
  };
  console.log(array);

  $txtInput.on('keypress',function(e) {
    var target = array[index];
    var $target = $('.currentDiv');

    var message = $txtInput.val();
    if(e.keyCode == 32){
      e.preventDefault()
      if(message === target && target[0] !== '{' && target[0] !== '}' && target[-1] !== ';') {
        $txtInput.val('');
        index += 1;
      }
    } else if(e.keyCode == 13){
      e.preventDefault()
      if(message === target && (target[0] === '{' || target[0] === '}' || target[-1] === ';')) {
        $txtInput.val('');
        index += 1;
      }
    }

  });
});