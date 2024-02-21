"use client";

import React from "react";
import { useState } from "react";
import styles from "./forumPage.module.css";
import Poszt from "../components/forum/Poszt";

const Forum = () => {
  const [isSuccessAlertOpen, setIsSuccessAlertOpen] = useState(false);
  const [isWarningAlertOpen, setIsWarningAlertOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const clearInputs = () => {
    setPostTitle("");
    setPostContent("");
  };

  const handleFeedback = () => {
    if (postTitle === "" || postContent === "") {
      setIsWarningAlertOpen(true);
      setTimeout(() => {
        setIsWarningAlertOpen(false);
      }, 4000);
    } else {
      setIsSuccessAlertOpen(true);
      setTimeout(() => {
        setIsSuccessAlertOpen(false);
      }, 4000);
    }
  };

  return (
    <div className={styles.forumOldal}>
      <div className="navbar bg-success sm:w-4/5 w-1/1 mx-auto shadow-sm rounded-md">
        <div className="navbar-start">
          <h1 className="sm:text-lg text-md text-white font-bold uppercase sm:ml-4">
            Colegauno
          </h1>
        </div>
        <div className="navbar-center hidden lg:flex">
          <div className="form-control">
            <div className="join">
              <div>
                <div>
                  <input
                    className="input input-bordered join-item"
                    placeholder="Keresés.."
                  />
                </div>
              </div>
              <select className="select select-bordered join-item">
                <option disabled selected>
                  Szűrők
                </option>
                <option>Sci-fi</option>
                <option>Drama</option>
                <option>Action</option>
              </select>
              <div className="indicator">
                <button className="btn join-item">Keresés</button>
              </div>
            </div>
          </div>
        </div>
        <div className="navbar-end">
          <a className="btn p-0 sm:p-4 " onClick={toggleExpand}>
            Új poszt
          </a>
        </div>
      </div>

      {/*Posts place*/}
      <div className="bg-neutral-content sm:w-3/4 w-1/1 mx-auto pt-7 rounded-xl shadow-lg pb-4">
        {/* hidden searchbar */}
        <div className={styles.hiddenSearch}>
          <div className="sm:join">
            <div>
              <div>
                <input
                  className="input input-bordered sm:join-item"
                  placeholder="Keresés.."
                />
              </div>
            </div>
            <select className="select select-bordered sm:join-item">
              <option disabled selected>
                Szűrők
              </option>
              <option>Sci-fi</option>
              <option>Drama</option>
              <option>Action</option>
            </select>
            <div className="indicator">
              <button className="btn sm:join-item">Keresés</button>
            </div>
          </div>
        </div>

        <Poszt
          cim="Poszt címe"
          szoveg="A legjobb poszt a világon, mert itt az ElTerrifico oldalán található.
          Legyél része ennek a szuper, csodálatos szép és mesés oldalnak!"
          category="Kategória"
        />
        <Poszt
          cim="Poszt címe"
          szoveg="A legjobb poszt a világon, mert itt az ElTerrifico oldalán található.
          Legyél része ennek a szuper, csodálatos szép és mesés oldalnak!"
          category="Kategória"
        />
      </div>

      {/* Toggle card */}
      {isExpanded && (
        <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-neutral-content rounded-lg shadow-md p-4 md:w-1/2 lg:1/3">
            <h3 className="text-lg font-semibold mb-2">Új poszt létrehozása</h3>
            <div className="label">
              <span className="label-text">Cím:</span>
            </div>
            <input
              type="text"
              placeholder="Poszt címe"
              className="input input-bordered w-full max-w-xs mb-5"
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
            />
            <div className="label">
              <span className="label-text">Szöveg:</span>
            </div>
            <textarea
              className="textarea textarea-bordered h-24 w-full"
              placeholder="Mi jár a fejedben?"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
            ></textarea>
            <div className="flex justify-between">
              <button
                onClick={() => {
                  toggleExpand();
                  clearInputs();
                }}
                className="text-blue-500 hover:underline mt-2"
              >
                Bezárás
              </button>
              <button
                className="text-white hover:underline mt-2 btn btn-info "
                onClick={() => {
                  clearInputs();
                  handleFeedback();
                }}
              >
                Küldés
              </button>
            </div>
          </div>
          {isSuccessAlertOpen && (
            <div
              role="alert"
              className="alert alert-success absolute bottom-0 left-0 right-0 text-center mb-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6 inline-block mr-2"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Sikeres posztolás!</span>
            </div>
          )}
          {isWarningAlertOpen && (
            <div
              role="alert"
              className="alert alert-error absolute bottom-0 left-0 right-0 text-center mb-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>
                Sikertlene posztolás! Nincsen mindegyik mező kitöltve!
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Forum;
