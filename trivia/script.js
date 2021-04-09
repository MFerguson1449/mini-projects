const startButton = document.querySelector('#start-btn');
const nextButton = document.querySelector('#next-btn');
const questionContainerElement = document.querySelector('#question-container');
const questionElement = document.querySelector('#question');
const answerButtonsElement = document.querySelector('#answer-buttons');

let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
   currentQuestionIndex++;
   setNextQuestion();
})

function startGame() {
   console.log('started');
   startButton.classList.add('hide');
   shuffledQuestions = questions.sort(() => Math.random() - .5);
   currentQuestionIndex = 0;
   questionContainerElement.classList.remove('hide');
   setNextQuestion();
};

function setNextQuestion() {
   resetState();
   showQuestion(shuffledQuestions[currentQuestionIndex]);
};

function showQuestion(question) {
   questionElement.innerText = question.question;
   question.answers.forEach(answer => {
      const button = document.createElement('button');
      button.innerText = answer.text;
      button.classList.add('btn');
      if (answer.correct) {
         button.dataset.correct = answer.correct;
      }
      button.addEventListener('click', selectAnswer)
      answerButtonsElement.append(button)
   })
}

function resetState() {
   nextButton.classList.add('hide');
   while (answerButtonsElement.firstChild) {
      answerButtonsElement.removeChild(answerButtonsElement.firstChild)
   };
};

function selectAnswer(e) {
   const selectedButton = e.target;
   const correct = selectedButton.dataset.correct;
   setStatusClass(document.body, correct);
   Array.from(answerButtonsElement.children).forEach(button=> {
      setStatusClass(button, button.dataset.correct)
   })
   if (shuffledQuestions.length > currentQuestionIndex +1 ) {
      nextButton.classList.remove('hide');
   } else {
      startButton.innerText = 'Restart';
      startButton.classList.remove('hide')
   }
};

function setStatusClass(element, correct) {
   clearStatusClass(element);
   if (correct) {
      element.classList.add('correct');
   } else {
      element.classList.add('wrong');
   }
};

function clearStatusClass(element) {
   element.classList.remove('correct');
   element.classList.remove('wrong');
}
const questions = [
   {
      question: 'Whos is Medivh \'s apprentice?',
      answers: [
         { text: 'Khadgar', correct: true },
         { text: 'Jaina', correct: false },
         { text: 'Bolvar', correct: false },
         { text: 'Guldan', correct: false }
      ]
   },
   {
      question: 'What room in Stormwind City did you used to have to visit to qeue for a battleground?',
      answers: [
         { text: 'SI:7 Headquarters', correct: false },
         { text: 'Great Hall', correct: false },
         { text: 'War Room', correct: true },
         { text: 'Cathedral', correct: false }
      ]
   },
   {
      question: 'What was the name of the Legendary that dropped only once?',
      answers: [
         { text: 'Ironfoe', correct: false },
         { text: 'Pendulum of Doom', correct: false },
         { text: 'The One Ring', correct: false },
         { text: 'Talisan of Binding Shard', correct: true }
      ]
   },
   {
      question: 'What was Varian Wrynn\'s gladiator name',
      answers: [
         { text: 'Lo\'gosh', correct: true },
         { text: 'Priscus', correct: false },
         { text: 'Broll', correct: false },
         { text: 'Go\el', correct: false }
      ]
   },
   {
      question: 'Who is the Loa of Theives?',
      answers: [
         { text: 'Sseratus', correct: false },
         { text: 'Rezan', correct: false },
         { text: 'Hakkar', correct: false },
         { text: 'Jani', correct: true }
      ]
   },
   {
      question: 'Whos is the God of the Hunt',
      answers: [
         { text: 'Akunda', correct: true },
         { text: 'Rexxar', correct: false },
         { text: 'Rezan', correct: true },
         { text: 'Glirin', correct: false }
      ]
   },
]