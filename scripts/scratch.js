let questionNumber = 0;
let score = 0;

function generateQuestion() {
    for (let questionNumber = 0; questionNumber < STORE.length; questionNumber++) {
        if (questionNumber < STORE.length) {
            return `<div class="stats">
            <p class="question-counter">Question: <span>${questionNumber}</span>/15</p>
            <p class="score-counter">Score: <span>${score}</span></p>
            </div>
            <div class="question">
            <h2>${STORE[questionNumber].question}</h2>
            <form>
                <fieldset>
                    <label class="answerOption">
                        <input type="radio" value="${STORE[questionNumber].answers[0]}" name="answer" required/>
                        <span>${STORE[questionNumber].answers[0]}</span>
                    </label>
                    <label class="answerOption">
                            <input type="radio" value="${STORE[questionNumber].answers[1]}" name="answer" required/>
                            <span>${STORE[questionNumber].answers[1]}</span>
                    </label>
                    <label class="answerOption">
                            <input type="radio" value="${STORE[questionNumber].answers[2]}" name="answer" required/>
                            <span>${STORE[questionNumber].answers[2]}</span>
                    </label>
                    <label class="answerOption">
                            <input type="radio" value="${STORE[questionNumber].answers[3]}" name="answer" required/>
                            <span>${STORE[questionNumber].answers[3]}</span>
                    </label>
                    <button type="submit" class="button">Submit</button>
                </fieldset>
            </form>
        </div>`
        }
        else {
            renderResults();
            restartQuiz();
            $('.questionNumber').text(15)
        }
    }
}

function changeQuestionNumber() {
    questionNumber++;
    // $('.questionNumber').text(questionNumber + 1);
}

function changeScore() {
    score ++;
}

function startQuiz() {
    $('.home-page').on('click', '#js-start-button', function(event) {
        $('.home-page').remove();
        renderQuestion();
        // choiceSubmited();
        renderNextQuestion();
    });
}

function renderQuestion() {
    $('.questionAnswerForm').html(generateQuestion());
}

function choiceSubmited() {
    $('form').on('submit', function(event) {
        event.preventDefault();
        let chosen = $('input:checked');
        let answer = chosen.val();
        let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
        if (answer === correctAnswer) {
            chosen.parent().addClass('correct');
            rightAnswer();
        }
        else {
            chosen.parent().addClass('incorrect');
            wrongAnswer();
        }
    });
}

function rightAnswer() {
    userAnswerFeedbackCorrect();
    updateScore();
}

function wrongAnswer() {
    userAnswerFeedbackIncorrect();
}

function userAnswerFeedbackCorrect() {
    $('.questionAnswerForm').html(`<div class="feedback">
    <img src="https://www.shareicon.net/tag/correct" alt="correct sign"/>
    <p>Correct!</p>
    <button id="js-next-button">Next Question</button></div>`)
}

function userAnswerFeedbackIncorrect() {
    let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
    $('.questionAnswerForm').html(`<div class="feedback">
    <img src="https://www.shareicon.net/incorrect-close-delete-x-cross-circle-invalid-817729" alt="incorrect sign"/>
    <p>Incorrect.  The correct answer was "<span>${correctAnswer}</span>"</p>
    <button id="js-next-button">Next Question</button></div>`)
}

function updateScore() {
    changeScore();
    $('.score').text(score);
}

function renderResults() {
    if (score = 15) {
        $('.questionAnswerForm').html(`<div class="results-page"><h2>Final Score: ${score}/15</h2><p>You're a millionaire!</p><button id="js-restart-button">Restart Quiz</button></d`)
    }
    else if (score < 15 && score > 0) {
        $('.questionAnswerForm').html(`<div class="results-page"><h2>Final Score: ${score}/15</h2><p>Not bad!  You might not be a millionaire but your wallet is still happy!<button id="js-restart-button">Restart Quiz</button></d`)
    }
    else {
        $('.questionAnswerForm').html(`<div class="results-page"><h2>Final Score: 0/15</h2><p>Maybe gameshows aren't your thing.<button id="js-restart-button">Restart Quiz</button></d`)
    }
}

function renderNextQuestion() {
    $('body').on('click','#js-next-button', function(event) {
        changeQuestionNumber();
        renderQuestion();
        choiceSubmited();
    });
}

function restartQuiz() {
    $('body').on('click','#js-restart-button', function(event){
        renderQuestion();
    });
}

function createQuiz() {
    startQuiz();
}

$(createQuiz);