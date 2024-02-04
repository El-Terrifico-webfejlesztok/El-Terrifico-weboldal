import KartyaCheckbox from "./KartyaCheckbox";
import KartyaErtekeles from "./KartyaErtekeles";
import KartyaKosarba from "./KartyaKosarba";
import KartyaTetszik from "./KartyaTetszik";
import styles from "./product.module.css";

function Kartya() {
  return (
    <div className={styles.kartya}>
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="card-title text-3xl mb-4">Taco</h1>
          <div className="sm:flex my-auto">
            <div className="sm:w-3/4 mb-8">
              <h2 className="flex justify-start text-start text-1xl text-black font-bold">
                Leírás:
              </h2>
              <p>
                Taco a mexikói gasztronómia egyik legjobb alkotása. Marhahús
                mellett, saláta, paradicsom, hagyma található benne.
              </p>
            </div>
            <div className="sm:w-1/4 ml-10 mr-10 mb-8">
              <h2 className=" text-1xl text-black font-bold">Kategória:</h2>
              <KartyaCheckbox />
            </div>
          </div>

          <div className="sm:flex my-auto">
            <div className="sm:w-1/4 mb-6 text-center">
              <KartyaKosarba />
            </div>
            <div className="sm:w-1/4 mb-6 text-center">
              <h1>Ár:</h1>
              <p className="text-center">4000 Ft</p>
            </div>
            <div className="sm:w-1/4 mb-6 text-center">
              <h1>Értékelés:</h1>
              <p className="text-center">4,2</p>
            </div>
            <div className="sm:w-1/4 mb-6 text-center">
              <KartyaErtekeles />
              <button className="btn btn-sm mt-2 text-center">Értékelem</button>
            </div>
            <div className="sm:w-1/4 mb-6 text-center">
              <KartyaTetszik />
            </div>
          </div>
        </div>
        <figure>
          <img src="/HomeTaco.jpg" alt="Taco" className=" h-80 w-auto" />
        </figure>
      </div>
    </div>
  );
}
export default Kartya;
