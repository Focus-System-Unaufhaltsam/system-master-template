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
    startDesc: "Focus on the target box. Any mistake ends the system immediately.",
    boxOverlayText: "FOCUS",        // Text shown on the target box
    
    // 3. REWARDS
    rewardTitle: "ELITE STATUS REACHED: CLAIM YOUR REWARD",
    rewardSuccess: "CLAIMED. YOU WILL BE CONTACTED.",

    // 4. PSYCHOLOGICAL QUOTES (0-30 Boxes)
    quotes: [
        '"Focus is not a gift, but a choice. You just chose against it."',
        '"The beginning is made. But consistency separates the wheat from the chaff."',
        '"You are waking up. Now the real mental work begins."',
        '"Strong performance. Your focus level is significantly above average."',
        '"Outstanding. You control the system, not the system you."',
        '"Absolute Elite. You broke the 30-box wall. Respect."'
    ],

    // 5. LEGAL DATA
    legal: {
        name: "YOUR NAME / COMPANY",
        street: "STREET 123",
        city: "ZIP CITY",
        email: "MAIL@EXAMPLE.COM",
        register: "COMMERCIAL REGISTER XXX, HRB XXX",
        ustid: "VAT ID: DE XXX XXX XXX"
    }
};
