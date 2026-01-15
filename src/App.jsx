import { Helmet } from "react-helmet";
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Projects from './components/Projects.jsx'
import Education from './components/Education.jsx'
import Contact from './components/Contact.jsx'

function App() {
  return (
    <>
      <Helmet>
        <title>Jason Loucks</title>
      </Helmet>

      <div className="min-h-screen bg-[#060a2b] text-white overflow-hidden">
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <Education />
        <Contact />
      </div>
    </>
  )
}

export default App;
