"use client";

import Kartya from "../components/product/Kartya";
import Szurok from "../components/product/Szurok";
import styles from "./productPage.module.css";
import { useState, useEffect } from "react";

const ProductList = () => {
  const [data, setData] = useState([{ id: 65 }]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredObjects, setFilteredObjects] = useState([]);
  const [searchEmpty, setSearchEmpty] = useState(true);

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

  const handleSearchChange = (event) => {
    const query = document.getElementById("search").value;
    if (query != "") {
      setSearchEmpty(false);
    }
    setSearchQuery(query);
    filterObjects(query);
  };

  const filterObjects = (query) => {
    const filtered = data.filter((obj) =>
      obj.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredObjects(filtered);
  };

  return (
    <div className={styles.productoldal}>
      <div className="flex items-center justify-center">
        <h1 className={styles.focim}>Termékeink</h1>
      </div>
      <div className="flex items-center justify-center pt-28">
        <div className="flex items-center">
          <input
            id="search"
            type="text"
            placeholder="Keresés..."
            className="border rounded-md p-2 focus:outline-none focus:ring focus:border-lime-700 lg:w-96 md:w-80 sm:w-72 w-40 inline-block"
          />
        </div>
        <button
          className="btn btn-xs sm:btn-sm md:btn-md btn-outline btn-success inline-block h-12"
          onClick={handleSearchChange}
        >
          Keresés
        </button>
      </div>
      <Szurok />
      <div className={styles.kartyak}>
        {searchEmpty
          ? data.map((item) => (
              <Kartya
                title={item.name}
                description={item.description}
                category={item.categories}
                price={item.price}
              />
            ))
          : filteredObjects.map((item) => (
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

/*<pre>{JSON.stringify(data, null, 2)}</pre>*/

export default ProductList;
