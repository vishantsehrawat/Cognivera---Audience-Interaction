let homeLogo = document.querySelector(".logo")
// let signupBtn = document.getElementById("")
// let loginBtn = document.getElementById("")


// Uncomment This after linking with other pages:
// let UsernameLS = localStorage.getItem("username")

// Comment This after linking with other pages:
let UsernameLS = "abhimanyu"


let BasicBtn = document.getElementById("button-1");
let EngageBtn = document.getElementById("button-2");
let ProBtn = document.getElementById("button-3");
let EnterpriseBtn = document.getElementById("button-4");




// <-------------Event Listerners--------------->


homeLogo.addEventListener("click", () => {
    window.location.href = "../index.html"
})



BasicBtn.addEventListener("click", () => {

    if (UsernameLS) {
        notyf.error('Cannot buy this plan');
    } else {
        notyf.error('Please Login First');
    }

})

EngageBtn.addEventListener("click", () => {

    if (UsernameLS) {
        localStorage.setItem("plan", "Engage")
        window.location.href = "../src/checkout.html"
    } else {
        notyf.error('Please Login First');
    }

})

ProBtn.addEventListener("click", () => {
    if (UsernameLS) {
        localStorage.setItem("plan", "Professional")
        window.location.href = "../src/checkout.html"
    } else {
        notyf.error('Please Login First');
    }

})

EnterpriseBtn.addEventListener("click", () => {
    if (UsernameLS) {
        localStorage.setItem("plan", "Enterprise")
        window.location.href = "../src/checkout.html"
    } else {
        notyf.error('Please Login First');
    }

})