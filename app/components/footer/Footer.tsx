import React from "react";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="pt-4">
      <div className="sm:flex sm:justify-evenly sm:mx-6  ">
        <div className="sm:m-2 sm:mx-20 font-medium text-center sm:text-start mb-7">
          <h3 className="font-bold text-xl">Kapcsolataink</h3>
          <p className="text-center sm:text-start">
            Email: el.terrifico@gmail.com
          </p>
          <p className="text-center sm:text-start">Tel: +36 30 910 1099</p>
          <p className="text-center sm:text-start">Cím: Győr, Apáca u. 4</p>
        </div>
        <div className="sm:m-2 sm:mx-36 mb-7 font font-medium">
          <h3 className="font-bold text-xl text-center sm:text-start">
            Böngésszen tovább:
          </h3>
          <ul className="text-center items-center sm:text-start">
            <li>
              <Link href="/products">
                <p className="text-center sm:text-start">Termékek</p>
              </Link>
            </li>
            <li>
              <Link href="/forum">
                <p className="text-center sm:text-start">Fórum</p>
              </Link>
            </li>
            <li>
              <Link href="/aboutus">
                <p className="text-center sm:text-start">Rólunk</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="m-3 text-center">
        <h3 className="font-bold text-xl m-2">Kövess minket!</h3>
        <div className="flex items-center justify-center">
          <a
            href="https://www.facebook.com/profile.php?id=100095614833604"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook className="mx-2 size-9" />{" "}
          </a>
          <a
            href="https://www.instagram.com/duracell_e_francogioia/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="mx-2 size-9" />
          </a>
          <a
            href="https://www.youtube.com/@ElTerrifico"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube className="mx-2 size-9" />
          </a>
          <a
            href="https://www.tiktok.com/@duracellplus.153"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTiktok className="mx-2 size-9" />
          </a>
        </div>
      </div>

      <div className="mt-3 p-3 copyr">
        <p className="text-center">
          &copy; 2024 El Terrifico. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
