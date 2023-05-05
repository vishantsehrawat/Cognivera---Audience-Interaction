
const socket = io("http://localhost:8080/", { transports: ["websocket"] });

const newMessage = document.getElementById("newMessageRecieved")

var newchatterName = prompt("Enter your name:", "John");
// console.log("🚀 ~ file: chattingFe.js:6 ~ newchatterName:", newchatterName)

let username = newchatterName !== "" ? newchatterName : "tempChatUsername"

// For checking connection on frontend
socket.on("start", (message) => {
    console.log("connected to socket server");
})

// getting chat history 
socket.on("chatHistory", (chatHistoryGlobal) => {
    displayChatHistory(chatHistoryGlobal) // to display history messages 

})

//Count tag update
socket.on("newuser", (msg) => {
    const count_tag = document.getElementById("usercount")
    count_tag.innerText = msg

})

// ^ Handling Receiving Messages
socket.on("usermsg", (message) => {
    const messages = document.querySelector('#messages')


    let otherdiv = document.createElement("div")
    otherdiv.setAttribute("class", "otherdiv")

    let innerdiv = document.createElement("div")
    innerdiv.setAttribute("class", "innerdiv")

    let name = document.createElement("h4")
    name.innerText = message.name
    let msg = document.createElement("p")
    msg.innerText = message.message


    innerdiv.append(name, msg)
    otherdiv.append(innerdiv)
    messages.append(otherdiv)

    newMessage.innerText = "New message recieved"
    setTimeout(() => {

        newMessage.innerText = ""
    }, 10000);
    // Scroll to the bottom of the messages element
    messages.scrollTop = messages.scrollHeight + 500;

})

const displayChatHistory = async (chatHistoryGlobal) => {
    try {
        const messages = document.querySelector('#messages')

        messages.innerHTML = "";
        chatHistoryGlobal.forEach(message => {
            // let mydiv = document.createElement("div")
            // mydiv.setAttribute("class", "mydiv")
            let otherdiv = document.createElement("div")
            otherdiv.setAttribute("class", "otherdiv")

            let innerdiv = document.createElement("div")
            innerdiv.setAttribute("class", "innerdiv")

            let name = document.createElement("h4")
            name.innerText = message.name
            let msg = document.createElement("p")
            msg.innerText = message.message;

            innerdiv.append(name, msg)
            otherdiv.append(innerdiv)
            messages.append(otherdiv)

            newMessage.innerText = "Old messages retrieved"
            setTimeout(() => {

                newMessage.innerText = ""
            }, 10000);
            // Scroll to the bottom of the messages element
            messages.scrollTop = messages.scrollHeight + 500;


        });
    } catch (error) {
        console.error(error);
    }
};



//On Click function on send button to display own msg and emmit to others
const sendMessage = (event) => {
    const textBox = document.getElementById("input")
    const text = document.getElementById("input").value
    const message = { name: username, message: text }
    socket.emit("message", message)// emitting message on enter

    // ^ below code is to append message on sender side 
    const messages = document.querySelector('#messages')

    let mydiv = document.createElement("div")
    mydiv.setAttribute("class", "mydiv")

    let innerdiv = document.createElement("div")
    innerdiv.setAttribute("class", "innerdiv")

    let name = document.createElement("h4")
    name.innerText = username
    let msg = document.createElement("p")
    msg.innerText = text

    innerdiv.append(name, msg)
    mydiv.append(innerdiv)
    messages.append(mydiv)
    newMessage.innerText = "New message Sent"
    setTimeout(() => {
        newMessage.innerText = ""
    }, 10000);
    // Scroll to the bottom of the messages element
    messages.scrollTop = messages.scrollHeight + 500;


    // to clear input box 
    textBox.value = "";
}

