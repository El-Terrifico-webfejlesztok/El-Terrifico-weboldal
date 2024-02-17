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

export default function Home() {
  return (
    <div className="fooldal">
      <FigyelemFel />
      <Koszonto />
      <Bemutatkozas />
      <BemutatVideo videoId="SIsgpllRsEM" />
      <Informaciok />
      <Ajanlatok />
      <EtteremTortenete />
      <TacoTortenete />
      <Videok />
    </div>
  );
}
