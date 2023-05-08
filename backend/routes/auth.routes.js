const express = require('express');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const authRoute = express.Router();
require("dotenv").config();


authRoute.get("/github", async (req, res) => {
    console.log("API HIT");
    const code = req.query.code;
    const accessToken = await fetch(`https://github.com/login/oauth/access_token`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "content-type": "application/json"
        },
        body: JSON.stringify({
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code: code
        })
    }).then((res) => res.json())

    const user = await fetch(`https://api.github.com/user`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken.access_token}`
        }
    })
        .then((res) => res.json())
        .then((user) => {
            console.log("testted");
            console.log(accessToken)
            console.log(user)
           
            // res.send("Authentication successfull");
           
        });
    // console.log('check');
   
    //  res.sendFile(__dirname + "index.html")
    //window.location.assign('eventPage.html')
    // if(res.ok){
    //     window.location.href = "./index.html";
    // }else {
    //     window.location.href = "./login.html";
    // }


})

module.exports = {
    authRoute
}