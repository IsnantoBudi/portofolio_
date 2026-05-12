import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Moon, 
  Sun,
  ArrowRight, 
  Linkedin, 
  Mail, 
  MapPin, 
  Code, 
  Smartphone, 
  Database, 
  Cpu, 
  ExternalLink,
  Briefcase,
  BookOpen,
  Send,
  Menu
} from 'lucide-react';

type Screen = 'Home' | 'About' | 'Experience' | 'Skills' | 'Projects' | 'Contact';

interface LayoutProps {
  children: React.ReactNode;
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

const Navbar = ({ currentScreen, onNavigate, isDark, toggleTheme }: { currentScreen: Screen, onNavigate: (screen: Screen) => void, isDark: boolean, toggleTheme: () => void }) => {
  const navItems: { label: string, screen: Screen }[] = [
    { label: 'Tentang', screen: 'About' },
    { label: 'Pengalaman', screen: 'Experience' },
    { label: 'Keahlian', screen: 'Skills' },
    { label: 'Proyek', screen: 'Projects' },
    { label: 'Kontak', screen: 'Contact' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-surface-default/80 backdrop-blur-md border-b border-outline h-20">
      <div className="max-w-7xl mx-auto px-12 h-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onNavigate('Home')}
            className="text-xl font-black tracking-tighter uppercase text-brand-black hover:text-brand-orange"
          >
            IBN
          </button>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest">
          {navItems.map((item) => (
            <button
              key={item.screen}
              onClick={() => onNavigate(item.screen)}
              className={`hover:text-brand-orange transition-colors relative ${currentScreen === item.screen ? 'text-brand-orange' : 'text-brand-black'}`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button 
            onClick={toggleTheme}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-outline hover:bg-brand-orange hover:text-white transition-colors text-on-surface"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button className="hidden md:flex bg-brand-black text-background-main px-8 py-3 rounded-button font-bold uppercase text-[10px] tracking-widest hover:bg-brand-orange hover:text-white transition-all">
            Resume
          </button>
          <button className="md:hidden text-on-surface">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

const Footer = ({ onNavigate }: { onNavigate: (screen: Screen) => void }) => {
  return (
    <footer className="h-16 w-full px-12 border-t border-outline flex items-center justify-between text-[9px] font-bold uppercase tracking-[0.2em] text-on-surface-variant bg-surface-default">
      <div>© 2024 Isnanto Budi Nurrahman</div>
      <div className="hidden md:flex gap-8 italic normal-case font-medium">
        <span>Curated Minimalist Design</span>
        <span>Designed for high performance</span>
      </div>
    </footer>
  );
};

export default function Layout({ children, currentScreen, onNavigate }: LayoutProps) {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrollProgress((currentScroll / totalScroll) * 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <div className="min-h-screen flex flex-col bg-background-main transition-colors duration-300">
      <Navbar 
        currentScreen={currentScreen} 
        onNavigate={onNavigate} 
        isDark={isDark} 
        toggleTheme={toggleTheme} 
      />
      {/* Scroll Progress Bar */}
      <div className="fixed top-20 left-0 w-full h-[2px] z-[49] bg-outline overflow-hidden">
        <motion.div 
          className="h-full bg-brand-orange"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
      <main className="flex-grow pt-16 md:pt-20">
        {children}
      </main>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
