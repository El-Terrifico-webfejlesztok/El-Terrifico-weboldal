import Image from "next/image"

function Bemutatkozas () {
    return (<div className="md:flex reszek">
    <div className="md:w-1/4 flex items-center justify-center">
      <Image
        src="/Sef.jpg"
        alt="Sergio Michel Pérez Mendoza Franco"
        title="Sergio Michel Pérez Mendoza Franco"
        className="place-content-center"
        width={350}
        height={550}
      />
    </div>
    <div className="md:w-3/4">
      <h1 className="text-4xl text-white font-bold text-center mb-4 mt-4">
        Magamról:
      </h1>
      <p className="text-center mr-4">
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
        mint egyszerű mesterség az én életművem a szeretet, az emlékek és a
        mexikói konyha örök pillanatai.
      </p>
    </div>
  </div>)
}
export default Bemutatkozas