const UPLOADED_AUDIO_URL = "song.m4a";

const stepsOrder = ['step-0', 'step-1', 'step-quiz', 'step-1-5', 'step-5', 'step-flower', 'step-7', 'step-8', 'step-9'];
let currentIdx = 0;
const totalStepsCount = stepsOrder.length - 1;

const progressContainer = document.getElementById('progress-container');
if (progressContainer) {
    for (let i = 1; i <= totalStepsCount; i++) {
        const dot = document.createElement('div');
        dot.className = `progress-dot dot-${i}`;
        progressContainer.appendChild(dot);
    }
}

// IMPROVED AUDIO INITIALIZATION
function initializeAudio() {
    const audio = document.getElementById('main-audio');
    const source = document.getElementById('audio-source');
    const placeholder = document.getElementById('audio-placeholder');
    const status = document.getElementById('audio-status');

    status.innerText = "Loading the vibe... 💿";

    source.src = UPLOADED_AUDIO_URL;
    audio.load();
    audio.classList.remove('hidden');
    placeholder.classList.add('hidden');

    // Try playing immediately
    const playPromise = audio.play();

    if (playPromise !== undefined) {
        playPromise.then(() => {
            status.innerText = "Your Voice is soooooo... 😭🎶";
        }).catch(error => {
            console.error("Audio error:", error);
            status.innerText = "Please tap the 'Play' icon below! 👆";
        });
    }
}

function handlePasswordInput() {
    const input = document.getElementById('password-input');
    const gif = document.getElementById('password-gif');

    if (input.value.length > 0) {
        if (!gif.src.includes('code-open.gif')) {
            gif.src = 'assets/gif/code-open.gif';
        }
    } else {
        gif.src = 'assets/gif/code-close.gif';
    }
}

function checkPassword() {
    const input = document.getElementById('password-input').value.toLowerCase().trim();
    const hint = document.getElementById('password-hint');
    if (input === 'babyyy') {
        hint.innerText = "Correct! Unlocking... 💖";
        setTimeout(() => {
            nextStep();
            document.getElementById('easter-eggs').classList.remove('hidden');
        }, 1000);
    } else {
        hint.innerText = "Nuh uh gurl! 😒";
        playErrorSound();
        document.getElementById('password-input').value = "";
    }
}

function updateProgress() {
    document.querySelectorAll('.progress-dot').forEach((dot, idx) => {
        dot.classList.toggle('active', idx + 1 === currentIdx);
    });
    if (currentIdx > 1 && progressContainer) progressContainer.classList.remove('hidden');
}

function nextStep() {
    if (currentIdx < stepsOrder.length - 1) {
        document.getElementById(stepsOrder[currentIdx]).classList.remove('active');
        currentIdx++;
        document.getElementById(stepsOrder[currentIdx]).classList.add('active');
        document.getElementById(stepsOrder[currentIdx]).classList.add('fade-in');

        if (stepsOrder[currentIdx] === 'step-flower') {
            document.getElementById('step-flower').addEventListener('mousemove', (e) => spawnSparkles(e));
            setInterval(() => spawnSparkles(), 1000);
        }

        if (stepsOrder[currentIdx] === 'step-9') {
            setInterval(spawnLilyPetals, 500);
        }

        if (stepsOrder[currentIdx] === 'step-8') {
            setTimeout(startLetterTypewriter, 500);
        }

        updateProgress();
        playPop();
    }
}

function spawnSparkles(e) {
    const sparkles = ['✨', '🌸', '💫', '💖', '🌷'];
    for (let i = 0; i < 2; i++) {
        const s = document.createElement('div');
        s.innerText = sparkles[Math.floor(Math.random() * sparkles.length)];
        s.className = 'sparkle-particle';

        const x = e ? e.clientX : Math.random() * window.innerWidth;
        const y = e ? e.clientY : Math.random() * window.innerHeight;

        s.style.left = x + 'px';
        s.style.top = y + 'px';

        document.body.appendChild(s);
        setTimeout(() => s.remove(), 1500);
    }
}

// Logic for interactions (hearts, rage, movies, etc)
function chat(msg) {
    const toast = document.getElementById('toast');
    toast.innerText = msg;
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 3000);
    playPop();
}

function startObedience() {
    document.getElementById('obedience-msg').innerText = "Updating as ordered, Boss! 🫡";
    const now = new Date();
    document.getElementById('countdown-display').innerText = now.toLocaleTimeString();
    spawnHearts({ clientX: window.innerWidth / 2, clientY: 200 }, '⌛');
}

function rageBait() {
    const rageStates = ['😏', '😝', '😜', '😤', '😡', '💀'];
    const statusEl = document.getElementById('rage-status');
    const currentRage = rageStates.indexOf(statusEl.innerText);
    const nextRage = (currentRage + 1) % rageStates.length;
    statusEl.innerText = rageStates[nextRage];
    playPop();
}

function checkQuizOption(isCorrect) {
    if (isCorrect) {
        chat("Yeahhh! That's our song 🫶");
        setTimeout(() => {
            nextStep();
        }, 1500);
    } else {
        const stickers = ['🙄', '😒', '😔', '😤'];
        const randomSticker = stickers[Math.floor(Math.random() * stickers.length)];
        chat(`Don't act like you donn't know... ${randomSticker}`);
    }
}

// Photo Reveal Logic
function revealPhoto() {
    const img = document.getElementById('reveal-img');
    const text = document.getElementById('reveal-text');
    const hint = document.getElementById('reveal-hint');
    const buttons = document.getElementById('action-buttons');
    const slapBtn = document.getElementById('slap-btn');

    if (img.src.includes('1.jpg')) {
        img.style.transform = 'scale(0.8) rotate(-10deg) opacity(0)';
        setTimeout(() => {
            img.src = '2.jpg';
            img.classList.add('revealed');
            img.style.transform = '';
            text.innerText = "Who did you thought? It's obviously your babyyy MEEE! 😘♥️♥️";
            hint.classList.add('hidden');
            buttons.classList.remove('hidden');
        }, 300);
    }
}

function kissAction(isKiss) {
    if (isKiss) {
        chat("That's right. He deserves all the kisses 😌💋");
    } else {
        const slapBtn = document.getElementById('slap-btn');
        if (!slapBtn.classList.contains('morphed')) {
            chat("NONONO... 😒 tete sajhilai? Nope only kisses!");
            slapBtn.classList.add('slap-morph');
            setTimeout(() => {
                slapBtn.innerText = "Kiss more 💋";
                slapBtn.classList.add('morphed');
            }, 500);
        } else {
            chat("He deserves even MORE kisses! 😌💗");
        }
    }

    spawnKisses();
    document.getElementById('next-reveal-btn').classList.remove('hidden');
}

function spawnKisses() {
    for (let i = 0; i < 20; i++) {
        const k = document.createElement('div');
        k.innerText = '💋';
        k.className = 'kiss-emoji';
        k.style.left = Math.random() * 100 + 'vw';
        k.style.top = Math.random() * 100 + 'vh';

        const tx = (Math.random() - 0.5) * 400;
        const ty = (Math.random() - 0.5) * 400;
        const tr = (Math.random() - 0.5) * 360;

        k.style.setProperty('--tx', `${tx}px`);
        k.style.setProperty('--ty', `${ty}px`);
        k.style.setProperty('--tr', `${tr}deg`);

        document.body.appendChild(k);
        setTimeout(() => k.remove(), 2000);
    }
}

function cryConfetti(e) {
    for (let i = 0; i < 15; i++) spawnParticle(e.clientX, e.clientY, ['💧', '♥️', '💖'][Math.floor(Math.random() * 3)]);
    chat("Turn those tears into hearts! 🎀");
}

function spawnHearts(e, emoji) {
    for (let i = 0; i < 8; i++) spawnParticle(e.clientX || window.innerWidth / 2, e.clientY || 300, emoji || '💖');
    playPop();
}

function spawnParticle(x, y, char) {
    const p = document.createElement('div');
    p.innerText = char;
    p.className = 'heart-particle text-2xl';
    p.style.left = x + 'px';
    p.style.top = y + 'px';
    const dx = (Math.random() - 0.5) * 400;
    const dy = (Math.random() - 0.5) * 400;
    p.style.setProperty('--x', `${dx}px`);
    p.style.setProperty('--y', `${dy}px`);
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 2000);
}

function moviePop(title, note) {
    const modal = document.createElement('div');
    modal.className = "fixed inset-0 bg-black/40 backdrop-blur-sm z-[400] flex items-center justify-center p-6";
    modal.innerHTML = `
        <div class="bg-white p-6 rounded-[30px] max-w-xs text-center border-4 border-pink-100 shadow-2xl fade-in">
            <h3 class="title-font text-2xl text-pink-500 mb-2">${title}</h3>
            <p class="text-lg mb-4">${note}</p>
            <button onclick="this.parentElement.parentElement.remove()" class="btn-valentine px-6 py-2 rounded-full">Love it 🩷</button>
        </div>
    `;
    document.body.appendChild(modal);
    playPop();
}

// function moveNo() {
//     const btn = document.getElementById('no-btn');
//     const x = Math.random() * (window.innerWidth - 100);
//     const y = Math.random() * (window.innerHeight - 50);
//     btn.style.position = 'fixed';
//     btn.style.left = x + 'px';
//     btn.style.top = y + 'px';
//     chat("Button error: Option forbidden! 😏");
// }
function moveNo() {
    const btn = document.getElementById('no-btn');
    const yesBtn = document.getElementById('yes-btn');

    // Trigger the crying gif (important for mobile since onmouseenter doesn't fire)
    handleNoEnter();

    // Get button dimensions
    const btnWidth = btn.offsetWidth;
    const btnHeight = btn.offsetHeight;

    // Get Yes button position to avoid overlap
    const yesRect = yesBtn.getBoundingClientRect();

    // Calculate safe boundaries (with some padding from edges)
    const padding = 20;
    const maxX = window.innerWidth - btnWidth - padding;
    const maxY = window.innerHeight - btnHeight - padding;

    let randomX, randomY;
    let attempts = 0;
    const maxAttempts = 20;

    // Keep trying until we find a position that doesn't overlap Yes button
    do {
        randomX = Math.max(padding, Math.floor(Math.random() * maxX));
        randomY = Math.max(padding, Math.floor(Math.random() * maxY));
        attempts++;

        // Check if this position would overlap with Yes button
        // Add 50px buffer around Yes button
        const buffer = 50;
        const overlapsYes = (
            randomX < yesRect.right + buffer &&
            randomX + btnWidth > yesRect.left - buffer &&
            randomY < yesRect.bottom + buffer &&
            randomY + btnHeight > yesRect.top - buffer
        );

        if (!overlapsYes) break;
    } while (attempts < maxAttempts);

    // Apply new position
    btn.style.position = 'fixed';
    btn.style.left = `${randomX}px`;
    btn.style.top = `${randomY}px`;
    btn.style.transform = 'none';

    // Show a playful message occasionally
    if (Math.random() < 0.3) {
        const messages = [
            "Nope! Try again! 😏",
            "Button error: Option forbidden! 😜",
            "Why you want No? 🙄",
            "Ahha Mildainna! 🙅",
        ];
        chat(messages[Math.floor(Math.random() * messages.length)]);
    }
}

function celebrate() {
    document.getElementById('finale-stage-1').classList.add('hidden');
    document.getElementById('finale-stage-2').classList.remove('hidden');
    setInterval(() => {
        const x = Math.random() * window.innerWidth;
        const emoji = ['❤️', '💖', '🎀', '♥️', '💋'][Math.floor(Math.random() * 5)];
        const p = document.createElement('div');
        p.innerText = emoji;
        p.style.position = 'fixed';
        p.style.left = x + 'px';
        p.style.top = '-50px';
        p.style.fontSize = Math.random() * 20 + 20 + 'px';
        p.style.transition = 'all 4s linear';
        document.body.appendChild(p);
        setTimeout(() => { p.style.top = window.innerHeight + 50 + 'px'; p.style.transform = `rotate(${Math.random() * 360}deg)`; }, 100);
        setTimeout(() => p.remove(), 4000);
    }, 100);
}

const letterText = `Mero Babyyy,

I know i messed up even with your hints i froze, delayed, and hurt you and I'm really sorry for that ik you don't want  to hear this again.

But please know this I love you soo much with my stubborn and trying to be better heart. I'm trying, falling, standing again and you still gave me a chance and i don't want to fumble.
I hope i can make it up to you.

I love you babyyy and i want to make sure i also match the efforts you put in.
                            - Your Babyyy ❤️♥️`;

function startLetterTypewriter() {
    const container = document.getElementById('typewriter-content');
    const photo = document.getElementById('notebook-photo');
    const nextBtn = document.getElementById('next-letter-btn');

    container.innerHTML = '<span class="cursor">|</span>';
    let i = 0;

    function type() {
        if (i < letterText.length) {
            const char = letterText.charAt(i);
            const cursor = container.querySelector('.cursor');

            // Insert character before cursor
            const span = document.createElement('span');
            span.innerText = char;
            container.insertBefore(span, cursor);

            i++;

            // Random typing speed
            let delay = 30 + Math.random() * 30;

            // Pause at new lines or periods
            if (char === '\n') delay = 400;
            if (char === '.') delay = 300;

            // Show photo halfway through
            if (i === Math.floor(letterText.length / 2)) {
                photo.style.opacity = '1';
                photo.style.transform = 'rotate(-3deg) scale(1.05)';
            }

            setTimeout(type, delay);
        } else {
            // Finished
            setTimeout(() => {
                nextBtn.classList.remove('hidden');
            }, 1000);
        }
    }

    type();
}

function resetToLetter() {
    document.getElementById(stepsOrder[currentIdx]).classList.remove('active');
    currentIdx = stepsOrder.indexOf('step-8');
    document.getElementById(stepsOrder[currentIdx]).classList.add('active');
    updateProgress();
}

let cryingTimer = null;

function setFinalGif(state) {
    const gif = document.getElementById('final-gif');
    if (!gif) return;

    // Crossfade effect using opacity
    gif.style.opacity = '0';
    setTimeout(() => {
        gif.src = `assets/gif/${state}.gif`;
        gif.style.opacity = '1';
    }, 150);
}

function handleYesEnter() {
    // If we were crying (or timer running), clear it and immediately get happy
    if (cryingTimer) {
        clearTimeout(cryingTimer);
        cryingTimer = null;
    }
    setFinalGif('happy');
}

function handleYesLeave() {
    setFinalGif('please');
}

function handleNoEnter() {
    // Clear any existing timer
    if (cryingTimer) {
        clearTimeout(cryingTimer);
        cryingTimer = null;
    }

    // Show crying gif
    setFinalGif('crying');

    // Auto-reset to please gif after 2 seconds (works for mobile where onmouseleave doesn't fire)
    cryingTimer = setTimeout(() => {
        setFinalGif('please');
        cryingTimer = null;
    }, 2000);
}

function handleNoLeave() {
    // On desktop, this extends the crying a bit more after mouse leaves
    // Timer is already set in handleNoEnter, so we just let it run
    // No action needed here - the timer from handleNoEnter will handle the reset
}

function spawnLilyPetals() {
    const container = document.getElementById('lily-petals-container');
    if (!container) return;

    const p = document.createElement('div');
    p.innerText = ['🌸', '🌷', '💐'][Math.floor(Math.random() * 3)];
    p.className = 'lily-petal text-xl';

    const startX = Math.random() * window.innerWidth;
    p.style.left = startX + 'px';

    const dx = (Math.random() - 0.5) * 200;
    const dr = Math.random() * 360;

    p.style.setProperty('--dx', `${dx}px`);
    p.style.setProperty('--dr', `${dr}deg`);

    container.appendChild(p);
    setTimeout(() => p.remove(), 5000);
}

function playPop() {
    try {
        const context = new (window.AudioContext || window.webkitAudioContext)();
        if (context.state === 'suspended') context.resume();
        const osc = context.createOscillator();
        const g = context.createGain();
        osc.frequency.setValueAtTime(400 + Math.random() * 400, context.currentTime);
        osc.frequency.exponentialRampToValueAtTime(0.01, context.currentTime + 0.1);
        g.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.1);
        osc.connect(g); g.connect(context.destination);
        osc.start(); osc.stop(context.currentTime + 0.1);
    } catch (e) { }
}

function playErrorSound() {
    try {
        const context = new (window.AudioContext || window.webkitAudioContext)();
        const osc = context.createOscillator();
        const g = context.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, context.currentTime);
        osc.frequency.exponentialRampToValueAtTime(50, context.currentTime + 0.2);
        g.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.2);
        osc.connect(g); g.connect(context.destination);
        osc.start(); osc.stop(context.currentTime + 0.2);
    } catch (e) { }
}

const passwordInput = document.getElementById('password-input');
if (passwordInput) {
    passwordInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') checkPassword();
    });
}
