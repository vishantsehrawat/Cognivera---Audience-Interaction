window.onload = () => {
    const present = localStorage.getItem("userObject")
    const userLoggedIn = present ? true : false
    // console.log("🚀 ~ file: ifUserLoggedIn.js:4 ~ userLoggedIn:", userLoggedIn)

    if (!userLoggedIn) {
        setTimeout(() => {
            swal("Oops!", "Login First!", "error");
        }, 1000);
        setTimeout(() => {
            window.location.href = "login.html"
        }, 2000);
    }
}