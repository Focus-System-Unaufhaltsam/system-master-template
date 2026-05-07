// ==========================================
// SYSTEM MASTER CONFIGURATION (White Label)
// ==========================================

const CLIENT_CONFIG = {
    // 1. SYSTEM & DATENBANK
    id: "focus-system-default",     // Eindeutige Firebase-ID (keine Leerzeichen)
    brandColor: "#b01fa5",          // Deine Markenfarbe (Purpur)
    easterEggScore: 29,             // Sieg-Grenze (30 Kisten erfolgreich beendet)

    // 2. TEXTE (WHITE LABEL)
    brandTitle: "UNAUFHALTSAM",
    brandSub: "FOCUS CHALLENGE V1.0",
    startDesc: "Fokussiere die Ziel-Kiste. Jeder Fehler beendet das System sofort.",
    
    // 3. REWARDS (Platzhalter für Kunden-Angebote)
    rewardTitle: "ELITE STATUS ERREICHT: DEIN REWARD",
    rewardSuccess: "REGISTRIERT. DU WIRST KONTAKTIERT.",
    rewardCode: "UNAUFHALTSAM30",

    // 4. NEUTRALE MOTIVATIONS-SPRÜCHE (Skala 0-30 Kisten)
    quotes: [
        '"Fokus ist keine Gabe, sondern eine Entscheidung. Du hast dich gerade dagegen entschieden."', // 0-5
        '"Der Anfang ist gemacht. Aber Konstanz trennt die Spreu vom Weizen."',                     // 6-10
        '"Du wirst wach. Jetzt fängt die Arbeit im Kopf erst richtig an."',                         // 11-15
        '"Starke Performance. Dein Fokus-Level liegt deutlich über dem Durchschnitt."',            // 16-20
        '"Herausragend. Du kontrollierst das System, nicht das System dich."',                     // 21-25
        '"Absolute Elite. Du hast die 30-Kisten-Wand durchbrochen. Respekt."'                       // 26+
    ],

    // 5. RECHTLICHES (Platzhalter für Kunden-Daten)
    impName: "DEIN NAME / FIRMA",
    impStreet: "STRASSE NR",
    impCity: "PLZ STADT",
    impEmail: "MAIL@BEISPIEL.DE",
    impRegister: "AMTSGERICHT XXX, HRB XXX",
    impUStId: "DE XXX XXX XXX"
};
