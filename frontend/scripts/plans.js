//Local storage

// Uncomment this after linking with other pages:
// let userLS = JSON.parse(localStorage.getItem("userObject")) || null

//Comment this:
let userLS = true


//Catching Elements:
let homeLogo = document.querySelector(".logo")

let BasicBtn = document.getElementById("button-1");
let EngageBtn = document.getElementById("button-2");
let ProBtn = document.getElementById("button-3");
let EnterpriseBtn = document.getElementById("button-4");




// <-------------Event Listerners--------------->



BasicBtn.addEventListener("click", () => {

    if (userLS) {
        notyf.error('Cannot buy this plan');
    } else {
        notyf.error('Please Login First');
    }

})

EngageBtn.addEventListener("click", () => {

    if (userLS) {
        localStorage.setItem("plan", "Engage")
        window.location.href = "../src/checkout.html"
    } else {
        notyf.error('Please Login First');
    }

})

ProBtn.addEventListener("click", () => {
    if (userLS) {
        localStorage.setItem("plan", "Professional")
        window.location.href = "../src/checkout.html"
    } else {
        notyf.error('Please Login First');
    }

})

EnterpriseBtn.addEventListener("click", () => {
    if (userLS) {
        localStorage.setItem("plan", "Enterprise")
        window.location.href = "../src/checkout.html"
    } else {
        notyf.error('Please Login First');
    }

})


//Navbar:

const logoName = document.getElementById("logo");
// const logoName1 = document.getElementById("username1")
const logoName2 = document.getElementById("username2")
const logout = document.getElementById("logoutBtn")


let logoutUrlLocal = "http://localhost:8080/user/logout"
// get username from local storage
let username = JSON.parse(localStorage.getItem("userObject"))?.usernameforchat || "temp";
// console.log("🚀 ~ file: eventPage.js:5 ~ username:", username)

logoName.innerHTML = username;
// logoName1.innerHTML = username;
logoName2.innerHTML = username;


// logut button clicked 
logout.addEventListener("click",()=>{

    fetch(logoutUrlLocal, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
      })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error))

        localStorage.removeItem("userObject")

        setTimeout(() => {
            window.location.reload();
        }, 1000);

})


