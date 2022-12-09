/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// Test / driver code (temporary). Eventually will get this from the server.
$(document).ready(function() {
  
  // Fake data taken from initial-tweets.json
  // const data = [
  //   {
  //     "user": {
  //       "name": "Newton",
  //       "avatars": "https://i.imgur.com/73hZDYK.png"
  //       ,
  //       "handle": "@SirIsaac"
  //     },
  //     "content": {
  //       "text": "If I have seen further it is by standing on the shoulders of giants"
  //     },
  //     "created_at": 1461116232227
  //   },
  //   {
  //     "user": {
  //       "name": "Descartes",
  //       "avatars": "https://i.imgur.com/nlhLi3I.png",
  //       "handle": "@rd" },
  //     "content": {
  //       "text": "Je pense , donc je suis"
  //     },
  //     "created_at": 1461113959088
  //   }
  // ]
  
  // const tweetData = {
  //   "user": {
  //     "name": "Newton",
  //     "avatars": "https://i.imgur.com/73hZDYK.png",
  //       "handle": "@SirIsaac"
  //     },
  //   "content": {
  //       "text": "If I have seen further it is by standing on the shoulders of giants"
  //     },
  //   "created_at": 1461116232227
  // }
  
  // const $tweet = createTweetElement(tweetData);
  
  // // Test / driver code (temporary)
  // console.log($tweet); // to see what it looks like
  // $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
  // console.log($('#tweets-container'));
  
  const renderTweets = function(tweets) {
    // let result = [];

    // loops through tweets
    for (let i in tweets.reverse()) {
      // calls createTweetElement for each tweet
      // result.push(createTweetElement(i));
      $('#tweets-container').append(createTweetElement(tweets[i]));
    }
    
    
    // takes return value and appends it to the tweets container
  };
  
  const createTweetElement = function (data){
    const element = `
    <article class="tweet">
    <header>
    
    <div class="text-left">${data.user.name}<span class="text-right">${data.user.handle}</span>
    </div>
    
    <div class="text-left">${data.content.text}</div>
    </header>
    
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
    // $.getJSON("/tweets", function(json) {
    //   console.log("hello from json");
    //   $.ajax('json', {method : 'GET'})
    // })
  }

  loadTweets();

  $("#post-tweets").submit(function (event) {
    // alert("handle for a .submit() called");
    event.preventDefault();
    let serialization = $(this).serialize();

    $.post("/tweets", serialization).done((data) => {
      $('#tweets-container').empty();
      loadTweets();
    })
  });

  // renderTweets(data);
  
})

