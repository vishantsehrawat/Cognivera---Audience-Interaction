
const getQuestionUrl = "http://localhost:8080/question/get-question"

// const renderDeploymentURl  ="https://slidoapp.onrender.com";
const getQuestionDeployedUrl = `${globals.DEPLOYED_URL}/question/get-question`


var questionDataGlobal;
console.log("hgg")
const searchQuestionForm = document.getElementById('search-question-form');
const questionIdInput = document.getElementById('question-id');

searchQuestionForm.addEventListener('submit', (event) => {
  event.preventDefault(); // prevent form from submitting normally

  const questionId = questionIdInput.value;
  // console.log("🚀 ~ file: getQuestion.js:11 ~ searchQuestionForm.addEventListener ~ questionId:", questionId)

  // Make fetch request to get the question by ID
  fetch(`${getQuestionDeployedUrl}/${questionId}`)
    .then(response => response.json())
    .then(question => {
      console.log(question);
      questionDataGlobal = question;
      displayQuestion(question)
    })
    .catch(error => {
      console.log('Error:', error.message);
      // Handle error here
    });
});


const questionContainer = document.getElementById('question-container');
const questionText = document.getElementById('question-text');
const optionsList = document.getElementById('options-list');

function displayQuestion(questionData) {
  // Update question text
  questionText.textContent = questionData.question.question;

  // Update options list
  optionsList.innerHTML = '';
  questionData.question.options.forEach((option, index) => {
    const li = document.createElement('li');
    li.setAttribute("class", "optionsLi")
    li.textContent = `${option.option}`;
    // if (option.is_correct) {
    //   li.style.color = 'green';
    // }
    optionsList.appendChild(li);
  });

  // Show question container
  questionContainer.style.display = 'block';
}

// //js for get all questions +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// const getQuestionsBtn = document.getElementById('get-questions-btn');

// const getAllQuestionsUrl = "http://localhost:8080/question/get-all-questions";

// // Get the questions container
// const questionsContainer = document.getElementById('questions-container');

// // Make a fetch request to get all questions
// getQuestionsBtn.addEventListener('click', () => {

//   fetch(getAllQuestionsUrl)
//     .then(response => response.json())
//     .then(questions => {
//       console.log(questions);
//       // Display each question
//       questions.questions.forEach(question => {
//         displayQuestion1(question);
//       });
//     })
//     .catch(error => {
//       console.error('Error:', error);
//       // Handle error here
//     });
// });




// // Function to display a single question
// function displayQuestion1(questionData) {
//   // Create question container
//   const questionDiv = document.createElement('div');
//   questionDiv.classList.add('question');

//   // Add question text
//   const questionText = document.createElement('h3');
//   questionText.textContent = questionData.question;
//   questionDiv.appendChild(questionText);

//   // Add options list
//   const optionsList = document.createElement('ul');
//   questionData.options.forEach((option, index) => {
//     const li = document.createElement('li');
//     li.textContent = `${option}`;
//     optionsList.appendChild(li);
//   });
//   questionDiv.appendChild(optionsList);

//   // Add question container to the questions container
//   questionsContainer.appendChild(questionDiv);
// }

// //js for get all questions ------------------------------------------------------------