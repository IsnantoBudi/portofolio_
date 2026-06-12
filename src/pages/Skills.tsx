import React from 'react';
import { motion } from 'motion/react';
import { Code, Database, Lightbulb, Cpu } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Skills() {
  const { t } = useLanguage();

  const skillGroups = [
    {
      title: 'Frontend',
      description: t('skills.frontend.desc'),
      icon: Code,
      accent: 'text-brand-orange',
      skills: ['Angular', 'Flutter', 'Next.js', 'Vue.js', 'React', 'TypeScript', 'Tailwind CSS']
    },
    {
      title: 'Backend',
      description: t('skills.backend.desc'),
      icon: Database,
      accent: 'text-brand-orange',
      skills: ['Java', 'Golang (Go)', 'Node.js', 'REST API', 'Apache Tapestry']
    },
    {
      title: t('skills.concept.title'),
      description: t('skills.concept.desc'),
      icon: Lightbulb,
      accent: 'text-brand-orange',
      skills: ['Microservices', 'Multi-tenant', 'RBAC', 'SDLC', 'OOP', 'API-First']
    }
  ];

  const tools = ['Git', 'GitHub', 'Android Studio', 'VS Code', 'IntelliJ', 'Postman'];

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-24">
      <header className="max-w-4xl mb-20">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-8xl font-black text-brand-orange mb-6 leading-[0.85]"
        >
          <span>{t('skills.title1')}</span><br/><span>{t('skills.title2')}</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-on-surface-variant font-medium leading-relaxed"
        >
          {t('skills.subtitle')}
        </motion.p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        {skillGroups.map((group, index) => (
          <motion.div 
            key={group.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-surface-default rounded-2xl p-10 border border-outline shadow-xl shadow-black/[0.02] flex flex-col h-full transition-all group hover:border-brand-orange"
          >
            {/* Icon + Title */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-brand-orange/10 rounded-xl flex items-center justify-center transition-transform group-hover:rotate-6 group-hover:bg-brand-orange/20">
                <group.icon className="w-6 h-6 text-brand-orange" />
              </div>
              <h2 className="text-3xl font-black text-on-surface tracking-tight">{group.title}</h2>
            </div>

            {/* Description */}
            <p className="text-on-surface-variant mb-10 flex-grow leading-relaxed font-medium">
              {group.description}
            </p>

            {/* Skill Badges */}
            <div className="flex flex-wrap gap-2">
              {group.skills.map(skill => (
                <span
                  key={skill}
                  className="border border-outline text-on-surface-variant px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:border-brand-orange hover:text-brand-orange transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Tools Card — full width, inverted style */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="col-span-1 md:col-span-2 lg:col-span-3 bg-brand-orange rounded-2xl p-10 flex flex-col md:flex-row items-center justify-between gap-10"
        >
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-6">
              <Cpu className="w-8 h-8 text-black" />
              <h2 className="text-3xl font-black text-black uppercase tracking-tight">{t('skills.tools.title')}</h2>
            </div>
            <p className="text-black/85 font-medium max-w-xl text-lg leading-relaxed">
              {t('skills.tools.desc')}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 justify-center md:justify-end md:max-w-md">
            {tools.map(tool => (
              <span
                key={tool}
                className="bg-black/10 text-black border border-black/20 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-brand-orange transition-all"
              >
                {tool}
              </span>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
