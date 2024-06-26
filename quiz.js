const questions = [
  {
    question: 'You wake up as a dim sum item in a magical dim sum world. What is your first reaction?',
    options: [
      ['Explore and meet other dim sum items!', 'E'],
      ['Stay in your steamer and observe quietly.', 'I'],
      ['Find a friend to share this experience with.', 'F'],
      ['Worry about how you got here and how to get back.', 'N'],
    ],
  },
  {
    question: 'In this world, a dumpling party is happening. What do you do?',
    options: [
      ['Join the party and socialize with everyone.', 'E'],
      ['Find a quiet corner to enjoy the party from a distance.', 'I'],
      ['Help organize the party to make sure everyone is having fun.', 'F'],
      ["Wonder why there's a party and what the purpose is.", 'N'],
    ],
  },
  {
    question: 'A steamed bun asks you for advice on filling choices. How do you respond?',
    options: [
      ['Give a logical analysis of each option.', 'T'],
      ['Suggest a filling that feels right for them.', 'F'],
      ['Ask them about their preferences and feelings.', 'F'],
      ['Help them choose the most popular filling.', 'J'],
    ],
  },
  {
    question: 'You have to choose a path through the Dim Sum Forest. Which path do you take?',
    options: [
      ['The well-trodden path with clear directions.', 'J'],
      ['The mysterious path that no one has explored.', 'P'],
      ['The path that your friends are taking.', 'F'],
      ['The path that seems safest and most predictable.', 'S'],
    ],
  },
  {
    question: 'A fortune cookie gives you a vague fortune. How do you react?',
    options: [
      ['Analyze the fortune for hidden meanings.', 'N'],
      ['Take it as it is and move on.', 'S'],
      ['Discuss it with others to see their interpretations.', 'F'],
      ['Feel excited about the possibilities it suggests.', 'N'],
    ],
  },
  {
    question: 'You meet a wise old dumpling who offers you advice. How do you feel?',
    options: [
      ['Grateful and eager to learn.', 'T'],
      ['Skeptical but curious.', 'N'],
      ['Comforted and reassured.', 'F'],
      ['Worried about why you need advice.', 'N'],
    ],
  },
  {
    question: 'You find a map to a secret dim sum treasure. What do you do?',
    options: [
      ['Follow the map immediately.', 'J'],
      ['Analyze the map for authenticity.', 'T'],
      ['Ask others if they want to join the adventure.', 'E'],
      ['Wonder if the treasure is worth finding.', 'N'],
    ],
  },
  {
    question: 'In the Dim Sum Market, what catches your eye?',
    options: [
      ['The bustling activity and variety of items.', 'E'],
      ['A quiet stall with unique offerings.', 'I'],
      ['A vendor with a warm, friendly smile.', 'F'],
      ['An intriguing item with a mysterious background.', 'N'],
    ],
  },
  {
    question: 'How do you handle conflict with another dim sum item?',
    options: [
      ['Address it directly and logically.', 'T'],
      ['Avoid it and hope it resolves itself.', 'I'],
      ['Seek a compromise that satisfies both parties.', 'F'],
      ['Feel stressed and overthink the situation.', 'N'],
    ],
  },
  {
    question: 'Your journey in the dim sum world is ending. What are your thoughts?',
    options: [
      ['Reflect on the logical lessons learned.', 'T'],
      ['Think about the friends made along the way.', 'F'],
      ['Plan to return and explore more.', 'J'],
      ['Worry about transitioning back to the real world.', 'N'],
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
  quizContainer.innerHTML = `
    <div class="question">
      <h2>${question.question}</h2>
      <div class="options">
        ${question.options.map(([label, key]) => `
            <button onclick="selectOption('${key}')">${label}</button>
        `).join('')}
      </div>
    </div>
  `;
}

function selectOption(option) {
  scores[option]++;
  currentQuestionIndex++;

  loadQuestion();
}

function displayResult() {
  const resultContainer = document.getElementById('result');
  const personality =
    (scores.E > scores.I ? 'E' : 'I') +
    (scores.S > scores.N ? 'S' : 'N') +
    (scores.T > scores.F ? 'T' : 'F') +
    (scores.J > scores.P ? 'J' : 'P');

  resultContainer.innerHTML = `<h2>Your Dim Sum Personality is: ${personality}</h2>`;
  resultContainer.style.display = 'block';

  document.getElementById('quiz').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', loadQuestion);
