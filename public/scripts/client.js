/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// Test / driver code (temporary). Eventually will get this from the server.
$(document).ready(function() {
  
  
  const renderTweets = function(tweets) {
    // let result = [];

    // loops through tweets
    for (let i in tweets.reverse()) {
      // calls createTweetElement for each tweet
      
      $('#tweets-container').append(createTweetElement(tweets[i]));
    }
    
    
    // takes return value and appends it to the tweets container
  };
  
  const createTweetElement = function (data){
    const element = `
    <article class="tweet">
    <header>
    
    <div class="toTheRight">${data.user.name}${data.user.handle}</div>
    
    </header>
    <div class="content">${data.content.text}</div>
    
    <hr>
    <footer>
    ${timeago.format(data.created_at)}<i class="iconRight fa-solid fa-pen icon"></i>
    </footer>
    
    </article>
    `;
    return element;
  };

  const loadTweets = function() {
    $.ajax('http://localhost:8080/tweets', {method : 'GET'})
    .done((data) => {
      renderTweets(data);
    });
  }

  loadTweets();

  $("#post-tweets").submit(function (event) {
    // alert("handle for a .submit() called");
    event.preventDefault();

    let serialization = $(this).serialize();
    
    //show errors where there is some problems
    if (serialization === "text=" || serialization.length < 6 || serialization.length > 147) {
      $(".tweeter-error").show().text("🚫no input or tweeter so long!🚫").css({color: 'red'});
      return false;
    };

    $.post("/tweets", serialization).done((data) => {

      //empty whole tweet container
      $('#tweets-container').empty();

      //hide error bar
      $(".tweeter-error").hide().text("");

      //set tweet box to empty
      $('#tweet-text').val("");

      //push tweets
      loadTweets();

      //set counter back to 140 after tweet
      $('.counter').text(140);
    })
    
  });

  // renderTweets(data);
  
})

