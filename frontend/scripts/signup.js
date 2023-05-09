const renderDeploymentURl  ="https://slidoapp.onrender.com";
const registerationURl = `${renderDeploymentURl}/user/register`

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





