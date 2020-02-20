var request_p = require("request-promise");
var wrapper = {};

wrapper.getJSONFromUrl = (url) =>{
    return  new Promise((resolve, reject) =>{
    request_p(url).then((response) =>{
        if(response){
            resolve(response);
        } else {
            reject("No response");
        }
    }).catch((err) =>{
        console.error(["Error","getJSONFromUrl"], err);
    });
    }) 
 }

 module.exports = wrapper;