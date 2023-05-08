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