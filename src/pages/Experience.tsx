import React from 'react';
import { motion } from 'motion/react';
import { Briefcase, Smartphone, Code } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Experience() {
  const { t } = useLanguage();
  const experiences = [
    {
      year: t('exp.job1.date'),
      title: 'Full-Stack Developer',
      company: 'PT. Bakti Tekno Mandiri',
      description: t('exp.job1.desc'),
      tags: ['Angular', 'Flutter', 'REST API', 'Git', 'Agile'],
      icon: Briefcase
    },
    {
      year: t('exp.job2.date'),
      title: 'Freelance Full-Stack Developer',
      company: 'Independent Projects',
      description: t('exp.job2.desc'),
      tags: ['Next.js', 'Go', 'PostgreSQL', 'Java'],
      icon: Code
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-24">
      <header className="max-w-4xl mb-20">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-8xl font-black text-brand-orange mb-6 leading-[0.85]"
        >
          <span>{t('exp.title1')}</span><br/><span>{t('exp.title2')}</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-on-surface-variant font-medium leading-relaxed"
        >
          {t('exp.subtitle')}
        </motion.p>
      </header>

      <div className="relative max-w-5xl mx-auto">
        <div className="timeline-line absolute h-full w-px bg-outline top-0 left-4 md:left-1/2 md:-translate-x-1/2" />

        <div className="space-y-16">
          {experiences.map((exp, index) => (
            <motion.div 
              key={exp.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative flex flex-col md:flex-row items-center justify-between w-full ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
            >
              <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-6 h-6 bg-on-surface border-4 border-surface-default rounded-full z-10" />

              <div className="w-full md:w-[45%] bg-surface-default border border-outline rounded-2xl p-10 hover:border-brand-orange transition-colors ml-12 md:ml-0 shadow-xl shadow-black/[0.02]">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[10px] font-black text-brand-orange uppercase tracking-widest bg-brand-orange/5 px-3 py-1 rounded-full">{exp.year}</span>
                </div>
                <h2 className="text-2xl font-black text-on-surface mb-1 uppercase tracking-tight">{exp.title}</h2>
                <h3 className="text-sm font-bold text-on-surface-variant mb-6 uppercase tracking-wider">{exp.company}</h3>
                <p className="text-sm text-on-surface-variant mb-8 leading-relaxed">
                  {exp.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {exp.tags.map(tag => (
                    <span key={tag} className="text-[9px] font-black px-3 py-1 border border-outline rounded-full uppercase tracking-widest text-on-surface">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
