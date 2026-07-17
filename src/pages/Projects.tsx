import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Github, ExternalLink, X, Lock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

import tenantMasterImg     from '../assets/images/tenant_master/home tenant master.webp';
import schoolManagementImg from '../assets/images/project manajemen sekolah/project menejemen web.webp';
import ajarVisualImg       from '../assets/images/ajarvisual/AjarVisual_dashbord.png';
import syncBoardImg        from '../assets/images/syncboard/SyncBoard.webp';
import benerinCvImg        from '../assets/images/benerincv/BenerinCV.png';

interface Project {
  id: number;
  title: string;
  descriptionKey: string;
  tags: string[];
  image: string;
  colSpan: string;
  link: string;
  github: string;
  categories: string[];
  detailsKey: {
    role: string;
    challenge: string;
    solution: string;
    impact: string;
    features: string;
  };
}

export default function Projects() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = ['all', 'saas', 'web', 'mobile', 'ai'];

  const projects: Project[] = [
    {
      id: 1,
      title: 'Warung Cloud',
      descriptionKey: 'proj.p1.desc',
      tags: ['Next.js', 'Go', 'Microservices', 'PostgreSQL'],
      image: tenantMasterImg,
      colSpan: 'md:col-span-8',
      link: 'https://warung-cloud.my.id/',
      github: '',
      categories: ['saas', 'web'],
      detailsKey: {
        role: 'proj.p1.role',
        challenge: 'proj.p1.challenge',
        solution: 'proj.p1.solution',
        impact: 'proj.p1.impact',
        features: 'proj.p1.features'
      }
    },
    {
      id: 5,
      title: 'BenerinCV',
      descriptionKey: 'proj.p5.desc',
      tags: ['Next.js', 'Gemini AI', 'Supabase', 'TypeScript', 'Cloudflare R2'],
      image: benerinCvImg,
      colSpan: 'md:col-span-4',
      link: 'https://www.benerincv.web.id/',
      github: '',
      categories: ['ai', 'web'],
      detailsKey: {
        role: 'proj.p5.role',
        challenge: 'proj.p5.challenge',
        solution: 'proj.p5.solution',
        impact: 'proj.p5.impact',
        features: 'proj.p5.features'
      }
    },
    {
      id: 4,
      title: 'Core System Manajemen Asuransi',
      descriptionKey: 'proj.p4.desc',
      tags: ['Angular', 'TypeScript', 'Java', 'SQL', 'RBAC'],
      image: schoolManagementImg,
      colSpan: 'md:col-span-6',
      link: '',
      github: '',
      categories: ['saas', 'web'],
      detailsKey: {
        role: 'proj.p4.role',
        challenge: 'proj.p4.challenge',
        solution: 'proj.p4.solution',
        impact: 'proj.p4.impact',
        features: 'proj.p4.features'
      }
    },
    {
      id: 2,
      title: 'AjarVisual',
      descriptionKey: 'proj.p2.desc',
      tags: ['Angular', 'Java', 'MySQL', 'LMS'],
      image: ajarVisualImg,
      colSpan: 'md:col-span-6',
      link: 'https://ajar-visual.vercel.app/',
      github: '',
      categories: ['web'],
      detailsKey: {
        role: 'proj.p2.role',
        challenge: 'proj.p2.challenge',
        solution: 'proj.p2.solution',
        impact: 'proj.p2.impact',
        features: 'proj.p2.features'
      }
    },
    {
      id: 3,
      title: 'SyncBoard',
      descriptionKey: 'proj.p3.desc',
      tags: ['React', 'Node.js', 'WebSocket'],
      image: syncBoardImg,
      colSpan: 'md:col-span-12',
      link: 'https://sync-board-frontend-mu.vercel.app/',
      github: '',
      categories: ['web'],
      detailsKey: {
        role: 'proj.p3.role',
        challenge: 'proj.p3.challenge',
        solution: 'proj.p3.solution',
        impact: 'proj.p3.impact',
        features: 'proj.p3.features'
      }
    }
  ];

  // Esc key closes modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    if (selectedProject) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(p => p.categories.includes(activeCategory));

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-24">
      {/* Section Header */}
      <header className="mb-16 max-w-4xl">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-8xl font-black text-brand-orange mb-6 leading-[0.85]"
        >
          <span>{t('proj.title1')}</span><br/><span>{t('proj.title2')}</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-on-surface-variant font-medium leading-relaxed"
        >
          {t('proj.subtitle')}
        </motion.p>
      </header>

      {/* Category Filters */}
      <div className="mb-12 flex justify-start md:justify-center overflow-x-auto pb-4 scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">
        <div className="flex gap-2 p-1.5 bg-surface-default border border-outline rounded-full backdrop-blur-md">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative rounded-full px-5 py-2 text-xs font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  isActive 
                    ? 'text-black font-black' 
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute inset-0 bg-brand-orange rounded-full z-0"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{t(`proj.filter.${cat}`)}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bento Grid Gallery */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-12 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.article 
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className={`${project.colSpan} bg-surface-default rounded-3xl border border-outline overflow-hidden flex flex-col group shadow-xl shadow-black/[0.01] hover:shadow-black/[0.03] transition-all hover:border-brand-orange/40 cursor-pointer`}
              onClick={() => setSelectedProject(project)}
            >
              {/* Card Image Container */}
              <div className="w-full h-[220px] md:h-[280px] lg:h-[320px] bg-neutral-900 relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                />
                {/* Hover overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                  <span className="text-[10px] font-black text-brand-orange uppercase tracking-widest mb-2">
                    {t('proj.detail')}
                  </span>
                  <p className="text-white text-xs line-clamp-2 opacity-90 font-medium">
                    {t(project.descriptionKey)}
                  </p>
                </div>
              </div>
              
              {/* Card Text Content */}
              <div className="p-8 flex flex-col justify-between flex-grow">
                <div>
                  {/* Technology Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tags.map((tag) => (
                      <span key={tag} className="rounded-full px-3 py-1 text-[9px] font-bold uppercase tracking-wider bg-outline text-on-surface-variant border border-outline">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-2xl font-black text-on-surface mb-3 tracking-tight group-hover:text-brand-orange transition-colors">
                    {project.title}
                  </h2>
                  <p className="text-sm text-on-surface-variant leading-relaxed font-medium mb-6 line-clamp-3">
                    {t(project.descriptionKey)}
                  </p>
                </div>
                
                {/* Actions Footer */}
                <div className="flex items-center justify-between border-t border-outline pt-5">
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-black text-on-surface-variant uppercase tracking-widest group-hover:text-brand-orange transition-colors">
                    {t('proj.detail')} <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                  
                  {/* Action Buttons */}
                  <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
                    {project.link ? (
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="p-2 rounded-full border border-outline hover:border-brand-orange hover:text-brand-orange hover:bg-brand-orange hover:text-black transition-all cursor-pointer flex items-center justify-center"
                        aria-label="Live Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    ) : null}
                    
                    {project.github ? (
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="p-2 rounded-full border border-outline hover:border-brand-orange hover:text-brand-orange hover:bg-brand-orange hover:text-black transition-all cursor-pointer flex items-center justify-center"
                        aria-label="GitHub Repository"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    ) : (
                      <span 
                        className="p-2 rounded-full border border-outline text-on-surface-variant/40 flex items-center justify-center cursor-not-allowed" 
                        title="Private Repository"
                      >
                        <Lock className="w-4 h-4" />
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Detailed Case Study Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/75 backdrop-blur-md cursor-pointer"
            />
            
            {/* Modal Window */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="relative w-full max-w-4xl bg-surface-default border border-outline rounded-3xl overflow-hidden shadow-2xl z-10 max-h-[90vh] flex flex-col"
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-outline hover:bg-brand-orange hover:text-black transition-all cursor-pointer z-20 flex items-center justify-center"
                aria-label={t('proj.close')}
              >
                <X className="w-5 h-5" />
              </button>
              
              {/* Scrollable Modal Content */}
              <div className="overflow-y-auto flex-grow">
                {/* Banner/Image */}
                <div className="w-full h-[200px] md:h-[300px] relative bg-neutral-900">
                  <img 
                    src={selectedProject.image} 
                    alt={selectedProject.title} 
                    className="w-full h-full object-cover object-top opacity-85"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-default via-surface-default/20 to-transparent" />
                  <div className="absolute bottom-6 left-6 md:left-10 z-10">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {selectedProject.categories.map((c) => (
                        <span key={c} className="rounded-full px-3 py-1 text-[9px] font-black uppercase tracking-wider bg-brand-orange text-black">
                          {t(`proj.filter.${c}`)}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-3xl md:text-5xl font-black text-on-surface tracking-tight uppercase">
                      {selectedProject.title}
                    </h3>
                  </div>
                </div>
                
                {/* Detail Content Grid */}
                <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Main Column */}
                  <div className="md:col-span-2 space-y-6">
                    {/* Challenge */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-black text-brand-orange uppercase tracking-widest">
                        {t('proj.challenge')}
                      </h4>
                      <p className="text-sm md:text-base text-on-surface-variant font-medium leading-relaxed">
                        {t(selectedProject.detailsKey.challenge)}
                      </p>
                    </div>
                    
                    {/* Solution */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-black text-brand-orange uppercase tracking-widest">
                        {t('proj.solution')}
                      </h4>
                      <p className="text-sm md:text-base text-on-surface-variant font-medium leading-relaxed">
                        {t(selectedProject.detailsKey.solution)}
                      </p>
                    </div>
                    
                    {/* Key Features */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-black text-brand-orange uppercase tracking-widest">
                        {t('proj.features')}
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {t(selectedProject.detailsKey.features).split(', ').map((feat) => (
                          <div key={feat} className="flex items-center gap-2 p-3 rounded-xl bg-outline border border-outline/50">
                            <div className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0" />
                            <span className="text-xs font-bold text-on-surface">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Sidebar Column */}
                  <div className="space-y-6 bg-outline/20 border border-outline rounded-2xl p-6 md:p-8 h-fit">
                    {/* Role */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-black text-brand-orange uppercase tracking-widest">
                        {t('proj.role')}
                      </span>
                      <p className="text-sm font-black text-on-surface">
                        {t(selectedProject.detailsKey.role)}
                      </p>
                    </div>
                    
                    {/* Impact */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-black text-brand-orange uppercase tracking-widest">
                        {t('proj.impact')}
                      </span>
                      <p className="text-xs md:text-sm font-semibold text-on-surface-variant leading-relaxed">
                        {t(selectedProject.detailsKey.impact)}
                      </p>
                    </div>
                    
                    {/* Tech Stack */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-black text-brand-orange uppercase tracking-widest">
                        Tech Stack
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedProject.tags.map((tag) => (
                          <span key={tag} className="rounded-md px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider bg-surface-default border border-outline text-on-surface">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Modal Footer */}
              <div className="p-6 md:px-10 border-t border-outline flex items-center justify-end gap-4 bg-outline/10">
                {selectedProject.link && (
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-brand-orange text-black px-6 py-2.5 text-xs font-black uppercase tracking-wider hover:bg-brand-orange/90 transition-colors cursor-pointer"
                  >
                    Live Demo <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                
                {selectedProject.github ? (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-outline hover:border-brand-orange text-on-surface px-6 py-2.5 text-xs font-black uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    GitHub <Github className="w-4 h-4" />
                  </a>
                ) : (
                  <div className="inline-flex items-center gap-2 rounded-full border border-outline text-on-surface-variant/40 px-6 py-2.5 text-xs font-black uppercase tracking-wider">
                    Private Code <Lock className="w-4 h-4" />
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
