
const logoName = document.getElementById("logo");
const logoName1 = document.getElementById("username1")
const logoName2 = document.getElementById("username2")
const logout = document.getElementById("logoutBtn")
const cogniSubmitForm = document.getElementById("createSlidoForm");
// catching the create cogni modal 
const createCogniModal = document.getElementById('createCogni');


let logoutUrlLocal = "http://localhost:8080/user/logout"
// const renderDeploymentURl  ="https://slidoapp.onrender.com";
const logoutUrlDeployed = `${globals.DEPLOYED_URL}/user/logout`
// get username from local storage
let username = JSON.parse(localStorage.getItem("userObject"))?.usernameforchat || "temp";
// console.log("🚀 ~ file: eventPage.js:5 ~ username:", username)

logoName.innerHTML = username;
logoName1.innerHTML = username;
// logoName2.innerHTML = username;


// logut button clicked 
logout.addEventListener("click", () => {
  localStorage.removeItem("userObject")

  fetch(logoutUrlDeployed, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',

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
  // console.log("🚀 ~ file: eventPage.js:67 ~ cogniSubmitForm.addEventListener ~ newCogni:", newCogni)
  if (start_date && end_date && name) {
    saveCogni(newCogni)
    async function saveCogni(newCogni) {
      try {
        const response = await fetch(`${globals.DEPLOYED_URL}/cogni/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `${JSON.parse(localStorage.getItem('jwtToken'))  }`
          },
          body: JSON.stringify(newCogni),
        });
        const data = await response.json();
        if (response.ok) {
          console.log("🚀 ~ file: eventPage.js:82 ~ saveCogni ~ data:", data)
          createCogniModal.style.display = "none";//for closing modal
          document.body.style.overflow = 'visible'// for removing foreground
          swal("Cogni created");
          $('#createCogniModal').remove();
          $('.blocker').remove();
        } else {
          swal("Oops!", "Something went wrong!", "error");
        }

      } catch (error) {
        console.error("Error saving Cogni:", error);
      }
    }
  } else {
    swal("Enter all the details");

  }
});


