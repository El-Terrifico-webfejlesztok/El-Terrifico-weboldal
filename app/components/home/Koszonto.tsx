function Koszonto() {
  return (
    <div className="reszekKoszonto">
      <h1 className="text-5xl text-green-500 font-bold text-center mb-10 mt-8">
        Köszöntelek Amigo!
      </h1>
      <p className="text-center mb-5">
        Sergio Michel Pérez Mendoza Franco a nevem, és én vagyok az étterem
        tulajdonosa és vezető séfe. Ha meg szeretnéd kóstolni mexikó ízeit,
        akkor jó helyen jársz. Különféle fűszerzésű tacok mellett számos más
        gyorskajánk is van. Burgereket, pizzákat és más ételeket tudunk ajánlani
        a mexikói ízeket nem szeretőknek.{" "}
        <a href="#tabla" className="font-bold">
          Rendelésről információkat lejjebb, egy táblázatban találsz.
        </a>{" "}
        <i>Helyben fogyasztásra</i> is van lehetőség, de a nagy népszerűség
        miatt asztalt foglalani nem lehet. Az érdekes, egyedi {" "}
        <a href="#etterem" className=" text-green-500">
         étterem történetet
        </a>{" "}
        , valamint a {" "}
        <a href="#taco" className="text-white">
         taco történetét
        </a>{" "}
        megtalálod lejjebb.
      </p>
    </div>
  );
}
export default Koszonto;
