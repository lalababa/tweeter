/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// Test / driver code (temporary). Eventually will get this from the server.
$(document).ready(function() {
  
  
  const renderTweets = function(tweets) {

    // loops through tweets
    for (let i in tweets.reverse()) {
      // calls createTweetElement for each tweet
      
      $('#tweets-container').append(createTweetElement(tweets[i]));
    }
    
  };
  
  //new tweet format and element
  const createTweetElement = function (data){
    const element = `
    <article class="tweet">

    <header>
    <span><img src="${data.user.avatars}" height="35">    ${data.user.name}</span>
    <span style="iconRight" height="35">${data.user.handle}</span>
    
    
    </header>
    <div class="content">${data.content.text}</div>
    
    <hr>
    <footer>
    ${timeago.format(data.created_at)}<i class="iconRight fa-solid fa-pen icon"></i><b></b><i class="iconRight fa-regular fa-flag icon"></i><i class="fa-sharp fa-solid fa-thumbs-up iconRight icon"></i>
    </footer>
    
    </article>
    `;
    return element;
  };

  //grasp info after user tweets something
  const loadTweets = function() {
    $.ajax('http://localhost:8080/tweets', {method : 'GET'})
    .done((data) => {
      renderTweets(data);
    });
  }

  loadTweets();

  //steps after post tweet
  $("#post-tweets").submit(function (event) {
    
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
  
})

