
const logoName = document.getElementById("logo");
const logoName1 = document.getElementById("username1")
const logoName2 = document.getElementById("username2")
const logout = document.getElementById("logoutBtn")
const cogniSubmitForm = document.getElementById("createSlidoForm");

let logoutUrlLocal = "http://localhost:8080/user/logout"
// const renderDeploymentURl  ="https://slidoapp.onrender.com";
const logoutUrlDeployed = `${globals.DEPLOYED_URL}/user/logout`
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

// save congn in in database 

cogniSubmitForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const start_date = document.getElementById("start_date").value;
  const end_date = document.getElementById("end_date").value;
  const name = document.getElementById("slido_name").value;

  const newCogni = {
    start_date,
    end_date,
    name,
  };
  if (start_date && end_date && name) {
    saveCogni(newCogni)
    async function saveCogni(newCogni) {
      await fetch(`${globals.DEPLOYED_URL}/cogni/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCogni),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Cogni saved successfully:", data);
          // Optionally, perform any actions after the Cogni is saved (e.g., show a success message, redirect to another page, etc.)
        })
        .catch((error) => {
          console.error("Error saving Cogni:", error);
        });
    }
  } else {
    alert("Enter all the details")
  }
});


