"use client";

import styles from "./product.module.css";

interface props {
  placeh: string;
  minertek: number;
  cim: string;
  name: string;
  id: string;
  onChange: () => void;
}

function SzuroAr({ placeh, minertek, cim, name, id, onChange }: props) {
  return (
    <div className="mb-10">
      <div className="label items-center justify-center">
        <span className="label-text text-black">{cim}</span>
      </div>
      <input
        id={id}
        name={name}
        type="number"
        placeholder={placeh}
        className={styles.ardoboz}
        min={minertek}
        onBlur={onChange}
        step="500"
      />
    </div>
  );
}
export default SzuroAr;
