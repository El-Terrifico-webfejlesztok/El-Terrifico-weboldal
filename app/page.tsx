import Image from "next/image";
import "./Home.css";
import Nyitva from "./components/home/Nyitva";

export default function Home() {
  return (
    <>
      <div
        className="bg-cover bg-center h-screen flex items-center justify-center reszek"
        style={{ backgroundImage: "url('/HomeKep.jpg')" }}
      >
        <h1 className="text-4xl text-success font-bold">Éhes vagy?</h1>
        <p className="text-4xl text-white font-bold">Ennél egy jót?</p>
        <p className="text-4xl text-error font-bold">Itt a helyed!</p>
      </div>

      <div className=" reszek">
        <h1 className="text-7xl text-success font-bold text-center mb-10 mt-8">
          Köszöntelek Amigo!
        </h1>
        <p className="text-center mb-5">
          Sergio Michel Pérez Mendoza a nevem és én vagyok az étterem tulaja és
          vezető séfe. Ha meg szeretnéd kóstolni mexió ízeit akkor jó helyen
          jársz. Különféle fűszerzésű tacos-ok mellett számos más gyors kajánk
          is van. Burgereket, pizzákat és más ételeket tudunk ajánlani a mexikói
          ízeket nem szertőknek.
          <a href="#tabla" className="font-bold">
            Rendelésről információkat lejjebb, egy táblázatban láthatod.
          </a>
          Az érdekes, egyedi{" "}
          <a href="#etterem" className=" text-red-500">
            étterem történetét
          </a>
          , valamint a{" "}
          <a href="#taco" className="text-green-500">
            taco történetét
          </a>{" "}
          megtalálod lejjebb.
        </p>
      </div>

      <div className=" reszek flex">
        <div className="w-2/3">
          <h1 className="text-5xl text-white font-bold text-center mb-8 mt-5">
            Egy kicsit magamról:
          </h1>
          <p className="text-center">
            Az én életművem a mexikói konyha varázslatos világában gyökerezik.
            Az évtizedek alatt nem csak az ízeket formáltam, hanem az én
            kultúrám és hagyományaim is beépültek minden ételbe. A chilek, a
            koriander és más helyi fűszerek élesebbé és színessé tették a
            receptjeimet. A konyha mindig is egyfajta imaterem volt számomra,
            ahol az étel főzése közben közelebb kerültem az őseim
            hagyományaihoz. Az életem ízeivel és színeivel teli fogások mind
            egy-egy szeretetteljes emlék a múltamból. Ma is büszkén főzök, hogy
            továbbadhassam azoknak a fiatalabb generációknak azt a kulináris
            örökséget, amit én a szívem mélyén hordozok. A konyha számomra több,
            mint egyszerű mesterség – az én életművem a szeretet, az emlékek és
            a mexikói konyha örök pillanatai.
          </p>
        </div>
        <Image
          src="/Sef.jpg"
          className="w-1/3 border-solid"
          alt="Sergio Michel Pérez Mendoza"
          width={300}
          height={500}
        />
      </div>

      <div className=" reszek">
        <h1 className="text-5xl text-error font-bold text-center mb-5 mt-5">
          Kiszállítással kapcsolatos információk:
        </h1>
        <table id="tabla" className="table-lg mx-auto">
          <tbody>
            <tr aria-rowspan={2}>
              <th rowSpan={2}>
                Kiszállítás: <Nyitva />
              </th>
              <td>Hétfő-Péntek: 10:00-22:00</td>
            </tr>
            <tr>
              <td>Szombat-Vasárnap: 11:00-23:00</td>
            </tr>
            <tr>
              <th>Minimum rendelés:</th>
              <td>2000 Ft</td>
            </tr>
            <tr>
              <th>Ingyenes kiszállítás:</th>
              <td>4000 Ft-tól</td>
            </tr>
            <tr>
              <th>Várható kiszállítás:</th>
              <td>60 perc</td>
            </tr>
            <tr>
              <th>Telefonszám:</th>
              <td>+36 30 548 7729</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div id="etterem" className="flex reszek">
        <div className="w-1/3">
          <h1 className="text-5xl text-red-500 font-bold text-center mb-5 mt-5">
            Az étterem története
          </h1>
          <p className="mx-6 my-4">
            Győr szívében, egy kis utcában található mexikói éttermem, az El
            Terrifico, ahol minden tányér szívvel készült receptem egy szeletét
            hordozza. Az étterem egy kis, színes dekorációval ellátott konyhával
            kezdődött, ahol minden nap örömmel és szenvedéllyel főztem az
            otthonom ízeit. Az évek alatt az El Terrifico nem csak egy étteremmé
            vált, hanem egy kis oázissá, ahol a vendégek kikapcsolhatnak és
            részt vehetnek az én mexikói kulináris utazásomon. A falakon a
            mexikói kultúrát tükröző képek és szuvenírek, az asztalokon pedig az
            én családom receptjei szolgálnak emlékeztetőül. Minden étel egy
            történetet mesél el, egy szeletet hoz el az én gyermekkoromból, ahol
            az édesanyám és nagyanyám a konyhában varázsolták el a családi
            vacsorákat.
          </p>
          <p className="mx-6 my-4">
            A város gyorsan megtapasztalta az autentikus mexikói ízeket, és az
            El Terrifico hamarosan egy helyi kedvenc lett, ahol az emberek a jó
            étel mellett otthon érzik magukat. Minden nap új kulináris kihívás
            elé állok, kísérletezem az ízekkel és a fűszerekkel, hogy mindig
            friss és izgalmas ételeket kínálhassak. Az étterem nem csak ételek
            helye, hanem közösségi tér is, ahol a vendégek barátságos
            környezetben élvezhetik az ételeket és egymás társaságát. Az El
            Terrifico nem csupán egy üzlet számomra, hanem egy álom, ami valóra
            vált, és a város részévé vált az évek során. Minden mosoly, amit az
            elégedett vendégek arcán látok, a szívemet melegíti, és büszkeséggel
            tölt el, hogy egy kis darab Mexikót hozhatok a Győri emberek
            életébe.
          </p>
        </div>
        <div className="w-2/3"></div>
      </div>

      <div id="taco" className="flex reszek">
        <div className="w-1/3"></div>
        <div className="w-2/3">
          <h1 className="text-5xl text-green-500 font-bold text-center mb-5 mt-5">
            A taco
          </h1>
          <p className="mx-6 my-4">
            A taco története évezredekkel ezelőtt kezdődött, amikor az ősi maja
            és az aztékok kukoricából készült lepényeket használtak
            étkezéseikhez. Az első taco, ahogy ma ismerjük, valószínűleg a 18.
            században jelent meg, amikor a spanyolok és a mexikóiak kezdtek
            különböző hozzávalókat kombinálni a kenyérszerű lepényekbe. A taco
            neve valószínűleg a spanyol taco szóból származik, ami szó szerint
            lepényt vagy dugót jelent. A taco népszerűsége folyamatosan
            nőtt, és az évszázadok során változatosabb és gazdagabb ízekkel lett
            gazdagabb. A kialakult konyhaművészet sokféle húst, halat, zöldséget
            és szószokat hozott létre, amelyek mindenki számára elérhetővé
            váltak.
          </p>
          <p className="mx-6 my-4">
            A 20. században a taco az Egyesült Államokban is széles körben
            elterjedt, és az amerikai konyhában egy népszerű gyorsétele lett. A
            taco nem csupán egy étel, hanem egy közösségi élmény is, ahol az
            emberek megoszthatják kedvenc kombinációikat és ízeket. A kemény
            héjú, lágy héjú, vagy tortilla tekercsbe töltött taco a világ számos
            konyhájában inspirációt nyújtott a hasonló ételkészítési formákhoz.
            A taco az idők során kultúrák és konyhák találkozását jelképezi, egy
            egyszerű, ámde változatos étel, amely sokak számára a gasztronómiai
            sokszínűséget testesíti meg. A taco továbbra is az egyik
            legkedveltebb és legdivatosabb ételek egyike, hűen őrizve az eredeti
            ízét és az étkezések örömteli atmoszféráját.
          </p>
        </div>
      </div>
    </>
  );
}
