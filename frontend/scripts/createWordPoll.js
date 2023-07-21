const uuid = require('uuid');

// get the form and the UUID input field
const form = document.querySelector('form');
const uuidInput = form.querySelector('#uuid');

// add a submit event listener to the form
form.addEventListener('submit', (event) => {
    // prevent the default form submission behavior
    event.preventDefault();

    // generate a new UUID and set it as the value of the UUID input field
    const newUuid = uuid.v4();
    uuidInput.value = newUuid;
    // get the question text from the form
    const questionText = form.querySelector('#question').value;

    // create a new question object with the question text and UUID
    const newQuestion = {
        question: questionText,
        uuid: newUuid
    };

    // send a POST request to the server to save the new question
    fetch('/createQuestion', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('jwtToken'))}`,
        },
        body: JSON.stringify(newQuestion)
    })
        .then(response => response.json())
        .then(savedQuestion => {
            console.log('Saved new word cloud question:', savedQuestion);
            // submit the form
            form.submit();
        })
        .catch(error => {
            console.error('Error saving word cloud question:', error);
        });
});