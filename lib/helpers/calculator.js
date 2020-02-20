var wrapper = {};

wrapper.calculateRuntime = (runtimes)=>{
    try {
        if(typeof runtimes !== "undefined" && runtimes){
            return runtimes.reduce((total,runtime) =>{
                if(typeof runtime !== "undefined"){
                    total+=runtime;
                }

                return total;
            })
        } else {
            return "Missing runtime";
        }
    } catch (error) {
        console.error(["Error","calculateRuntime"], error);
        throw error;
    }
}

wrapper.calculateAveragePerSeason = (episodes)=>{
    try {
        //count the number of seasons and the number of episodes
        let filteredSeasonObject = episodes.reduce((obj, episode) =>{
            if(typeof episode !== "undefined" && episode){
                if(typeof episode.season !== "undefined" && episode.season && 
                    !obj.seasons.includes(episode.season)){
                        obj.seasons.push(episode.season)
                }
                obj.totalNumberofEpisodes = (obj.totalNumberofEpisodes || 0) + 1;
                // total+=1;
            } 
            return obj;
        },{seasons: [], totalNumberofEpisodes: 0});

        return (filteredSeasonObject.totalNumberofEpisodes/filteredSeasonObject.seasons.length).toFixed(1)
        // let totalNumberofSeasons = episodes.reduce((obj,episode) =>{
        //     if(typeof episode !== "undefined" && episode && typeof episode.season !== "undefined" && episode.season){
        //         return obj[episode.season] 
        //     } 
        // },{});
        // return totalNumberofEpisodes

    } catch (error) {
        console.error(["Error","calculateAveragePerSeason"], error);
        throw error;
    }
}

module.exports = wrapper