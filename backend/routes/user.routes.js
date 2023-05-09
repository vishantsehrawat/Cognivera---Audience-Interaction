const express = require("express");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/user.model");
const { redisClient } = require("../configs/redis");
const { BlacklistModel } = require("../models/blacklist.model");
const store = require('store');
const { authMiddleware } = require("../middlewares/authMiddleware.middleware");
// const cors =  require("cors")


require("dotenv").config();

userRouter = express();

userRouter.use(express.json());

//register route
userRouter.post("/register", async (req, res) => {
    const userData = req.body;
    // console.log(userData)
    try {
        let alreadyPresent = await UserModel.findOne({ name: userData.name });
        if (alreadyPresent) {
            res.status(400).send({ msg: "user is already present please use a different name" })
        }
        else {
            const hash = bcrypt.hashSync(userData.password, 4);
            userData.password = hash;
            const user = new UserModel(userData);
            await user.save();
            res.status(200).send({ msg: "new user addded" })
        }
    } catch (error) {
        console.log(error)
        res.status(400).send({ msg: "cannot add new user " })
    }
})

//login route 

userRouter.post("/login", async (req, res) => {
    const user = req.body;
    // console.log(user);
    try {
        const myUser = await UserModel.findOne({ email: user.email })
        console.log("🚀 ~ file: user.routes.js:34 ~ userRouter.post ~ myUser:", myUser)
        try {
            if (myUser) {
                bcrypt.compare(user.password, myUser.password, function (err, result) { // eslint-disable-line no-unused-vars
                    // temporarily using expire time *60 for usability. Ignore it if I forgot to remove the extra 60
                    var token = jwt.sign({ userId: myUser._id }, process.env.TOKEN_SECRET, { expiresIn: "7d" });
                    var refreshToken = jwt.sign({ userId: myUser._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "24d" });
                    //using redis for storing the tokens //working re
                    redisClient.set("jwttoken", token)
                    //using local storage npm package // ! not working
                    // store.set('username', { name:myUser?.name })
                    redisClient.set("refreshtoken", refreshToken)
                    res.status(200).send({ msg: "User logged in", token, refreshToken, usernameforchat: myUser.name ,userId:myUser._id})
                });
            }
            else{
                res.status(400).send({msg:"user not found "})
            }
        } catch (error) {
            console.log(error)
            res.status(400).send(error.message)
        }
    } catch (error) {
        console.log("🚀 ~ file: user.routes.js:54 ~ userRouter.post ~ error:", error)
        console.log(error)
    }
})



// logout 
userRouter.post("/logout",authMiddleware,async (req, res) => {
    const token = await redisClient.get("jwttoken")
    // console.log("🚀 ~ file: user.routes.js:66 ~ userRouter.post ~ token:", token)
    // token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ2aXNoYW50QGdtYWlsLmNvbSIsImlhdCI6MTY4MzAyMTkxMH0._0qh7J3lvLuhBDckqEyW5sRtLaOSdWa2rm0rELhc12E"

    try {
        const blacklist = new BlacklistModel({ token: token })
        await blacklist.save();
        res.status(200).send({ msg: "logged out " })
    } catch (error) {
        console.log(error)
        res.status(400).send({ msg: "cannot logout " })
    }
})

// route to get new token using refresh token 
// we will hit this route from the frontend 
userRouter.get("/newtoken",authMiddleware,(req, res) => {
    // console.log("new route hit ")
    const refreshToken = req.headers.authorization;
    // console.log("🚀 ~ file: user.routes.js:74 ~ userRouter.get ~ refreshToken:", refreshToken)

    try {
        var decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        if (decoded) {
            var token = jwt.sign({ userId: decoded.userId }, process.env.TOKEN_SECRET, { expiresIn: "7d" });
            redisClient.set("jwttoken", token)
            res.send({ msg: "New token generated ", token })
        }

    } catch (error) {
        console.log(error)
        res.send(error.message)
    }
})

// patch route 
userRouter.patch("/update/:id",authMiddleware, async (req, res) => {
    let {id} = req.params;
    console.log("🚀 ~ file: user.routes.js:114 ~ userRouter.patch ~ id:", id)
    let {plan} = req.body;
    console.log("🚀 ~ file: user.routes.js:115 ~ userRouter.patch ~ plan:", plan)
    try {
        const user = await UserModel.findByIdAndUpdate(id,{ plan:plan });

        if (!user) {
            return res.status(404).send({ msg: "User not found" });
        }

        res.status(200).send({ msg: "user details updated successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Internal server error" });
    }
});

module.exports = {
    userRouter
}
