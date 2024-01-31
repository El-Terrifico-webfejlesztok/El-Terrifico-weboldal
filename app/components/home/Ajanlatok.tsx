import KartyaAjanlat from "./KartyaAjanlat";

function Ajanlatok() {
  return (
    <div className="reszek">
      <h1 className="text-4xl text-green-500 font-bold text-center mb-4 mt-4">
        Ajánlataink:
      </h1>
      <div className="lg:flex">
        <div className="lg:w-1/3 my-8 flex items-center justify-center">
          <KartyaAjanlat
            back="bg-green-500 ajanlatKerekit"
            alt="Burger"
            kep="/HomeBurgerRajz.JPG"
            cim="Burgerek"
          />
        </div>
        <div className="lg:w-1/3 my-8 flex items-center justify-center">
          <KartyaAjanlat
            back="bg-white ajanlatKerekit"
            alt="Taco"
            kep="/HomeTacoRajz.JPG"
            cim="Tacok"
          />
        </div>
        <div className="lg:w-1/3 my-8 flex items-center justify-center">
          <KartyaAjanlat
            back="bg-red-400 ajanlatKerekit"
            alt="Pizza"
            kep="/HomePizzaRajz.JPG"
            cim="Pizzák"
          />
        </div>
      </div>
    </div>
  );
}
export default Ajanlatok;
