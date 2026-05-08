/**
 * core-engine.js - DAS WASSERTEMPLATE
 * Zentrales Gehirn für alle Spiel-Versionen.
 * Enthält: Mechanik, Firebase-Logik & Unaufhaltsam-Branding.
 */

let state, ctx, canvas, imgLogo, imgWatermark;
let logoStatus = "LAEDT", logoError = false;
let dbRef, auth;
let currentConfig = {};

function initFocusSystem(CONFIG) {
    currentConfig = CONFIG;
    canvas = document.getElementById("gameCanvas");
    ctx = canvas.getContext("2d");
    
    // UI & Branding Setup
    document.title = CONFIG.pageTitle || "FOCUS SYSTEM";
    document.documentElement.style.setProperty('--brand-color', CONFIG.brandColor || "#7C3AED");
    if(document.getElementById("uiBrandTitle")) document.getElementById("uiBrandTitle").textContent = CONFIG.brandTitle || "UNAUFHALTSAM";
    if(document.getElementById("uiBrandSub")) document.getElementById("uiBrandSub").textContent = CONFIG.brandSub || "CHALLENGE";

    // Bilder laden
    imgLogo = new Image();
    imgLogo.src = CONFIG.logo || "eddie.png";
    imgLogo.onload = () => { logoStatus = "OK"; };
    imgLogo.onerror = () => { logoStatus = "FEHLER"; logoError = true; };

    imgWatermark = new Image();
    imgWatermark.src = "unaufhaltsam_brand.png"; // Dein zentrales Branding

    // Firebase Initialisierung
    const firebaseConfig = {
      apiKey: "AIzaSyC0olKESyTP0rXUlnjGstLlGN50I1m_O2A",
      authDomain: "mg-challenge.firebaseapp.com",
      projectId: "mg-challenge",
      storageBucket: "mg-challenge.firebasestorage.app",
      messagingSenderId: "472289048663",
      appId: "1:472289048663:web:cc68ded6007e1e822c4b12"
    };
    if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();
    auth = firebase.auth();
    dbRef = db.collection(CONFIG.id);

    // Spiel-Status Reset
    state = {
      running: false, score: 0, startTime: 0, totalTime: 0,
      phase: "idle", phaseStartedAt: 0, boxes: [], 
      correctId: null, selectedId: null, swapsRemaining: 0, activeSwap: null,
      showBallTime: 1400, breatherMs: 300
    };

    // Event Listener für Klicks/Touch
    canvas.onmousedown = e => { const r = canvas.getBoundingClientRect(); handleInteraction((e.clientX - r.left)*(canvas.width/r.width), (e.clientY - r.top)*(canvas.height/r.height)); };
    canvas.ontouchstart = e => { e.preventDefault(); const r = canvas.getBoundingClientRect(); handleInteraction((e.touches[0].clientX - r.left)*(canvas.width/r.width), (e.touches[0].clientY - r.top)*(canvas.height/r.height)); };

    // Start-Loop
    requestAnimationFrame(loop);
    auth.signInAnonymously().then(() => listenToLeaderboard());
}

function buildRound() {
    if (state.score >= 29) { finish(true); return; }
    state.boxes = []; state.selectedId = null; state.activeSwap = null;
    const count = Math.min(30, 2 + state.score);
    const cols = Math.ceil(Math.sqrt(count));
    const boxW = Math.max(45, Math.min(92, (canvas.width - 160) / cols - 24));
    const gridW = cols * boxW + (cols - 1) * 24;
    const startX = (canvas.width - gridW) / 2; 
    const startY = 160 + ((canvas.height - 200) - (Math.ceil(count / cols) * boxW + (Math.ceil(count / cols) - 1) * 24)) / 2;

    for (let i = 0; i < count; i++) {
        state.boxes.push({ id: i, x: startX + (i % cols) * (boxW + 24), y: startY + Math.floor(i / cols) * (boxW + 24), w: boxW, h: boxW, lift: 0 });
    }
    state.correctId = Math.floor(Math.random() * count);
    state.swapsRemaining = Math.max(4, 3 + Math.floor(count * 1.5));
    setPhase("show");
    updateHud();
}

function startNextSwap() {
    if (state.swapsRemaining <= 0) { state.activeSwap = null; setPhase("wait"); return; }
    let a = state.boxes.findIndex(box => box.id === state.correctId);
    let b = Math.floor(Math.random() * state.boxes.length);
    while (b === a) b = Math.floor(Math.random() * state.boxes.length);
    
    state.activeSwap = {
        aId: state.boxes[a].id, bId: state.boxes[b].id, 
        aStartX: state.boxes[a].x, bStartX: state.boxes[b].x, aStartY: state.boxes[a].y, bStartY: state.boxes[b].y,
        aTargetX: state.boxes[b].x, bTargetX: state.boxes[a].x, aTargetY: state.boxes[b].y, bTargetY: state.boxes[a].y,
        start: performance.now(), duration: Math.max(140, (2200 - state.score * 90) / 7.5)
    };
    state.swapsRemaining--;
}

function update(ts) {
    if (!state.running) return;
    if (state.phase === "show" && ts - state.phaseStartedAt > 1400) { setPhase("shuffle"); startNextSwap(); }
    else if (state.phase === "shuffle") {
        if (!state.activeSwap) { startNextSwap(); return; }
        const s = state.activeSwap, p = Math.min(1, (ts - s.start) / s.duration), e = p < 0.5 ? 2*p*p : 1-Math.pow(-2*p+2,2)/2;
        const bA = state.boxes.find(b => b.id === s.aId), bB = state.boxes.find(b => b.id === s.bId);
        if(bA && bB) {
            bA.x = s.aStartX + (s.aTargetX - s.aStartX) * e; bB.x = s.bStartX + (s.bTargetX - s.bStartX) * e;
            bA.y = s.aStartY + (s.aTargetY - s.aStartY) * e; bB.y = s.bStartY + (s.bTargetY - s.bStartY) * e;
            if (p >= 1) state.activeSwap = null;
        }
    } else if (state.phase === "wait" && ts - state.phaseStartedAt > 300) setPhase("pick");
    else if (state.phase === "reveal" && ts - state.phaseStartedAt > 1200) {
        if (state.selectedId === state.correctId) { state.score++; buildRound(); }
        else finish(false);
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // UNAUFHALTSAM WASSERZEICHEN (DNA-KOMPONENTE)
    if (imgWatermark.complete && !currentConfig.premium) {
        ctx.save();
        ctx.globalAlpha = 0.15; // 15% Deckkraft
        const w = 450;
        const h = (imgWatermark.height / imgWatermark.width) * w;
        ctx.drawImage(imgWatermark, (canvas.width - w) / 2, (canvas.height - h) / 2 + 50, w, h);
        ctx.restore();
    }

    state.boxes.forEach(box => {
        const y = box.y - box.lift;
        ctx.save();
        ctx.fillStyle = "#fff"; ctx.strokeStyle = "#000"; ctx.lineWidth = 3;
        ctx.strokeRect(box.x, y, box.w, box.h); ctx.fillRect(box.x, y, box.w, box.h);
        if (logoStatus === "OK") ctx.drawImage(imgLogo, box.x + box.w * 0.04, y + box.h * 0.04, box.w * 0.92, box.h * 0.92);
        if (state.phase === "show" && box.id === state.correctId) {
            ctx.strokeStyle = "var(--brand-color)"; ctx.lineWidth = 5; ctx.strokeRect(box.x-2, y-2, box.w+4, box.h+4);
        }
        ctx.restore();
    });
}

function handleInteraction(x, y) {
    if (state.phase === "pick") {
        state.boxes.forEach(b => { if (x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h) { state.selectedId = b.id; setPhase("reveal"); } });
    }
}

function finish(victory) {
    state.running = false;
    state.totalTime = (performance.now() - state.startTime) / 1000;
    document.getElementById("gameOverOverlay").classList.remove("hidden");
    document.getElementById("finalScore").textContent = (state.score + 2) + " BOXES";
    document.getElementById("finalTime").textContent = `TIME: ${state.totalTime.toFixed(2)}s`;
    if (state.score >= 1) document.getElementById("leaderboardEntrySection").style.display = "block";
}

function listenToLeaderboard() {
    dbRef.onSnapshot(snap => {
        let entries = []; snap.forEach(d => entries.push(d.data()));
        entries.sort((a, b) => b.score - a.score || a.time - b.time);
        const list = document.getElementById("leaderboardList"); list.innerHTML = "";
        entries.slice(0, 10).forEach((data, i) => {
            list.innerHTML += `<li class="leaderboard-entry"><div class="rank-name"><span class="rank-number">#${i+1}</span><span>${data.name}</span></div><span>${data.score} BOXES</span></li>`;
        });
    });
}

function saveScore() {
    const name = document.getElementById("nameInput").value.trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (!name) return;
    dbRef.doc(name).set({ name, score: state.score + 2, time: state.totalTime, timestamp: firebase.firestore.FieldValue.serverTimestamp() })
    .then(() => location.reload());
}

function setPhase(p) { state.phase = p; state.phaseStartedAt = performance.now(); }
function updateHud() { document.getElementById("boxValue").textContent = state.score + 2; }
function loop(ts) { update(ts); draw(); requestAnimationFrame(loop); }
