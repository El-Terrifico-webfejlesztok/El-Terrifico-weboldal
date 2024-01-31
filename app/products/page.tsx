import SearchBarPro from "../components/product/SearchBarPro";
import SearchButton from "../components/product/SearchButton";
import Szurok from "../components/product/Szurok";

const ProductList = () => {
  return (
    <>
      <div className="sm:flex items-center justify-center pt-40">
        <SearchBarPro /> <SearchButton />
      </div>
      <div className="sm:flex items-center justify-center mt-7">
        <a className="link link-accent">
          <h1>Részletes keresés</h1>
        </a>
        <Szurok />
      </div>
    </>
  );
};

export default ProductList;
