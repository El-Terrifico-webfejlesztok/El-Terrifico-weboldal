import KartyaCheckbox from "./KartyaCheckbox";
import KartyaErtekeles from "./KartyaErtekeles";
import KartyaKosarba from "./KartyaKosarba";
import styles from "./product.module.css";

interface props {
  title: string;
  description: string;
  category?: string[];
  price: number;
}

const Kartya: React.FC<props> = ({ title, description, category = [], price }) => {
  return (
    <div className={styles.kartya}>
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="card-title text-3xl mb-4">{title}</h1>
          <div className="sm:flex my-auto">
            <div className="sm:w-3/4 mb-8">
              <h2 className="flex justify-start text-start text-1xl text-black font-bold">
                Leírás:
              </h2>
              <p>{description}</p>
            </div>
            <div className="sm:w-1/4 ml-10 mr-10 mb-8">
              <h2 className=" text-1xl text-black font-bold">Kategória:</h2>
              {category.map((part, index) => (
                <KartyaCheckbox key={index} name={part} />
              ))}
            </div>
          </div>

          <div className="sm:flex my-auto">
            <div className="sm:w-1/4 mb-6 text-center">
              <KartyaKosarba />
            </div>
            <div className="sm:w-1/4 mb-6 text-center">
              <h1>Ár:</h1>
              <p className="text-center">{price} Ft</p>
            </div>
            <div className="sm:w-1/4 mb-6 text-center">
              <h1>Értékelés:</h1>
              <p className="text-center">4,2</p>
            </div>
            <div className="sm:w-1/4 mb-6 text-center">
              <KartyaErtekeles />
              <button className="btn btn-sm mt-2 text-center">Értékelem</button>
            </div>
          </div>
        </div>
          <img src="/HomeTaco.jpg" alt="Taco" className=" rounded-xl max-h-fit sm:w-96 max-w mx-auto" />
      </div>
    </div>
  );
};
export default Kartya;
