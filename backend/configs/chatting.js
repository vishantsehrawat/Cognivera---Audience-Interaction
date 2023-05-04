const { ChattingModel } = require("../models/chatting.model");

let count = 0 // to store user count
let chatHistoryGlobal = []

function chatting(io) {
    io.on("connection", (socket) => {
        getChatHistory();//calling chat history method on new connection 
        io.emit("chatHistory", chatHistoryGlobal)

        console.log("socket.io connected")
        socket.emit("start");

        count++
        io.emit("newuser", count)
        socket.on("message", (message) => {
            socket.broadcast.emit("usermsg", message)

            saveChatMessage(message); // calling to save to database
        })

        socket.on("disconnect", () => {
            count--
            io.emit("newuser", count)
        })
    });
}

//*saving chat to the collection
const saveChatMessage = async (message) => {
    const chatMessage = new ChattingModel({ name: message.name, message: message.message });
    await chatMessage.save();
};
// *getting all the old chats 
const getChatHistory = async () => {
    const chatHistory = await ChattingModel.find().sort({ createdAt: 1 });
    // console.log("🚀 ~ file: chatting.js:40 ~ getChatHistory ~ chatHistory:", chatHistory)
    chatHistoryGlobal = chatHistory;
};

module.exports = { chatting } // exporting the function to use inside the index file