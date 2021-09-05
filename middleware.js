const jwt = require('jsonwebtoken');
const fetch = require('node-fetch');

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
                return next();

            }
            
            req.azAuth=decoded
            if (req.session){
                req.session.azAuth=decoded;
            }
            next();
    })
}


async function init(){
    
    publicKey=await (await fetch('http://auth.azjs.io/api/publicKey')).text();
}
module.exports.auth=auth;