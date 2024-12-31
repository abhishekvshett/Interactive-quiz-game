// Quiz data (questions and answers)
const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris"
},
{
    question: "Which language is primarily used for web development?",
    options: ["Java", "Python", "HTML", "C++"],
    answer: "HTML"
},
{
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: "Mars"
},
{
    question: "Who developed the theory of relativity?",
    options: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Nikola Tesla"],
    answer: "Albert Einstein"
},
{
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    answer: "Pacific Ocean"
},
{
    question: "Which element has the chemical symbol O?",
    options: ["Oxygen", "Gold", "Osmium", "Oxalate"],
    answer: "Oxygen"
},
{
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Claude Monet"],
    answer: "Leonardo da Vinci"
},
{
    question: "What is the hardest natural substance on Earth?",
    options: ["Gold", "Iron", "Diamond", "Platinum"],
    answer: "Diamond"
},
{
    question: "Which is the smallest continent by land area?",
    options: ["Antarctica", "Europe", "Australia", "South America"],
    answer: "Australia"
},
{
    question: "Which organ in the human body is responsible for filtering blood?",
    options: ["Heart", "Lungs", "Kidneys", "Liver"],
    answer: "Kidneys"
},
{
    question: "What is the speed of light?",
    options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "100,000 km/s"],
    answer: "300,000 km/s"
},
{
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
    answer: "William Shakespeare"
},
{
    question: "Which planet is the largest in our solar system?",
    options: ["Earth", "Jupiter", "Saturn", "Neptune"],
    answer: "Jupiter"
},
{
    question: "What is the national flower of Japan?",
    options: ["Rose", "Lotus", "Cherry Blossom", "Tulip"],
    answer: "Cherry Blossom"
},
{
    question: "Who discovered penicillin?",
    options: ["Marie Curie", "Alexander Fleming", "Louis Pasteur", "Gregor Mendel"],
    answer: "Alexander Fleming"
},
{
    question: "What is the capital city of Australia?",
    options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
    answer: "Canberra"
},
{
    question: "What is the smallest unit of life?",
    options: ["Cell", "Atom", "Molecule", "Tissue"],
    answer: "Cell"
},
{
    question: "What is the primary gas found in the Earth's atmosphere?",
    options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
    answer: "Nitrogen"
},
{
    question: "Which country is famous for the Eiffel Tower?",
    options: ["Italy", "France", "Germany", "Spain"],
    answer: "France"
},
{
    question: "What is the currency of Japan?",
    options: ["Yen", "Won", "Dollar", "Euro"],
    answer: "Yen"
}
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 15;
let timerInterval;

// DOM Elements
const questionNumberEl = document.getElementById("question-number");
const questionTextEl = document.getElementById("question-text");
const answerBtns = document.querySelectorAll(".answer-btn");
const timerEl = document.getElementById("time-left");
const resultBoxEl = document.getElementById("result-box");
const scoreEl = document.getElementById("score");
const restartBtn = document.getElementById("restart-btn");

// Load the first question
function loadQuestion() {
  if (currentQuestionIndex >= quizData.length) {
      clearInterval(timerInterval);
      showResult();
      return;
  }

  const currentQuestion = quizData[currentQuestionIndex];
  questionNumberEl.innerText = `Question ${currentQuestionIndex + 1}`;
  questionTextEl.innerText = currentQuestion.question;

  // Set the answer buttons
  answerBtns.forEach((btn, index) => {
      btn.innerText = currentQuestion.options[index];
      btn.className = "answer-btn"; // Reset button styles
      btn.disabled = false; // Enable the buttons
      btn.onclick = () => checkAnswer(btn, currentQuestion.options[index]);
  });

  // Start the timer
  startTimer();
}

// Start the timer countdown
function startTimer() {
  timeLeft = 15;
  timerEl.innerText = timeLeft;
  timerInterval = setInterval(() => {
      timeLeft--;
      timerEl.innerText = timeLeft;

      if (timeLeft <= 0) {
          clearInterval(timerInterval);
          checkAnswer(null); // Time's up, consider it an incorrect answer
      }
  }, 1000);
}

// Check the selected answer
function checkAnswer(selectedBtn, selectedAnswer) {
  clearInterval(timerInterval);

  const correctAnswer = quizData[currentQuestionIndex].answer;

  if (selectedAnswer === correctAnswer) {
      score++;
      if (selectedBtn) selectedBtn.classList.add("correct");
  } else {
      if (selectedBtn) selectedBtn.classList.add("wrong");
      // Highlight the correct answer
      answerBtns.forEach(btn => {
          if (btn.innerText === correctAnswer) {
              btn.classList.add("correct");
          }
      });
  }

  // Disable buttons to prevent multiple clicks
  answerBtns.forEach(btn => (btn.disabled = true));

  // Wait 2 seconds before loading the next question
  setTimeout(() => {
      currentQuestionIndex++;
      loadQuestion();
  }, 2000);
}

// Show the final score
function showResult() {
  resultBoxEl.style.display = "block";
  scoreEl.innerText = `Your score is: ${score} out of ${quizData.length}`;
  document.getElementById("quiz-box").style.display = "none";
}

// Restart the quiz
restartBtn.addEventListener("click", () => {
  score = 0;
  currentQuestionIndex = 0;
  resultBoxEl.style.display = "none";
  document.getElementById("quiz-box").style.display = "block";
  loadQuestion();
});

// Initialize the quiz
loadQuestion();
