console.log("🚀 ~ file: login.js:3 ~ globals:", globals)
// const renderDeploymentURl  ="https://slidoapp.onrender.com";
const loginDeployedUrl = `${globals.DEPLOYED_URL}/user/login`
// let localurl = "http://localhost:8080/user/login"



let form = document.querySelector('form')
form.addEventListener('submit', myfun)
function myfun(event) {
    event.preventDefault()
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value

    if (!email || !password) {
        alert("Please enter your email and password")
    } else {

        const payload = { email, password }
        // console.log("🚀 ~ file: login.js:15 ~ myfun ~ payload:", payload)

        fetch(loginDeployedUrl, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(payload)

        }).then((res) => {
            return res.json()
        })
            .then((res) => {
                console.log(res)
                if (res.token) {
                    localStorage.setItem("userObject", JSON.stringify(res))
                    localStorage.setItem("jwtToken", JSON.stringify(res.token))
                    setTimeout(() => {
                        swal("Yeah!", "User has been logged in!", "success");
                    }, 200);
                    setTimeout(() => {
                        window.location.href = "./eventPage.html";
                    }, 1000);
                }
                else {
                    setTimeout(() => {
                        swal("oops!", "Incorrect username or password!", "error");
                    }, 200);
                }
            })
            .catch((err) => {
                console.log(err.message);
            })


    }

}

// for website intro +++++++++++++
document.addEventListener("DOMContentLoaded", function () {
    var intro = introJs();
    intro.setOptions({
        steps: [
            {
                title: 'login',
                intro: 'Login for Audience Interaction',
                element: '#email',
                position: 'bottom',
                exitOnOverlayClick: true,
            },

            // Add more steps as needed
        ],
        tooltipClass: 'glassy-tooltip',
        highlightClass: 'glassy-highlight'
    });

    intro.start();
});

