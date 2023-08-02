
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
  swal("logout might take long time during initial use because of free servers")

  localStorage.removeItem("userObject")
  localStorage.removeItem("jwtToken")


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

cogniSubmitForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const start_date = document.getElementById("start_date").value;
  const end_date = document.getElementById("end_date").value;
  const name = document.getElementById("slido_name").value;

  const newCogni = {
    start_date,
    end_date,
    name,
  };
  console.log("🚀 ~ file: eventPage.js:67 ~ cogniSubmitForm.addEventListener ~ newCogni:", newCogni)
  if (start_date && end_date && name && start_date < end_date) {
    // saveCogni(newCogni)
    // async function saveCogni(newCogni) {
    try {
      const response = await fetch(`${globals.DEPLOYED_URL}/cogni/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `${JSON.parse(localStorage.getItem('jwtToken'))}`
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
        swal("Successfully saved cogni!");
      } else {
        swal("Oops!", "Something went wrong!", "error");
      }

    } catch (error) {
      console.log("Error saving Cogni:", error);
    }
    // }
  } else if (start_date > end_date) {
    swal("Oops!", "Start date should be less than end date", "error");

  }
  else {
    swal("Oops!", "Enter all the details ", "error");

  }
});


// rendering all the cognis on event page 


fetchAndRenderCognis();
async function fetchAndRenderCognis() {
  try {
    const response = await fetch(`${globals.DEPLOYED_URL}/cogni/getall`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `${JSON.parse(localStorage.getItem('jwtToken'))}`
      },
    });
    const cognis = await response.json();
    console.log("🚀 ~ file: eventPage.js:128 ~ fetchAndRenderCognis ~ cognis:", cognis)

    const cogniContainer = document.getElementById('cogniContainer');

    cogniContainer.innerHTML = '';

    cognis.forEach(cogni => {
      const cogniCard = document.createElement('div');
      cogniCard.classList.add('cogni-card');

      cogniCard.innerHTML = `
        <h2>${cogni.name}</h2>
        <p>Start Date: ${cogni.start_date}</p>
        <p>End Date: ${cogni.end_date}</p>
        <a href="./quiz.html">Create Quiz</a>
      `;

      cogniContainer.appendChild(cogniCard);
    });
  } catch (error) {
    console.error('Error fetching Cogni:', error);
  }
}