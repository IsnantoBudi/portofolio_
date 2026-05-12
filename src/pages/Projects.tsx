import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Manajemen Asuransi Core',
    description: 'Platform back-office berbasis Angular untuk mengelola siklus hidup polis, klaim, dan administrasi dengan hak akses RBAC bertingkat.',
    tags: ['Angular', 'Java', 'RBAC', 'SQL'],
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1000&auto=format&fit=crop',
    type: 'featured',
    colSpan: 'md:col-span-8'
  },
  {
    id: 2,
    title: 'TenantMaster Cloud',
    description: 'Platform B2B multi-tenant dengan isolasi data, arsitektur microservices, dan sistem billing terintegrasi.',
    tags: ['Next.js', 'Go', 'Microservices', 'PostgreSQL'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop',
    type: 'web',
    colSpan: 'md:col-span-4'
  },
  {
    id: 3,
    title: 'Asuransi Mobile',
    description: 'Aplikasi Android terintegrasi untuk akses e-polis, perpanjangan, dan klaim secara real-time.',
    tags: ['Flutter', 'Dart', 'Android'],
    image: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=1000&auto=format&fit=crop',
    type: 'mobile',
    colSpan: 'md:col-span-6'
  },
  {
    id: 4,
    title: 'School Management System',
    description: 'Sistem komprehensif untuk mempermudah pengelolaan data administrasi, siswa, dan operasional sekolah.',
    tags: ['Angular', 'Java', 'MySQL'],
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1000&auto=format&fit=crop',
    type: 'web',
    colSpan: 'md:col-span-6'
  }
];

export default function Projects() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-24">
      {/* Section Header */}
      <header className="mb-20 max-w-4xl">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-8xl font-black text-brand-orange mb-6 leading-[0.85]"
        >
          <span>KARYA</span><br/><span>& RISSET</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-on-surface-variant font-medium leading-relaxed"
        >
          Kumpulan proyek terpilih yang mencerminkan pendekatan fungsional dalam memecahkan masalah kompleks.
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
            {project.image && (
              <div className={`w-full ${project.type === 'featured' ? 'md:h-1/2' : 'h-[280px]'} bg-gray-50 relative overflow-hidden`}>
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}
            
            <div className={`p-10 flex flex-col justify-between flex-grow ${project.type === 'featured' ? 'md:h-1/2' : ''}`}>
              <div>
                <div className="flex gap-2 mb-8">
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
                <a href="#" className="inline-flex items-center gap-2 text-[10px] font-black text-on-surface uppercase tracking-widest hover:text-brand-orange transition-colors">
                  VIEW PROJECT <ArrowUpRight className="w-4 h-4" />
                </a>
                {project.type === 'tooling' && (
                  <a href="#" className="inline-flex items-center gap-2 text-[10px] font-black text-on-surface-variant uppercase tracking-widest hover:text-on-surface transition-colors">
                    GITHUB <Github className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
