let form = document.querySelector('form')
form.addEventListener('submit', myfun)
function myfun(event) {
    event.preventDefault()


    let email = document.getElementById("email").value
    let password = document.getElementById("password").value


    if (!email || !password) {
        alert("Please enter your email and password")
    } else {

        const payload = {email,password}


        fetch("http://localhost:8080/user/login", {
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

               
                setTimeout(() => {
                    window.location = "../index.html";
                    // window.location.assign('../index.html')
                }, 1000);

                // form.reset()
                // window.location.assign('index.html')







            })
            .catch((err) => {
                console.log(err.message)
            })


    }

}


