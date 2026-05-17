import Navbar from "./navbar/Navbar";
import HeroPage from "./component/pages/HeroPage";
import Home from "./component/pages/Home";
import Projects from "./component/pages/Projects";
import Contact from "./component/pages/Contact";
import Skill from "./component/pages/Skill";

function App() {
  return (
    <>
      <Navbar />
      <HeroPage />
      <Home />
      <Projects />
      <Skill />
      <Contact />
    </>
  );
}

export default App;