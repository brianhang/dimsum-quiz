const questions = [
  {
    question: "You're magically teleported to a town. Don't worry though, you'll be brought back at night. Anyways, there is a gated entrance, and next to it is a sign that says \"Dim Sum Dale\". As you walk past the gates, what's your first move?",
    options: [
      ['Excitedly introduce yourself to the first dim sum person you meet', 'E'],
      ['Find a quiet bamboo basket to sit in and think about if you are a dim sum dish too', 'I'],
    ],
    image: 'intro.png',
  },
  {
    question: "You don't see anyone yet, but there is an information booth ahead with a town map.",
    options: [
      ['Glance at the map quickly and pick a random area to explore', 'P'],
      ['Make a note of where everything is and plan out your day', 'J'],
    ],
    image: 'info_booth.png',
  },
  {
    question: 'To the right of the information booth is a small shop. A siu mai leaves the shop and notices you! It starts approaching you.',
    options: [
      ["I don't see any legs, how is it moving?", 'S'],
      ['I wonder what it is thinking, will it think I am normal? What is normal for dim sum?', 'N'],
    ],
  },
  {
    question: 'The siu mai introduces itself since you are a new face in the town. It mentions you arrived just in time for the annual parade!',
    options: [
      ['Ask it when and where the parade is so you can get there early and find a good view', 'J'],
      ['Explore a bit more before figuring out where the parade is later', 'P'],
    ],
  },
  {
    question: 'The siu mai just got groceries and is going to cook with its friends after the parade. You are invited to join them later.',
    options: [
      ['Accept the invitation, this is a chance to get to know who else is living here', 'E'],
      ["Thank it for the invitation, but say you don't want to bother them. What if you can't even eat what they eat?", 'I'],
    ],
  },
  {
    question: 'The parade starts, and floats start moving down the main road.',
    options: [
      ['Admire all the pretty designs, constumes, and music being played', 'S'],
      ['Think about what dim sum culture and history as the floats pass by', 'N'],
    ],
  },
  {
    question: 'The parade is now ending. The mayor of the town shows up and announces there is a "best float" contest. Everyone is given a ballot to vote for the best float. You pick the...',
    options: [
      ['one that required the most craftsmanship', 'T'],
      ['one that expressed the most personality', 'F'],
    ],
  },
  {
    question: "It's now night time. Suddenly giant chopsticks from the sky pick you up to return you to everyday human life! As you are being lifted away, the siu mai from before yells some life advice.",
    options: [
      ["Thank the siu mai for advice and analyze the its words. Does dim sum advice even apply to a human?", 'T'],
      ["Appreciate the kindness of the siu mai. I'm glad a dim sum cares!", 'F'],
    ],
  },
];


let currentQuestionIndex = 0;

const scores = {
  E: 0,
  I: 0,

  S: 0,
  N: 0,

  T: 0,
  F: 0,

  J: 0,
  P: 0,
};

function loadQuestion() {
  if (currentQuestionIndex >= questions.length) {
    displayResult();
    return;
  }

  const question = questions[currentQuestionIndex];
  const quizContainer = document.getElementById('quiz');

  const image = question.image;
  let imageHtml = '';

  if (image != null) {
    imageHtml = `<img src="${image}" width="100%">`
  }

  quizContainer.innerHTML = `
    <div class="question">
      <h2>${question.question}</h2>
      ${imageHtml}
      <div class="options">
        ${question.options.map(([label, key]) => `
            <button onclick="selectOption(this, '${key}')">${label}</button>
        `).join('')}
      </div>
    </div>
  `;
}

function selectOption(event, option) {
  scores[option]++;
  currentQuestionIndex++;

  loadQuestion();

  event.target.blur();
}

function shouldShowBonusQuestion() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  return urlParams.has('s');
}

function displayResult() {
  const resultContainer = document.getElementById('result');
  const personality =
    (scores.E > scores.I ? 'E' : 'I') +
    (scores.S > scores.N ? 'S' : 'N') +
    (scores.T > scores.F ? 'T' : 'F') +
    (scores.J > scores.P ? 'J' : 'P');

  let extraQuestion = '';

  if (shouldShowBonusQuestion()) {
    extraQuestion = `
      <div class="question fade-in">
        <h2>Bonus Question!</h2>
        <div class="options">
          <form action="bonus.html">
            <button type="submit">What? 🤨</button>
          </form>
        </div>
      </div>
    `;
  }

  resultContainer.innerHTML = `
    <h2>Your Dim Sum Personality is: ${personality}</h2>
    ${extraQuestion}
  `;
  resultContainer.style.display = 'block';

  document.getElementById('quiz').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', loadQuestion);
