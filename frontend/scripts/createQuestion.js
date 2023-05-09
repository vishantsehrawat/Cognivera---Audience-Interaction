

const renderDeploymentURl  ="https://slidoapp.onrender.com";
const createQuestionDeployedUrl = `${renderDeploymentURl}/question/submit-question`

const questionPostUrl = "http://localhost:8080/question/submit-question"
const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const question = {
        question: formData.get('question'),
        options: [
            { option: formData.get('option1'), is_correct: formData.get('correctOption') === 'option1' },
            { option: formData.get('option2'), is_correct: formData.get('correctOption') === 'option2' },
            { option: formData.get('option3'), is_correct: formData.get('correctOption') === 'option3' },
            { option: formData.get('option4'), is_correct: formData.get('correctOption') === 'option4' }
        ]
    };
    console.log(question)
    fetch(questionPostUrl, {
        method: 'POST',
        body: JSON.stringify(question),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            form.reset();
            if (data.error) {
                swal("Oops!", "Seems like we couldn't create question", "error");

            }
            else {

                setTimeout(() => {
                    swal("Created!", "Your Question has been created!", "success");
                }, 200);
                setTimeout(() => {
                    redirectToDestination()//
                }, 2000);
            }


        })
        .catch(error => {
            console.log('Error:', error);
            // Handle error here
        });

});

function redirectToDestination() {
    // window.location.href = ""
    window.history.go(-1)
}