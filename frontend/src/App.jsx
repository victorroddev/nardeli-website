import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Eventos from './components/Eventos';
import About from './components/About';
import Contact from './components/Contact';
import FAQ from './components/Faq/Faq';
import Prices from './components/Prices/Prices';
import Footer from './components/Footer/index';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <Eventos />
      <About />
      <Contact />
      <FAQ />
      <Prices />
      <Footer />
    </div>
  );
}

export default App;
