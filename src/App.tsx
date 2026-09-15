import { useState } from 'react';
import { LoadingScreen } from './components/LoadingScreen';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Projects } from './sections/Projects';
import { Experience } from './sections/Experience';
import { Certifications } from './sections/Certifications';
import { Contact } from './sections/Contact';
import { useScrollProgress } from './hooks/useScrollProgress';

export default function App() {
  const [loading, setLoading] = useState(true);
  const scrollProgress = useScrollProgress();

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      <CustomCursor />
      <Navbar />

      <main className={loading ? 'opacity-0' : 'opacity-100 transition-opacity duration-700'}>
        <Hero scrollProgress={scrollProgress} />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Certifications />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
