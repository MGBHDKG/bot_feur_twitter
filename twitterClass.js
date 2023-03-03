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
        this.BOT_ID = "1619634197563310080";
    }

    async replyQuoi()
    {
        const tweets = await this.rwClient.search('quoi');

        let randomNum = Math.floor(Math.random() * 2) + 1;

        const mediaID = await this.rwClient.v1.uploadMedia(`./assets/feur-${randomNum}.mp4`);

        for await (const tweet of tweets)
        {
            if(endWithQuoi(tweet.text))
            {
                const replies = await this.rwClient.get("https://api.twitter.com/2/users/"+this.BOT_ID+"/tweets");
                if(parseInt(replies.data[0].id) < parseInt(tweet.id))
                {
                    console.log(tweet);
                    await this.rwClient.v1.reply('feur',tweet.id,{ media_ids: mediaID });
                    break;
                }   
            }
        }  
    }
}

export default twitter;