//utility function
var randomElement = function(array){
  var randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}; 

var pickRandomPrompt = function (prompts) {
    var result;
    var count = 0;
    for (var prop in prompts)
        if (Math.random() < 1/++count)
           result = prop;
    return result;
};

