const logoName = document.getElementById("logo");
const logoName1 = document.getElementById("username1")
const logoName2 = document.getElementById("username2")
const logout = document.getElementById("logoutBtn")


let logoutUrlLocal = "http://localhost:8080/user/logout"
const renderDeploymentURl  ="https://slidoapp.onrender.com";
const logoutUrlDeployed = `${renderDeploymentURl}/user/logout`
// get username from local storage
let username = JSON.parse(localStorage.getItem("userObject"))?.usernameforchat || "temp";
// console.log("🚀 ~ file: eventPage.js:5 ~ username:", username)

logoName.innerHTML = username;
logoName1.innerHTML = username;
logoName2.innerHTML = username;


// logut button clicked 
logout.addEventListener("click", () => {

  fetch(logoutUrlDeployed, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  })
    .then(response => response.json())
    .then((data) => {
      console.log("🚀 ~ file: eventPage.js:29 ~ .then ~ data:", data)
      setTimeout(() => {
        swal("Great!", "Your have been successfully logged out!", "success");
      }, 100);

      console.log(data);
    })

    .catch((error) => {

      console.log(error)
    })

  localStorage.removeItem("userObject")

  setTimeout(() => {
    window.location.reload();
  }, 3000);

})


