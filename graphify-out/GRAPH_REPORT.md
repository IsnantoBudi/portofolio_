# Graph Report — IBN Portfolio (2026-05-12, Updated)

## Corpus Check
- **12 source files** · ~5,461+ words
- **Tech Stack**: React 19 + TypeScript + Vite 6 + TailwindCSS v4 + Motion (Framer Motion)
- Verdict: corpus cukup besar sehingga struktur graph menambah nilai navigasi.

---

## Summary
- **36 nodes · 32 edges · 9 communities**
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Built from commit: `d003d497`

---

## Arsitektur Sistem

### Pola Navigasi Scroll-Based
Portfolio ini menggunakan **single-page scroll navigation** (bukan routing). Semua halaman di-render sekaligus sebagai `<section>` dan navigasi menggunakan smooth scroll + `IntersectionObserver`.

```
main.tsx
  └─ App.tsx  ← Root orchestrator
       ├─ type Screen = union type navigasi
       ├─ useState<Screen>  ← Active screen tracker
       ├─ IntersectionObserver  ← Auto-detect section saat scroll
       ├─ handleNavigate()  ← Smooth scroll ke section
       └─ Layout.tsx  ← Shell (Navbar + Scroll Bar + Footer)
            ├─ section#home     → Home.tsx
            ├─ section#about    → About.tsx
            ├─ section#experience → Experience.tsx
            ├─ section#skills   → Skills.tsx
            ├─ section#projects → Projects.tsx
            └─ section#contact  → Contact.tsx
```

---

## God Nodes — Core Abstractions

| Rank | Node | File | Peran |
|------|------|------|-------|
| 1 | `Screen` (App.tsx) | `src/App.tsx:L16` | **Definisi** union type navigasi: `'Home' \| 'About' \| 'Experience' \| 'Skills' \| 'Projects' \| 'Contact'` |
| 2 | `Screen` (Layout.tsx) | `src/components/Layout.tsx:L21` | **Konsumsi** via `LayoutProps.currentScreen: Screen` |
| 3 | `LayoutProps` | `src/components/Layout.tsx:L23` | Interface props Layout: `children`, `currentScreen`, `onNavigate` |
| 4 | `FormData` | `src/pages/Contact.tsx:L5` | Type form kontak: `name`, `email`, `message` |
| 5 | `FormErrors` | `src/pages/Contact.tsx:L11` | Type validasi error form |
| 6 | `FormFieldProps` | `src/pages/Contact.tsx:L319` | Props reusable `<FormField>` component |
| 7 | `experiences` | `src/pages/Experience.tsx:L5` | Array data karir (2 entri: BTM + Freelance) |
| 8 | `HomeProps` | `src/pages/Home.tsx:L6` | Props Home: `onNavigate` callback |
| 9 | `techLogos` | `src/pages/Home.tsx:L10` | Array tech badges: Angular, Spring Boot, MySQL |
| 10 | `skillGroups` | `src/pages/Skills.tsx:L5` | Array skill categories: Frontend, Backend, Konsep |

---

## Clarifikasi: Node Ambigu

### `env` — Bukan variabel aktif
Node `env` yang muncul di graph **bukan** `import.meta.env` atau dotenv aktif. Tidak ada penggunaan environment variable yang terdeteksi di source code React. File `.env.example` ada di root tapi tidak di-consume oleh frontend. Kemungkinan residual dari template scaffold awal.

### `Screen` — Muncul 2x (by design)
Type `Screen` di-definisikan di `App.tsx` dan **di-redeclare** di `Layout.tsx`. Ini adalah **duplikasi tipe** yang bisa direfactor ke shared type file (`src/types.ts`) agar DRY.

---

## Community Map

### Community 0 — App Core
**Nodes:** `App.tsx`, `About.tsx`, `Projects.tsx`, `Screen` (App), `About()`, `App()`, `projects`, `main.tsx`
**Peran:** Root orchestrator + halaman stateless tanpa data kompleks.

### Community 1 — Layout Shell
**Nodes:** `Layout.tsx`, `LayoutProps`, `Navbar()`, `Footer()`, `Layout()`, `Screen` (Layout)
**Peran:** Komponen shell global — fixed header, scroll progress bar, footer, dark mode toggle.
- `Navbar` → menerima `currentScreen` untuk highlight menu aktif
- `Layout` → mengelola `isDark` state via `localStorage` + `prefers-color-scheme`
- Scroll progress bar: `window.scrollY / scrollHeight * 100`

### Community 2 — Contact Form
**Nodes:** `Contact.tsx`, `FormData`, `FormErrors`, `FormFieldProps`, `FormField()`, `Contact()`
**Cohesion:** 0.33
**Peran:** Sistem form kontak dengan validasi client-side.
- `FormField()` adalah reusable sub-component untuk render input/textarea
- Validasi: required fields + format email

### Community 3 — Home Page
**Nodes:** `Home.tsx`, `HomeProps`, `techLogos`, `Home()`
**Peran:** Hero section utama dengan layout 2-kolom (teks kiri, profil kanan).
- Profile image: `assets/images/regenerated_image_1778572180933.webp`
- CTA buttons: "Lihat Karya" → navigate('Projects'), "Hubungi Saya" → navigate('Contact')
- Tech badges: Angular, Spring Boot, MySQL (inline SVG icons)

### Community 4 — Experience Timeline
**Nodes:** `Experience.tsx`, `experiences`, `Experience()`
**Peran:** Timeline karir dengan 2 entri:
1. **Full-Stack Developer @ PT. Bakti Tekno Mandiri** (Maret 2023 - Sekarang) — Angular, Flutter, REST API
2. **Freelance Full-Stack Developer** (2022-2023) — Next.js, Go, PostgreSQL, Java

### Community 5 — Skills Grid
**Nodes:** `Skills.tsx`, `skillGroups`, `Skills()`
**Peran:** Grid 3 kategori skill + Tools card full-width.
- Frontend: Angular, Flutter, Next.js, Vue.js, React, TypeScript, Tailwind CSS
- Backend: Java, Golang, Node.js, REST API, Apache Tapestry
- Konsep: Microservices, Multi-tenant, RBAC, SDLC, OOP, API-First
- Tools: Git, GitHub, Android Studio, VS Code, IntelliJ, Postman

---

## Projects Catalog

| # | Judul | Tech Stack | Layout |
|---|-------|-----------|--------|
| 1 | Manajemen Asuransi Core | Angular, Java, RBAC, SQL | Featured (col-span-8) |
| 2 | TenantMaster Cloud | Next.js, Go, Microservices, PostgreSQL | col-span-4 |
| 3 | Asuransi Mobile | Flutter, Dart, Android | col-span-6 |
| 4 | School Management System | Angular, Java, MySQL | col-span-6 |

---

## Assets Inventory

```
src/assets/images/
├── regenerated_image_1778572180933.webp  ← Profile photo (Home)
├── ajarvisual/
│   ├── AjarVisual_dashbord.png
│   └── AjarVisual_soal.png
├── syncboard/
│   └── SyncBoard.webp
├── tenant_master/
│   ├── admin dashboard.png
│   ├── admin panel managemen.png
│   ├── demo tenant master.png
│   ├── home tenant master.png
│   └── tenant master managemen user and aplikasi.png
└── project manajemen sekolah/
    ├── project menejemen android.webp
    ├── project menejemen sekolah.webp
    └── project menejemen web.webp
```

> ⚠️ **Gap**: Asset lokal tersedia (tenant_master, ajarvisual, syncboard, sekolah) tapi `Projects.tsx` masih menggunakan **Unsplash URLs**. Bisa di-upgrade ke asset lokal untuk performa offline dan branding yang lebih autentik.

---

## Knowledge Gaps & Rekomendasi

### 🔴 Kritis
| Gap | Deskripsi | Solusi |
|-----|-----------|--------|
| Duplikasi `type Screen` | Dideclare di `App.tsx` dan `Layout.tsx` | Extract ke `src/types.ts` |
| Projects pakai Unsplash | Gambar proyek dari CDN eksternal | Ganti dengan asset lokal di `src/assets/images/` |
| Resume button non-functional | Button "Resume" di navbar tidak ada href/link | Tambahkan link ke PDF resume |

### 🟡 Minor
| Gap | Deskripsi | Solusi |
|-----|-----------|--------|
| `env` node ghost | Tidak ada env variable aktif di frontend | Bersihkan atau dokumentasikan |
| Contact form tanpa backend | Form submit belum terhubung ke endpoint | Integrasikan EmailJS / Formspree / API route |
| Mobile hamburger menu | Tombol `<Menu>` di navbar tidak memiliki state/logic | Implementasi mobile drawer |

---

## Suggested Questions
_Pertanyaan yang bisa dijawab oleh graph ini:_

1. **Bagaimana data navigasi mengalir dari App ke Navbar?**
   → `App.tsx` → `currentScreen` + `onNavigate` → `Layout.tsx` → `Navbar()` → highlight menu aktif

2. **Apa yang terjadi saat user scroll ke section baru?**
   → `IntersectionObserver` di `App.tsx` detect section, trigger `setCurrentScreen()`, Navbar update highlight

3. **Kenapa ada 2 node `Screen` di graph?**
   → Tipe di-redeclare di `Layout.tsx` alih-alih di-import dari `App.tsx` — kandidat refactor

4. **Komponen mana yang paling bergantung pada `Screen` type?**
   → `App()`, `Layout()`, `Navbar()`, `handleNavigate()`, `Home()` (via onNavigate callback)

---

## Graph Freshness
- **Built from commit:** `d003d497`
- **Last updated:** 2026-05-12T15:46:00+07:00
- Run `graphify update .` setelah perubahan kode besar.
