
const jwt = require('jsonwebtoken');
const fetch = require('node-fetch');



let authrizedCallbakcURL;
let publicKey;
init()
function auth(req, res, next){
    if (!req.query.prof) return next();

    jwt.verify(req.query.prof, publicKey, function(err, decoded) {
            if(err){
                console.log(err);
                return next();                
            }
            if(!decoded.data){
                console.log("no decoded data for JWT")
                return next();

            }
            
            if (!authrizedCallbakcURL){
                console.log("ERROR origin not defined please use setOrigin()")
                return next();

            }
            
            const myURL = new URL(decoded?.data?.azCallBackUrl);            

            
            if (authrizedCallbakcURL instanceof RegExp){                
                if (!authrizedCallbakcURL.test(myURL.host)){
                    console.log(`ERROR ${myURL.host} is not permited by origin ${authrizedCallbakcURL}`)
                    return next();
                }

            }else if (authrizedCallbakcURL != myURL.host){
                    console.log(`ERROR ${myURL.host} is not permited by origin ${authrizedCallbakcURL}`)
                    return next();
            }

            
            //const re = new RegExp(authrizedCallbakcURL);            
            

            req.azAuth=decoded
            if (req.session){
                req.session.azAuth=decoded;
            }
            next();
    })
}


async function init(){
    
    publicKey=await (await fetch('https://auth.azjs.io/api/publicKey')).text();
}

function setOrigin(origin){
    authrizedCallbakcURL=origin;
}
module.exports.auth=auth;
module.exports.setOrigin=setOrigin;