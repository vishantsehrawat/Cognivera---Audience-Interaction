let form = document.querySelector('form')
form.addEventListener('submit', myfun)
function myfun(event) {
    event.preventDefault()
    const payload = {
           
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
           
        }
       

        fetch("https://sore-bear-pocketbook.cyclic.app/users/login", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(payload)
        }).then((res) => {  
            return res.json()
        })
        .then((res) => {
            console.log(res)
           
           location.href = "index.html"
            
           
            
        })
        .catch((err) => {
            console.log(err)
        })
          
            
}