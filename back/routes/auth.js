const jwt = require('jsonwebtoken')

async function vertifyToken (req,res,next) {
    try {
        let token = req.headers['authorization'].split(" ")[1];
        jwt.verify(token,'secret');
        next();
    } catch(err){
        res.status(401).json({"msg":"Couldnt Authenticate"});
    }
}

module.exports = vertifyToken
