// ==========================================
// UNAUFHALTSAM ENGINE — WHITE-LABEL CONFIG
// ==========================================
// Duplicate this folder for each client and change only this file first.
// Keep the collection id unique per client/project.

const CLIENT_CONFIG = {
  // 1. SYSTEM & DATABASE
  id: "unaufhaltsam-white-label-demo-v1",  // Firestore collection name. No spaces.
  brandColor: "#8b5cf6",                    // Main brand color.
  easterEggScore: 29,                        // Internal score 29 = 30 boxes reached.
  minScoreToSave: 1,                         // Minimum internal score before rank save is allowed.

  // Optional: replace with client Firebase project if required.
  // If this stays null, the fallback Firebase config inside index.html is used.
  firebaseConfig: null,

  // 2. TEXTS & BRANDING
  brandTitle: "UNAUFHALTSAM",
  brandSub: "WHITE-LABEL FOCUS CHALLENGE",
  startDesc: "Focus on the target box. Any mistake ends the system immediately.",
  boxOverlayText: "FOCUS",
  boxesLabel: "BOXES",
  bestLabel: "BEST",
  resetLabel: "RESET",
  startButton: "START SYSTEM",
  restartButton: "REBOOT SYSTEM",
  leaderboardTitle: "Global Wall Ranking",
  leaderboardTopLabel: "Top 10",
  wallLabel: "LEVEL 30 WALL: NOT FOR TOURISTS",
  nameOverlayTitle: "FOCUS CONFIRMED",
  nameOverlayText: "Secure your place in the global ranking:",
  namePlaceholder: "YOUR NAME",
  saveRankButton: "SAVE RANK",
  statusFail: "SYSTEM FAILED",
  statusVictory: "THE WALL IS DOWN",
  imprintLabel: "LEGAL NOTICE",
  privacyLabel: "PRIVACY POLICY",
  emptyLeaderboardText: "No names on the wall yet.",
  nameTakenText: "NAME ALREADY TAKEN",

  // 3. REWARDS / CLAIMS
  rewardTitle: "STATUS EARNED: CLAIM YOUR PROOF",
  rewardSuccess: "CLAIMED. YOU WILL BE CONTACTED.",
  claimPlaceholder: "INSTAGRAM / MAIL",
  claimButton: "SUBMIT PROOF",

  // 4. PSYCHOLOGICAL QUOTES
  quotes: [
    "Focus broke before the system did.",
    "The start is easy. Staying locked in is the test.",
    "You are awake now. The pressure starts here.",
    "Strong run. Your focus is above casual level.",
    "Control is visible. The wall is close.",
    "Wall broken. Status earned."
  ],

  // 5. LEGAL DATA — replace before public deployment.
  legal: {
    name: "YOUR NAME / COMPANY",
    street: "STREET 123",
    city: "ZIP CITY",
    email: "MAIL@EXAMPLE.COM",
    register: "",
    vatId: ""
  }
};

window.CLIENT_CONFIG = CLIENT_CONFIG;
