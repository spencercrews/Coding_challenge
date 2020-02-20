
var getJson = require("./lib/get-json")
var parser = require("./lib/parser");


var StrangerThingsParser = async () =>{
    if(typeof process.env.JSON_URL !== "undefined"){
        try {
            let json = await getJson.getJSONFromUrl(process.env.JSON_URL)
            return await parser.formatJson(json);
        } catch (error) {
            console.error(["Error"],error);   
        }
    }
}
StrangerThingsParser().then((parsedJson)=>{
    console.log(JSON.stringify(parsedJson, null, 2));

}).catch((error)=>{
    console.error(["Error"],error);   
});

module.exports = StrangerThingsParser;


// {

    // <showId>: {
    
    // totalDurationSec: ... // Total duration of the show, across all episodes (seconds)
    
    // averageEpisodesPerSeason: ... // Average episodes per season, float with max one decimal (e.g. 5.3)
    
    // episodes: {
    
    // <episodeId>: {
    
    // sequenceNumber: s<X>e<Y> // Episode and season number, e.g. "s1e1"
    
    // shortTitle: ... // Title without "Chapter XXX:" prefix
    
    // airTimestamp: ... // Air timestamp in epoch time (seconds)
    
    // shortSummary: ... // First sentence of the summary, without HTML tags
    
    // },
    
    // ...
    
    // }
    
    // }
    
    // }