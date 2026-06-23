import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'id' | 'en';

type Translations = {
  [key in Language]: {
    [key: string]: string;
  };
};

const translations: Translations = {
  id: {
    // Layout
    'nav.about': 'Tentang',
    'nav.experience': 'Pengalaman',
    'nav.skills': 'Keahlian',
    'nav.projects': 'Karya',
    'nav.contact': 'Kontak',
    'nav.resume': 'Resume',
    
    // Home
    'home.badge': 'Full-Stack & Mobile Developer',
    'home.tagline': 'Full-Stack & Mobile Developer berpengalaman 3+ tahun dalam membangun arsitektur SaaS enterprise dan solusi finansial yang berdampak.',
    'home.cta.primary': 'Lihat Karya',
    'home.cta.secondary': 'Hubungi Saya',
    'home.latestProject': 'Proyek Terbaru',
    'home.latestProject.desc': 'B2B multi-tenant SaaS — arsitektur microservices.',
    'home.stat.expertise': 'Keahlian',
    'home.stat.location': 'Lokasi',
    'home.stat.experience': 'Pengalaman',
    'home.stat.expertise.val': 'Full-Stack & Mobile',
    'home.stat.location.val': 'Klaten, Indonesia',
    'home.stat.experience.val': '3+ Tahun',

    // About
    'about.title1': 'Tentang',
    'about.title2': 'Saya',
    'about.p1': 'Saya Isnanto Budi Nurrahman developer dengan 3+ tahun pengalaman membangun sistem digital dari nol hingga production. Lulusan Teknik Informatika dari UTDI (IPK 3,60), saya spesialis dalam arsitektur SaaS enterprise dan Insurance Tech, dengan rekam jejak lebih dari 20 proyek yang berhasil diselesaikan.',
    'about.p2': 'Dari platform asuransi berbasis RBAC, aplikasi mobile Flutter, hingga sistem multi-tenant dengan microservices — saya menangani semuanya end-to-end. Saya bekerja dengan Angular, Flutter, Go, dan Java, dan terbiasa bergerak cepat di lingkungan yang menuntut kode yang scalable dan maintainable.',
    'about.philosophy.title': 'FILOSOFI & MINAT',
    'about.card1.title': 'Maintainability & Business Focus',
    'about.card1.p': 'Kode yang baik tidak sekadar berfungsi hari ini, tetapi juga mudah dipahami dan dikembangkan bertahun-tahun ke depan. Saya merancang sistem dengan visi siklus hidup bisnis jangka panjang, bukan sekadar pemenuhan target sprint jangka pendek. Setiap keputusan arsitektur selalu berorientasi pada dampak bisnis yang nyata—mulai dari efisiensi biaya pemeliharaan, akselerasi onboarding tim baru, hingga keandalan sistem pada skala enterprise.',
    'about.card2.title': 'REMOTE-FIRST MINDSET',
    'about.card2.p': 'Bekerja dari mana saja bukan sekadar tentang fleksibilitas, melainkan kedisiplinan. Saya berfokus pada dokumentasi yang komprehensif, komunikasi asinkron yang transparan, serta kemampuan membangun sistem yang tetap berjalan optimal tanpa bergantung pada kehadiran fisik.',

    // Experience
    'exp.title1': 'PENGALAMAN',
    'exp.title2': 'KERJA',
    'exp.subtitle': 'Jejak langkah karir saya dalam merancang dan mengembangkan solusi perangkat lunak yang tangguh dan efisien.',
    'exp.job1.date': 'Maret 2023 - Sekarang',
    'exp.job1.desc': 'Mengembangkan panel admin berbasis Angular untuk monitoring operasional, membangun aplikasi Android dengan Flutter untuk pemantauan real-time, serta mengintegrasikan REST API end-to-end.',
    'exp.job2.date': '2022 - 2023',
    'exp.job2.desc': 'Menyelesaikan berbagai proyek aplikasi web dan mobile kustom dengan fokus pada skalabilitas dan maintainability, termasuk sistem manajemen sekolah dan integrasi billing.',

    // Skills
    'skills.title1': 'KEAHLIAN',
    'skills.title2': '& TECH',
    'skills.subtitle': 'Kumpulan teknologi yang saya gunakan mendesain dan membangun solusi digital.',
    'skills.frontend.desc': 'Fokus pada antarmuka pengguna yang responsif, performa tinggi, dan pengalaman yang mulus menggunakan framework modern.',
    'skills.backend.desc': 'Membangun arsitektur server yang skalabel dan API yang aman untuk mendukung kebutuhan bisnis enterprise.',
    'skills.concept.title': 'Konsep',
    'skills.concept.desc': 'Pemahaman mendalam tentang prinsip rekayasa perangkat lunak untuk membangun sistem yang tangguh.',
    'skills.tools.title': 'Alat & Alur Kerja',
    'skills.tools.desc': 'Ekosistem alat yang mendukung produktivitas tinggi dan kolaborasi asinkron.',

    // Projects
    'proj.title1': 'KARYA',
    'proj.title2': '& RISET',
    'proj.subtitle': 'Kumpulan proyek terpilih yang mencerminkan pendekatan fungsional dalam memecahkan masalah kompleks.',
    'proj.p1.desc': 'Platform B2B multi-tenant dengan isolasi data per-tenant, arsitektur microservices, manajemen user & aplikasi, serta sistem billing terintegrasi.',
    'proj.p2.desc': 'Platform e-learning berbasis visual dengan manajemen soal interaktif, dashboard instruktur, dan pengalaman belajar yang adaptif.',
    'proj.p3.desc': 'Aplikasi kolaborasi real-time untuk sinkronisasi tugas dan progres tim secara visual, mendukung workflow asinkron di lingkungan remote.',
    'proj.p4.desc': 'Sistem komprehensif untuk pengelolaan data administrasi, siswa, dan operasional sekolah — tersedia versi web dan Android.',
    'proj.p5.desc': 'Platform AI untuk pencari kerja Indonesia — analisis ATS, generate cover letter, dan OCR lowongan menggunakan Google Gemini. Dibangun dengan Next.js, Supabase, dan Cloudflare R2.',
    'proj.view': 'LIHAT PROYEK',

    // Contact
    'contact.connect': 'Mari Terhubung',
    'contact.title1': 'SAPA',
    'contact.title2': 'DULU.',
    'contact.subtitle': 'Tertarik untuk berkolaborasi dalam proyek fullstack berikutnya? Mari diskusi lebih lanjut melalui jalur profesional di bawah.',
    'contact.location': 'Klaten, Indonesia · Remote Available',
    'contact.available1': 'Tersedia untuk proyek baru.',
    'contact.available2': 'Biasanya membalas dalam 24 jam pada hari kerja.',
    'contact.form.title': 'Kirim Pesan',
    'contact.form.name': 'Nama Lengkap',
    'contact.form.namePlaceholder': 'Isnanto Budi',
    'contact.form.email': 'Alamat Email',
    'contact.form.emailPlaceholder': 'email@contoh.com',
    'contact.form.msg': 'Pesan',
    'contact.form.msgPlaceholder': 'Ceritakan kebutuhan proyek Anda, atau sekedar menyapa...',
    'contact.form.min': 'min. 10',
    'contact.form.submit': 'Kirim Pesan',
    'contact.form.success': 'Pesan Berhasil Terkirim!',
    'contact.err.name.req': 'Nama wajib diisi',
    'contact.err.name.min': 'Nama minimal 3 karakter',
    'contact.err.email.req': 'Email wajib diisi',
    'contact.err.email.inv': 'Format email tidak valid',
    'contact.err.msg.req': 'Pesan wajib diisi',
    'contact.err.msg.min': 'Pesan minimal 10 karakter',
  },
  en: {
    // Layout
    'nav.about': 'About',
    'nav.experience': 'Experience',
    'nav.skills': 'Skills',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',
    'nav.resume': 'Resume',

    // Home
    'home.badge': 'Full-Stack & Mobile Developer',
    'home.tagline': 'Full-Stack & Mobile Developer with 3+ years of experience building enterprise SaaS architectures and impactful financial solutions.',
    'home.cta.primary': 'View Work',
    'home.cta.secondary': 'Contact Me',
    'home.latestProject': 'Latest Project',
    'home.latestProject.desc': 'B2B multi-tenant SaaS — microservices architecture.',
    'home.stat.expertise': 'Expertise',
    'home.stat.location': 'Location',
    'home.stat.experience': 'Experience',
    'home.stat.expertise.val': 'Full-Stack & Mobile',
    'home.stat.location.val': 'Klaten, Indonesia',
    'home.stat.experience.val': '3+ Years',

    // About
    'about.title1': 'About',
    'about.title2': 'Me',
    'about.p1': 'I am Isnanto Budi Nurrahman  a developer with 3+ years of experience building digital systems from scratch to production. As an Informatics Engineering graduate from UTDI (3.60 GPA), I specialize in enterprise SaaS architectures and Insurance Tech, with a track record of over 20 successfully completed projects.',
    'about.p2': 'From RBAC-based insurance platforms and Flutter mobile apps to multi-tenant systems with microservices — I handle everything end-to-end. I work with Angular, Flutter, Go, and Java, and am accustomed to moving fast in environments that demand scalable and maintainable code.',
    'about.philosophy.title': 'PHILOSOPHY & INTERESTS',
    'about.card1.title': 'Maintainability & Business Focus',
    'about.card1.p': 'Good code doesn\'t just work today, it is also easy to understand and extend for years to come. I design systems with a long-term business lifecycle vision, not just short-term sprint fulfillment. Every architectural decision is always oriented towards real business impact—from maintenance cost efficiency, faster new team onboarding, to system reliability at enterprise scale.',
    'about.card2.title': 'REMOTE-FIRST MINDSET',
    'about.card2.p': 'Working from anywhere isn\'t just about flexibility, it\'s about discipline. I focus on comprehensive documentation, transparent asynchronous communication, and the ability to build systems that continue to run optimally without relying on physical presence.',

    // Experience
    'exp.title1': 'WORK',
    'exp.title2': 'EXPERIENCE',
    'exp.subtitle': 'My career journey in designing and developing robust and efficient software solutions.',
    'exp.job1.date': 'March 2023 - Present',
    'exp.job1.desc': 'Developed an Angular-based admin panel for operational monitoring, built an Android application with Flutter for real-time tracking, and integrated end-to-end REST APIs.',
    'exp.job2.date': '2022 - 2023',
    'exp.job2.desc': 'Delivered various custom web and mobile application projects focusing on scalability and maintainability, including school management systems and billing integrations.',

    // Skills
    'skills.title1': 'EXPERTISE',
    'skills.title2': '& TECH',
    'skills.subtitle': 'A collection of technologies I use to design and build digital solutions.',
    'skills.frontend.desc': 'Focused on responsive user interfaces, high performance, and seamless experiences using modern frameworks.',
    'skills.backend.desc': 'Building scalable server architectures and secure APIs to support enterprise business needs.',
    'skills.concept.title': 'Concepts',
    'skills.concept.desc': 'Deep understanding of software engineering principles to build robust systems.',
    'skills.tools.title': 'Tools & Workflow',
    'skills.tools.desc': 'An ecosystem of tools supporting high productivity and asynchronous collaboration.',

    // Projects
    'proj.title1': 'WORKS',
    'proj.title2': '& RESEARCH',
    'proj.subtitle': 'A collection of selected projects reflecting a functional approach to solving complex problems.',
    'proj.p1.desc': 'A B2B multi-tenant platform with per-tenant data isolation, microservices architecture, user & app management, and integrated billing systems.',
    'proj.p2.desc': 'A visually-driven e-learning platform with interactive question management, instructor dashboards, and adaptive learning experiences.',
    'proj.p3.desc': 'A real-time collaboration app for visual team progress and task synchronization, supporting asynchronous workflows in remote environments.',
    'proj.p4.desc': 'A comprehensive system for managing school administration, students, and operations — available in web and Android versions.',
    'proj.p5.desc': 'AI-powered job seeker platform for Indonesia — ATS analysis, cover letter generation, and job listing OCR using Google Gemini. Built with Next.js, Supabase, and Cloudflare R2.',
    'proj.view': 'VIEW PROJECT',

    // Contact
    'contact.connect': 'Let\'s Connect',
    'contact.title1': 'SAY',
    'contact.title2': 'HELLO.',
    'contact.subtitle': 'Interested in collaborating on your next fullstack project? Let\'s discuss further via the professional channels below.',
    'contact.location': 'Klaten, Indonesia · Remote Available',
    'contact.available1': 'Available for new projects.',
    'contact.available2': 'Usually replies within 24 hours on business days.',
    'contact.form.title': 'Send Message',
    'contact.form.name': 'Full Name',
    'contact.form.namePlaceholder': 'Isnanto Budi',
    'contact.form.email': 'Email Address',
    'contact.form.emailPlaceholder': 'email@example.com',
    'contact.form.msg': 'Message',
    'contact.form.msgPlaceholder': 'Tell me about your project needs, or just say hello...',
    'contact.form.min': 'min. 10',
    'contact.form.submit': 'Send Message',
    'contact.form.success': 'Message Sent Successfully!',
    'contact.err.name.req': 'Name is required',
    'contact.err.name.min': 'Name must be at least 3 characters',
    'contact.err.email.req': 'Email is required',
    'contact.err.email.inv': 'Invalid email format',
    'contact.err.msg.req': 'Message is required',
    'contact.err.msg.min': 'Message must be at least 10 characters',
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem('language') as Language;
    if (saved && (saved === 'id' || saved === 'en')) {
      setLanguage(saved);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    if (!isClient) return translations['id'][key] || key; // Default for SSR / initial render if needed
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
