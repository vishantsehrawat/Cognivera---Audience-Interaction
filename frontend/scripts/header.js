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
