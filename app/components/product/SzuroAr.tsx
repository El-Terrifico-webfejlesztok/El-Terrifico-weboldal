'use client';

import styles from './product.module.css'

interface props {
    placeh: string
    minertek: number
    cim: string
}

function SzuroAr({placeh, minertek, cim}: props) {
  return (
    <>
      <div className="label items-center justify-center">
        <span className="label-text">{cim}</span>
      </div>
      <input
        type="number"
        placeholder={placeh}
        className={styles.ardoboz}
        min={minertek}
      />
    </>
  );
}
export default SzuroAr;
