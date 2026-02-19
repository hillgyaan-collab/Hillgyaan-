const questions = [
  {
    question: "शिक्षण की प्रभावी प्रक्रिया में सबसे महत्वपूर्ण क्या है?",
    options: ["एकतरफा व्याख्यान", "शिक्षार्थी की सक्रिय भागीदारी", "केवल नोट्स देना", "कठोर अनुशासन"],
    answer: 1
  },
  {
    question: "अनुसंधान में Hypothesis का मुख्य उद्देश्य क्या है?",
    options: ["डेटा छिपाना", "अध्ययन को दिशा देना", "रिपोर्ट लंबी बनाना", "निष्कर्ष बदलना"],
    answer: 1
  },
  {
    question: "Communication का कौन-सा रूप तुरंत फीडबैक देता है?",
    options: ["लिखित पत्र", "रिकॉर्डेड संदेश", "आमने-सामने संवाद", "पोस्टर"],
    answer: 2
  },
  {
    question: "ICT का शिक्षा में एक प्रमुख लाभ क्या है?",
    options: ["सीखने के संसाधनों तक आसान पहुँच", "शिक्षण समय हमेशा कम करना", "परीक्षा समाप्त करना", "केवल मनोरंजन"],
    answer: 0
  },
  {
    question: "Higher education में CBCS का अर्थ है:",
    options: ["Choice Based Credit System", "Central Board Course Study", "Credit Balance Course Scheme", "Choice Board Class Structure"],
    answer: 0
  },
  {
    question: "Data interpretation में median किसे कहते हैं?",
    options: ["सबसे अधिक आने वाला मान", "सभी मानों का औसत", "क्रमबद्ध डेटा का मध्य मान", "सबसे छोटा मान"],
    answer: 2
  },
  {
    question: "पर्यावरण अध्ययन में Sustainable development का अर्थ है:",
    options: ["सिर्फ औद्योगिक विकास", "वर्तमान जरूरतें पूरी करते हुए भविष्य की क्षमता सुरक्षित रखना", "वनों की कटाई बढ़ाना", "केवल शहरीकरण"],
    answer: 1
  },
  {
    question: "Reasoning में syllogism का उपयोग किस लिए होता है?",
    options: ["भाषा अनुवाद", "तार्किक निष्कर्ष निकालना", "डेटा एंट्री", "ग्राफ बनाना"],
    answer: 1
  },
  {
    question: "भारतीय उच्च शिक्षा नियामक संस्था UGC का मुख्य कार्य क्या है?",
    options: ["स्कूल पाठ्यपुस्तक छापना", "विश्वविद्यालयों में मानक और अनुदान सुनिश्चित करना", "केवल प्रतियोगी परीक्षा कराना", "कॉलेजों का दैनिक संचालन"],
    answer: 1
  },
  {
    question: "Paper 1 में aptitude से आशय है:",
    options: ["केवल विषय ज्ञान", "शिक्षण एवं शोध के प्रति योग्यता", "सिर्फ गणित क्षमता", "केवल भाषा कौशल"],
    answer: 1
  }
];

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

const progress = document.getElementById("progress");
const scoreEl = document.getElementById("score");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const resultSummary = document.getElementById("result-summary");
const reviewList = document.getElementById("review-list");

let currentIndex = 0;
let score = 0;
let userAnswers = [];

function showScreen(screen) {
  [startScreen, quizScreen, resultScreen].forEach((el) => el.classList.remove("active"));
  screen.classList.add("active");
}

function startQuiz() {
  currentIndex = 0;
  score = 0;
  userAnswers = [];
  scoreEl.textContent = `अंक: ${score}`;
  showScreen(quizScreen);
  renderQuestion();
}

function renderQuestion() {
  const q = questions[currentIndex];
  progress.textContent = `प्रश्न ${currentIndex + 1} / ${questions.length}`;
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";
  nextBtn.disabled = true;

  q.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = "option-btn";
    button.textContent = option;
    button.addEventListener("click", () => selectOption(index, button));
    optionsEl.appendChild(button);
  });
}

function selectOption(selectedIndex, selectedButton) {
  const q = questions[currentIndex];
  const buttons = Array.from(optionsEl.children);
  buttons.forEach((btn) => (btn.disabled = true));
  selectedButton.classList.add("selected");

  const isCorrect = selectedIndex === q.answer;
  if (isCorrect) {
    score += 1;
    scoreEl.textContent = `अंक: ${score}`;
    selectedButton.classList.add("correct");
  } else {
    selectedButton.classList.add("wrong");
    buttons[q.answer].classList.add("correct");
  }

  userAnswers.push({
    question: q.question,
    selected: q.options[selectedIndex],
    correct: q.options[q.answer],
    isCorrect
  });

  nextBtn.disabled = false;
}

function nextQuestion() {
  currentIndex += 1;
  if (currentIndex < questions.length) {
    renderQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  showScreen(resultScreen);
  const percentage = Math.round((score / questions.length) * 100);
  resultSummary.textContent = `आपने ${questions.length} में से ${score} सही किए। स्कोर: ${percentage}%`;

  reviewList.innerHTML = "";
  userAnswers.forEach((item, i) => {
    const review = document.createElement("div");
    review.className = "review-item";
    review.innerHTML = `
      <p><strong>Q${i + 1}.</strong> ${item.question}</p>
      <p>आपका उत्तर: ${item.selected}</p>
      <p>सही उत्तर: ${item.correct}</p>
      <span class="tag ${item.isCorrect ? "correct" : "wrong"}">
        ${item.isCorrect ? "सही" : "गलत"}
      </span>
    `;
    reviewList.appendChild(review);
  });
}

startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", startQuiz);
