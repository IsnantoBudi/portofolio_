import React, { useEffect, useRef } from "react";
import { Code, Mountain } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import anime from 'animejs';

export default function About() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Ref for the terminal text wrapper
  const terminalRef = useRef<HTMLDivElement>(null);
  const isTerminalAnimated = useRef(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // Set initial states
    anime.set('.anime-about-title span', { opacity: 0, translateY: 40 });
    anime.set('.anime-about-text', { opacity: 0, translateX: -20 });
    anime.set('.anime-philosophy-title', { opacity: 0, translateY: 30 });
    anime.set('.anime-card', { opacity: 0, translateY: 50 });
    anime.set('.anime-terminal-wrapper', { opacity: 0, scale: 0.95 });

    const tl = anime.timeline({
      easing: 'easeOutExpo',
      duration: 800,
    });

    tl.add({
      targets: '.anime-about-title span',
      opacity: [0, 1],
      translateY: [40, 0],
      delay: anime.stagger(150),
      easing: 'spring(1, 80, 10, 0)',
    })
    .add({
      targets: '.anime-about-text',
      opacity: [0, 1],
      translateX: [-20, 0],
      delay: anime.stagger(100),
      easing: 'easeOutQuart',
    }, '-=600')
    .add({
      targets: '.anime-terminal-wrapper',
      opacity: [0, 1],
      scale: [0.95, 1],
      easing: 'spring(1, 80, 12, 0)',
    }, '-=800')
    .add({
      targets: '.anime-philosophy-title',
      opacity: [0, 1],
      translateY: [30, 0],
      easing: 'easeOutQuart',
    }, '-=400')
    .add({
      targets: '.anime-card',
      opacity: [0, 1],
      translateY: [50, 0],
      delay: anime.stagger(150),
      easing: 'spring(1, 80, 10, 0)',
    }, '-=600');

    // Intersection Observer for Terminal typing effect
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !isTerminalAnimated.current) {
          isTerminalAnimated.current = true;
          
          if (terminalRef.current) {
            const lines = terminalRef.current.querySelectorAll('.terminal-line');
            anime.set(lines, { opacity: 0, translateX: -10 });
            
            anime({
              targets: lines,
              opacity: [0, 1],
              translateX: [-10, 0],
              delay: anime.stagger(120), // Typing speed feel
              easing: 'easeOutExpo',
              duration: 500,
            });
          }
        }
      });
    }, { threshold: 0.2 });

    if (terminalRef.current) {
      observer.observe(terminalRef.current);
    }

    return () => {
      anime.remove('.anime-about-title span, .anime-about-text, .anime-philosophy-title, .anime-card, .anime-terminal-wrapper');
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-24">
      {/* ── Hero Section ── */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24 items-center">
        <div className="lg:col-span-7 space-y-8">
          <h1 className="anime-about-title text-6xl md:text-8xl font-black text-brand-orange leading-[0.85] flex flex-col items-start overflow-hidden py-2">
            <span className="inline-block">{t('about.title1')}</span>
            <span className="inline-block">{t('about.title2')}</span>
          </h1>

          <p className="anime-about-text text-xl md:text-2xl text-on-surface leading-tight font-bold tracking-tight">
            {t('about.p1')}
          </p>

          <p className="anime-about-text text-lg text-on-surface-variant leading-relaxed">
            {t('about.p2')}
          </p>
        </div>

        {/* Code Snippet / Terminal Mockup */}
        <div className="anime-terminal-wrapper lg:col-span-5 relative">
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
              <div 
                ref={terminalRef}
                className="font-mono leading-relaxed whitespace-pre-wrap break-words"
              >
                <div className="terminal-line">
                  <span className="text-white/80">{"{"}</span>
                </div>
                <div className="terminal-line pl-4 sm:pl-8">
                  <span className="text-blue-400">"name"</span>: <span className="text-orange-300">"Isnanto Budi N."</span>,
                </div>
                <div className="terminal-line pl-4 sm:pl-8">
                  <span className="text-blue-400">"role"</span>: <span className="text-orange-300">"Full-Stack Developer"</span>,
                </div>
                <div className="terminal-line pl-4 sm:pl-8">
                  <span className="text-blue-400">"focus"</span>: [
                </div>
                <div className="terminal-line pl-8 sm:pl-16">
                  <span className="text-orange-300">"Enterprise SaaS"</span>,
                </div>
                <div className="terminal-line pl-8 sm:pl-16">
                  <span className="text-orange-300">"Maintainability"</span>,
                </div>
                <div className="terminal-line pl-8 sm:pl-16">
                  <span className="text-orange-300">"Cloud Native"</span>
                </div>
                <div className="terminal-line pl-4 sm:pl-8">
                  ],
                </div>
                <div className="terminal-line pl-4 sm:pl-8">
                  <span className="text-blue-400">"core_stack"</span>: <span className="text-white/80">{"{"}</span>
                </div>
                <div className="terminal-line pl-8 sm:pl-16">
                  <span className="text-blue-400">"frontend"</span>: [<span className="text-orange-300">"Angular"</span>, <span className="text-orange-300">"React"</span>],
                </div>
                <div className="terminal-line pl-8 sm:pl-16">
                  <span className="text-blue-400">"backend"</span>:  [<span className="text-orange-300">"Go"</span>, <span className="text-orange-300">"Spring Boot"</span>],
                </div>
                <div className="terminal-line pl-8 sm:pl-16">
                  <span className="text-blue-400">"mobile"</span>:   [<span className="text-orange-300">"Flutter"</span>]
                </div>
                <div className="terminal-line pl-4 sm:pl-8">
                  <span className="text-white/80">{"}"}</span>,
                </div>
                <div className="terminal-line pl-4 sm:pl-8">
                  <span className="text-blue-400">"status"</span>: <span className="text-green-400">"Ready to build"</span>
                </div>
                <div className="terminal-line">
                  <span className="text-white/80">{"}"}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-10 -right-10 text-[120px] font-black text-on-surface/[0.04] select-none z-0 hover:text-brand-orange/10 transition-colors">
            UTDI
          </div>
        </div>
      </section>

      {/* ── Philosophy & Interests ── */}
      <section className="mb-24">
        <h2 className="anime-philosophy-title text-4xl font-black text-on-surface mb-12 flex items-center gap-4">
          {t('about.philosophy.title')} <span className="h-px flex-1 bg-outline" />
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 — Maintainability */}
          <div
            className="anime-card bg-surface-default rounded-2xl p-10 border border-outline hover:border-brand-orange transition-all shadow-xl shadow-black/[0.02] md:col-span-2 flex flex-col justify-between group"
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
          </div>

          {/* Card 2 — Remote-First (brand-orange bg, always readable) */}
          <div
            className="anime-card bg-brand-orange rounded-2xl p-10 shadow-xl relative overflow-hidden transition-transform duration-300 hover:-translate-y-1"
          >
            <div className="relative z-10 text-brand-black">
              <div className="w-12 h-12 bg-black/10 rounded-full flex items-center justify-center mb-8">
                <Mountain className="text-brand-black w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black text-brand-black mb-4">
                {t('about.card2.title')}
              </h3>
              <p className="text-brand-black/80 text-sm font-medium leading-relaxed">
                {t('about.card2.p')}
              </p>
            </div>
            {/* Decorative */}
            <div className="absolute -bottom-8 -right-8 text-black/5 text-8xl font-black select-none">
              ∞
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
