const express = require('express');
const app = express();
const http = require("http");
const socketio = require('socket.io');
const { connection } = require('./configs/dbConnection');
const { userRouter } = require('./routes/user.routes');
const { authMiddleware } = require('./middlewares/authMiddleware.middleware');
const { chatting } = require('./configs/chatting');
const cors = require('cors')




require("dotenv").config();


// ^ middlewares 
app.use(cors())
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
const io = socketio(serverHttp); // with wss we are attaching http server
chatting(io); // using the imported chatting function and passing io instance/ object 

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















