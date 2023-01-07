$(document).ready(function() {
  
  //after input some things into textbox
  $("#tweet-text").on("input", function ()  {
    const tweetText = $("#tweet-text").val();
    
    //count the remaining texts left
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
