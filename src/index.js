const twit = require('twit');
require('dotenv').config();

const T = new twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

function retweet(search) {
  T.get('search/tweets', { q: search, count: 1 }, (err, data) => {
    if (err) console.log(err);

    const tweet = data.statuses;
    const tweetId = tweet[0].id_str;

    T.post('statuses/retweet/:id', { id: tweetId }, (err, data) => {
      
      if (err) console.log(err);
      console.log(`Retweeted`);
    });
  });
}

setInterval(() => retweet('#portainerlive'), 10000);
