const logoName = document.getElementById("logo");
const logoName1 = document.getElementById("username1")
const logoName2 = document.getElementById("username2")
// get username from local storage
let username = JSON.parse(localStorage.getItem("userObject"))?.usernameforchat || "temp";
console.log("🚀 ~ file: eventPage.js:5 ~ username:", username)

logoName.innerHTML = username;
logoName1.innerHTML = username;
logoName2.innerHTML = username;