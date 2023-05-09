var jwt = require('jsonwebtoken');
const { UserModel } = require('../models/user.model');
const { BlacklistModel } = require('../models/blacklist.model');
const { redisClient } = require('../configs/redis');

require('dotenv').config();

const authMiddleware = async(req, res, next) => {
    console.log("🚀 ~ file: authMiddleware.middleware.js:9 ~ authMiddleware ~ req:", req.body)
    const token = await redisClient.get("jwttoken") // we have saved token on redis
    // const token = req.headers.authorization;
    console.log("🚀 ~ file: au   thentication.js:8 ~ authMiddleware ~ token:", token)
    try {
        // checking if the token is present in blacklist or not
        const blackToken = await BlacklistModel.find({token:token});
        // console.log("🚀 ~ file: authentication.js:12 ~ authMiddleware ~ blackToken:", blackToken)
        if (blackToken.length>=1) {
            res.status(401).send({ msg: "User blacklisted  login again" })
        }
        else {
            // decode the token 
            var decoded = jwt.verify(token, process.env.TOKEN_SECRET);
            // console.log("🚀 ~ file: authentication.js:18 ~ authMiddleware ~ decoded:", decoded)
            if (decoded) {
                req.body.userId = decoded.userId;
                const user = await UserModel.findOne({_id:decoded.userId})
                // console.log("🚀 ~ file: authentication.js:23 ~ authMiddleware ~ user:", user)
                req.role = user.role;
                next();
            }
            else{
                res.status(401).send({msg:"authorization error"})
            }
        }

    } catch (error) {
        console.log("🚀 ~ file: authMiddleware.middleware.js:34 ~ authMiddleware ~ error:", error)
        res.send(error.message);
    }
}

module.exports = {
    authMiddleware
}