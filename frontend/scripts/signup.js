// const renderDeploymentURl  ="https://slidoapp.onrender.com";
console.log("🚀 ~ file: login.js:3 ~ globals:", globals)

const registerationURl = `${globals.DEPLOYED_URL}/user/register`

let loding_container = document.getElementById("loding_container");
let main_div = document.getElementById("container")

let form = document.querySelector('form')
form.addEventListener('submit', myfun)
function myfun(event) {

    event.preventDefault()

    let name = document.getElementById("name").value
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
    let cpassword = document.getElementById("cpassword").value

    if (!name || !email || !password || !cpassword) {
        alert("Please fill all fields")
    } else {

        let payload = { name, email, password }
        // console.log(payload)

        loding_container.style.display = "none";
        main_div.style.display = "none"

        if (password === cpassword) {

            fetch(registerationURl, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(payload)

            }).then((res) => { return res.json() })
                .then((data) => {

                    console.log(data)
                    loding_container.style.display = "block";
                    form.reset()

                    setTimeout(() => {
                        window.location.href = "./login.html";
                    }, 2000);


                })
                .catch((err) => {
                    console.log(err.message)
                })


        } else {
            alert("Password doesn't match")
        }

    }


}



// for website intro +++++++++++++
document.addEventListener("DOMContentLoaded", function () {
    var intro = introJs();
    intro.setOptions({
        steps: [
            {
                title: 'Signup',
                intro: 'Signup for Audience Interaciton',
                element: '#name',
                position: 'top',
                exitOnOverlayClick: true,
            },

            // Add more steps as needed
        ],
        tooltipClass: 'glassy-tooltip',
        highlightClass: 'glassy-highlight'
    });

    intro.start();
});


