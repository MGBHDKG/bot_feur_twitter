import {TwitterApi} from 'twitter-api-v2';
import endWithQuoi from "./endWithQuoi.js";
import data from './tweetFeured.json' assert { type: "json" };
import { saveJSON } from './saveJSON.js';
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

    isAlreadyFeured(text)
    {
        for(let i=0; i<data.length; i++)
        {
            if(data[i].text === text)
            {
                console.log("Le bot a déjà répondu à ce tweet: " + text);
                return true;
            }
        }

        return false;
    }

    async replyQuoi()
    {
        const replies = await this.rwClient.get("https://api.twitter.com/2/users/"+this.BOT_ID+"/tweets");

        const tweets = await this.rwClient.search('quoi', {"since_id": replies.data[0].id, "tweet.fields" : "created_at", "max_results": 15});

        let randomNum = Math.floor(Math.random() * 2) + 1;

        const mediaID = await this.rwClient.v1.uploadMedia(`./assets/feur-${randomNum}.mp4`);

        for await (const tweet of tweets)
        {
            if(endWithQuoi(tweet.text))
            {
                if(this.isAlreadyFeured(tweet.text) == false)
                {
                    console.log("Le tweet auquel j'ai répondu est: " + tweet.text);
                    console.log("Posté à :" + tweet.created_at);

                    data.push({"id": data.length + 1, "tweet": tweet.text});

                    saveJSON(data);

                    await this.rwClient.v1.reply('feur',tweet.id,{ media_ids: mediaID });
                    return;
                }
            }
        }  

        console.log("Je n'ai trouvé aucun tweet...");
    }
}

export default twitter;