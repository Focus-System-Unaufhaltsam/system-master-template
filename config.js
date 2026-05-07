// ==========================================
// SYSTEM MASTER CONFIGURATION (White Label)
// ==========================================

const CLIENT_CONFIG = {
    // 1. SYSTEM & DATABASE
    id: "unaufhaltsam-master-v1",   // Unique ID for the project (no spaces)
    brandColor: "#b01fa5",          // Main brand color
    easterEggScore: 29,             // Victory after 30 boxes (Internal Score 29)

    // 2. TEXTS & BRANDING (Only "UNAUFHALTSAM" is German)
    brandTitle: "UNAUFHALTSAM",
    brandSub: "PRECISION CHALLENGE V1.0",
    startDesc: "Focus on the target box. Luxury means nothing without focus. Any mistake ends the system immediately.",
    boxOverlayText: "FOCUS",        // Text shown on the target box
    
    // 3. REWARDS
    rewardTitle: "ELITE STATUS REACHED: CLAIM YOUR REWARD",
    rewardSuccess: "CLAIMED. YOU WILL BE CONTACTED.",

    // 4. PSYCHOLOGICAL QUOTES (The Frustration Curve)
    quotes: [
        '"Focus is a choice. You just chose against it."',                 // 0-5
        '"Consistency separates the wheat from the chaff."',              // 6-10
        '"Waking up. Now the real mental work begins."',                  // 11-15
        '"Strong performance. You are above average."',                   // 16-20
        '"Outstanding. You control the system, not the other way around."',// 21-25
        '"Absolute Elite. You broke the 30-box wall. Respect."'            // 26+
    ],

    // 5. LEGAL DATA (Placeholders)
    legal: {
        name: "YOUR NAME / COMPANY",
        street: "STREET 123",
        city: "ZIP CITY",
        email: "MAIL@EXAMPLE.COM",
        register: "COMMERCIAL REGISTER XXX, HRB XXX",
        ustid: "VAT ID: DE XXX XXX XXX"
    }
};
