

// console.log("🚀 ~ file: dashboard.html:56 ~ creator:", creator)
const quizsaveApi = ""
const allQuestions = [];
let questionCount = 0;

const getAllQuizApi = "http://localhost:8080/quiz/get"


window.addEventListener("load", (event) => {
    console.log("page is fully loaded");
    getAllQuizData()

});
const createQuizBtn = document.getElementById('createQuizBtn');
const quizForm = document.getElementById('quizForm');

createQuizBtn.addEventListener('click', function () {
    quizForm.style.display = 'block';
});





function questionCountfunction(allQuestions) {
    questionCount = allQuestions.length;
    console.log("🚀 ~ file: dashboard.html:56 ~ questionCountfunction ~ questionCount:", questionCount)
    document.getElementById("totalQuestionAdded").innerHTML = questionCount;
}

document.getElementById('addQuestion').addEventListener('click', function (event) {
    event.preventDefault();
    if (questionCount < 10) {

        const questionData = {
            title: document.getElementById("questionTitle").value,
            options: [],
            correctOption: null,
        };

        const options = document.querySelectorAll('.option');
        options.forEach(function (option, index) {
            questionData.options.push(option.value);
            if (document.querySelectorAll('.correctOption')[index].checked) {
                questionData.correctOption = +index;
            }
        });

        allQuestions.push(questionData);

        console.log(allQuestions); // checking the added quesions

        // clearing form
        document.getElementById("questionTitle").value = "";
        options.forEach(function (option) {
            option.value = "";
            option.checked = false;
        });
        questionCountfunction(allQuestions)

    }
    else {
        alert("You can only add upto 10 questions");
    }
});




// saving all quesion into database 
document.getElementById('submitQuiz').addEventListener('click', function (event) {
    event.preventDefault();
    const title = document.getElementById("quizTitle").value
    const creator = JSON.parse(localStorage.getItem("creatoremail"))

    const quiz = {
        creator: creator,
        title: title,
        description: document.getElementById("quizDescription").value,
        questions: allQuestions
    }
    console.log("🚀 ~ file: dashboard.html:113 ~ quiz:", quiz)
    if (allQuestions.length > 0) {
        addquizData(quiz)
        async function addquizData(quiz) {
            try {
                const response = await fetch(quizsaveApi, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(quiz),
                });

                const result = await response.json();
                quizForm.style.display = 'none';

                console.log("Success:", result);
            } catch (error) {
                console.error("Error:", error);
            }
        }
    } else {
        alert('Please add at least one question');
    }
});



// showing all the quizzes 

async function getAllQuizData() {
    try {
        const response = await fetch(getAllQuizApi,);

        const result = await response.json();
        console.log("Success:", result);
        showAllQuiz(result)
    } catch (error) {
        console.error("Error:", error.message);
    }
}
function showAllQuiz(quizzes) {
    for (const quiz of quizzes) {
        // console.log(quiz.quiz)
        showSingleQuiz(quiz);
    }
}

function showSingleQuiz(quiz) {
    const cardsContainer = document.getElementById("cards");
    const card = document.createElement("div");
    card.classList.add("quizCard");

    card.innerHTML = `
                <h3> ${quiz.quiz.creator}</h3>
                <h3>${quiz.quiz.title}</h3>
                <p> ${quiz.quiz.description}</p>
                <p>Questions: ${quiz.quiz.questions.length}</p>
                <button class="takeQuizBtn" data-id="${quiz._id}">Take Quiz</button>
                <button class="leaderboardBtn" data-id="${quiz._id}">Leaderboard</button>
            `;

    cardsContainer.appendChild(card);
}



// routing to quiz page 
document.addEventListener("click", function (event) {
    if (event.target.classList.contains("takeQuizBtn")) {
        const quizId = event.target.dataset.id;
        console.log("🚀 ~ file: dashboard.html:292 ~ quizId:", quizId)
        window.location.href = `/quiz/get/${quizId}`;
    }
});

// leaderboard btn 
document.addEventListener("click", function (event) {
    if (event.target.classList.contains("leaderboardBtn")) {
        const quizId = event.target.dataset.id;
        console.log("🚀 ~ file: dashboard.html:301 ~ quizId:", quizId)
        // window.location.href = `https://bucolic-madeleine-ebd5ce.netlify.app/quiz/get/${quizId}`;
        window.location.href = `https://bucolic-madeleine-ebd5ce.netlify.app/leaderboard.html`;
        // window.location.href = `/leaderboard?id=${quizId}`;
    }
});
