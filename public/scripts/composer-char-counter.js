$(document).ready(function() {
  // --- our code goes here ---
  console.log("The counter file is ready");
  
  $("#tweet-text").on("input", function ()  {
    const tweetText = $("#tweet-text").val();
    
    const remain = 140 - tweetText.length
    
    //text remain to the counter class in html
    $(".counter").text(remain);

    //determine counter color using judgement
    if (remain < 0) {
      $('.counter').css({color: 'red'});
    } else {
      $('.counter').css({color: 'black'});
    }

  });
});
