'use client';

import styles from './product.module.css'

interface props {
    placeh: string
    minertek: number
    cim: string
    name:string
}

function SzuroAr({placeh, minertek, cim, name}: props) {
  return (
    <div className='mb-10'>
      <div className="label items-center justify-center">
        <span className="label-text">{cim}</span>
      </div>
      <input
        name={name}
        type="number"
        placeholder={placeh}
        className={styles.ardoboz}
        min={minertek}
      />
    </div>
  );
}
export default SzuroAr;
