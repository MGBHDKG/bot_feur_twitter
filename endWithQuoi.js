export default function endWithQuoi(tweet)
{
    var newStr = tweet.split("?").join("").split("!").join("").split(".").join("").split(" ").join("");

    return newStr.endsWith("quoi");
}