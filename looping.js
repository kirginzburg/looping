///returns the amount of property values from object recursively
var takeAmountFromObject = function () {
    

    //check if obj is number
    function isNumer(obj) {
        return !isNaN(parseFloat(obj)) && isFinite(obj);
    }

    //check if obj is object
    //array is object too
    function isObject(obj) {
        return Object(obj) === obj;
    }

    //if dictionary.keys contains this value
    //we increment it
    //else we add new value
    function processDict(prop, dict) {
        if (dict[prop]) {
            dict[prop]++;
        } else {
            dict[prop] = 1;
        }
    }

    //if prop is not string - process it
    function processNumberDict(prop, numberDict) {
        if (typeof prop !== "string") {
            processDict(prop, numberDict);
        }
    }

    //if prop is string - process it
    function processStringDict(prop, stringDict) {
        if (typeof prop === "string") {
            processDict(prop, stringDict);
        }
    }

    //internal function witch is loop for itself
    function _fillDictionary(obj, numberDict, stringDict) {
        for (var prop in obj) {
            //for each property in obj
            var currentProperty = obj[prop];

            //if currentProperty is number
            if (isNumer(currentProperty)) {
                processNumberDict(currentProperty, numberDict);
                processStringDict(currentProperty, stringDict);
            }

            //if currentProperty is object
            if (isObject(currentProperty)) {
                // we call this function for it
                _fillDictionary(currentProperty, numberDict, stringDict);
            }
        }
    }

    var calcDict = function(dict) {
        var summary = 0;

        for (var key in dict) {
            //if property value repits more then 1 time we summarize it
            if (dict[key] > 1) {
                summary += key * dict[key];
            }
        }
        return summary;
    }

    return function (object) {
        //dictionary, where key is property value from object and value is the number of repetitions that key in object
        //numberDict - for numbers
        //stringDict - for strings
        //we need to add secondone becouse dict[1] === dict['1']
        var numberDict = {};
        var stringDict = {};
        _fillDictionary(object, numberDict, stringDict);
        var summary = 0;
        summary += calcDict(numberDict);
        summary += calcDict(stringDict);
        return summary;
    }
}();

///Tests
var assert = function (expected, actual) {
    var pass = expected === actual? "pass":"failure";

    console.log(pass + ";expected:" + expected + ";actual:" + actual);
}

var obj = { a: 1, b: 2 };
assert(0, takeAmountFromObject(obj));

obj = { a: null, b: null, c: undefined };
assert(0, takeAmountFromObject(obj));

obj = null;
assert(0, takeAmountFromObject(obj));

obj = [1, 2, 3, 4, 5, 1, 2, 3, 4];
assert(20, takeAmountFromObject(obj));

obj = {
    a: 1,
    b: 2,
    c: [1,'2','3', {
        d: 1,
        e: 2,
        g: 2,
        f: null
    }, null, '3']
}

assert(15, takeAmountFromObject(obj));