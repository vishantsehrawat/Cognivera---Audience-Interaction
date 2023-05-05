let localurl = "http://localhost:8080/user/login"
let deployedurl = ""
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

        fetch(localurl, {
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
                localStorage.setItem("username",JSON.stringify(res.usernameforchat))
                setTimeout(() => {
                    // window.location = "./eventPage.html";
                }, 1000);
            })
            .catch((err) => {
                console.log(err.message)
            })


    }

}


