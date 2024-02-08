import Kartya from "../components/product/Kartya";
import SearchBarPro from "../components/product/SearchBarPro";
import SearchButton from "../components/product/SearchButton";
import Szurok from "../components/product/Szurok";
import styles from "./productPage.module.css";

const ProductList = () => {
  return (
    <div className={styles.productoldal}>
      <div className="flex items-center justify-center">
        <h1 className={styles.focim}>Termékeink</h1>
      </div>
      <div className="flex items-center justify-center pt-28">
        <SearchBarPro /> <SearchButton />
      </div>
      <Szurok />
      <div className={styles.kartyak}>
        <Kartya />
        <Kartya />
      </div>
    </div>
  );
};

export default ProductList;
