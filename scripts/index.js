let questionNumber = 0;
let score = 0;

function changeQuestionNumber() {
    questionNumber++;
}

function changeScore() {
    score++;
}

function handleStartButtonClicked() {
    $('body').on('click', '#js-start-button', function (event) {
        $('.home-page').remove();
        $('#js-start-button').remove();
        $('header').remove();
        renderQuestion();
        handleSubmitButtonClicked();
    });
}

function generateQuestion() {
    if (questionNumber < STORE.length) {
        return `
            <div class="container">
            <div class="stats center border">
            <p class="counter center border">Question: <span>${questionNumber + 1}</span>/15</p>
            <p class="counter center border">Score: <span>${score}</span></p>
            </div>
            <h2 class="q border standard-sizing center">${STORE[questionNumber].question}</h2>
            <form class="border standard-sizing center">
                <fieldset>
                    <label class="border center">
                        <input type="radio" value="${STORE[questionNumber].answers[0]}" name="answer" class="border" required/>
                        <span>${STORE[questionNumber].answers[0]}</span>
                    </label>
                    <label class="border center">
                            <input type="radio" value="${STORE[questionNumber].answers[1]}" name="answer" class="border" required/>
                            <span>${STORE[questionNumber].answers[1]}</span>
                    </label>
                    <label class="border center">
                            <input type="radio" value="${STORE[questionNumber].answers[2]}" name="answer" class="border" required/>
                            <span>${STORE[questionNumber].answers[2]}</span>
                    </label>
                    <label class="border center">
                            <input type="radio" value="${STORE[questionNumber].answers[3]}" name="answer" class="border" required/>
                            <span>${STORE[questionNumber].answers[3]}</span>
                    </label>
                </fieldset>
            </form>
            <button type="button" id="js-submit-button" class="button border standard-sizing">Submit</button>
        </div>`
    }
  
    else {
        renderResults();
        handleRestartButtonClicked();
        $('.questionNumber').text(15)
    }
}

function renderQuestion() {
    $('.questionAnswerForm').html(generateQuestion());
}

function handleSubmitButtonClicked() {
    $('#js-submit-button').click(function (event) {
        let chosen = $('input:checked');
        let answer = chosen.val();
        let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
        let answers = $('input');
        console.log(answers.checked);
        for (let i = 0; i < answers.length; i++) {
            if (answers[i].checked) {
                if (answer === correctAnswer) {
                    correctFeedback();
                    changeScore();
                }
                else {
                    incorrectFeedback();
                }
                handleNextButtonClicked();
                changeQuestionNumber();
            }
        }
    });
}

function correctFeedback() {
    $('.questionAnswerForm').html(`<div class="feedback center border">
    <img src="https://www.shareicon.net/data/128x128/2016/08/20/817722_check_395x512.png" alt="A green checkmark with a circle around it" class="feedback-img"/>
    <p class="right border standard-sizing center blue">Correct!</p>
    </div><button id="js-next-button" class="button border standard-sizing">Next Question</button>`)
}

function incorrectFeedback() {
    let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
    $('.questionAnswerForm').html(`<div class="feedback center border">
    <img src="https://www.shareicon.net/data/128x128/2016/08/20/817729_close_395x512.png" alt="A red X with a circle around it" class="feedback-img"/>
    <p class="border standard-sizing center blue">The right answer was <span class="wrong">${correctAnswer}</span></p>
    </div><button id="js-next-button" class="button border standard-sizing">Next Question</button>`)
}

function handleNextButtonClicked() {
    $('body').on('click', '#js-next-button', function (event) {
        renderQuestion();
        handleSubmitButtonClicked();
    })
}

function renderResults() {
    if (score == 15) {
        $('.questionAnswerForm').html(`<div class="center border standard-sizing"><h2 class="center border standard-sizing blue">Final Score: ${score}/15</h2><p class="border standard-sizing center blue">You're a millionaire!</p></div><button id="js-restart-button" class="border button standard-sizing">Restart Quiz</button>`)
    }
    else if (score < 15 && score > 0) {
        $('.questionAnswerForm').html(`<div class="center border standard-sizing"><h2 class="center border standard-sizing blue">Final Score: ${score}/15</h2><p class="border standard-sizing center blue">Not bad!  You might not be a millionaire but your wallet is still happy!</div><button id="js-restart-button" class="border button standard-sizing">Restart Quiz</button>`)
    }
    else {
        $('.questionAnswerForm').html(`<div class="center border standard-sizing"><h2 class="center border standard-sizing blue">Final Score: 0/15</h2><p class="border standard-sizing center blue">Maybe gameshows aren't your thing.</div><button id="js-restart-button" class="border button standard-sizing">Restart Quiz</button>`)
    }
}

function handleRestartButtonClicked() {
    $('#js-restart-button').on('click', function (event) {
        questionNumber = 0;
        score = 0;
        renderQuestion();
        handleSubmitButtonClicked();
    })
}

function beginQuiz() {
    handleStartButtonClicked();
}

$(beginQuiz());