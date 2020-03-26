var Twit = require("twit");
require("dotenv").config();

var T = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
  strictSSL: true // optional - requires SSL certificates to be valid.
}); 

const options = {
  screen_name: "PeterSchiff",
  trim_user: true,
  count: 1000,
  exclude_replies: true,
  include_rts: false
};

T.get("statuses/user_timeline", options, function(err, data) {

    const keywords = ['Bitcoin', 'bitcoin', 'btc', 'btc'];
  
    keywords.forEach(keyword => {
        data.filter(tweet => {
          if (tweet.text.includes(keyword)) console.log(tweet.text);
        });
    })

});