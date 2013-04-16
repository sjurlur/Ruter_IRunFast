describe("Ruter App", function(){

    describe("urlBuilder - function to create url", function(){
        it("creates a correct url when passed the right parameters", function () {
            var testUrl = "http://reis.trafikanten.no/reisrest/Travel/GetTravelsByPlaces/?time=160420131449&toplace=3012550&fromplace=3010360&changeMargin=2&changePunish=100&walkingFactor=1&isAfter=True&proposals=12&transporttypes=Train,Metro&callback=?";

            expect(Ruter.buildUrl("160420131449", "3012550", "3010360", "2", "100", "1", "True", "12", "Train,Metro")).toEqual(testUrl);
        });
    });
});