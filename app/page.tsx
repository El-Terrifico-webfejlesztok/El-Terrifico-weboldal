import FigyelemFel from "./components/home/FigyelemFel";
import Koszonto from "./components/home/Koszonto";
import Bemutatkozas from "./components/home/Bemutatkozas";
import Informaciok from "./components/home/Informaciok";
import EtteremTortenete from "./components/home/EtteremTortente";
import TacoTortenete from "./components/home/TacoTortenete";
import Videok from "./components/home/Videok";
import Ajanlatok from "./components/home/Ajanlatok";
import "./Home.css";
import BemutatVideo from "./components/home/BemutatVideo";
import Footer from "./components/footer/Footer";
import ReklamVideo from "./components/home/ReklamVideo";

export default function Home() {
  return (
    <div className="fooldal">
      <h1 className="hidden">El Terrifico</h1>
      <FigyelemFel />
      <Koszonto />
      <Bemutatkozas />
      <BemutatVideo videoId="SIsgpllRsEM" />
      <ReklamVideo />
      <Informaciok />
      <Ajanlatok />
      <EtteremTortenete />
      <TacoTortenete />
      <Videok />
      <Footer />
    </div>
  );
}
