"use client";

import Kartya from "../components/product/Kartya";
import Szurok from "../components/product/Szurok";
import styles from "./productPage.module.css";
import { useState, useEffect } from "react";
import {
  useSearchParams,
  useRouter,
  ReadonlyURLSearchParams,
} from "next/navigation";
import Footer from "../components/footer/Footer";

interface Product {
  id: number;
  stock: number;
  name: string;
  description: string;
  categories: string[];
  images: string[];
  price: number;
}
interface ProductFilter {
  name?: string;
  minPrice?: string;
  maxPrice?: string;
  categories?: string[];
}

const ProductList = () => {
  // Az URLsearchParams egy változó ami tükrözi a kérdőjel után lévő részt az URL-ben, automatikusan updatel
  const URLsearchParams = useSearchParams();
  // data az egy lista productokkal
  const [data, setData] = useState<Product[]>([]);
  // Loading változó a fetch-hez hogy legyen valami feedback a kattintásnál
  const [loading, setLoading] = useState<Boolean>();
  // routerrel lehet útvonalat változtatni
  const router = useRouter();

  // State to hold all unique categories
  const [allCategories, setAllCategories] = useState<string[]>([]);

  // Adatok kiszedése a formból majd ezek alapján URL-re navigálás
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    console.log(formData.get("minPrice"));

    const name = formData.get("name") as string;
    const minPrice = formData.get("minPrice") as string;
    const maxPrice = formData.get("maxPrice") as string;
    const categories = formData.getAll("category") as string[];
    const minRating = formData.get("minRating") as string;
    const maxRating = formData.get("maxRating") as string;

    // Ha lesz input validálás akkor itt kell még.
    // Útvonal megváltozattása erre a címre
    setPath({ name, minPrice, maxPrice, categories });
    //
    fetchData(URLsearchParams);
  };

  // Útvonal megváltoztatása
  const setPath = ({ name, minPrice, maxPrice, categories }: ProductFilter) => {
    // currentparams segédváltozó
    const currentParams = new URLSearchParams();
    if (name !== undefined && name !== null) {
      currentParams.set("name", name);
    }
    if (minPrice !== undefined && minPrice !== null) {
      currentParams.set("minprice", minPrice);
    }
    if (maxPrice !== undefined && maxPrice !== null) {
      currentParams.set("maxprice", maxPrice);
    }
    if (
      categories !== undefined &&
      categories !== null &&
      categories.length > 0
    ) {
      currentParams.set("categories", categories.join(","));
    }

    // Build new URL with updated parameters
    const newUrl = `/products?${currentParams.toString()}`;

    // Use router.push to update the URL
    router.push(newUrl, { scroll: false });
  };

  // Adatlekérés, a searchParams stringgé alakításával
  const fetchData = async (searchParams: ReadonlyURLSearchParams) => {
    // Loading státusz igazra állítása
    setLoading(true);
    try {
      const response = await fetch(
        `/api/product/request?${searchParams.toString()}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const responseData = await response.json();
      setData(responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      // Loading státusz hamisra állítása
      setLoading(false);
    }
  };

  // Function to extract all unique categories
  const extractCategories = (products: Product[]) => {
    const categoriesSet = new Set<string>();
    products.forEach((product) => {
      product.categories.forEach((category) => {
        categoriesSet.add(category);
      });
    });
    setAllCategories(Array.from(categoriesSet));
  };

  const fetchCategory = async () => {
    try {
      const response = await fetch(`/api/product/request`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const responseData = await response.json();
      extractCategories(responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchCategory();
  }, []);

  // Ha változik az URL akkor indít egy keresést
  useEffect(() => {
    // console.log(URLsearchParams.toString())
    fetchData(URLsearchParams);
  }, [URLsearchParams]);

  return (
    <>
      <div className={styles.productoldal}>
        <div className="flex items-center justify-center">
          <h1 className={styles.focim}>Termékeink</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="join flex items-center justify-center pt-20">
            <input
              type="text"
              name="name"
              placeholder="Keresés..."
              className="max-w-[95%] w-96 input input-bordered join-item" />
            <button className="btn btn-success join-item w-20 ">
              <p className={loading ? "loading" : ""}>Keresés</p>
            </button>
          </div>
          <Szurok kategoriak={allCategories} />
        </form>

        {/**Kárty renderelés a visszakapott eredményekkel */}
        <div className={styles.kartyak}>
          {data.map((item) => (
            <Kartya
              product={{
                id: item.id,
                name: item.name,
                description: item.description,
                price: item.price,
                stock: item.stock,
                is_active: true,
                created_at: new Date(0),
                updated_at: new Date(0),
              }}
              key={item.id}
              title={item.name}
              description={item.description}
              category={item.categories}
              images={item.images}
              price={item.price} />
          ))}
        </div>
        <div className="h-12"></div>
      </div><Footer />
    </>
  );
};

export default ProductList;
