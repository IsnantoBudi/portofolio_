# IBN Portfolio — Isnanto Budi Nurrahman

> **Full-Stack & Mobile Developer** · 3+ tahun pengalaman di Insurtech, SaaS Enterprise & Fintech  
> 📍 Klaten, Jawa Tengah · [LinkedIn](https://linkedin.com/in/isnantobudi) · Angular · Spring Boot · Flutter · Go

---

## 🚀 Tech Stack

| Layer | Teknologi |
|-------|-----------|
| **Frontend** | React 19, TypeScript 5.8, Vite 6 |
| **Styling** | TailwindCSS v4 (CSS-first config) |
| **Animation** | Motion (Framer Motion) v12 |
| **Icons** | Lucide React |
| **Build** | Vite 6, ESM modules |

---

## 🗂️ Struktur Proyek

```
src/
├── App.tsx              # Root orchestrator + scroll navigation
├── main.tsx             # React entry point
├── index.css            # Global styles + design tokens
├── vite-env.d.ts        # Vite type declarations
├── components/
│   └── Layout.tsx       # Shell: Navbar, Footer, ScrollBar, DarkMode
├── pages/
│   ├── Home.tsx         # Hero section + profil + tech badges
│   ├── About.tsx        # Filosofi & nilai profesional
│   ├── Experience.tsx   # Timeline karir
│   ├── Skills.tsx       # Grid keahlian & tools
│   ├── Projects.tsx     # Bento grid proyek
│   └── Contact.tsx      # Form kontak dengan validasi
└── assets/
    └── images/          # Foto profil + screenshot proyek
```

---

## 🏗️ Arsitektur Navigasi

Portfolio menggunakan **scroll-based single-page navigation** (tanpa router):

```
Screen Type (union)
  ↕ diprop-kan ke Layout
App.tsx
  ├── IntersectionObserver → auto-detect active section
  ├── handleNavigate()     → smooth scroll ke section
  └── Layout.tsx
       ├── Navbar  → highlight menu aktif berdasarkan Screen
       ├── ScrollProgressBar → progress scroll realtime
       └── section#{id}   → Home | About | Experience | Skills | Projects | Contact
```

---

## 🖥️ Halaman & Fitur

| Halaman | Fitur Utama |
|---------|-------------|
| **Home** | Hero layout 2-kolom, foto profil grayscale hover, tech badges Angular/Spring Boot/MySQL |
| **About** | Filosofi kerja, pendekatan arsitektural, nilai remote-first |
| **Experience** | Timeline alternating: BTM (2023-now), Freelance (2022-2023) |
| **Skills** | 3 kategori (Frontend/Backend/Konsep) + Tools card full-width |
| **Projects** | Bento grid 12-kolom, 4 proyek terpilih |
| **Contact** | Form validasi + reusable `<FormField>` component |

---

## 🧩 Proyek Terpilih

1. **Manajemen Asuransi Core** — Angular + Java + RBAC + SQL
2. **TenantMaster Cloud** — Next.js + Go + Microservices + PostgreSQL  
3. **Asuransi Mobile** — Flutter + Dart + Android
4. **School Management System** — Angular + Java + MySQL

---

## 💻 Menjalankan Secara Lokal

**Prasyarat:** Node.js 18+

```bash
# Install dependencies
npm install

# Jalankan dev server (port 3000)
npm run dev

# Build production
npm run build

# Preview production build
npm run preview
```

---

## 🗺️ Knowledge Graph (Graphify)

Project ini dilengkapi dengan knowledge graph untuk navigasi codebase:

```bash
# Lihat laporan graph
cat graphify-out/GRAPH_REPORT.md

# Visualisasi interaktif
open graphify-out/graph.html
```

**Stats:** 36 nodes · 32 edges · 9 communities  
**Report:** [graphify-out/GRAPH_REPORT.md](./graphify-out/GRAPH_REPORT.md)

---

## 📌 Roadmap / Known Gaps

- [ ] Ganti Unsplash URLs di Projects dengan asset lokal (`src/assets/images/`)
- [ ] Refactor duplikasi `type Screen` ke `src/types.ts`
- [ ] Implementasi mobile hamburger menu drawer
- [ ] Integrasikan Contact form dengan EmailJS / Formspree
- [ ] Tambahkan link PDF Resume ke button "Resume" di navbar

---

© 2026 Isnanto Budi Nurrahman
