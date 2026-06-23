# 📄 Dokumentasi Teknis — CariKerja AI

> Versi: 0.1.0 | Stack: Next.js 16 · React 19 · TypeScript · Supabase · Cloudflare R2 · Google Gemini API

---

## Daftar Isi

1. [Gambaran Umum Aplikasi](#1-gambaran-umum-aplikasi)
2. [Arsitektur Sistem](#2-arsitektur-sistem)
3. [Penggunaan AI API](#3-penggunaan-ai-api)
4. [Struktur Proyek](#4-struktur-proyek)
5. [API Endpoints](#5-api-endpoints)
6. [Database & Storage](#6-database--storage)
7. [Sistem Autentikasi & Rate Limiting](#7-sistem-autentikasi--rate-limiting)
8. [Model Bisnis & Sistem Kuota](#8-model-bisnis--sistem-kuota)
9. [Konfigurasi Environment](#9-konfigurasi-environment)
10. [Cara Menjalankan Lokal](#10-cara-menjalankan-lokal)

---

## 1. Gambaran Umum Aplikasi

**CariKerja AI** adalah platform berbasis web yang membantu pencari kerja Indonesia mengoptimalkan CV dan melamar pekerjaan menggunakan kecerdasan buatan. Aplikasi ini bersifat **aksesibel tanpa login** (mode anonim) untuk fase promo, dengan fitur premium tersedia bagi pengguna berlangganan.

### Fitur Utama

| Fitur | Deskripsi | AI Terlibat |
|-------|-----------|-------------|
| **Analisis ATS** | Mencocokkan CV dengan Job Description, menghasilkan skor ATS 0–100, keyword match/gap, dan saran perbaikan per seksi | ✅ Gemini |
| **Generate Cover Letter** | Membuat surat lamaran kerja yang dipersonalisasi berdasarkan CV dan JD, dengan pilihan tone dan panjang | ✅ Gemini (Streaming) |
| **OCR Gambar Lowongan** | Mengekstrak teks dari screenshot/foto lowongan kerja menggunakan vision AI | ✅ Gemini Vision |
| **Scrape Lowongan** | Mengambil teks dari URL portal lowongan kerja secara otomatis | ❌ Native fetch |
| **Upload & Parse CV** | Mengurai file PDF/DOCX menjadi struktur terstruktur (nama, pendidikan, pengalaman, keahlian) | ❌ pdf-parse + mammoth |
| **Histori Lamaran** | Menyimpan dan mengelola riwayat analisis untuk pengguna login | ❌ Supabase |

---

## 2. Arsitektur Sistem

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT (Browser)                          │
│              Next.js App Router · React 19 · TailwindCSS         │
└─────────────────────┬───────────────────────────────────────────┘
                      │ HTTP Request
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                  MIDDLEWARE (src/proxy.ts)                        │
│  • Refresh session Supabase                                      │
│  • Set cookie anon_id (UUID, httpOnly, 30 hari)                  │
│  • Rate limit via Upstash Redis (10 req / 10 detik / endpoint)   │
│  • Redirect /login → /dashboard jika sudah login                 │
└──────────┬──────────────────────────────────┬───────────────────┘
           │                                  │
           ▼                                  ▼
┌────────────────────┐              ┌─────────────────────────────┐
│   Next.js Pages    │              │    Next.js API Routes        │
│   / (landing)      │              │    /api/cv/upload            │
│   /dashboard       │              │    /api/analyze              │
│   /auth/callback   │              │    /api/generate             │
│   /privacy, /terms │              │    /api/ocr                  │
│   /ai-disclaimer   │              │    /api/scrape               │
└────────────────────┘              │    /api/applications         │
                                    │    /api/user/plan            │
                                    │    /api/cv/download          │
                                    └──────┬──────────────────────┘
                                           │
                  ┌────────────────────────┼──────────────────────┐
                  │                        │                       │
                  ▼                        ▼                       ▼
        ┌─────────────────┐    ┌──────────────────┐   ┌──────────────────┐
        │  Supabase       │    │  Google Gemini   │   │  Cloudflare R2   │
        │  (Auth + DB)    │    │  API             │   │  (File Storage)  │
        │                 │    │  gemini-2.5-     │   │                  │
        │  users          │    │  flash-lite      │   │  cvs/            │
        │  cvs            │    │                  │   │  ├─ {user_id}/   │
        │  job_desc...    │    │  • generateContent│  │  └─ anonymous/   │
        │  applications   │    │  • streamGenerate │  │                  │
        │  usage_tracking │    │  • Vision (OCR)  │   │                  │
        └─────────────────┘    └──────────────────┘   └──────────────────┘
```

---

## 3. Penggunaan AI API

### Provider: Google Gemini API

Seluruh fitur AI menggunakan **Google Gemini API** melalui REST endpoint resmi. Tidak ada SDK Python/Node resmi yang digunakan — semua dilakukan lewat `fetch` native.

- **Base URL:** `https://generativelanguage.googleapis.com/v1beta/models/`
- **Authentication:** Query parameter `?key={GOOGLE_API_KEY}`
- **Model yang digunakan:** `gemini-2.5-flash-lite`

---

### 3.1 Analisis ATS (`/api/analyze`)

**Endpoint Gemini:**
```
POST https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key={GOOGLE_API_KEY}
```

**Mode:** Non-streaming (satu response JSON penuh)

**Output format yang diminta:** `application/json` via `generationConfig.responseMimeType`

**Prompt Strategy:**
- Peran: `"HR expert Indonesia dengan 10 tahun pengalaman rekrutmen"`
- Input: teks CV + Job Description lengkap
- Output JSON terstruktur:
  ```json
  {
    "ats_score": 78,
    "matching_keywords": ["React", "TypeScript", "REST API"],
    "missing_keywords": ["Docker", "CI/CD", "GraphQL"],
    "suggestions": [
      {
        "section": "Ringkasan Profil",
        "issue": "Tidak menyebutkan pengalaman relevan dengan posisi",
        "fix": "Tambahkan kalimat ringkasan yang mencerminkan keahlian utama"
      }
    ]
  }
  ```

**Konfigurasi Gemini:**
```typescript
{
  contents: [{ parts: [{ text: prompt }] }],
  generationConfig: {
    responseMimeType: 'application/json'  // Paksa output JSON murni
  }
}
```

---

### 3.2 Generate Cover Letter (`/api/generate`)

**Endpoint Gemini:**
```
POST https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:streamGenerateContent?key={GOOGLE_API_KEY}
```

**Mode:** **Streaming** — response di-pipe langsung ke client menggunakan `ReadableStream`

**Kenapa streaming?** Surat lamaran bisa panjang (300–500 kata). Streaming memungkinkan teks muncul bertahap di UI tanpa menunggu respons penuh, meningkatkan UX secara signifikan.

**Parameter input dari client:**
| Parameter | Tipe | Deskripsi |
|-----------|------|-----------|
| `cvText` | string | Teks mentah CV kandidat |
| `jobDescription` | string | Teks Job Description lowongan |
| `positionTitle` | string | Nama posisi yang dilamar |
| `companyName` | string | Nama perusahaan |
| `tone` | `'formal'` \| `'startup'` \| `'english'` | Gaya bahasa surat |
| `length` | `'short'` \| `'medium'` \| `'full'` | Panjang surat (200–500 kata) |

**Tone Options:**
- `formal` → Bahasa Indonesia formal/korporat/BUMN
- `startup` → Bahasa semi-formal, antusias, modern
- `english` → English professional, action-oriented

**Streaming Implementation:**
```typescript
// Server: pipe Gemini stream → client
const stream = new ReadableStream({
  async start(controller) {
    // Parse JSON objects dari buffer Gemini NDJSON
    // Ekstrak text dari candidates[0].content.parts[0].text
    // Enqueue ke client
    controller.enqueue(encoder.encode(text))
  }
})
return new Response(stream, { 'Content-Type': 'text/plain; charset=utf-8' })
```

**Watermark untuk Free Plan:**
```
[Dibuat menggunakan versi gratis CariKerja AI. Upgrade ke Premium untuk menghapus watermark ini.]
```

---

### 3.3 OCR Gambar Lowongan (`/api/ocr`)

**Endpoint Gemini:**
```
POST https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key={GOOGLE_API_KEY}
```

**Mode:** Non-streaming · **Capability:** Vision (multimodal)

**Flow:**
1. Client upload gambar (JPEG/PNG/WEBP/GIF, max 10MB) via `multipart/form-data`
2. Server convert ke Base64
3. Kirim ke Gemini sebagai `inline_data` (embedded image)
4. Gemini ekstrak semua teks dari gambar

**Payload ke Gemini:**
```typescript
{
  contents: [{
    parts: [
      { text: "instruksi OCR..." },          // Text prompt
      {
        inline_data: {
          mime_type: file.type,              // image/jpeg, image/png, dll
          data: base64Data                   // base64 string gambar
        }
      }
    ]
  }],
  generationConfig: {
    temperature: 0.1,        // Rendah → deterministic, akurasi OCR lebih baik
    maxOutputTokens: 4096
  }
}
```

**Format yang didukung:** `image/jpeg`, `image/jpg`, `image/png`, `image/webp`, `image/gif`

---

## 4. Struktur Proyek

```
d:\Project\Cari_kerja_AI\
├── src/
│   ├── app/
│   │   ├── page.tsx                    # Landing page + form analisis CV
│   │   ├── layout.tsx                  # Root layout (font, metadata)
│   │   ├── globals.css                 # Global styles (TailwindCSS)
│   │   ├── (auth)/                     # Auth route group
│   │   ├── (dashboard)/                # Dashboard route group (login required)
│   │   ├── auth/callback/              # Supabase OAuth callback handler
│   │   ├── ai-disclaimer/              # Halaman AI Disclaimer
│   │   ├── privacy/                    # Privacy Policy page
│   │   ├── terms/                      # Terms of Service page
│   │   ├── cookies/                    # Cookie Policy page
│   │   ├── contact/                    # Contact & Feedback page
│   │   └── api/
│   │       ├── analyze/route.ts        # POST: Analisis ATS via Gemini
│   │       ├── generate/route.ts       # POST: Generate Cover Letter (streaming)
│   │       ├── ocr/route.ts            # POST: OCR gambar via Gemini Vision
│   │       ├── scrape/route.ts         # POST: Scrape URL lowongan
│   │       ├── cv/
│   │       │   ├── upload/route.ts     # POST: Upload & parse CV (PDF/DOCX)
│   │       │   └── download/route.ts   # GET: Download CV dari R2
│   │       ├── applications/route.ts   # GET/PATCH/DELETE: Manajemen histori
│   │       └── user/plan/route.ts      # GET/POST: Info & update plan user
│   ├── lib/
│   │   ├── parser.ts                   # Parser CV (nama, pendidikan, pengalaman, skills)
│   │   ├── r2.ts                       # Helper Cloudflare R2 (upload/delete/get)
│   │   ├── ratelimit.ts                # Upstash Redis rate limiter (sliding window)
│   │   ├── anonLimit.ts                # Rate limit user anonim via Supabase DB
│   │   └── supabase/
│   │       └── server.ts               # Supabase server client (SSR)
│   ├── types/                          # TypeScript type definitions
│   └── proxy.ts                        # Next.js middleware (auth refresh + rate limit)
├── public/                             # Static assets
├── .env.local                          # Environment variables (tidak di-commit)
├── .env.local.example                  # Template env variables
├── next.config.ts                      # Next.js configuration
├── package.json
└── tsconfig.json
```

---

## 5. API Endpoints

### `POST /api/cv/upload`
Upload dan parse file CV.

| Field | Detail |
|-------|--------|
| **Auth** | Optional (anonim diizinkan) |
| **Content-Type** | `multipart/form-data` |
| **Input** | `file`: File (PDF/DOCX, max 5MB) |
| **Output** | `{ success, data: { name, education, experience, skills, rawText, fileKey } }` |
| **Storage** | File asli diunggah ke Cloudflare R2 dengan path `cvs/{user_id|anonymous}/{uuid}-{filename}` |
| **Parsing** | PDF → `pdf-parse`, DOCX → `mammoth` |

---

### `POST /api/analyze`
Analisis kesesuaian CV dengan Job Description menggunakan Gemini AI.

| Field | Detail |
|-------|--------|
| **Auth** | Optional |
| **Content-Type** | `application/json` |
| **Input** | `{ cvText, cvName, parsedCV, jobDescription, positionTitle, fileKey }` |
| **Output** | `{ success, applicationId, cvId, jobDescriptionId, analysis: { ats_score, matching_keywords, missing_keywords, suggestions } }` |
| **AI** | `gemini-2.5-flash-lite` · non-streaming · JSON mode |
| **Kuota** | Anonim: 5x/hari (promo) atau 1x/hari · Free login: 3x/bulan · Premium: unlimited |

---

### `POST /api/generate`
Generate cover letter dengan Gemini AI (streaming).

| Field | Detail |
|-------|--------|
| **Auth** | Optional |
| **Content-Type** | `application/json` |
| **Input** | `{ cvText, jobDescription, positionTitle, companyName, tone, length }` |
| **Output** | `text/plain` stream (Server-Sent Events style) |
| **AI** | `gemini-2.5-flash-lite` · **streamGenerateContent** |
| **Kuota** | Sama seperti `/api/analyze` (shared counter) |

---

### `POST /api/ocr`
Ekstrak teks dari gambar lowongan menggunakan Gemini Vision.

| Field | Detail |
|-------|--------|
| **Auth** | Optional |
| **Content-Type** | `multipart/form-data` |
| **Input** | `image`: File (JPEG/PNG/WEBP/GIF, max 10MB) |
| **Output** | `{ success, text: string }` |
| **AI** | `gemini-2.5-flash-lite` · multimodal (vision) · `inline_data` |

---

### `POST /api/scrape`
Ambil teks dari URL portal lowongan kerja.

| Field | Detail |
|-------|--------|
| **Auth** | Tidak diperlukan |
| **Content-Type** | `application/json` |
| **Input** | `{ url?: string, rawText?: string }` |
| **Output** | `{ success, text: string }` |
| **Note** | Teks dipotong maksimal 5.000 karakter. Beberapa situs memblokir request bot. |

---

### `GET /api/applications`
Ambil histori lamaran kerja pengguna.

| Field | Detail |
|-------|--------|
| **Auth** | **Wajib** |
| **Output** | Array aplikasi beserta data CV dan Job Description terkait |

---

### `PATCH /api/applications`
Update cover letter atau status lamaran.

| Field | Detail |
|-------|--------|
| **Auth** | **Wajib** |
| **Input** | `{ id, coverLetter?, status? }` |

---

### `DELETE /api/applications?id={id}`
Hapus lamaran beserta CV, Job Description, dan file di R2.

| Field | Detail |
|-------|--------|
| **Auth** | **Wajib** |
| **Cascade** | Menghapus record di `cvs`, `job_descriptions`, dan file di Cloudflare R2 |

---

### `GET /api/user/plan`
Ambil info plan dan sisa kuota pengguna (support anonim).

| Field | Detail |
|-------|--------|
| **Auth** | Optional |
| **Output (anonim)** | `{ plan: 'ANONYMOUS', generateCountMonth, generateLimit }` |
| **Output (login)** | `{ plan: 'FREE'|'PREMIUM', generateCountMonth, subscriptionEndsAt }` |

---

### `POST /api/user/plan`
Update paket langganan pengguna.

| Field | Detail |
|-------|--------|
| **Auth** | **Wajib** |
| **Input** | `{ plan: 'FREE' | 'PREMIUM' }` |
| **Effect** | Upgrade PREMIUM → `subscription_ends_at` = +30 hari, reset `generate_count_month` ke 0 |

---

## 6. Database & Storage

### Tabel Supabase

#### `users`
| Kolom | Tipe | Keterangan |
|-------|------|------------|
| `id` | uuid | Primary key (sama dengan Supabase Auth user.id) |
| `plan` | text | `FREE` atau `PREMIUM` |
| `generate_count_month` | int | Jumlah generate di bulan berjalan |
| `subscription_ends_at` | timestamptz | Tanggal berakhirnya Premium |
| `updated_at` | timestamptz | Timestamp update terakhir (dipakai untuk lazy monthly reset) |

#### `cvs`
| Kolom | Tipe | Keterangan |
|-------|------|------------|
| `id` | uuid | Primary key |
| `user_id` | uuid | FK ke users |
| `file_name` | text | Nama file asli |
| `extracted_text` | text | Teks mentah hasil parsing |
| `parsed_data` | jsonb | Struktur parsed (nama, pendidikan, dll) |
| `file_url` | text | Key file di Cloudflare R2 |

#### `job_descriptions`
| Kolom | Tipe | Keterangan |
|-------|------|------------|
| `id` | uuid | Primary key |
| `user_id` | uuid | FK ke users |
| `position_title` | text | Judul posisi |
| `raw_text` | text | Teks lowongan mentah |

#### `applications`
| Kolom | Tipe | Keterangan |
|-------|------|------------|
| `id` | uuid | Primary key |
| `user_id` | uuid | FK ke users |
| `cv_id` | uuid | FK ke cvs |
| `job_description_id` | uuid | FK ke job_descriptions |
| `ats_score` | int | Skor 0–100 dari Gemini |
| `cover_letter` | text | Teks surat lamaran yang di-generate |
| `status` | text | Status lamaran (`analyzed`, dll) |
| `matching_keywords` | jsonb | Array keyword yang cocok |
| `missing_keywords` | jsonb | Array keyword yang hilang |
| `suggestions` | jsonb | Array saran perbaikan per seksi CV |

#### `usage_tracking`
| Kolom | Tipe | Keterangan |
|-------|------|------------|
| `id` | uuid | Primary key |
| `anon_id` | uuid | Cookie identifier pengguna anonim |
| `ip_hash` | text | SHA-256 hash dari IP (tidak disimpan plaintext) |
| `request_count` | int | Jumlah request dalam window |
| `window_start` | timestamptz | Awal window harian |

### Cloudflare R2 Storage

Digunakan sebagai object storage untuk file CV yang diunggah.

- **SDK:** `@aws-sdk/client-s3` (R2 kompatibel dengan S3 API)
- **Struktur path:**
  ```
  cvs/
  ├── {user_id}/{uuid}-{filename}       # User yang login
  └── anonymous/{anon_id}/{uuid}-{filename}  # User anonim
  ```
- **Operasi:** `PutObject` (upload), `DeleteObject` (hapus), `GetObject` (download)

---

## 7. Sistem Autentikasi & Rate Limiting

### Autentikasi (Supabase Auth)

Aplikasi menggunakan model **optional auth**:

- **Halaman & fitur gratis:** dapat diakses tanpa login
- **Dashboard & histori:** memerlukan login
- **Upgrade ke Premium:** wajib login sebelum ke flow pembayaran

Middleware di [`src/proxy.ts`](./src/proxy.ts) dijalankan pada setiap request untuk:
1. Me-refresh session Supabase yang expired
2. Men-set cookie `anon_id` (UUID) saat first visit
3. Menerapkan rate limiting global via Upstash Redis

### Rate Limiting — Dua Lapisan

#### Lapisan 1: Upstash Redis (Global per endpoint)
- **Algoritma:** Sliding Window
- **Limit:** 10 request per 10 detik per identifier (user ID atau IP)
- **Implementasi:** `@upstash/ratelimit`
- **Fail-open:** jika Redis tidak tersedia, request tetap diizinkan (graceful degradation)

#### Lapisan 2: Supabase DB (Per use-case AI, user anonim)
- Berdasarkan kombinasi `anon_id` (cookie) + `ip_hash` (SHA-256)
- Window: harian (reset tiap hari)
- Limit:

| Fase | Limit Anonim/Hari |
|------|-------------------|
| Promo aktif (`PROMO_ACTIVE=true`) | 5 request/hari |
| Setelah promo | 1 request/hari |
| IP daily cap (abuse prevention) | 15 request/hari |

---

## 8. Model Bisnis & Sistem Kuota

### Tier Plan

| Tier | Limit Generate/Bulan | AI Watermark | Histori Lamaran | Storage CV |
|------|---------------------|--------------|-----------------|------------|
| **ANONYMOUS** | 5x/hari (promo) / 1x/hari | N/A | ❌ | Temporary |
| **FREE** (login) | 3x/bulan | ✅ | ✅ | Cloudflare R2 |
| **PREMIUM** | Unlimited | ❌ | ✅ | Cloudflare R2 |

### Logika Kuota Bulanan (Free Plan)
- Counter `generate_count_month` di-reset secara **lazy** — hanya direset saat ada request baru di bulan berbeda dari `updated_at`
- Jika sudah ≥ 3 kali dalam bulan yang sama → return HTTP 403 dengan pesan upgrade

### Kontrol Promo via Environment Variables
```bash
PROMO_ACTIVE=true          # Aktifkan promo (default: true jika tidak diset)
PROMO_END_DATE=2026-08-01  # Tanggal berakhir promo (otomatis turun ke 1x/hari)
```

---

## 9. Konfigurasi Environment

Salin `.env.local.example` ke `.env.local` dan isi semua nilai:

```bash
# ===== SUPABASE =====
NEXT_PUBLIC_SUPABASE_URL=https://{project-id}.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...

# ===== APP =====
NEXT_PUBLIC_APP_URL=http://localhost:3000

# ===== GOOGLE GEMINI API =====
GOOGLE_API_KEY=AIza...                  # API Key dari Google AI Studio

# ===== CLOUDFLARE R2 =====
R2_ACCOUNT_ID=...
R2_ACCESS_KEY_ID=...
R2_SECRET_ACCESS_KEY=...
R2_BUCKET_NAME=cari-kerja-ai

# ===== UPSTASH REDIS (Rate Limiting) =====
UPSTASH_REDIS_REST_URL=https://...upstash.io
UPSTASH_REDIS_REST_TOKEN=...

# ===== PROMO CONTROL =====
PROMO_ACTIVE=true                       # true = limit 5x/hari, false = 1x/hari
PROMO_END_DATE=2026-08-01               # Tanggal berakhir promo (ISO 8601)
```

> ⚠️ **Penting:** Variabel tanpa prefix `NEXT_PUBLIC_` hanya tersedia di server-side (API routes). Jangan pernah expose `GOOGLE_API_KEY`, `R2_SECRET_ACCESS_KEY`, atau Supabase service role key ke client bundle.

---

## 10. Cara Menjalankan Lokal

### Prerequisites
- Node.js v20+ (rekomendasi: v22 untuk kompatibilitas AWS SDK v3)
- npm v10+
- Akun aktif: Supabase, Google AI Studio, Cloudflare R2, Upstash Redis

### Setup

```bash
# 1. Clone dan masuk ke direktori proyek
cd d:\Project\Cari_kerja_AI

# 2. Install dependencies
npm install

# 3. Konfigurasi environment
copy .env.local.example .env.local
# Edit .env.local dengan nilai yang sesuai

# 4. Jalankan dev server
npm run dev
```

Server berjalan di: `http://localhost:3000`

### Scripts

| Script | Perintah | Keterangan |
|--------|----------|------------|
| Development | `npm run dev` | Next.js dev server dengan webpack |
| Build | `npm run build` | Production build |
| Start | `npm run start` | Jalankan production build |
| Lint | `npm run lint` | ESLint check |

---

## Catatan Teknis Tambahan

### Parser CV (Tanpa AI)
File [`src/lib/parser.ts`](./src/lib/parser.ts) mengurai teks CV secara **regex-based** tanpa AI untuk efisiensi:
- Ekstrak nama dari 12 baris pertama (skip email, URL, nomor telepon)
- Deteksi seksi (Pendidikan/Education, Pengalaman/Experience, Keahlian/Skills) via regex multilingual ID/EN
- Parsing skill: split by `,;|•-*/`, dedup, filter pendek/panjang

### Gemini Response Parsing
Karena Gemini streaming menggunakan NDJSON (bukan SSE standar), implementasi custom JSON extractor (`extractJsonObjects`) di [`/api/generate/route.ts`](./src/app/api/generate/route.ts) mem-parse JSON objects dari buffer karakter-per-karakter untuk menghindari parse error pada partial chunks.

### Privacy by Design
- IP **tidak disimpan plaintext** — selalu di-hash SHA-256 sebelum masuk ke DB
- CV anonim disimpan temporary di R2 dan dapat dihapus saat user hapus aplikasi
- Cookie `anon_id` bersifat `httpOnly` (tidak bisa diakses JavaScript) dan `secure` di production
