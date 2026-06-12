import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Linkedin, Send, CheckCircle2, AlertCircle, MapPin, Github } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = t('contact.err.name.req');
    } else if (formData.name.length < 3) {
      newErrors.name = t('contact.err.name.min');
    }

    if (!formData.email.trim()) {
      newErrors.email = t('contact.err.email.req');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('contact.err.email.inv');
    }

    if (!formData.message.trim()) {
      newErrors.message = t('contact.err.msg.req');
    } else if (formData.message.length < 10) {
      newErrors.message = t('contact.err.msg.min');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    }
  }, [errors]);

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      
      // Simulasi delay untuk efek loading UX
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Membuat URL mailto dengan data form
      const subject = encodeURIComponent(`Pesan dari ${formData.name} via Portofolio`);
      const body = encodeURIComponent(`Nama: ${formData.name}\nEmail: ${formData.email}\n\nPesan:\n${formData.message}`);
      window.location.href = `mailto:isnantobudi0@gmail.com?subject=${subject}&body=${body}`;

      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    }
  };

  const contactLinks = [
    {
      icon: Mail,
      label: 'Email',
      value: 'isnantobudi0@gmail.com',
      href: 'mailto:isnantobudi0@gmail.com',
      accent: 'bg-on-surface text-background-main',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: '/in/isnanto-budi',
      href: 'https://www.linkedin.com/in/isnanto-budi/',
      accent: 'bg-brand-orange text-black',
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'github.com/isnantobudi',
      href: 'https://github.com/isnantobudi',
      accent: 'bg-on-surface text-background-main',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start">

        {/* Left Column */}
        <div className="lg:col-span-5 flex flex-col gap-10">

          {/* Heading */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-brand-orange" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-on-surface-variant">
                {t('contact.connect')}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-6xl md:text-8xl font-black text-brand-orange leading-[0.85] mb-6"
            >
              <span>{t('contact.title1')}</span><br /><span>{t('contact.title2')}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-base text-on-surface-variant font-medium leading-relaxed max-w-sm"
            >
              {t('contact.subtitle')}
            </motion.p>
          </div>

          {/* Location badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="inline-flex items-center gap-3 bg-surface-default border border-outline rounded-full px-5 py-3 w-fit"
          >
            <MapPin className="w-4 h-4 text-brand-orange shrink-0" />
            <span className="text-xs font-bold text-on-surface uppercase tracking-wider">{t('contact.location')}</span>
          </motion.div>

          {/* Contact links */}
          <div className="flex flex-col gap-3">
            {contactLinks.map((item, i) => (
              <motion.a
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.08 }}
                whileHover={{ x: 6 }}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="flex items-center gap-5 p-5 bg-surface-default rounded-2xl border border-outline hover:border-brand-orange group transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl ${item.accent} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-200`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest mb-0.5">{item.label}</p>
                  <p className="text-sm font-bold text-on-surface truncate">{item.value}</p>
                </div>
                <div className="ml-auto text-on-surface-variant group-hover:text-brand-orange transition-colors duration-200 shrink-0">
                  <svg className="w-4 h-4 -rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Availability note */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-start gap-3 pt-2"
          >
            <div className="w-2 h-2 rounded-full bg-green-400 mt-1.5 shrink-0 animate-pulse" />
            <p className="text-xs text-on-surface-variant leading-relaxed">
              <span className="font-bold text-on-surface">{t('contact.available1')}</span><br />
              {t('contact.available2')}
            </p>
          </motion.div>
        </div>

        {/* Right Column: Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-7"
        >
          {/* Form card — pakai on-surface sebagai judul/aksen, bukan seluruh background */}
          <div className="bg-surface-default border border-outline rounded-[32px] overflow-hidden shadow-sm">
            {/* Card header strip */}
            <div className="bg-on-surface px-10 py-6 flex items-center justify-between">
              <h2 className="text-xl font-black text-background-main uppercase tracking-widest">{t('contact.form.title')}</h2>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-background-main/20" />
                <div className="w-2 h-2 rounded-full bg-background-main/40" />
                <div className="w-2 h-2 rounded-full bg-brand-orange" />
              </div>
            </div>

            {/* Form body */}
            <form onSubmit={handleSubmit} className="p-8 md:p-10 flex flex-col gap-7">

              {/* Name + Email row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  id="name"
                  label={t('contact.form.name')}
                  placeholder={t('contact.form.namePlaceholder')}
                  type="text"
                  value={formData.name}
                  error={errors.name}
                  onChange={handleChange}
                />
                <FormField
                  id="email"
                  label={t('contact.form.email')}
                  placeholder={t('contact.form.emailPlaceholder')}
                  type="email"
                  value={formData.email}
                  error={errors.email}
                  onChange={handleChange}
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest" htmlFor="message">
                    {t('contact.form.msg')}
                  </label>
                  <AnimatePresence>
                    {errors.message && (
                      <motion.span
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        className="text-[9px] font-bold text-red-500 uppercase flex items-center gap-1"
                      >
                        <AlertCircle className="w-3 h-3" /> {errors.message}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
                <textarea
                  className={`w-full p-5 rounded-xl bg-background-main font-medium border-2 ${errors.message ? 'border-red-400' : 'border-outline'} focus:border-brand-orange focus:outline-none resize-none transition-all duration-200 text-sm text-on-surface placeholder:text-on-surface-variant/50`}
                  id="message"
                  placeholder={t('contact.form.msgPlaceholder')}
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                />
                <div className="flex justify-end">
                  <span className={`text-[10px] font-bold tracking-wide ${formData.message.length < 10 && formData.message.length > 0 ? 'text-red-400' : 'text-on-surface-variant'}`}>
                    {formData.message.length} / {t('contact.form.min')}
                  </span>
                </div>
              </div>

              {/* Submit */}
              <div className="relative pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-brand-orange text-black h-14 rounded-full text-xs font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all duration-300 shadow-lg shadow-brand-orange/25 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-brand-orange/40 hover:scale-[1.01] active:scale-[0.99]'}`}
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      {t('contact.form.submit')}
                    </>
                  )}
                </button>

                <AnimatePresence>
                  {isSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="absolute -bottom-14 left-0 right-0 py-3 bg-green-500/10 border border-green-400/30 rounded-xl flex items-center justify-center gap-2 text-green-600 text-[10px] font-bold uppercase tracking-widest"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      {t('contact.form.success')}
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

/* ──────────────────────────────────────────────
   FormField sub-component (single responsibility)
────────────────────────────────────────────── */
interface FormFieldProps {
  id: string;
  label: string;
  placeholder: string;
  type: string;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function FormField({ id, label, placeholder, type, value, error, onChange }: FormFieldProps): React.ReactElement {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest" htmlFor={id}>
          {label}
        </label>
        <AnimatePresence>
          {error && (
            <motion.span
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              className="text-[9px] font-bold text-red-500 uppercase flex items-center gap-1"
            >
              <AlertCircle className="w-3 h-3" /> {error}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <input
        className={`h-12 px-5 rounded-xl bg-background-main font-medium border-2 ${error ? 'border-red-400' : 'border-outline'} focus:border-brand-orange focus:outline-none text-sm transition-all duration-200 text-on-surface placeholder:text-on-surface-variant/50`}
        id={id}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
