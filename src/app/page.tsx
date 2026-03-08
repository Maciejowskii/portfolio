import Navigation from "@/components/Navigation";
import FloatingOrbs from "@/components/FloatingOrbs";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import About from "@/components/About";
import FeatureGrid from "@/components/FeatureGrid";
import Projects from "@/components/Projects";
import TechStack from "@/components/TechStack";
import CodeBlock from "@/components/CodeBlock";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <FloatingOrbs />
      <Navigation />
      <main style={{ position: "relative", zIndex: 1 }}>
        <Hero />
        <Ticker />
        <About />
        <FeatureGrid />
        <Projects />
        <TechStack />
        <CodeBlock />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
