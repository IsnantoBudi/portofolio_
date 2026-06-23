/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, Suspense, lazy } from 'react';
import type { Screen } from './types';
import Layout from './components/Layout';
import Home from './pages/Home';

const About = lazy(() => import('./pages/About'));
const Experience = lazy(() => import('./pages/Experience'));
const Skills = lazy(() => import('./pages/Skills'));
const Projects = lazy(() => import('./pages/Projects'));
const Contact = lazy(() => import('./pages/Contact'));

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('Home');

  const handleNavigate = (screen: Screen) => {
    const element = document.getElementById(screen.toLowerCase());
    if (element) {
      const offset = 80; // height of the fixed header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setCurrentScreen(screen);
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const screen = id.charAt(0).toUpperCase() + id.slice(1) as Screen;
          setCurrentScreen(screen);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    const sections = ['home', 'about', 'experience', 'skills', 'projects', 'contact'];
    
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Delay loading Google Analytics to improve LCP and reduce blocking time
    const timer = setTimeout(() => {
      if (document.getElementById('ga-script')) return;
      
      const script1 = document.createElement('script');
      script1.src = 'https://www.googletagmanager.com/gtag/js?id=G-ESWR9F9J5T';
      script1.async = true;
      script1.id = 'ga-script';
      document.head.appendChild(script1);

      const script2 = document.createElement('script');
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-ESWR9F9J5T');
      `;
      document.head.appendChild(script2);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout currentScreen={currentScreen} onNavigate={handleNavigate}>
      <section id="home">
        <Home onNavigate={handleNavigate} />
      </section>
      <Suspense fallback={<div className="h-screen flex items-center justify-center text-brand-orange font-bold uppercase tracking-widest">Loading...</div>}>
        <section id="about">
          <About />
        </section>
        <section id="experience">
          <Experience />
        </section>
        <section id="skills">
          <Skills />
        </section>
        <section id="projects">
          <Projects />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </Suspense>
    </Layout>
  );
}
