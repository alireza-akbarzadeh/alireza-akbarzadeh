import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Stack from "@/components/Stack";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import CaseStudy from "@/components/CaseStudy";
import Experience from "@/components/Experience";
import SelectedWork from "@/components/SelectedWork";

const Home = () => (
  <>
    <Nav />
    <main id="main" className="mx-auto max-w-6xl px-5 sm:px-8">
      <Hero />
      <About />
      <SelectedWork />
      <CaseStudy />
      <Experience />
      <Stack />
      <Contact />
      <Footer />
    </main>
  </>
);

export default Home;
