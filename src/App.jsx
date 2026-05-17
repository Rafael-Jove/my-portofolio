import Navbar from "./navbar/Navbar";
import HeroPage from "./component/pages/HeroPage";
import Home from "./component/pages/Home";
import Projects from "./component/pages/Projects";

function App() {
  return (
    <>
      <Navbar />
      <HeroPage />
      <Home />
      <Projects />
    </>
  );
}

export default App;