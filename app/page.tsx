import FigyelemFel from "./components/home/FigyelemFel";
import Koszonto from "./components/home/Koszonto";
import Bemutatkozas from "./components/home/Bemutatkozas";
import Informaciok from "./components/home/Informaciok";
import EtteremTortenete from "./components/home/EtteremTortente";
import TacoTortenete from "./components/home/TacoTortenete";
import Videok from "./components/home/Videok";
import Ajanlatok from "./components/home/Ajanlatok";
import "./Home.css";

export default function Home() {
  return (
    <div className="fooldal">
      <FigyelemFel />
      <Koszonto />
      <Bemutatkozas />
      <Informaciok />
      <Ajanlatok />
      <EtteremTortenete />
      <TacoTortenete />
      <Videok />
    </div>
  );
}
