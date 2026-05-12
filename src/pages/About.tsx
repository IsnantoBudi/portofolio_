import React from 'react';
import { motion } from 'motion/react';
import { Code, Mountain, BookOpen } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-24">
      {/* Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24 items-center">
        <div className="lg:col-span-7 space-y-8">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-6xl md:text-8xl font-black text-brand-orange leading-[0.85]"
          >
            <span>Tentang</span><br/><span>Saya</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-on-surface leading-tight font-bold tracking-tight"
          >
            Halo! Saya Isnanto Budi Nurrahman. Saya merancang alat digital untuk orang-orang yang melihat dunia sebagai kantor mereka.
          </motion.p>
          <div className="space-y-4">
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-on-surface-variant leading-relaxed"
            >
              Lulusan Teknik Informatika dari Universitas Teknologi Digital Indonesia (UTDI) dengan IPK 3.60. Saya spesialis dalam arsitektur SaaS enterprise dan solusi finansial (Insurance Tech) menggunakan Angular, Flutter, Go, dan Java.
            </motion.p>
          </div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="lg:col-span-5 relative"
        >
          <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl relative z-10 border-4 border-surface-default">
            <img 
              src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1000&auto=format&fit=crop" 
              alt="Workspace" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-10 -right-10 text-[120px] font-black text-on-surface/5 select-none z-0 hover:text-brand-orange/10 transition-colors">UTDI</div>
        </motion.div>
      </section>

      {/* Philosophy & Interests */}
      <section className="mb-24">
        <h2 className="text-4xl font-black text-on-surface mb-12 flex items-center gap-4">
          FILOSOFI & MINAT <span className="h-1 flex-1 bg-outline" />
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-surface-default rounded-2xl p-10 shadow-sm border border-outline md:col-span-2 flex flex-col justify-between"
          >
            <div>
              <div className="w-16 h-16 bg-on-surface rounded-2xl flex items-center justify-center mb-8 rotate-3 group">
                <Code className="text-brand-orange w-8 h-8 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-3xl font-black text-on-surface mb-4">Maintainability & Business Focus</h3>
              <p className="text-on-surface-variant leading-relaxed mb-8">
                Saya mengutamakan kualitas kode yang bersih, terstruktur, dan mudah dipelihara (Clean Code) untuk mendukung kebutuhan bisnis yang terus berkembang secara jangka panjang.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {['CLEAN CODE', 'SDLC', 'API-FIRST', 'API-FIRST'].map((tag, i) => (
                <span key={`${tag}-${i}`} className="bg-outline px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest text-on-surface uppercase">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-brand-orange rounded-2xl p-10 shadow-sm relative overflow-hidden"
          >
             <div className="relative z-10 text-white">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-8">
                <Mountain className="text-white w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black mb-4">GAYA HIDUP NOMAD</h3>
              <p className="text-sm font-medium leading-relaxed">
                Bekerja dari berbagai lokasi mengajarkan saya adaptabilitas dan pentingnya membangun sistem yang tangguh.
              </p>
             </div>
             <div className="absolute -bottom-8 -right-8 text-white/10 text-8xl font-black">AIR</div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
