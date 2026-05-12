import React from 'react';
import { motion } from 'motion/react';
import { Code, Database, Smartphone, Cpu } from 'lucide-react';

const skillGroups = [
  {
    title: 'Frontend',
    description: 'Fokus pada antarmuka pengguna yang responsif, performa tinggi, dan pengalaman yang mulus menggunakan framework modern.',
    icon: Code,
    color: 'bg-ocean-secondary/10',
    iconColor: 'text-ocean-secondary',
    skills: ['Angular', 'Flutter', 'Next.js', 'Vue.js', 'React', 'TypeScript', 'Tailwind CSS']
  },
  {
    title: 'Backend',
    description: 'Membangun arsitektur server yang skalabel dan API yang aman untuk mendukung kebutuhan bisnis enterprise.',
    icon: Database,
    color: 'bg-forest-tertiary/10',
    iconColor: 'text-forest-tertiary',
    skills: ['Java', 'Golang (Go)', 'Node.js', 'REST API', 'Apache Tapestry']
  },
  {
    title: 'Konsep',
    description: 'Pemahaman mendalam tentang prinsip rekayasa perangkat lunak untuk membangun sistem yang tangguh.',
    icon: Smartphone,
    color: 'bg-sand-primary/10',
    iconColor: 'text-sand-primary',
    skills: ['Microservices', 'Multi-tenant', 'RBAC', 'SDLC', 'OOP', 'API-First']
  }
];

export default function Skills() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-24">
      <header className="max-w-4xl mb-20">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-8xl font-black text-brand-orange mb-6 leading-[0.85]"
        >
          <span>KEAHLIAN</span><br/><span>& TECH</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-on-surface-variant font-medium leading-relaxed"
        >
          Kumpulan teknologi yang saya gunakan mendesain dan membangun solusi digital.
        </motion.p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
        {skillGroups.map((group, index) => (
          <motion.div 
            key={group.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-surface-default rounded-2xl p-10 border border-outline shadow-xl shadow-black/[0.02] flex flex-col h-full transition-all group"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-on-surface rounded-xl flex items-center justify-center text-surface-default transition-transform group-hover:rotate-6">
                <group.icon className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-black text-on-surface tracking-tight">{group.title}</h2>
            </div>
            <p className="text-on-surface-variant mb-10 flex-grow leading-relaxed font-medium">
              {group.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {group.skills.map(skill => (
                <span key={skill} className="bg-outline text-on-surface px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Tools Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-on-surface rounded-2xl p-10 shadow-sm col-span-1 md:col-span-2 lg:col-span-3 flex flex-col md:flex-row items-center justify-between gap-10 text-surface-default"
        >
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-6">
              <Cpu className="w-8 h-8 text-brand-orange" />
              <h2 className="text-3xl font-black uppercase tracking-tight">Alat & Alur Kerja</h2>
            </div>
            <p className="text-on-surface-variant font-medium max-w-xl text-lg leading-relaxed brightness-150">
              Ekosistem alat yang mendukung produktivitas tinggi dan kolaborasi asinkron.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 justify-center md:justify-end md:max-w-md">
            {['Git', 'GitHub', 'Android Studio', 'VS Code', 'IntelliJ', 'Postman'].map(tool => (
              <span key={tool} className="bg-surface-default/10 text-surface-default px-5 py-2 rounded-full text-xs font-bold border border-surface-default/10 uppercase tracking-widest">
                {tool}
              </span>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
