const pubicCongiSearchApi = `${globals.DEPLOYED_URL}/cogni/getPublicCogni`


// for website intro +++++++++++++
document.addEventListener("DOMContentLoaded", function () {
    var intro = introJs();
    intro.setOptions({
        steps: [
            {
                title: 'Cogni',
                intro: 'Enter code to search Cogni',
                element: '.search',
                position: 'bottom',
                exitOnOverlayClick: true,
            },
            {
                title: 'Signup',
                intro: 'Signup to Use Cognivera',
                element: '.nav-log',
                position: 'bottom',
                exitOnOverlayClick: true,
            },

            // Add more steps as needed
        ],
        tooltipClass: 'glassy-tooltip',
        highlightClass: 'glassy-highlight'
    });

    intro.start();
});



// cogni search fetch 
const input = document.getElementById('searchPublicCogni');
input.addEventListener('keyup', async (event) => {
    if (event.key === 'Enter') {
        const id = input.value;
        try {
            const response = await fetch(`${pubicCongiSearchApi}/${id}`,{
                headers:{
                    "content-type":"application/json",
                    'Authorization': `${JSON.parse(localStorage.getItem('jwtToken'))}`
                }

            });
            const cogni = await response.json();
            console.log(cogni);
            
        } catch (error) {
            console.error('Error getting Cogni:', error);
        }
    }
});