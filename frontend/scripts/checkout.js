
const baseServerURL = "http://localhost:8080"

// const baseServerURL = ""

//Local storage
let userAuthToken = localStorage.getItem("localAccessToken") || null;
let lsData = localStorage.getItem("email")

let homeLogo = document.querySelector(".logo")


// Uncomment This after linking with other pages:
// let UsernameLS = localStorage.getItem("username")

// Comment This after linking with other pages:
let UsernameLS = "abhimanyu"



let cardIn = document.getElementById("cardIn");
let cardNameIn = document.getElementById("nameIn");
let cardDateIn = document.getElementById("expiryIn");
let cvvIn = document.getElementById("cvvIn");

let OrderBtn = document.querySelector(".buy-button")

let engageEl = document.getElementById("engage");
let proEl = document.getElementById("pro");
let enterpriseEl = document.getElementById("enterprise");

let plan_checkout = localStorage.getItem("plan")

let plan_display = document.querySelector("#title > span")

let validity_display = document.getElementById("validity-date")



// Date object
const date = new Date();

let currentDay= String(date.getDate()).padStart(2, '0');
let currentMonth = String(date.getMonth()+1).padStart(2,"0");
let currentYear = date.getFullYear();

// we will display the date as DD-MM-YYYY 
let currentDate = `${currentDay}-${currentMonth}-${currentYear}`;
let yearlaterDate = `${currentDay}-${currentMonth}-${currentYear+1}`;

  validity_display.innerText = `${currentDate} - ${yearlaterDate}`


// <-------------Event Listerners--------------->



homeLogo.addEventListener("click", () => {
    window.location.href = "/index.html"
})



if (plan_checkout == "Engage") {
    engageEl.style.display = "block"
} else if (plan_checkout == "Professional") {
    proEl.style.display = "block"
} else if (plan_checkout == "Enterprise") {
    enterpriseEl.style.display = "block"
}

plan_display.innerText = plan_checkout






//Place Order button addEventListener
OrderBtn.addEventListener("click", (e) => {

    e.preventDefault()

    if (validate()) {

        setTimeout(() => {
            backend()
        },1000)

        notyf.success('Your changes have been successfully saved!');

    }
    else {
        notyf.error('Please fill the form first');
    }
})






// <--------------Functions-------------------->



//Validating input fields are empty or not
function validate() {
    if (cardIn.value == "" || cardNameIn.value == "" || cardDateIn.value == "" || cvvIn.value == "") {
        return false;
    } else {
        return true;
    }
}




//Backend POST function
function backend() {

    let currPlan = localStorage.getItem("plan")

    let userObj = {
        plan: currPlan,
    }

    fetch(`${baseServerURL}/users/update/${lsData}`, {
        method: "PATCH",
        body: JSON.stringify(userObj),
        headers: {
            'Content-type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => {
            console.log(data.msg);
        })
        .catch(err => {
            console.log(err)
        })

}