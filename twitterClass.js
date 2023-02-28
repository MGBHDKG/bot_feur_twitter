import {TwitterApi} from 'twitter-api-v2';
import endWithQuoi from "./endWithQuoi.js";
import dotenv from 'dotenv';

dotenv.config();

class twitter
{
    constructor()
    {
        const client = new TwitterApi({
            appKey: process.env.APP_KEY,
            appSecret: process.env.APP_SECRET,
            accessToken: process.env.ACCESS_TOKEN,
            accessSecret: process.env.ACCESS_SECRET,
        });

        this.rwClient = client.readWrite;
    }

    async searchQuoiTweets()
    {
        const tweets = await this.rwClient.search('quoi');

        let randomNum = Math.floor(Math.random() * 2) + 1;

        const mediaID = await this.rwClient.v1.uploadMedia(`./assets/feur-${randomNum}.mp4`);

        for await (const tweet of tweets)
        {
            if(endWithQuoi(tweet.text))
            {
                console.log("Tweet de base :" + tweet.text + "\n");
                await this.rwClient.v1.reply('feur',tweet.id,{ media_ids: mediaID });
                break;
            }
        }
    }

    async replyFeur(tweetID,mediaID)
    {
        this.rwClient.v1.reply('feur',tweetID,{ media_ids: mediaID });
    }
}

export default twitter;