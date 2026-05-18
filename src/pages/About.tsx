import React from "react";
import { motion } from "motion/react";
import { Code, Mountain } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export default function About() {
  const { t } = useLanguage();
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-24">
      {/* ── Hero Section ── */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24 items-center">
        <div className="lg:col-span-7 space-y-8">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-6xl md:text-8xl font-black text-brand-orange leading-[0.85]"
          >
            <span>{t('about.title1')}</span>
            <br />
            <span>{t('about.title2')}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-on-surface leading-tight font-bold tracking-tight"
          >
            {t('about.p1')}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-on-surface-variant leading-relaxed"
          >
            {t('about.p2')}
          </motion.p>
        </div>

        {/* Code Snippet / Terminal Mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="lg:col-span-5 relative"
        >
          <div className="bg-[#1e1e1e] rounded-xl overflow-hidden shadow-2xl relative z-10 border border-outline/30 font-mono text-sm lg:text-base">
            {/* Terminal Header */}
            <div className="flex items-center px-4 py-3 bg-[#2d2d2d] border-b border-black/40">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/90"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/90"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/90"></div>
              </div>
              <div className="mx-auto text-xs text-white/50 font-semibold select-none">
                developer.json
              </div>
            </div>
            {/* Terminal Body */}
            <div className="p-4 md:p-8 overflow-hidden text-emerald-400/90 text-[11px] sm:text-xs md:text-sm">
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                  visible: { transition: { staggerChildren: 0.15 } },
                  hidden: {}
                }}
                className="font-mono leading-relaxed whitespace-pre-wrap break-words"
              >
                <motion.div variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }}>
                  <span className="text-white/80">{"{"}</span>
                </motion.div>
                <motion.div variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }} className="pl-4 sm:pl-8">
                  <span className="text-blue-400">"name"</span>: <span className="text-orange-300">"Isnanto Budi N."</span>,
                </motion.div>
                <motion.div variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }} className="pl-4 sm:pl-8">
                  <span className="text-blue-400">"role"</span>: <span className="text-orange-300">"Full-Stack Developer"</span>,
                </motion.div>
                <motion.div variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }} className="pl-4 sm:pl-8">
                  <span className="text-blue-400">"focus"</span>: [
                </motion.div>
                <motion.div variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }} className="pl-8 sm:pl-16">
                  <span className="text-orange-300">"Enterprise SaaS"</span>,
                </motion.div>
                <motion.div variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }} className="pl-8 sm:pl-16">
                  <span className="text-orange-300">"Maintainability"</span>,
                </motion.div>
                <motion.div variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }} className="pl-8 sm:pl-16">
                  <span className="text-orange-300">"Cloud Native"</span>
                </motion.div>
                <motion.div variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }} className="pl-4 sm:pl-8">
                  ],
                </motion.div>
                <motion.div variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }} className="pl-4 sm:pl-8">
                  <span className="text-blue-400">"core_stack"</span>: <span className="text-white/80">{"{"}</span>
                </motion.div>
                <motion.div variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }} className="pl-8 sm:pl-16">
                  <span className="text-blue-400">"frontend"</span>: [<span className="text-orange-300">"Angular"</span>, <span className="text-orange-300">"React"</span>],
                </motion.div>
                <motion.div variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }} className="pl-8 sm:pl-16">
                  <span className="text-blue-400">"backend"</span>:  [<span className="text-orange-300">"Go"</span>, <span className="text-orange-300">"Spring Boot"</span>],
                </motion.div>
                <motion.div variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }} className="pl-8 sm:pl-16">
                  <span className="text-blue-400">"mobile"</span>:   [<span className="text-orange-300">"Flutter"</span>]
                </motion.div>
                <motion.div variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }} className="pl-4 sm:pl-8">
                  <span className="text-white/80">{"}"}</span>,
                </motion.div>
                <motion.div variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }} className="pl-4 sm:pl-8">
                  <span className="text-blue-400">"status"</span>: <span className="text-green-400">"Ready to build"</span>
                </motion.div>
                <motion.div variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }}>
                  <span className="text-white/80">{"}"}</span>
                </motion.div>
              </motion.div>
            </div>
          </div>
          <div className="absolute -bottom-10 -right-10 text-[120px] font-black text-on-surface/[0.04] select-none z-0 hover:text-brand-orange/10 transition-colors">
            UTDI
          </div>
        </motion.div>
      </section>

      {/* ── Philosophy & Interests ── */}
      <section className="mb-24">
        <h2 className="text-4xl font-black text-on-surface mb-12 flex items-center gap-4">
          {t('about.philosophy.title')} <span className="h-px flex-1 bg-outline" />
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 — Maintainability */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-surface-default rounded-2xl p-10 border border-outline hover:border-brand-orange transition-all shadow-xl shadow-black/[0.02] md:col-span-2 flex flex-col justify-between group"
          >
            <div>
              {/* Icon */}
              <div className="w-16 h-16 bg-brand-orange/10 rounded-2xl flex items-center justify-center mb-8 rotate-3 group-hover:rotate-0 group-hover:bg-brand-orange/20 transition-all">
                <Code className="text-brand-orange w-8 h-8" />
              </div>
              <h3 className="text-3xl font-black text-on-surface mb-4">
                {t('about.card1.title')}
              </h3>
              <p className="text-on-surface-variant leading-relaxed mb-8">
                {t('about.card1.p')}
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-3">
              {[
                "CLEAN CODE",
                "SOLID",
                "API-FIRST",
                "SDLC",
                "DOMAIN-DRIVEN",
              ].map((tag) => (
                <span
                  key={tag}
                  className="border border-outline text-on-surface-variant px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase hover:border-brand-orange hover:text-brand-orange transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Card 2 — Remote-First (brand-orange bg, always readable) */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-brand-orange rounded-2xl p-10 shadow-xl relative overflow-hidden"
          >
            <div className="relative z-10 text-white dark:text-black">
              <div className="w-12 h-12 bg-white/20 dark:bg-black/10 rounded-full flex items-center justify-center mb-8">
                <Mountain className="text-white dark:text-black w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black text-white dark:text-black mb-4">
                {t('about.card2.title')}
              </h3>
              <p className="text-white dark:text-black/80 text-sm font-medium leading-relaxed">
                {t('about.card2.p')}
              </p>
            </div>
            {/* Decorative */}
            <div className="absolute -bottom-8 -right-8 text-white/10 dark:text-black/5 text-8xl font-black select-none">
              ∞
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
