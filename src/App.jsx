import Footer from "./components/Footer";
import Manager from "./components/Manager";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
      <NavBar />
        <Manager />
        <Footer />
    </div>
  );
}

export default App;
