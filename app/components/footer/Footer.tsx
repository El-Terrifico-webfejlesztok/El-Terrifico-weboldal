import React from 'react';
import Link from 'next/link';
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {

  return (
    <footer className="pt-4">
      <div className="flex justify-evenly mx-6">
        <div className="m-2 mx-20 font-medium">
          <h3 className="font-bold text-xl">Kapcsolataink</h3>
          <p>Email: el.terrifico@gmail.com</p>
          <p>Tel: +36 30 548 7729</p>
        </div>
        <div className="m-2 mx-36 font font-medium">
          <h3 className="font-bold text-xl">Böngésszen tovább:</h3>
            <ul>
              <li>
                <Link href="/products">
                  <p>Products</p>
                </Link>
              </li>
              <li>
                <Link href="/forum">
                  <p>Forum</p>
                </Link>
              </li>
            </ul>
        </div>
      </div>
      
      <div className="m-3 text-center">
        <h3 className="font-bold text-xl m-2">Kövess minket!</h3>
        <div className="flex items-center justify-center">
          <FaTwitter className="mx-2 size-9" />
          <FaFacebook className="mx-2 size-9" />
          <FaInstagram className="mx-2 size-9" />
        </div>
      </div>
      
      <div className="mt-3 p-3 copyr">
        <p className="text-center">&copy; 2024 El Terrifico. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
