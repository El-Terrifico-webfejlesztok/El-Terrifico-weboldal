"use client";

import Komment from "./Komment";
import { useState } from "react";

interface props {
  cim: string;
  szoveg: string;
}

function Poszt({ szoveg, cim }: props) {
  const [postContent, setPostContent] = useState("");

  const clearInputs = () => {
    setPostContent("");
  };

  return (
    <div className="collapse collapse-arrow bg-base-200 w-4/5 mx-auto mb-2">
      <input type="checkbox" />
      <div className="collapse-title text-xl font-medium">{cim}</div>
      <div className="collapse-content">
        <p className="bg-white border-2 border-grey p-4 rounded-lg">{szoveg}</p>
        <h1 className="text-lg font-medium my-5">Hozzászólások:</h1>
        {/*Comments*/}
        <div className="h-48 overflow-x-auto whitespace-no-wrap">
          <Komment
            comment="Az én kommentem az első és remélem nem az utolsó."
            name="Nagy Lajos"
            image="/HomeTaco.jpg"
          />
          <Komment
            comment="Az én kommentem az első és remélem nem az utolsó."
            name="Nagy Lajos"
            image="/HomeTaco.jpg"
          />
          <Komment
            comment="Az én kommentem az első és remélem nem az utolsó."
            name="Nagy Lajos"
            image="/HomeTaco.jpg"
          />
          <Komment
            comment="Az én kommentem az első és remélem nem az utolsó."
            name="Nagy Lajos"
            image="/HomeTaco.jpg"
          />
        </div>
        <div className=" border-2 rounded-md border-grey sm:w-2/6 w-full bg-white mx-auto p-1 mt-3 mb-2">
          <h1 className="text-sm p-1 mb-1">Hozzászólásod:</h1>
          <div className="flex">
            <textarea
              placeholder="Új hozzászólás"
              className="input input-bordered w-full max-w-xs mb-4 h-8 text-sm"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
            />
            <div className="w-1/2 justify-end items-end text-right p-0 m-0">
              <button
                onClick={() => {
                  clearInputs();
                }}
              >
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 100 100"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M30 50 H70 M50 30 V70"
                    stroke="grey"
                    stroke-width="10"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Poszt;
