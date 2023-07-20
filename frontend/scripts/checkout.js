//Server URL
const baseServerURL = "http://localhost:8080"
// const renderDeploymentURl  ="https://slidoapp.onrender.com";

const checkoutDeployedUrl = `${globals.DEPLOYED_URL}/user/update`


//Local storage
let userLS = JSON.parse(localStorage.getItem("userObject")) || null


//Catching Elements:
let homeLogo = document.querySelector(".logo")

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





if (plan_checkout == "Engage") {
    engageEl.style.display = "block"
    plan_display.style.color = "darkgoldenrod"
} else if (plan_checkout == "Professional") {
    proEl.style.display = "block"
    plan_display.style.color = "green"
} else if (plan_checkout == "Enterprise") {
    enterpriseEl.style.display = "block"
    plan_display.style.color = "purple"
}

plan_display.innerText = plan_checkout






// Card Section

new Vue({
    el: "#app",
    data() {
      return {
        currentCardBackground: Math.floor(Math.random() * 25 + 1), // just for fun :D
        cardName: "",
        cardNumber: "",
        cardMonth: "",
        cardYear: "",
        cardCvv: "",
        minCardYear: new Date().getFullYear(),
        amexCardMask: "#### ###### #####",
        otherCardMask: "#### #### #### ####",
        cardNumberTemp: "",
        isCardFlipped: false,
        focusElementStyle: null,
        isInputFocused: false,
      };
    },
    mounted() {
      this.cardNumberTemp = this.otherCardMask;
      document.getElementById("cardNumber").focus();
    },
    computed: {
      getCardType() {
        let number = this.cardNumber;
        let re = new RegExp("^4");
        if (number.match(re) != null) return "visa";
  
        re = new RegExp("^(34|37)");
        if (number.match(re) != null) return "amex";
  
        re = new RegExp("^5[1-5]");
        if (number.match(re) != null) return "mastercard";
  
        re = new RegExp("^6011");
        if (number.match(re) != null) return "discover";
  
        re = new RegExp("^9792");
        if (number.match(re) != null) return "troy";
  
        return "visa"; // default type
      },
      generateCardNumberMask() {
        return this.getCardType === "amex"
          ? this.amexCardMask
          : this.otherCardMask;
      },
      minCardMonth() {
        if (this.cardYear === this.minCardYear) return new Date().getMonth() + 1;
        return 1;
      },
    },
    watch: {
      cardYear() {
        if (this.cardMonth < this.minCardMonth) {
          this.cardMonth = "";
        }
      },
    },
    methods: {
      flipCard(status) {
        this.isCardFlipped = status;
      },
      focusInput(e) {
        this.isInputFocused = true;
        let targetRef = e.target.dataset.ref;
        let target = this.$refs[targetRef];
        this.focusElementStyle = {
          width: `${target.offsetWidth}px`,
          height: `${target.offsetHeight}px`,
          transform: `translateX(${target.offsetLeft}px) translateY(${target.offsetTop}px)`,
        };
      },
      blurInput() {
        let vm = this;
        setTimeout(() => {
          if (!vm.isInputFocused) {
            vm.focusElementStyle = null;
          }
        }, 300);
        vm.isInputFocused = false;
      },
    },
  });





//Handling Submit Button

  const submitButton = document.querySelector("#submitBtn");

  const cardNumber = document.querySelector("#cardNumber");
  const cardName = document.querySelector("#cardName");
  const cardMonth = document.querySelector("#cardMonth");
  const cardYear = document.querySelector("#cardYear");
  const cardCvv = document.querySelector("#cardCvv");
  

  
// <-------------Event Listerners--------------->

//Place Order button addEventListener
submitButton.addEventListener("click", (e) => {

    e.preventDefault()

    console.log("test")

    if (validate()) {

        setTimeout(() => {
            backend()
        },1000)

        setTimeout(() => {
            window.location.href = "./eventPage.html"
        },3000)

        notyf.success('Your changes have been successfully saved!');

    }
    else {
        notyf.error('Please fill the form first');
    }
})


// <--------------Functions-------------------->


//Backend POST function
function backend() {

    let currPlan = localStorage.getItem("plan")

    let userObj = {
        plan: currPlan,
    }

    fetch(`${checkoutDeployedUrl}/${userLS.userId}`, {
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


function validate(){

    if(cardNumber.value == "" || cardName.value == "" || cardMonth.value == "" || cardYear.value == "" || cardCvv.value == ""){
        return false
    }else{
        return true
    }

}