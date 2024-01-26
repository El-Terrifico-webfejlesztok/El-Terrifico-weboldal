import KartyaAjanlat from "./KartyaAjanlat";

function Ajanlatok() {
  return (
    <>
      <h1 className="text-4xl text-green-500 font-bold text-center mb-4 mt-4">
        Ajánlataink:
      </h1>
      <div className="md:flex reszek">
        <div className="md:w-1/3 my-8 flex items-center justify-center">
          <KartyaAjanlat
            back="bg-green-500"
            alt="Burger"
            kep="/HomeBurgerRajz.jpg"
            cim="Burgerek"
          />
        </div>
        <div className="md:w-1/3 my-8 flex items-center justify-center">
          <KartyaAjanlat
            back="bg-white"
            alt="Taco"
            kep="/HomeTacoRajz.jpg"
            cim="Tacok"
          />
        </div>
        <div className="md:w-1/3 my-8 flex items-center justify-center">
          <KartyaAjanlat
            back="bg-red-500"
            alt="Pizza"
            kep="/HomePizzaRajz.jpg"
            cim="Pizzák"
          />
        </div>
      </div>
    </>
  );
}
export default Ajanlatok;
