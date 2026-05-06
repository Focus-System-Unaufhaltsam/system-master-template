// ==========================================
// SYSTEM MASTER CONFIGURATION
// ==========================================

const CLIENT_CONFIG = {
    // 1. SYSTEM & DATENBANK
    id: "master-template",          // Keine Leerzeichen! (Dies wird der Firebase-Pfad)

    // 2. BRANDING & TEXTE
    brandTitle: "FOCUS SYSTEM",     // Hauptüberschrift
    brandSub: "PERFORMANCE TEST",   // Untertitel
    brandColor: "#000000",          // Hauptfarbe (Hex-Code, z.B. "#ff0000" für Rot)

    // 3. FEATURES & REWARDS
    easterEggScore: 30,             // Ab welchem Score das Easter-Egg triggert
    promoCode: "RABATT30",          // Der Code, der dem User angezeigt wird
    promoLink: "https://dein-link.de", // Wo der Button für den Reward hinführen soll

    // 4. RECHTLICHES (Impressum & Datenschutz des Kunden)
    impName: "Max Mustermann",
    impStreet: "Musterstraße 1",
    impCity: "12345 Musterstadt",
    impEmail: "kontakt@muster.de"
};
