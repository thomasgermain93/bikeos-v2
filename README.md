# BikeOS v2 - Pixel-Perfect RaceOS Clone

Clone pixel-perfect de [raceos.ai](https://raceos.ai) adapté pour MotoGP et WSBK.

## 🌐 Liens

- **Site en ligne :** https://bikeos-v2.vercel.app
- **Repository :** https://github.com/thomasgermain93/bikeos-v2

## ✨ Fonctionnalités

- **Design pixel-perfect** - Clone exact de raceos.ai (couleurs, typographie, spacing)
- **Données réelles** - Intégration APIs MotoGP (PulseLive) et WSBK (TheSportsDB)
- **Compte à rebours en temps réel** - Prochaines courses
- **Résultats** - Dernières courses avec classements
- **Classements** - Championnats pilotes
- **Actualités** - Flux d'actualités

## 🎨 Design System Exact

Les couleurs, typographies et espacements sont extraits directement du code source de raceos.ai :

- Background: `#0a0a0a`
- Cards: `#18181b`
- Bordures: `rgba(255,255,255,0.08)`
- Texte: `#e4e4e7` (zinc-200)
- F1 Badge: `#ef4444` / `#ef444418`
- WSBK Badge: `#3b82f6` / `#3b82f618`
- Typo: `font-mono` pour chiffres, `tracking-widest` pour labels

## 🔌 APIs Utilisées

| Source | Type | Données |
|--------|------|---------|
| PulseLive (MotoGP) | API Officielle | Calendrier, classements, résultats |
| TheSportsDB | API Communautaire | WSBK calendrier, prochaines courses |

## 🛠 Stack Technique

- **Next.js 14** - App Router, Static Export
- **TypeScript** - Typage strict
- **Tailwind CSS** - Design system exact
- **date-fns** - Manipulation des dates

## 🚀 Développement

```bash
npm install
npm run dev
```

## 📁 Structure

```
app/
├── motogp/page.tsx      # Page MotoGP
├── wsbk/page.tsx        # Page WSBK
├── layout.tsx           # Layout racine
└── globals.css          # Variables CSS exactes

components/
├── Header.tsx           # Navigation sticky
├── Countdown.tsx        # Compte à rebours
├── NextRaceCard.tsx     # Card prochaine course
├── LastRaceCard.tsx     # Card dernière course
├── StandingsCard.tsx    # Card classements
└── NewsCard.tsx         # Card actualités

data/
└── api.ts               # Intégrations APIs

types/
└── index.ts             # Types TypeScript
```

## 📝 Notes

- Build statique pour hébergement sur Vercel
- Revalidation des données toutes les 60 secondes
- Fallback sur données mock si API indisponible
