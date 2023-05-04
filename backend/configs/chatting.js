let count = 0 // to store user count



function chatting(io) {
    io.on("connection", (socket) => {
        console.log("socket.io connected")

        socket.emit("conn");

        count++
        io.emit("newuser", count)

        socket.on("message", (msg) => {
            socket.broadcast.emit("usermsg", msg)
        })

        socket.on("disconnect", () => {
            count--
            io.emit("newuser", count)
        })
    });
}


module.exports = {chatting} // exporting the function to use inside the index file