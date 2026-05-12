import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Github } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

import tenantMasterImg     from '../assets/images/tenant_master/home tenant master.png';
import schoolManagementImg from '../assets/images/project manajemen sekolah/project menejemen web.webp';
import ajarVisualImg       from '../assets/images/ajarvisual/AjarVisual_dashbord.png';
import syncBoardImg        from '../assets/images/syncboard/SyncBoard.webp';

export default function Projects() {
  const { t } = useLanguage();

  const projects = [
    {
      id: 1,
      title: 'Warung Cloud',
      description: t('proj.p1.desc'),
      tags: ['Next.js', 'Go', 'Microservices', 'PostgreSQL'],
      image: tenantMasterImg,
      type: 'featured',
      colSpan: 'md:col-span-8',
      link: 'https://warung-cloud.my.id/'
    },
    {
      id: 2,
      title: 'AjarVisual',
      description: t('proj.p2.desc'),
      tags: ['Angular', 'Java', 'MySQL', 'LMS'],
      image: ajarVisualImg,
      type: 'web',
      colSpan: 'md:col-span-4',
      link: 'https://ajar-visual.vercel.app/'
    },
    {
      id: 3,
      title: 'SyncBoard',
      description: t('proj.p3.desc'),
      tags: ['React', 'Node.js', 'WebSocket'],
      image: syncBoardImg,
      type: 'web',
      colSpan: 'md:col-span-6',
      link: 'https://sync-board-frontend-mu.vercel.app/'
    },
    {
      id: 4,
      title: 'School Management System',
      description: t('proj.p4.desc'),
      tags: ['Angular', 'Java', 'MySQL', 'Flutter'],
      image: schoolManagementImg,
      type: 'web',
      colSpan: 'md:col-span-6',
      link: '#'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-24">
      {/* Section Header */}
      <header className="mb-20 max-w-4xl">
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

      {/* Bento Grid Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {projects.map((project, index) => (
          <motion.article 
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className={`${project.colSpan} bg-surface-default rounded-2xl border border-outline overflow-hidden flex flex-col group shadow-xl shadow-black/[0.02] transition-all hover:border-brand-orange`}
          >
            <div className={`w-full ${project.type === 'featured' ? 'h-[320px] md:h-[380px]' : 'h-[260px]'} bg-gray-50 relative overflow-hidden`}>
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
              />
              {/* Overlay gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            
            <div className={`p-10 flex flex-col justify-between flex-grow ${project.type === 'featured' ? '' : ''}`}>
              <div>
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded-full px-4 py-1.5 text-[9px] font-black uppercase tracking-widest bg-brand-orange text-white">
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-3xl font-black text-on-surface mb-4 uppercase tracking-tight">{project.title}</h2>
                <p className="text-sm text-on-surface-variant leading-relaxed font-medium mb-10">
                  {project.description}
                </p>
              </div>
              
              <div className="flex items-center gap-6">
                <a href={project.link} target={project.link !== '#' ? "_blank" : undefined} rel={project.link !== '#' ? "noopener noreferrer" : undefined} className="inline-flex items-center gap-2 text-[10px] font-black text-on-surface uppercase tracking-widest hover:text-brand-orange transition-colors">
                  {t('proj.view')} <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
