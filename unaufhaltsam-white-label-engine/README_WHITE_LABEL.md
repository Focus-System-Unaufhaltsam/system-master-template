# UNAUFHALTSAM ENGINE — White-Label Focus Challenge

This package is the generic deployable white-label version of the Focus Challenge system.

## Files

- `index.html` — game system
- `config.js` — client branding, texts, collection id, legal data
- `logo.png` — placeholder logo shown inside the boxes
- `impressum.html` — configurable legal placeholder
- `datenschutz.html` — configurable privacy placeholder
- `firestore.rules` — basic Firestore rules template

## Deployment

1. Duplicate the folder for the client.
2. Replace `logo.png` with the client logo/character asset.
3. Edit `config.js`:
   - `id` must be unique per client/project.
   - `brandColor`, title, texts and legal data must be replaced.
   - Optional: set a client-specific `firebaseConfig`.
4. Deploy via GitHub Pages or a prepared customer URL.
5. Check `impressum.html` and `datenschutz.html` before public launch.

## Service boundary

Included in Basic Setup:

- Skin adaptation: colors, logo, texts
- Firebase leaderboard integration
- Deployment on GitHub Pages or prepared customer URL
- 1h onboarding and technical handover

Not automatically included:

- Customer DNS/domain administration
- Legal review
- Ongoing support
- Custom game logic beyond configuration

## Internal rule

Do not overbuild. Clone, configure, deploy, test.
