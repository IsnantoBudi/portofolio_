import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Linkedin, Mail } from 'lucide-react';
import profileImg from '../assets/images/regenerated_image_1778572180933.webp';

interface HomeProps {
  onNavigate: (screen: any) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  return (
    <div className="relative min-h-[calc(100vh-80px)] flex flex-col md:flex-row overflow-hidden bg-background-main">
      {/* Left Column: Hero Text */}
      <div className="w-full md:w-2/3 flex flex-col justify-center px-6 md:px-12 py-20 border-r border-outline">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <span className="px-3 py-1 bg-brand-orange text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
            Full-Stack Portfolio 2024
          </span>
        </motion.div>

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

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 text-lg md:text-xl text-on-surface-variant leading-relaxed max-w-xl font-medium"
        >
          Full-Stack & Mobile Developer berpengalaman 3+ tahun dalam membangun arsitektur SaaS enterprise dan solusi finansial yang berdampak.
        </motion.p>
        
        {/* Primary Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 mt-12"
        >
          <button 
            onClick={() => onNavigate('Projects')}
            className="bg-brand-orange text-white px-10 py-5 rounded-full font-bold uppercase text-[10px] tracking-widest hover:brightness-110 transition-all flex items-center justify-center gap-3 shadow-lg shadow-brand-orange/20"
          >
            Lihat Karya
            <ArrowRight className="w-4 h-4" />
          </button>
          <button 
            onClick={() => onNavigate('Contact')}
            className="border border-outline px-10 py-5 rounded-full font-bold uppercase text-[10px] tracking-widest hover:bg-brand-orange hover:text-white transition-all flex items-center justify-center text-on-surface"
          >
            Hubungi Saya
          </button>
        </motion.div>
      </div>

      {/* Right Column: Profile Image & Stats */}
      <div className="w-full md:w-1/3 flex flex-col bg-surface-default">
        <div className="h-[400px] md:h-1/2 overflow-hidden bg-black flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-700 relative group">
          <img 
            src={profileImg} 
            alt="Isnanto Budi Nurrahman"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
          <div className="absolute bottom-8 left-8">
            <div className="text-[10px] font-black text-brand-orange uppercase tracking-[0.3em] mb-1">STORY #04</div>
            <div className="text-white text-xl font-black uppercase tracking-tighter">EST. 1998</div>
          </div>
        </div>
        <div className="flex-1 p-8 md:p-12 flex flex-col justify-end gap-12">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-4">Latest Project</div>
            <h3 className="text-2xl font-bold leading-tight uppercase tracking-tight text-on-surface">Core System Manajemen Asuransi</h3>
            <p className="text-on-surface-variant text-sm mt-3 italic">Enterprise solution for insurance lifecycle management.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-6"
          >
            {[
              { label: 'Keahlian', value: 'Full-Stack & Mobile' },
              { label: 'Lokasi', value: 'Klaten, Indonesia' },
              { label: 'Experience', value: '3+ Years' }
            ].map((stat) => (
              <div key={stat.label} className="flex items-center justify-between border-b border-outline pb-4">
                <div className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">{stat.label}</div>
                <div className="text-xs font-bold uppercase tracking-tight text-on-surface">{stat.value}</div>
              </div>
            ))}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-4 flex gap-3"
          >
            {['GH', 'LI', 'TW'].map((social) => (
              <a 
                key={social}
                href="#"
                className="w-12 h-12 rounded-full border border-outline flex items-center justify-center font-bold text-[10px] hover:bg-brand-orange hover:text-white transition-all bg-surface-default text-on-surface"
              >
                {social}
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
