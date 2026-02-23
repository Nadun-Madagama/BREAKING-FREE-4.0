document.addEventListener('DOMContentLoaded', () => {
    // Game State
    let state = {
        name: '',
        school: '',
        className: '',
        hopeScore: 50,
        currentSceneIndex: 0,
        activeScenes: []
    };

    // DOM Elements
    const regForm = document.getElementById('registration-form');
    const registrationScreen = document.getElementById('registration-screen');
    const gameScreen = document.getElementById('game-screen');
    const resultScreen = document.getElementById('result-screen');
    const progressContainer = document.getElementById('progress-container');
    const hopeScoreDisplay = document.getElementById('hope-score');
    const progressBar = document.getElementById('progress-bar');
    const sceneBgLayer = document.getElementById('scene-bg-layer');
    const dynamicBg = document.getElementById('dynamic-bg');

    // Check if player has already played
    const hasPlayed = localStorage.getItem('breakingFree_hasPlayed');
    if (hasPlayed) {
        registrationScreen.innerHTML = `
            <div class="content-box text-center">
                <h1>Attention</h1>
                <p>You have already completed the challenge. To ensure fairness for the leaderboard, each student is allowed only one attempt.</p>
                <div id="leaderboard-section">
                    <hr>
                    <h3>Top 10 Leaders</h3>
                    <div class="leaderboard-table-container">
                        <table id="leaderboard-table">
                            <thead><tr><th>Name</th><th>School | Class</th><th>Score</th></tr></thead>
                            <tbody></tbody>
                        </table>
                    </div>
                </div>
                <a href="index.html" class="btn-primary">Back to Home</a>
            </div>
        `;
        displayLeaderboard();
        return;
    }

    // Game Scene Elements
    const sceneTitle = document.getElementById('scene-title');
    const sceneDescription = document.getElementById('scene-description');
    const choicesContainer = document.getElementById('choices-container');

    // Result Elements
    const endingTitle = document.getElementById('ending-title');
    const endingDescription = document.getElementById('ending-description');
    const motivationalMessage = document.getElementById('motivational-message');
    const finalScoreDisplay = document.getElementById('final-score');
    // Restart button removed for "one chance" rule

    // Pool of 15 Cinematic Scenes
    const allScenes = [
        {
            title: "The Party Invitation",
            image: "assets/scene1.png",
            description: "You're at a friend's house party. A group of older students approaches you. One pulls out a small packet. 'Hey, try this. It'll make the music sound better and all your stress disappear. Everyone's doing it.'",
            choices: [
                { text: "Say yes to fit in and try it.", impact: -30 },
                { text: "Politely refuse and leave the group.", impact: +20 },
                { text: "Explain the dangers and suggest something else.", impact: +30 }
            ]
        },
        {
            title: "Exam Pressure",
            image: "assets/scene2.png",
            description: "Exam season is here. You haven't slept well in days. A cousin tells you they have some 'pills' that help people focus and stay awake without getting tired.",
            choices: [
                { text: "Use the substances to escape the stress.", impact: -30 },
                { text: "Talk to a trusted teacher about the pressure.", impact: +20 },
                { text: "Practice healthy coping: go for a run.", impact: +30 }
            ]
        },
        {
            title: "Digital Temptation",
            image: "assets/scene1.png",
            description: "You see a viral video claiming that certain 'natural' substances are harmless and boost creativity. You find a link to buy them easily online.",
            choices: [
                { text: "Order some to see if it helps your art.", impact: -25 },
                { text: "Research the actual medical side effects.", impact: +20 },
                { text: "Block the content and focus on real skills.", impact: +30 }
            ]
        },
        {
            title: "The Silent Struggle",
            image: "assets/scene2.png",
            description: "Family problems at home are making you feel hopeless. A neighbor notices you're down and offers you something to 'numb the pain'.",
            choices: [
                { text: "Accept it to forget your problems for a while.", impact: -30 },
                { text: "Politely decline and go to a friend's house.", impact: +15 },
                { text: "Share your feelings with a mentor or counselor.", impact: +35 }
            ]
        },
        {
            title: "Locker Room Secret",
            image: "assets/scene1.png",
            description: "Your sports teammate is using performance enhancers and suggests you do the same to get into the starting lineup.",
            choices: [
                { text: "Try it just once to secure your spot.", impact: -35 },
                { text: "Refuse and warn them about the health risks.", impact: +25 },
                { text: "Report the situation to your coach privately.", impact: +30 }
            ]
        },
        {
            title: "Curiosity's Edge",
            image: "assets/scene1.png",
            description: "You're alone and find some old medications in the cabinet. You wonder if they can give you a 'buzz' mentioned in a movie.",
            choices: [
                { text: "Experiment just to see what happens.", impact: -30 },
                { text: "Put them back and find a positive hobby.", impact: +20 },
                { text: "Talk to your parents about safe medicine use.", impact: +30 }
            ]
        },
        {
            title: "The 'Cool Crowd'",
            image: "assets/scene1.png",
            description: "The most popular group in school invites you to hang out, but you realize they are vaping in secret. They hand you the device.",
            choices: [
                { text: "Take a hit to avoid being mocked.", impact: -25 },
                { text: "Say 'No thanks' and stay.", impact: +10 },
                { text: "Leave and find friends who respect your health.", impact: +30 }
            ]
        },
        {
            title: "The After-School Offer",
            image: "assets/scene2.png",
            description: "While walking home, a stranger offers you a free 'energy' drink that looks suspiciously homemade and unauthorized.",
            choices: [
                { text: "Try it since it's free and you're tired.", impact: -30 },
                { text: "Ignore the stranger and keep walking fast.", impact: +25 },
                { text: "Alert community security about the encounter.", impact: +30 }
            ]
        },
        {
            title: "Celebration Trap",
            image: "assets/scene1.png",
            description: "Your team won a big match. To celebrate, someone brings out illegal substances. 'One night won't hurt,' they say.",
            choices: [
                { text: "Join in; you've earned a 'break'.", impact: -30 },
                { text: "Stick to soft drinks and music.", impact: +20 },
                { text: "Suggest a proper victory dinner instead.", impact: +30 }
            ]
        },
        {
            title: "Stress Relief Myth",
            image: "assets/scene2.png",
            description: "You're overwhelmed by work. An online 'health' guru suggests a new herbal drug for stress. It's not FDA approved.",
            choices: [
                { text: "Buy it; 'natural' must be safe.", impact: -20 },
                { text: "Check with a doctor before taking anything.", impact: +25 },
                { text: "Stick to sleeping well and exercise.", impact: +30 }
            ]
        },
        {
            title: "A Friend's Change",
            image: "assets/scene2.png",
            description: "Your best friend has started acting strange and asks you to hide some pills for them. They say it's just 'safe' fun.",
            choices: [
                { text: "Hide them; you're a loyal friend.", impact: -35 },
                { text: "Refuse and tell them you're worried.", impact: +20 },
                { text: "Encourage them to see a counselor together.", impact: +35 }
            ]
        },
        {
            title: "The Part-Time Job",
            image: "assets/scene1.png",
            description: "At your new job, a coworker offers you substances to 'handle the long shifts'.",
            choices: [
                { text: "Accept it to keep up with the work pace.", impact: -30 },
                { text: "Decline and mention it to the manager.", impact: +20 },
                { text: "Focus on better time management instead.", impact: +25 }
            ]
        },
        {
            title: "The Influence",
            image: "assets/scene1.png",
            description: "Your favorite musician is shown using drugs in an interview, claiming it's why they are so famous.",
            choices: [
                { text: "Believe them and consider trying it.", impact: -25 },
                { text: "Acknowledge their talent but ignore the vice.", impact: +15 },
                { text: "Realize many artists' lives were ruined by drugs.", impact: +30 }
            ]
        },
        {
            title: "Boredom Strike",
            image: "assets/scene1.png",
            description: "It's a boring weekend. Someone suggests going to a place known for drug activity just for 'excitement'.",
            choices: [
                { text: "Go along just to see what it's like.", impact: -25 },
                { text: "Stay home and work on a creative project.", impact: +20 },
                { text: "Organize an active hike for everyone.", impact: +35 }
            ]
        },
        {
            title: "The Ultimate Choice",
            image: "assets/scene3.png",
            description: "You are at a crossroad. You've seen the impact of drugs on others. What is your commitment to yourself?",
            choices: [
                { text: "I'll do whatever feels good at the time.", impact: -20 },
                { text: "I'll try my best to stay safe.", impact: +20 },
                { text: "I will live a clean, drug-free life and help others.", impact: +40 }
            ]
        }
    ];

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Functions
    function updateProgress() {
        const progress = Math.min((state.currentSceneIndex / state.activeScenes.length) * 100, 100);
        progressBar.style.setProperty('--progress', `${progress}%`);
        hopeScoreDisplay.textContent = state.hopeScore;

        // Dynamic Lighting based on score
        const blurValue = Math.max(0, 15 - (state.hopeScore / 10));
        const brightnessValue = 0.5 + (state.hopeScore / 200);
        dynamicBg.style.filter = `blur(${blurValue}px) brightness(${brightnessValue})`;

        // Theme logic
        if (state.hopeScore > 75) {
            document.body.className = 'theme-light';
        } else {
            document.body.className = 'theme-dark';
        }
    }

    function showScene(index) {
        if (index >= state.activeScenes.length) {
            showEndGame();
            return;
        }

        const scene = state.activeScenes[index];

        // Update Scene Background
        sceneBgLayer.style.opacity = '0';
        setTimeout(() => {
            sceneBgLayer.style.backgroundImage = `url('${scene.image}')`;
            sceneBgLayer.style.opacity = '0.3'; // Subtle overlay
        }, 400);

        sceneTitle.textContent = scene.title;
        sceneDescription.textContent = scene.description;
        choicesContainer.innerHTML = '';

        scene.choices.forEach(choice => {
            const btn = document.createElement('button');
            btn.className = 'choice-btn';
            btn.textContent = choice.text;
            btn.onclick = () => handleChoice(choice);
            choicesContainer.appendChild(btn);
        });

        updateProgress();
    }

    function handleChoice(choice) {
        state.hopeScore += choice.impact;
        state.hopeScore = Math.max(0, Math.min(150, state.hopeScore));

        state.currentSceneIndex++;

        const contentBox = document.querySelector('.content-box');
        contentBox.classList.add('fade-out');

        setTimeout(() => {
            showScene(state.currentSceneIndex);
            contentBox.classList.remove('fade-out');
            contentBox.style.animation = 'none';
            contentBox.offsetHeight; // trigger reflow
            contentBox.style.animation = null;
        }, 400);
    }

    function showEndGame() {
        gameScreen.classList.add('hidden');
        progressContainer.classList.add('hidden');
        resultScreen.classList.remove('hidden');
        sceneBgLayer.style.opacity = '0';

        finalScoreDisplay.textContent = state.hopeScore;

        let title = '';
        let desc = '';
        let motiv = '';
        let finalBg = '';

        if (state.hopeScore < 50) {
            title = "Ending: Trapped in Addiction";
            desc = "Your choices led you down a path where substances became a crutch. You feel disconnected from your family and your dreams seem far away.";
            motiv = "It's never too late to break free. Your life is valuable.";
            document.body.className = 'theme-dark';
            finalBg = "assets/scene1.png";
        } else if (state.hopeScore < 90) {
            title = "Ending: Fighting to Recover";
            desc = "You've faced some tough battles and made some mistakes, but you're not giving up. You are learning to handle pressure without drugs.";
            motiv = "Progress isn't linear. Keep choosing health every day.";
            document.body.className = 'theme-dark';
            finalBg = "assets/scene2.png";
        } else {
            title = "Ending: Breaking Free and Inspiring Others";
            desc = "You stood tall against peer pressure and found healthy ways to manage your emotions. Your mind is clear and your body is strong.";
            motiv = "You are the master of your fate. Lead the way!";
            document.body.className = 'theme-light';
            finalBg = "assets/scene3.png";
        }

        setTimeout(() => {
            sceneBgLayer.style.backgroundImage = `url('${finalBg}')`;
            sceneBgLayer.style.opacity = '0.5';
        }, 100);

        endingTitle.textContent = title;
        endingDescription.textContent = desc;
        motivationalMessage.textContent = motiv;

        saveToLeaderboard();
        displayLeaderboard();
    }

    function saveToLeaderboard() {
        const leaderboard = JSON.parse(localStorage.getItem('breakingFreeLeaderboard') || '[]');
        leaderboard.push({
            name: state.name,
            school: state.school,
            className: state.className,
            score: state.hopeScore,
            timestamp: Date.now()
        });
        leaderboard.sort((a, b) => b.score - a.score);
        localStorage.setItem('breakingFreeLeaderboard', JSON.stringify(leaderboard.slice(0, 10)));

        // Mark as played to prevent multiple attempts
        localStorage.setItem('breakingFree_hasPlayed', 'true');
    }

    function displayLeaderboard() {
        const leaderboard = JSON.parse(localStorage.getItem('breakingFreeLeaderboard') || '[]');
        const tbody = document.querySelector('#leaderboard-table tbody');
        tbody.innerHTML = '';
        leaderboard.forEach(entry => {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${entry.name}</td><td>${entry.school} | ${entry.className}</td><td><strong>${entry.score}</strong></td>`;
            tbody.appendChild(tr);
        });
    }

    // Event Listeners
    regForm.onsubmit = (e) => {
        e.preventDefault();
        state.name = document.getElementById('student-name').value;
        state.school = document.getElementById('school-name').value;
        state.className = document.getElementById('class-name').value;

        // Randomize 5 questions from the pool
        const shuffled = shuffle([...allScenes]);
        state.activeScenes = shuffled.slice(0, 5);
        state.currentSceneIndex = 0;

        registrationScreen.classList.add('hidden');
        gameScreen.classList.remove('hidden');
        progressContainer.classList.remove('hidden');
        showScene(0);
    };

    // Final cleanup
});
