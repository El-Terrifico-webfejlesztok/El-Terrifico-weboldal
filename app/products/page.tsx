"use client";

import Kartya from "../components/product/Kartya";
import Szurok from "../components/product/Szurok";
import styles from "./productPage.module.css";
import { useState, useEffect } from "react";

const ProductList = () => {
  const [data, setData] = useState([{ id: 65 }]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/product/request");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.productoldal}>
      <div className="flex items-center justify-center">
        <h1 className={styles.focim}>Termékeink</h1>
      </div>
      <div className="flex items-center justify-center pt-28">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Keresés..."
            className="border rounded-md p-2 focus:outline-none focus:ring focus:border-lime-700 lg:w-96 md:w-80 sm:w-72 w-40 inline-block"
          />
        </div>
        <button className="btn btn-xs sm:btn-sm md:btn-md btn-outline btn-success inline-block h-12">
          Keresés
        </button>
      </div>
      <Szurok />
      <div className={styles.kartyak}>
        {data.map((item) => (
          <Kartya
            title={item.name}
            description={item.description}
            category={item.categories}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
