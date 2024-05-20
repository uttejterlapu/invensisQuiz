let currentQuestionIndex = 0;
const userAnswers = {};
let quizData;
let result=0, totalQuestions=0;
async function fetchQuizData() {
    const response = await fetch('question.json');
    quizData = await response.json();
    loadQuestion(currentQuestionIndex);
}

function loadQuestion(index) {
    const quizContainer = document.getElementById('quiz');
    quizContainer.innerHTML = '';
    const q = quizData.question[index];
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question-container');
    questionDiv.innerHTML = `
    <div class="question">${q.question}</div>
    <ul class="options">
        <li><input type="radio" name="question${index}" value="${q.option1}"> ${q.option1}</li>
        <li><input type="radio" name="question${index}" value="${q.option2}"> ${q.option2}</li>
        <li><input type="radio" name="question${index}" value="${q.option3}"> ${q.option3}</li>
        <li><input type="radio" name="question${index}" value="${q.option4}"> ${q.option4}</li>
    </ul>
    `;
    quizContainer.appendChild(questionDiv);

    if (userAnswers[index] !== undefined) {
        const options = document.getElementsByName(`question${index}`);
        for (let option of options) {
            if (option.value === userAnswers[index]) {
                option.checked = true;
            }
        }
    }

    document.getElementById('prevBtn').style.display = none = index === 0;
    // document.getElementById('prevBtn').style.backgroundColor = 
    document.getElementById('nextBtn').style.display = index === quizData.question.length - 1 ? 'none' : 'inline-block';
    document.getElementById('submitBtn').style.display = index === quizData.question.length - 1 ? 'inline-block' : 'none';

}

function prevQuestion() {
    saveAnswer();
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion(currentQuestionIndex);
    }
}

function nextQuestion() {
    saveAnswer();
    if (currentQuestionIndex < quizData.question.length - 1) {
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
    }
}

function saveAnswer() {
    const options = document.getElementsByName(`question${currentQuestionIndex}`);
    for (let option of options) {
        if (option.checked) {
            userAnswers[currentQuestionIndex] = option.value;
        }
    }
}

function submitQuiz() {
    saveAnswer();
    let score = 0;
    quizData.question.forEach((q, index) => {
        if (userAnswers[index] === q.ans) {
            score++;
        }
    });

    // Store the score in localStorage
    result = score;
    totalQuestions = quizData.question.length;
    // localStorage.setItem('quizScore', score);
    // localStorage.setItem('totalQuestions', quizData.question.length);

    // Redirect to result page
    window.location.href = 'result.html';
}

window.onload = fetchQuizData;

