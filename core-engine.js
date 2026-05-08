// core-engine.js - Das unaufhaltsame Gehirn des Focus Systems
let state, ctx, canvas, imgLogo, imgWatermark;
let logoStatus = "LAEDT", logoError = false;
let dbRef, auth;

function initFocusSystem(CONFIG) {
    // 1. Setup Canvas & UI
    canvas = document.getElementById("gameCanvas");
    ctx = canvas.getContext("2d");
    document.title = CONFIG.pageTitle || "FOCUS SYSTEM";
    document.documentElement.style.setProperty('--brand-color', CONFIG.brandColor || "#7C3AED");
    
    // UI Texte anpassen
    if(document.getElementById("uiBrandTitle")) document.getElementById("uiBrandTitle").textContent = CONFIG.brandTitle || "UNAUFHALTSAM";
    if(document.getElementById("uiBrandSub")) document.getElementById("uiBrandSub").textContent = CONFIG.brandSub || "CHALLENGE";

    // 2. Bilder laden
    imgLogo = new Image();
    imgLogo.src = CONFIG.logo || "eddie.png";
    imgLogo.onload = () => { logoStatus = "OK"; };
    imgLogo.onerror = () => { logoStatus = "FEHLER"; logoError = true; };

    imgWatermark = new Image();
    imgWatermark.src = "unaufhaltsam_brand.png"; // Dein zentrales Branding-Asset

    // 3. Firebase Initialisierung
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

    // 4. Spiel-Status
    state = {
      running: false, score: 0, startTime: 0, totalTime: 0,
      phase: "idle", phaseStartedAt: 0, boxes: [], 
      correctId: null, selectedId: null, swapsRemaining: 0, activeSwap: null,
      showBallTime: 1400, breatherMs: 300
    };

    // --- GAME ENGINE FUNKTIONEN ---

    window.buildRound = function() {
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
    };

    window.update = function(ts) {
      if (!state.running) return;
      if (state.phase === "show" && ts - state.phaseStartedAt > 1400) { setPhase("shuffle"); startNextSwap(); }
      else if (state.phase === "shuffle") {
        if (!state.activeSwap) { startNextSwap(); return; }
        const s = state.activeSwap, p = Math.min(1, (ts - s.start) / s.duration), e = p < 0.5 ? 2*p*p : 1-Math.pow(-2*p+2,2)/2;
        const bA = state.boxes.find(b => b.id === s.aId), bB = state.boxes.find(b => b.id === s.bId);
        if(bA && bB) {
            bA.x = s.aStartX + (s.aTargetX - s.aStartX) * e; bB.x = s.bStartX + (s.bTargetX - s.bStartX) * e;
            bA.y = s.aStartY + (s.aTargetY - s.aStartY) * e; bB.y = s.bStartY + (s.bTargetY - s.bStartY) * e;
            if (p >= 1) { bA.x = s.aTargetX; bA.y = s.aTargetY; bB.x = s.bTargetX; bB.y = s.bTargetY; state.activeSwap = null; }
        }
      } else if (state.phase === "wait" && ts - state.phaseStartedAt > 300) setPhase("pick");
      else if (state.phase === "reveal" && ts - state.phaseStartedAt > 1200) {
        if (state.selectedId === state.correctId) { state.score++; buildRound(); }
        else { finish(false); }
      }
    };

    window.draw = function() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // --- BRANDING WASSERZEICHEN (Dezent im Hintergrund) ---
      if (imgWatermark.complete && !CONFIG.premium) {
        ctx.save();
        ctx.globalAlpha = 0.15; // 15% Deckkraft
        const w = 450;
        const h = (imgWatermark.height / imgWatermark.width) * w;
        ctx.drawImage(imgWatermark, (canvas.width - w) / 2, (canvas.height - h) / 2 + 50, w, h);
        ctx.restore();
      }

      // Kisten zeichnen
      state.boxes.forEach(box => {
        const y = box.y - box.lift;
        ctx.save();
        ctx.fillStyle = "#fff"; ctx.strokeStyle = "#000"; ctx.lineWidth = 3;
        ctx.strokeRect(box.x, y, box.w, box.h); ctx.fillRect(box.x, y, box.w, box.h);
        
        if (logoStatus === "OK") {
            ctx.drawImage(imgLogo, box.x + box.w * 0.04, y + box.h * 0.04, box.w * 0.92, box.h * 0.92);
        }
        
        if (state.phase === "show" && box.id === state.correctId) {
            ctx.fillStyle = "rgba(124, 58, 237, 0.3)"; ctx.fillRect(box.x, y, box.w, box.h);
        }
        ctx.restore();
      });
    };

    // Hilfsfunktionen
    function setPhase(p) { state.phase = p; state.phaseStartedAt = performance.now(); }
    function startNextSwap() { /* ... interne Swap Logik ... */ }
    function finish(victory) { /* ... Ende Logik ... */ }
    function updateHud() { /* ... HUD Logik ... */ }

    // Start-Loop
    function loop(ts) { update(ts); draw(); requestAnimationFrame(loop); }
    requestAnimationFrame(loop);
}
