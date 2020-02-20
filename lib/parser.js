//tool used to get values from json by passing in the path
var jpath = require("jsonpath");
var calculateHelper = require("./helpers/calculator");
var parser = {};

parser.formatJson = (json) =>{
    try {
        json = typeof json === "string" ? JSON.parse(json) : json 
        if(typeof json === "object" && json){
            let runtimes = jpath.query(json, '$._embedded.episodes[*].runtime')
            let episodes = jpath.query(json, '$._embedded.episodes[*]');
            if(typeof runtimes !== "undefined" && runtimes && typeof episodes !== "undefined" && episodes){
                return {
                    [jpath.query(json, '$.id').join()] : {
                    totalDurationSec : calculateHelper.calculateRuntime(runtimes),
                    averageEpisodesPerSeason : calculateHelper.calculateAveragePerSeason(episodes),
                    episodes : [...parseEpisodeData(episodes)],
                }
            }
            } else {
                throw "Missing runtimes or episodes";
            }
        } else {
            throw `json parameter passed is not of type object. Parameter is of type ${typeof json}`;
        }
    } catch (error) {
        console.error(["Error", "formatJson"], error)
        throw error;       
    }
}

parseEpisodeData = (episodes)=>{
    try {
        if(typeof episodes !== "undefined"){
            return episodes.map((episode) =>{
                if(typeof episode !== "undefined" && episode){
                    return {
                        [episode.id] : {
                            sequenceNumber : `s${episode.season}e${episode.number}`,
                            shortTitle : typeof episode.name !== "undefined" && episode.name ? episode.name.slice(":")[1]: "undefined",
                            airTimestamp : typeof episode.airstamp !== "undefined" && episode.airstamp ? Date.parse(episode.airstamp) : "undefined",
                            shortSummary : typeof episode.summary !== "undefined" && episode.summary ? episode.summary.replace(/<[^>]+>/g, '') : "undefined",
                        }
                    };
                } else {
                    return {"error": "Missing episode data"};
                }
            });
        } else {
            throw "Missing episodes";
        }
    } catch (error) {
       console.error(["Error","parseEpisodeData"], error);
       throw error; 
    }
} 
module.exports = parser;