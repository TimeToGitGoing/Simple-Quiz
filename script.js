const questions = [
    {
        question: "What is the stratagem code to reinforce a helldiver?",
        answers: [
            { text: "↓→←↑↓", correct: false },
            { text: "↑↓←→↑", correct: false },
            { text: "↑↓→←↑", correct: true },
            { text: "↓↑→←↑", correct: false },
        ]
    },
    {
        question: "What is the name of the planet that collapsed into a black hole?",
        answers: [
            { text: "Bellatrix", correct: false },
            { text: "Malevelon Creek", correct: false },
            { text: "Chort Bay", correct: false },
            { text: "Meridia", correct: true },
        ]
    },
    {
        question: "How many seconds does Super Earth recommend per mission enjoying the scenery?",
        answers: [
            { text: "2.4 secs", correct: true },
            { text: "2.3 secs", correct: false },
            { text: "2.7 secs", correct: false },
            { text: "2.9 secs", correct: false },
        ]
    },
    {
        question: "What is a real enemy to democracy? ",
        answers: [
            { text: "Titan Spewers", correct: false },
            { text: "Alpha Commanders", correct: true },
            { text: "Bile Guards", correct: false },
            { text: "Hive Spewers", correct: false },
        ]
    },
    {
        question: "What are the 3 C's against bots? ",
        answers: [
            { text: "Command, Conquer and Conquest!", correct: false },
            { text: "Caboom Caboom Caboom!", correct: false },
            { text: "Crawl, Cover and Capture! ", correct: false },
            { text: "Cover, Courage and more Cover!", correct: true },
        ]
    },
    {
        question: "When is Liberty Day? ",
        answers: [
            { text: "October 26", correct: true },
            { text: "February 8", correct: false },
            { text: "June 2", correct: false },
            { text: "December 24", correct: false },
        ]
    },
    {
        question: "How many rounds are in a Liberator Carbine? ",
        answers: [
            { text: "7", correct: false },
            { text: "30", correct: false },
            { text: "45", correct: true },
            { text: "26", correct: false },
        ]
    },
    {
        question: "What is the Bile Titan's weak point? ",
        answers: [
            { text: "Thorax", correct: false },
            { text: "Legs", correct: false },
            { text: "Sternum", correct: false },
            { text: "Head", correct: true },
        ]
    },
    {
        question: "Which one of these is NOT a mission type on the Galactic War Map? ",
        answers: [
            { text: "Emergency Evacuation", correct: false },
            { text: "Launch ICBM", correct: false },
            { text: "Purge Hatcheries", correct: false },
            { text: "Launch Illegal Broadcast", correct: true },
        ]
    },
    {
        question: "Which weapon cannot be equipped from the armory? ",
        answers: [
            { text: "Adjudicator", correct: false },
            { text: "Break-Action Shotgun", correct: true },
            { text: "Sickle", correct: false },
            { text: "Diligence Counter Sniper", correct: false },
        ]
    }
]

const questionElement = document.getElementById("question")
const answerButtons = document.getElementById("answer-buttons")
const nextButton = document.getElementById("next-btn")

let currentQuestionIndex = 0
let score = 0

function startQuiz(){
    currentQuestionIndex = 0
    score = 0
    nextButton.innerHTML = "Next"
    showQuestion()
}

function showQuestion(){
    resetState()
    let currentQuestion = questions[currentQuestionIndex]
    let questionNo = currentQuestionIndex + 1
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button")
        button.innerHTML = answer.text
        button.classList.add("btn")
        answerButtons.appendChild(button)
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
    })
}

function resetState(){
    nextButton.style.display = "none"
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(e){
    const selectedBtn = e.target
    const isCorrect = selectedBtn.dataset.correct === "true"
    if(isCorrect){
        selectedBtn.classList.add("correct")
        score++
    }else{
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct")
        }
        button.disabled = true
    })
    nextButton.style.display = "block"
}

function showScore(){
    resetState()
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`
    nextButton.innerHTML = "Play again"
    nextButton.style.display = "block"
}

function handleNextButton(){
    currentQuestionIndex++
    if(currentQuestionIndex < questions.length){
        showQuestion()
    }else{
        showScore()
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton()
    }else{
        startQuiz()
    }
})

startQuiz()

