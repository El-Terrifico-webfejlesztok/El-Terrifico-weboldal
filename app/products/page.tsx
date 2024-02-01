import SearchBarPro from "../components/product/SearchBarPro";
import SearchButton from "../components/product/SearchButton";
import Szurok from "../components/product/Szurok";

const ProductList = () => {
  return (
    <>
      <div className="flex items-center justify-center pt-40">
        <SearchBarPro /> <SearchButton />
      </div>
      <Szurok />
    </>
  );
};

export default ProductList;
