import Image from "next/image"

function TacoTortenete () {
    return (<div id="taco" className="md:flex reszek">
    <div className="md:w-2/4 flex items-center justify-center">
      <Image
        src="/HomeTaco.jpg"
        alt="Taco"
        title="Taco"
        width={500}
        height={500}
      />
    </div>
    <div className="md:w-2/4">
      <h1 className="text-4xl text-white font-bold text-center mb-4 mt-4">
        A taco
      </h1>
      <p className="mx-4 my-2">
        A taco története évezredekkel ezelőtt kezdődött, amikor az ősi maja
        és az aztékok kukoricából készült lepényeket használtak
        étkezéseikhez. Az első taco, ahogy ma ismerjük, valószínűleg a 18.
        században jelent meg, amikor a spanyolok és a mexikóiak kezdtek
        különböző hozzávalókat kombinálni a kenyérszerű lepényekbe. A taco
        neve valószínűleg a spanyol taco szóból származik, ami szó szerint
        lepényt vagy dugót jelent. A taco népszerűsége folyamatosan nőtt, és
        az évszázadok során változatosabb és gazdagabb ízekkel lett
        gazdagabb. A kialakult konyhaművészet sokféle húst, halat, zöldséget
        és szószokat hozott létre, amelyek mindenki számára elérhetővé
        váltak.
      </p>
      <p className="mx-4 my-2">
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
  </div>)
}
export default TacoTortenete