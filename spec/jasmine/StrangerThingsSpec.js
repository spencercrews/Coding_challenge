var strangerThings = require("../../index");
var customMatchers = require("../helpers/CustomMatchers");
require('dotenv').config()
describe("Does Stranger Things Json", () => {
    let formattedResult;
    beforeAll(async ()=>{
        jasmine.addMatchers(customMatchers);
        formattedResult = await strangerThings();
    });
    it(" have showId", () => {
        expect(formattedResult).hasId();
    });
    describe("Show states", ()=>{
        let showStats;
        beforeAll(()=>{
            showStats = Object.values(formattedResult)[0];
        })
        it("have totalDurationSec", () => {
            expect(showStats).hasKey("totalDurationSec");
        });
        it("have averageEpisodesPerSeason", () => {
            expect(showStats).hasKey("averageEpisodesPerSeason");
        });
        it("have episodes", () => {
            expect(showStats).hasKey("episodes");
        });
        describe("Nested array of episodes", () =>{
            let nestedArray
            beforeAll(()=>{
                nestedArray = showStats.episodes
            });
            it("have episodeId", () =>{
                expect(nestedArray).objectInArrayHasId()
            });
            it("have sequenceNumber", () =>{
                expect(nestedArray).objectInArrayHasKey("sequenceNumber")
            });
            it("have shortTitle", () =>{
                expect(nestedArray).objectInArrayHasKey("shortTitle")
            });
            it("have airTimestamp", () =>{
                expect(nestedArray).objectInArrayHasKey("airTimestamp")
            });
            it("have shortSummary", () =>{
                expect(nestedArray).objectInArrayHasKey("shortSummary")
            });
        })
    })
    
});