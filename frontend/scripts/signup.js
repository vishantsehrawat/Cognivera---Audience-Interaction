// let baseUrl = "http://localhost:8080/user"
// let form = document.querySelector("#form");
// let loding_container = document.getElementById("loding_container");

// form.addEventListener("submit", async(event) => {
//     try {


//         event.preventDefault()

//         let name = document.querySelector("#name").value
//         let email = document.querySelector("#email").value
//         let password = document.querySelector("#password").value
//         let cpassword = document.querySelector("#cpassword").value



//         if (!name || !email || !password || !cpassword) {
//             alert("Please fill all fields")
//         } else {

//             // loding_container.style.display = "block";

//             let obj = {name,email,password,cpassword }

//             // fetch(`${baseUrl}/register`, {
//             //     method : "POST",
//             //     headers : {
//             //         "Content-type" : "application/json"
//             //     },
//             //     body : JSON.stringify(obj)


//             // }).then(res => res.json())
//             // .then(res =>  console.log(res))
//             // .catch(err => console.log(err))


//             let res = await fetch("http://localhost:8080/user/register", {

//                 method: 'POST',
//                 body: JSON.stringify(obj),
//                 headers: {
//                     'Content-type': 'application/json; charset=UTF-8',
//                 },
//             });

//             if (res.ok) {
//                 //loader end
//                 // loding_container.style.display = "none";
//                 let data = await res.json();
//                 // let authToken = data.authToken;
//                 // sessionStorage.setItem("authToken", authToken);


//                 setTimeout(() => {
//                     window.location.href = "./login.html";
//                 }, 2000);


//             }
//             else {
//                 if (res.status == 409) {


//                     setTimeout(() => {
//                         window.location.href = "./login.html";
//                     }, 2000);

//                 }
//                 else if (res.status == 401) {

//                     alert("Please try again")

//                 }
//             }

//         }
//         // console.log(res)






//     } catch (err) {
//         console.log(err)
//     }







//     // fetch(`${baseUrl}/register`), {

//     //         method: "POST",
//     //         headers: {
//     //             "Content-type": "application/json"
//     //         },
//     //         body: JSON.stringify(payload)
//     //     }).then(res => res.json())
//     //         .then(res => console.log(res))
//     //         .catch(err => console.log(err))


// })






// //function for event code
// // function storeEventCode() {
// //   let arrow = document.getElementById("enter");
// //   arrow.addEventListener("click", (e) => {
// //     e.preventDefault();
// //     let code = document.getElementById("code");
// //     sessionStorage.setItem("eventCode", code.value);
// //     let c = sessionStorage.getItem("eventCode");
// //     if (c) {
// //       window.location.href = "./search.html"
// //     }


// //   })
// // }


let form = document.querySelector('form')
form.addEventListener('submit', myfun)
function myfun(event) {

    event.preventDefault()

    let name = document.getElementById("name").value
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
    let cpassword = document.getElementById("cpassword").value
    let payload = { name, email, password }

    console.log(payload)

    if (password === cpassword) {

        fetch("http://localhost:8080/user/register", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(payload)

        }).then((res) => { return res.json() })
            .then((data) => {

                console.log(data)

                setTimeout(() => {
                    location.href = "login.html"

                }, 4000);

              
            })
            .catch((err) => {
                console.log(err.message)
            })


    } else {
        alert("Password doesn't match")
    }

 


}


