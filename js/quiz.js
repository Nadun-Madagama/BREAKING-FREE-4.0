// Quiz Logic for Project Breaking Free 4.0

const addictedQuestions = [
    {
        question: "How often do you feel you *must* have the substance to get through your day?",
        options: [
            { text: "Every single day. I can't function without it.", value: 3 },
            { text: "Mostly when I'm highly stressed or upset.", value: 2 },
            { text: "Only in social settings or occasionally.", value: 1 },
            { text: "Rarely or never.", value: 0 }
        ]
    },
    {
        question: "Have you ever tried to quit, but found yourself going back to it?",
        options: [
            { text: "Yes, many times. It feels impossible to stop.", value: 3 },
            { text: "Yes, a few times, but the cravings came back.", value: 2 },
            { text: "No, I haven't really tried yet.", value: 1 },
            { text: "No, I don't feel addicted.", value: 0 }
        ]
    },
    {
        question: "Has this habit negatively impacted your relationships or finances?",
        options: [
            { text: "Yes, significantly. It has caused arguments and financial strain.", value: 3 },
            { text: "A little bit. People close to me have mentioned it.", value: 2 },
            { text: "Not really, I try to keep it hidden.", value: 1 },
            { text: "Not at all.", value: 0 }
        ]
    },
    {
        question: "How do you feel when you think about stopping for good right now?",
        options: [
            { text: "Terrified or highly anxious.", value: 3 },
            { text: "I want to, but I honestly don't know how.", value: 2 },
            { text: "Unsure, but willing to try.", value: 1 },
            { text: "Confident I can stop whenever I want.", value: 0 }
        ]
    },
    {
        question: "If someone offered you help today, in absolute confidence and without judgment, would you take it?",
        options: [
            { text: "Yes, please. I need help.", value: 3 },
            { text: "Maybe, I need to know more about it first.", value: 2 },
            { text: "I don't think I need help.", value: 1 },
            { text: "Definitely not.", value: 0 }
        ]
    }
];

const awarenessQuestions = [
    {
        question: "According to statistics, what percentage of deaths in Sri Lanka are caused by Non-Communicable Diseases (NCDs)?",
        options: [
            { text: "75%", correct: true },
            { text: "50%", correct: false },
            { text: "25%", correct: false },
            { text: "90%", correct: false }
        ]
    },
    {
        question: "Which of the following is considered a 'Short-Term' effect of smoking?",
        options: [
            { text: "Reduced energy and breathing difficulties", correct: true },
            { text: "Heart Disease", correct: false },
            { text: "Cancer", correct: false },
            { text: "Lifelong psychological dependence", correct: false }
        ]
    },
    {
        question: "The typical 'Addiction Cycle' starts with which phase?",
        options: [
            { text: "Curiosity and Try for Fun", correct: true },
            { text: "Losing complete control immediately", correct: false },
            { text: "Repeating the habit securely without risks", correct: false },
            { text: "Becoming dependent on medications", correct: false }
        ]
    },
    {
        question: "How does the Tobacco Industry primarily maintain its income according to the awareness facts?",
        options: [
            { text: "By targeting youth through media to look 'cool' and 'normal'.", correct: true },
            { text: "By promoting healthy, active lifestyles.", correct: false },
            { text: "By aggressively decreasing their production rates annually.", correct: false },
            { text: "By openly advertising the severe health risks to children.", correct: false }
        ]
    },
    {
        question: "What is the true financial reality of an average daily smoking habit (5 cigarettes/day) over an entire year?",
        options: [
            { text: "It drains approximately Rs. 288,000 from personal futures.", correct: true },
            { text: "It is relatively cheap and has no financial strain.", correct: false },
            { text: "It actually helps improve the government economy positively.", correct: false },
            { text: "It costs roughly Rs. 5,000 per year.", correct: false }
        ]
    }
];

let currentMode = null;
let currentQuestions = [];
let currentQIndex = 0;
let userScore = 0; // For awareness mode
let severityScore = 0; // For addicted mode

document.addEventListener('DOMContentLoaded', () => {
    
    // UI Elements
    const pathSelection = document.getElementById('path-selection');
    const quizInterface = document.getElementById('quiz-interface');
    const resultsInterface = document.getElementById('results-interface');
    
    const btnAddicted = document.getElementById('btn-path-addicted');
    const btnAwareness = document.getElementById('btn-path-awareness');
    const btnNext = document.getElementById('btn-next');
    const btnRestart = document.getElementById('btn-restart');
    
    const elements = {
        pathTitle: document.getElementById('quiz-path-title'),
        currentQNum: document.getElementById('current-question-num'),
        totalQNum: document.getElementById('total-questions'),
        progressBar: document.getElementById('progress-bar'),
        questionText: document.getElementById('question-text'),
        optionsContainer: document.getElementById('options-container'),
        actionContainer: document.getElementById('action-container'),
        resultScore: document.getElementById('result-score'),
        resultSubtitle: document.getElementById('result-subtitle'),
        resultTitle: document.getElementById('result-title'),
        resultMessage: document.getElementById('result-message'),
        resultIcon: document.getElementById('result-icon'),
        resultIconWrapper: document.getElementById('result-icon-container'),
        actionLink: document.getElementById('action-link')
    };

    // Initialize Actions
    btnAddicted.addEventListener('click', () => startQuiz('addicted'));
    btnAwareness.addEventListener('click', () => startQuiz('awareness'));
    
    btnNext.addEventListener('click', () => {
        currentQIndex++;
        if(currentQIndex < currentQuestions.length) {
            renderQuestion();
        } else {
            showResults();
        }
    });

    btnRestart.addEventListener('click', () => {
        resultsInterface.classList.add('opacity-0', 'translate-y-4');
        setTimeout(() => {
            resultsInterface.classList.add('hidden');
            pathSelection.classList.remove('hidden');
            // Small delay to allow display:block to apply before animating opacity
            setTimeout(() => {
                pathSelection.classList.remove('opacity-0', 'translate-y-4');
            }, 50);
        }, 500);
    });

    function startQuiz(mode) {
        currentMode = mode;
        currentQIndex = 0;
        userScore = 0;
        severityScore = 0;
        
        if(mode === 'addicted') {
            currentQuestions = addictedQuestions;
            elements.pathTitle.innerText = "Self Assessment";
            elements.pathTitle.className = "text-xs font-bold uppercase tracking-widest text-orange-400";
        } else {
            currentQuestions = awarenessQuestions;
            elements.pathTitle.innerText = "Knowledge Test";
            elements.pathTitle.className = "text-xs font-bold uppercase tracking-widest text-accent-primary";
        }

        elements.totalQNum.innerText = currentQuestions.length;

        // Transition UI
        pathSelection.classList.add('opacity-0', '-translate-y-4');
        setTimeout(() => {
            pathSelection.classList.add('hidden');
            quizInterface.classList.remove('hidden');
            
            setTimeout(() => {
                quizInterface.classList.remove('opacity-0', 'translate-y-4');
                renderQuestion();
            }, 50);
            
        }, 500);
    }

    function renderQuestion() {
        // Hide next button
        elements.actionContainer.classList.add('hidden');
        
        const qData = currentQuestions[currentQIndex];
        
        elements.currentQNum.innerText = currentQIndex + 1;
        
        // Progress bar
        const progress = ((currentQIndex) / currentQuestions.length) * 100;
        elements.progressBar.style.width = `${progress}%`;
        
        // Question text
        elements.questionText.innerText = qData.question;
        
        // Options
        elements.optionsContainer.innerHTML = '';
        
        qData.options.forEach((opt, index) => {
            const btn = document.createElement('button');
            btn.className = "quiz-option w-full text-left p-5 rounded-2xl border border-white/10 bg-black/40 text-gray-300 font-medium hover:text-white";
            btn.innerHTML = `<span class="inline-block w-8 h-8 rounded-full border border-white/20 text-center leading-8 mr-3 text-sm flex-shrink-0 align-middle">${String.fromCharCode(65 + index)}</span> <span class="align-middle">${opt.text}</span>`;
            
            btn.onclick = () => handleAnswer(btn, opt);
            elements.optionsContainer.appendChild(btn);
        });
    }

    function handleAnswer(selectedBtn, optData) {
        // Disable all buttons
        const allBtns = elements.optionsContainer.querySelectorAll('button');
        allBtns.forEach(b => {
            b.disabled = true;
            b.classList.remove('hover:-translate-y-2', 'hover:border-accent-primary/50');
            b.style.opacity = '0.5';
        });

        selectedBtn.style.opacity = '1';

        if (currentMode === 'awareness') {
            if (optData.correct) {
                userScore++;
                selectedBtn.classList.add('selected-correct');
                selectedBtn.innerHTML += ' <i class="fas fa-check-circle float-right mt-1 text-xl"></i>';
            } else {
                selectedBtn.classList.add('selected-wrong');
                selectedBtn.innerHTML += ' <i class="fas fa-times-circle float-right mt-1 text-xl"></i>';
                
                // Highlight correct one
                const correctIndex = currentQuestions[currentQIndex].options.findIndex(o => o.correct);
                const correctBtn = allBtns[correctIndex];
                correctBtn.style.opacity = '1';
                correctBtn.classList.add('unselected-correct');
            }
        } else if (currentMode === 'addicted') {
            severityScore += optData.value;
            // Addicted mode just highlights selected, no right/wrong
            selectedBtn.classList.add('bg-white/10', 'border-white/50', 'text-white');
        }

        // Show Next Button
        elements.actionContainer.classList.remove('hidden');
    }

    function showResults() {
        // Final progress bar fill
        elements.progressBar.style.width = `100%`;

        quizInterface.classList.add('opacity-0', '-translate-y-4');
        setTimeout(() => {
            quizInterface.classList.add('hidden');
            resultsInterface.classList.remove('hidden');
            
            // Calculate Results
            if (currentMode === 'awareness') {
                const percent = Math.round((userScore / currentQuestions.length) * 100);
                elements.resultScore.innerText = `${percent}%`;
                elements.resultSubtitle.innerText = "Knowledge Score";
                elements.resultScore.className = "text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-blue-400";
                
                elements.resultIconWrapper.className = "w-24 h-24 mx-auto bg-accent-primary/20 rounded-full flex items-center justify-center mb-8 relative z-10";
                elements.resultIcon.className = "fas fa-brain text-5xl text-accent-primary";
                elements.actionLink.classList.add('hidden'); // No aggressive CTA for awareness

                if (percent === 100) {
                    elements.resultTitle.innerText = "Exceptional!";
                    elements.resultMessage.innerText = "You have a perfect understanding of the risks of addiction and the manipulative nature of the industry. Use this knowledge to stay free and educate others.";
                } else if (percent >= 60) {
                    elements.resultTitle.innerText = "Good Job!";
                    elements.resultMessage.innerText = "You've grasped the core concepts well, but remember the tobacco industry relies on subtle illusions. Stay sharp.";
                } else {
                    elements.resultTitle.innerText = "Keep Learning.";
                    elements.resultMessage.innerText = "The illusions surrounding addiction are strong. We highly recommend reviewing our Awareness page to strengthen your preventative mindset.";
                }

            } else if (currentMode === 'addicted') {
                // Max severity = 15
                elements.resultScore.innerText = "Assessment Complete";
                elements.resultScore.className = "text-3xl font-black text-white";
                elements.resultSubtitle.innerText = "Your Confidential Result";
                
                elements.actionLink.classList.remove('hidden'); 

                if (severityScore >= 10) {
                    elements.resultIconWrapper.className = "w-24 h-24 mx-auto bg-red-500/20 rounded-full flex items-center justify-center mb-8 relative z-10 animate-pulse";
                    elements.resultIcon.className = "fas fa-heartbeat text-5xl text-red-500";
                    elements.resultTitle.innerText = "Please Seek Help.";
                    elements.resultMessage.innerHTML = "Your responses indicate a <strong>high level of dependency</strong> and a heavy toll on your life.<br><br>The good news? The simple fact that you took this assessment means a part of you wants to break free. It isn't your fault, it's the chemistry. But you can take control back today. Speak to our team confidentially.";
                    elements.actionLink.className = "hidden lg:flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold py-3 px-8 rounded-full transition-transform hover:-translate-y-1 shadow-[0_0_20px_rgba(239,68,68,0.4)]";
                } else if (severityScore >= 5) {
                    elements.resultIconWrapper.className = "w-24 h-24 mx-auto bg-orange-500/20 rounded-full flex items-center justify-center mb-8 relative z-10";
                    elements.resultIcon.className = "fas fa-exclamation-triangle text-5xl text-orange-500";
                    elements.resultTitle.innerText = "You Are At Risk.";
                    elements.resultMessage.innerText = "The habit is starting to control you more than you control it. You might feel you can stop at any time, but the hooks are setting in. Consider joining a Transformation Camp before the dependency deepens.";
                    elements.actionLink.className = "hidden lg:flex items-center gap-2 bg-accent-primary hover:bg-teal-600 text-white font-bold py-3 px-8 rounded-full transition-transform hover:-translate-y-1";
                } else {
                    elements.resultIconWrapper.className = "w-24 h-24 mx-auto bg-green-500/20 rounded-full flex items-center justify-center mb-8 relative z-10";
                    elements.resultIcon.className = "fas fa-leaf text-5xl text-green-500";
                    elements.resultTitle.innerText = "Early Stages.";
                    elements.resultMessage.innerText = "You are demonstrating very mild psychological ties to the substance. Now is the perfect time to walk away clean. Don't wait until the cycle restricts your freedom.";
                    elements.actionLink.className = "hidden lg:flex items-center gap-2 bg-accent-primary hover:bg-teal-600 text-white font-bold py-3 px-8 rounded-full transition-transform hover:-translate-y-1";
                }
            }

            setTimeout(() => {
                resultsInterface.classList.remove('opacity-0', '-translate-y-4');
            }, 50);

        }, 500);
    }
});
