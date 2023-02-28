export default function endWithQuoi(tweet)
{
    var newStr = tweet.split("?").join("").split("!").join("").split(".").join("").split(" ").join("");
    var index = newStr.length-1;

    return newStr.endsWith("quoi");
}