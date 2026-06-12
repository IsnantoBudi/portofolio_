import React, { useCallback } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import type { Screen } from '../types';
import profileImg from '../assets/images/regenerated_image_1778572180933.webp';
import { useLanguage } from '../contexts/LanguageContext';

// ── Types ──────────────────────────────────────────────────────────────────

interface HomeProps {
  onNavigate: (screen: Screen) => void;
}

interface TechLogo {
  name: string;
  url: string;
  icon: React.ReactNode;
}

interface Stat {
  label: string;
  value: string;
}

// ── Data ───────────────────────────────────────────────────────────────────

const techLogos: TechLogo[] = [
  {
    name: 'Angular',
    url: 'https://angular.dev',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
        <path d="M12.001,0L0.985,3.95l1.642,14.516L12.001,24l9.373-5.534l1.642-14.516L12.001,0z M12.001,2.21l8.033,2.89 l-1.284,11.452l-6.749,4.499l-6.749-4.499L3.968,5.1L12.001,2.21z M12.001,4.409l-5.932,13.189h2.244l1.321-3.319h4.733 l1.321,3.319h2.244L12.001,4.409z M12.001,7.056l1.688,4.312h-3.376L12.001,7.056z"/>
      </svg>
    ),
  },
  {
    name: 'Spring Boot',
    url: 'https://spring.io/projects/spring-boot',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
        <path d="M20.59 5.65a9.3 9.3 0 0 1 1.17 5.19A10.41 10.41 0 0 1 11.35 21a10 10 0 0 1-7.7-3.56A6.44 6.44 0 0 0 8 19a6.53 6.53 0 0 0 5.11-2.49 3.23 3.23 0 0 1-3-2.25 3.38 3.38 0 0 0 .6.06 3.27 3.27 0 0 0 .84-.12 3.22 3.22 0 0 1-2.58-3.16v-.06a3.22 3.22 0 0 0 1.46.4A3.24 3.24 0 0 1 8.44 7.2a9.13 9.13 0 0 0 6.63 3.36 3.24 3.24 0 0 1 5.52-2.95 6.39 6.39 0 0 0 2.05-.78 3.24 3.24 0 0 1-1.42 1.79A6.52 6.52 0 0 0 23 8.1a6.57 6.57 0 0 1-1.62 1.68c.01.18.01.36.01.54A9.31 9.31 0 0 1 20.59 5.65zm1 16.17a1.5 1.5 0 1 0-1.5-1.5 1.5 1.5 0 0 0 1.5 1.5zm-20-18a1.5 1.5 0 1 0 1.5 1.5 1.5 1.5 0 0 0-1.5-1.5z"/>
      </svg>
    ),
  },
  {
    name: 'MySQL',
    url: 'https://www.mysql.com/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
        <path d="M12 3C7.58 3 4 5.69 4 9c0 2.07 1.3 3.9 3.33 5.06L6.5 21h.5l1.5-4.5c1.03.32 2.17.5 3.5.5s2.47-.18 3.5-.5L17 21h.5l-.83-6.94C18.7 12.9 20 11.07 20 9c0-3.31-3.58-6-8-6zm0 10c-3.31 0-6-1.79-6-4s2.69-4 6-4 6 1.79 6 4-2.69 4-6 4zm-2-5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm4 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
      </svg>
    ),
  },
];

// ── Component ──────────────────────────────────────────────────────────────

export default function Home({ onNavigate }: HomeProps): React.JSX.Element {
  const { t } = useLanguage();
  const handleGoProjects = useCallback(() => onNavigate('Projects'), [onNavigate]);
  const handleGoContact  = useCallback(() => onNavigate('Contact'),  [onNavigate]);

  const stats: Stat[] = [
    { label: t('home.stat.expertise'),    value: t('home.stat.expertise.val') },
    { label: t('home.stat.location'),      value: t('home.stat.location.val') },
    { label: t('home.stat.experience'),  value: t('home.stat.experience.val') },
  ];

  return (
    <div className="relative min-h-[calc(100vh-80px)] flex flex-col md:flex-row overflow-hidden bg-background-main">

      {/* ── Left Column: Hero Text ── */}
      <div className="w-full md:w-2/3 flex flex-col justify-center px-6 md:px-12 py-20 border-r border-outline">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <span className="px-3 py-1 bg-brand-orange text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
            {t('home.badge')}
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-[60px] sm:text-[80px] lg:text-[110px] font-black leading-[0.85] tracking-tighter uppercase text-brand-orange"
        >
          <span>Isnanto</span><br/>
          <span>Budi</span><br/>
          <span>Nurrahman</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 text-lg md:text-xl text-on-surface-variant leading-relaxed max-w-xl font-medium"
        >
          {t('home.tagline')}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 mt-12"
        >
          {/* Primary */}
          <button
            onClick={handleGoProjects}
            className="bg-brand-orange text-white px-10 py-5 rounded-full font-bold uppercase text-[10px] tracking-widest hover:brightness-110 transition-all flex items-center justify-center gap-3 shadow-lg shadow-brand-orange/20"
          >
            {t('home.cta.primary')} <ArrowRight className="w-4 h-4" />
          </button>

          {/* Secondary — border-outline renders correctly on both modes */}
          <button
            onClick={handleGoContact}
            className="border border-outline text-on-surface px-10 py-5 rounded-full font-bold uppercase text-[10px] tracking-widest ring-1 ring-inset ring-outline hover:bg-brand-orange hover:text-white hover:border-brand-orange hover:ring-brand-orange transition-all flex items-center justify-center"
          >
            {t('home.cta.secondary')}
          </button>
        </motion.div>
      </div>

      {/* ── Right Column: Profile & Stats ── */}
      <div className="w-full md:w-1/3 flex flex-col bg-surface-default">

        {/* Profile Photo — LCP element: fetchPriority + eager */}
        <div className="h-[400px] md:h-1/2 overflow-hidden bg-surface-default relative group">
          <img
            src={profileImg}
            alt="Isnanto Budi Nurrahman — Full-Stack Developer"
            width={480}
            height={600}
            fetchPriority="high"
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
          {/* Gradient overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-surface-default via-transparent to-transparent" />
        </div>

        {/* Info Panel */}
        <div className="flex-1 px-8 md:px-12 pb-10 md:pb-12 flex flex-col justify-end gap-8">

          {/* Latest Project */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-2">
              {t('home.latestProject')}
            </p>
            <h2 className="text-xl font-black leading-tight uppercase tracking-tight text-on-surface">
              TenantMaster Cloud
            </h2>
            <p className="text-on-surface-variant text-sm mt-1 font-medium">
              {t('home.latestProject.desc')}
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-3"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center justify-between border-b border-outline pb-3 group/stat"
              >
                <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant group-hover/stat:text-brand-orange transition-colors">
                  {stat.label}
                </span>
                <span className="text-xs font-bold uppercase tracking-tight text-on-surface">
                  {stat.value}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Tech Badges */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="flex gap-3"
          >
            {techLogos.map((tech) => (
              <a
                key={tech.name}
                href={tech.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={tech.name}
                className="w-12 h-12 rounded-full border border-outline bg-surface-default text-on-surface flex items-center justify-center hover:bg-brand-orange hover:text-white hover:border-brand-orange hover:-translate-y-1 transition-all"
              >
                {tech.icon}
              </a>
            ))}
          </motion.div>

        </div>
      </div>
    </div>
  );
}
