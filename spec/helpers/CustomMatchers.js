var customMatcher = {
    hasKey: (util, customEqualityTesters) => {
        return {
            compare: (actualValue, expected) => {
                var result = {
                    pass: true,
                    message: ''
                }
                if(typeof actualValue === "undefined" || !actualValue){
                    result.pass = false;
                    result.message = "Undefined value";
                } else {
                    result.pass = Object.keys(actualValue).includes(expected);

                    if(!result.pass)
                        result.message = `Object does not contain expected key ${expected}`;
                }
                return result;
            }
        }
    },
    hasId: (util, customEqualityTesters) => {
        return {
            compare: (actualValue) =>{
                var result = {
                    pass: true,
                    message: ''
                }
                if(typeof actualValue === "undefined" || !actualValue){
                    result.pass = false;
                    result.message = "Undefined value";
                } else {
                    result.pass = !isNaN(parseInt(Object.keys(actualValue)[0]));

                    if(!result.pass)
                        result.message = `Object does not contain expected Int id`;
                }
                return result;
            }
        }
    },
    objectInArrayHasKey: (util, customEqualityTesters) =>{
        return {
            compare: (actualValue, expected) =>{
                var result = {
                    pass: true,
                    message: ''
                }
                if(typeof actualValue === "undefined" || !actualValue){
                    result.pass = false;
                    result.message = "Undefined value";
                } else {
                    actualValue.forEach(value => {
                        if(!Object.keys(Object.values(value)[0]).includes(expected)){
                            result.pass = false;
                        }
                    });
                    if(!result.pass)
                        result.message = `An object in array does not contain expected key ${expected}`;
                }

                return result;
            }
        }
    },
    objectInArrayHasId: (util, customEqualityTesters) =>{
        return {
            compare: (actualValue) =>{
                var result = {
                    pass: true,
                    message: ''
                }
                if(typeof actualValue === "undefined" || !actualValue){
                    result.pass = false;
                    result.message = "Undefined value";
                } else {
                    actualValue.forEach(value => {
                        // console.info(!isNaN(parseInt(Object.keys(value)[0])))
                        if(isNaN(parseInt(Object.keys(value)[0]))){
                            result.pass = false;
                        }
                    });
                    if(!result.pass)
                        result.message = `An object in array does not contain expected Int Id`;
                }

                return result;
            }
        }
    },
}

module.exports = customMatcher;