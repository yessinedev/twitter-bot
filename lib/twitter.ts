import { TwitterApi } from "twitter-api-v2";

console.log(process.env.TWITTER_API_KEY);
console.log(process.env.TWITTER_API_KEY_SECRET);
console.log(process.env.TWITTER_ACCESS_TOKEN);
console.log(process.env.TWITTER_ACCESS_TOKEN_SECRET);

const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY!,
  appSecret: process.env.TWITTER_API_KEY_SECRET!,
  accessToken: process.env.TWITTER_ACCESS_TOKEN!,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET!,
});

const twitterClient = client.readWrite;

export default twitterClient;
