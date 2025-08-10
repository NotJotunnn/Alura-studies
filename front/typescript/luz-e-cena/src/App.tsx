import Banner from "./components/Banner";
import Header from "./components/Header";
import Link from "./components/Link";

function App() {
  return (
    <>
      <Header />
      <Banner source="/Imagens/Banner Desktop.png" alt="Banner do site" />
      <Link href="/" target="_blank">Link</Link>
    </>
  );
}

export default App;
