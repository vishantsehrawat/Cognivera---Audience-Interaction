const logoName = document.getElementById("logo");
const logoName1 = document.getElementById("username1")
const logoName2 = document.getElementById("username2")
const logout = document.getElementById("logoutBtn")


let logoutUrlLocal = "http://localhost:8080/user/logout"
// get username from local storage
let username = JSON.parse(localStorage.getItem("userObject"))?.usernameforchat || "temp";
console.log("🚀 ~ file: eventPage.js:5 ~ username:", username)

logoName.innerHTML = username;
logoName1.innerHTML = username;
logoName2.innerHTML = username;


// logut button clicked 
logout.addEventListener("click",()=>{

    fetch(logoutUrlLocal, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
      })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error))

        localStorage.removeItem("userObject")

        setTimeout(() => {
            window.location.reload();
        }, 1000);

})


