describe("Ruter App", function(){

    describe("urlBuilder - function to create url", function(){
        it("throws an error when passed an NaN", function () {
            var testFn = function () {
                Sub.convert("b", "dollar", "cm");
            };
            expect(testFn).toThrow(new Error("numberToConvert is NaN"));
        });
        it("throws an error when passed an unknown from-unit", function () {
            var testFn = function () {
                Sub.convert(1, "dollar", "cm");
            };
            expect(testFn).toThrow(new Error("unrecognized from-unit"));
        });
        it("throws an error when passed an unknown to-unit", function () {
            var testFn = function () {
                Sub.convert(1, "cm", "furlongs");
            };
            expect(testFn).toThrow(new Error("unrecognized to-unit"));
        });
        it("throws an error when passed an unknown to-unit and from-unit", function () {
            var testFn = function () {
                Sub.convert(1, "bajs", "furlongs");
            };
            expect(testFn).toThrow(new Error("unrecognized to- AND from-unit"));
        });

        it("converts litres to cups", function () {
            expect(Sub.convert(14, "litres", "cups")).toEqual(59.18);
        });
    });
});