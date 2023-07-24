
window.addEventListener("load", (event) => {
    console.log("page is fully loaded");
    const signupBtn = document.getElementById("Signup");
    const loginBtn = document.getElementById("Login");
    const logoutBtn = document.getElementById("logout")
    const token = JSON.parse(localStorage.getItem("jwtToken"));
    const logoutUrlDeployed = `${globals.DEPLOYED_URL}/user/logout`

    // logout button js 
    logoutBtn.addEventListener("click", async () => {
        localStorage.removeItem("userObject")
        localStorage.removeItem("jwtToken")

        try {
            const response = await fetch(logoutUrlDeployed, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({})
            });
            if (response.ok) {
                setTimeout(() => {
                    swal("Great!", "Your have been successfully logged out!", "success");
                }, 100);
            }
            const data = await response.json();
            console.log("🚀 ~ file: eventPage.js:29 ~ .then ~ data:", data);
            console.log(data);
        } catch (error) {
            console.log(error);
        }


    })
    // show logout button when user is logged in
    setTimeout(() => {
        if (token) {
            signupBtn.style.display = "none"
            loginBtn.style.display = "none"
            logout.style.display = "block"
        }
    }, 1000);

});
function myFunction() {
    var expand = document.getElementById("expand");
    var hamburger = document.getElementById("hamburger")
    if (expand.style.display == "block") {
        expand.style.display = "none";
        hamburger.style.backgroundColor = "whitesmoke"
        hamburger.style.color = "black"
    } else {
        expand.style.display = "block";
        hamburger.style.backgroundColor = "black"
        hamburger.style.color = "white"
    }
}

window.addEventListener("resize", function (event) {
    if (document.body.clientWidth >= 801) {
        expand.style.display = "none"
        hamburger.style.backgroundColor = "whitesmoke"
        hamburger.style.color = "black"
    }
})

