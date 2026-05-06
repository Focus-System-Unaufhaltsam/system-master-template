// ==========================================
// SYSTEM MASTER CONFIGURATION
// ==========================================
// Diese Datei ist das Einzige, was du für einen neuen Kunden anpassen musst.

const CLIENT_CONFIG = {
    // 1. SYSTEM & DATENBANK
    id: "kunden-ordner-name",       // Keine Leerzeichen! z.B. "fitness-coach-xy" (Dies wird dein Firebase-Pfad)

    // 2. BRANDING & TEXTE
    brandTitle: "KUNDEN SYSTEM",    // Hauptüberschrift (z.B. "COACH XY FOCUS")
    brandSub: "PERFORMANCE TEST",   // Untertitel
    brandColor: "#000000",          // Hauptfarbe (Hex-Code, z.B. "#ff4500" für Orange)

    // 3. FEATURES & REWARDS
    easterEggScore: 30,             // Ab welchem Score das Easter-Egg triggert
    promoCode: "RABATT30",          // Der Code, der dem User angezeigt wird
    promoLink: "https://dein-link.de" // Wo der Button für den Reward hinführen soll
};
