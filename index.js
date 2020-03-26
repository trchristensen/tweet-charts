var Twit = require("twit");
require("dotenv").config();

function getTweets(opts) {

    const {screen_name, keywords} = opts;

    var T = new Twit({
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      access_token: process.env.TWITTER_ACCESS_TOKEN_KEY,
      access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
      timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
      strictSSL: true // optional - requires SSL certificates to be valid.
    });

    let tweets = [];

    const options = {
      screen_name,
      trim_user: true,
      count: 1000,
      exclude_replies: true,
      include_rts: false,
      keywords,
    };

    T.get("statuses/user_timeline", options, function(err, data) {

        

      options.keywords.forEach(keyword => {
        data.filter(tweet => {
          if (tweet.text.includes(keyword)) tweets += tweet.text;
        });
      });

      console.log(tweets);
    });
}


getTweets({
  screen_name: "PeterSchiff",
  keywords: ["Bitcoin", "bitcoin", "btc", "btc"]
});