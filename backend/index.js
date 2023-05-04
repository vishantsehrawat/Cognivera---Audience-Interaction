const express = require('express');
const app = express();
const http = require("http");
const { Server } = require('socket.io');
const { connection } = require('./configs/dbConnection');
const { userRouter } = require('./routes/user.routes');
const { authMiddleware } = require('./middlewares/authMiddleware.middleware');
const socket = require("./configs/socket")



require("dotenv").config();


// ^ middlewares 
app.use(express.json())
app.use("/user", userRouter)
// after user have logged in , we will use the auth middleware 
//above userRouter only contains login register and logout
// app.use(authMiddleware);


//home route
app.get("/", async (req, res) => {
    try {
        res.send({ msg: "home route" })
        //  res.render("index.ejs")
    } catch (err) { console.log(err) }
})
// using http server because express server doesnt support socket.io
const serverHttp = http.createServer(app)
const io = new Server(serverHttp); // with wss we are attaching http server
socket(serverHttp) // calling the function present inside the socket.js file

serverHttp.listen(process.env.PORT, async () => {
    try {
        await connection;
        console.log("connected to db ")

    }
    catch (err) {
        console.log("error | connection", err)
    }
    console.log(`server started @ http://localhost:${process.env.PORT}`)
})


//socket.io connection  
const io = new Server(serverHttp); // with wss we are attaching http server

let count = 0

io.on("connection", (socket) => {
    console.log("socket.io connected")

    socket.emit("conn");
    
    count++
    io.emit("newuser", count)

    socket.on("message",(msg) => {
        socket.broadcast.emit("usermsg",msg)
    })

    socket.on("disconnect", () => {
        count--
        io.emit("newuser", count)
    })
});

