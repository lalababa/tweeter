$(document).ready(function() {
  // --- our code goes here ---
  console.log("The counter file is ready");
  
  $("#tweet-text").on("keyup", function ()  {
    let tweetText = $("#tweet-text").val();
    
    let remain = 140 - tweetText.length
    
    //connect js and html
    $(".counter").text(remain);

    if (remain < 0) {
      $('.counter').css({color: 'red'});
    } else {
      $('.counter').css({color: 'black'});
    }

  });
});
