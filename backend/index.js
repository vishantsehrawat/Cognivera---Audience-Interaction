const express = require('express');
const app = express();
const http = require("http");
const socketio = require('socket.io');
const { connection } = require('./configs/dbConnection');
const { userRouter } = require('./routes/user.routes');
const { authMiddleware } = require('./middlewares/authMiddleware.middleware');
const { chatting } = require('./configs/chatting');
const {authRoute} = require("./routes/auth.routes")
const {RatingRouter} =  require("./routes/rating.routes")
const cors = require('cors');
const { createQuestionRouter } = require('./routes/createQuestion.routes');
const { wordPollRouter } = require('./routes/wordPoll.routes');
const { cogniRouter } = require('./routes/cogni.routes');
const { quizRouter } = require('./routes/quiz.routes');




require("dotenv").config();


// ^ middlewares 
app.use(cors())
app.use(express.json())
app.use(express.static('public')) 
// app.use(authMiddleware)

app.use(express.urlencoded({ extended: true }));
app.use("/user", userRouter)
app.use("/auth", authRoute)
app.use("/question",createQuestionRouter); // for the quiz questions
app.use("/rating",RatingRouter)
app.use("/wordpoll",wordPollRouter)
app.use("/cogni",cogniRouter)
app.use("/quiz",quizRouter)

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















