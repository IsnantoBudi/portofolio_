import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Linkedin, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Nama wajib diisi';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Nama minimal 3 karakter';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email wajib diisi';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Pesan wajib diisi';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Pesan minimal 10 karakter';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    // Clear error when user starts typing
    if (errors[id]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
        {/* Left Column: Intro & Links */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-6xl md:text-8xl font-black mb-8 text-brand-orange leading-[0.85]"
          >
            <span>SAPA</span><br/><span>DULU.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-on-surface-variant font-medium mb-12 leading-relaxed"
          >
            Tertarik untuk berkolaborasi dalam proyek nomad berikutnya? Mari hubungi saya melalui jalur profesional di bawah ini.
          </motion.p>

          <div className="flex flex-col gap-4">
            {[
              { icon: Mail, label: 'Email', value: 'isnantobudi0@gmail.com', color: 'bg-on-surface text-surface-default' },
              { icon: Linkedin, label: 'LinkedIn', value: 'https://www.linkedin.com/in/isnanto-budi/', color: 'bg-brand-orange text-white' }
            ].map((item, i) => (
              <motion.a 
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                whileHover={{ x: 5 }}
                href="#" 
                className="flex items-center gap-6 p-6 bg-surface-default rounded-2xl border border-outline shadow-xl shadow-black/[0.01] transition-all hover:border-brand-orange group"
              >
                <div className={`w-14 h-14 rounded-xl ${item.color} flex items-center justify-center transition-transform group-hover:scale-110`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">{item.label}</h3>
                  <p className="text-sm font-bold text-on-surface uppercase tracking-tight">{item.value}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="lg:col-span-7"
        >
          <div className="bg-on-surface p-10 md:p-14 rounded-[40px] shadow-2xl relative overflow-hidden text-surface-default">
            <div className="absolute top-0 right-0 w-80 h-80 bg-brand-orange/20 rounded-full blur-[120px] -mr-40 -mt-40 pointer-events-none" />
            
            <h2 className="text-4xl font-black mb-10 relative z-10 uppercase tracking-tight">Kirim Pesan</h2>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-8 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest brightness-150" htmlFor="name">Nama Lengkap</label>
                    <AnimatePresence>
                      {errors.name && (
                        <motion.span 
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 5 }}
                          className="text-[9px] font-bold text-red-500 uppercase flex items-center gap-1"
                        >
                          <AlertCircle className="w-3 h-3" /> {errors.name}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                  <input 
                    className={`h-14 px-6 rounded-2xl bg-surface-default font-bold border ${errors.name ? 'border-red-500' : 'border-outline'} focus:border-brand-orange focus:ring-0 text-sm outline-none transition-all text-on-surface`} 
                    id="name" 
                    placeholder="Nama Anda" 
                    type="text" 
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest brightness-150" htmlFor="email">Alamat Email</label>
                    <AnimatePresence>
                      {errors.email && (
                        <motion.span 
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 5 }}
                          className="text-[9px] font-bold text-red-500 uppercase flex items-center gap-1"
                        >
                          <AlertCircle className="w-3 h-3" /> {errors.email}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                  <input 
                    className={`h-14 px-6 rounded-2xl bg-surface-default font-bold border ${errors.email ? 'border-red-500' : 'border-outline'} focus:border-brand-orange focus:ring-0 text-sm outline-none transition-all text-on-surface`} 
                    id="email" 
                    placeholder="email@contoh.com" 
                    type="email" 
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest brightness-150" htmlFor="message">Pesan</label>
                  <AnimatePresence>
                    {errors.message && (
                      <motion.span 
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="text-[9px] font-bold text-red-500 uppercase flex items-center gap-1"
                      >
                        <AlertCircle className="w-3 h-3" /> {errors.message}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
                <textarea 
                  className={`p-6 rounded-2xl bg-surface-default font-bold border ${errors.message ? 'border-red-500' : 'border-outline'} focus:border-brand-orange focus:ring-0 text-sm outline-none resize-none transition-all text-on-surface`} 
                  id="message" 
                  placeholder="Tuliskan pesan Anda di sini..." 
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>
              
              <div className="relative">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-brand-orange text-white h-16 rounded-full text-xs font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-orange-600 transition-all mt-4 shadow-lg shadow-brand-orange/20 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Kirim Pesan
                    </>
                  )}
                </button>

                <AnimatePresence>
                  {isSubmitted && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="absolute -bottom-16 left-0 right-0 py-3 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center justify-center gap-2 text-green-500 text-[10px] font-bold uppercase tracking-widest"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Pesan Berhasil Terkirim!
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
