import Image from "next/image"

function EtteremTortenete () {
    return (<div id="etterem" className="md:flex reszek">
    <div className="md:w-2/4">
      <h1 className="text-4xl text-red-500 font-bold text-center mb-4 mt-4">
        Az étterem története
      </h1>
      <p className="mx-4 my-2">
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
      <p className="mx-4 my-2">
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
    <div className="md:w-2/4 flex items-center justify-center">
      <Image
        src="/HomeRestaurant.jpg"
        alt="Étterem régen"
        title="Étterem régen"
        width={600}
        height={600}
      />
    </div>
  </div>)
}
export default EtteremTortenete