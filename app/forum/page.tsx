"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import styles from "./forumPage.module.css";
import Poszt from "../components/forum/Poszt";
import Footer from "../components/footer/Footer";
import { getPostCategories } from "../server";

export type UserType = {
  id: number;
  username: string;
  image: string,
};
export type CommentType = {
  id: number;
  text: string;
  User: UserType;
  created_at: Date;
  updated_at: Date;
};
export type PostType = {
  id: number;
  title: string;
  text: string;
  user: UserType;
  category: string;
  comments: CommentType[];
  created_at: Date;
  updated_at: Date;
};


const Forum = () => {
  const [isSuccessAlertOpen, setIsSuccessAlertOpen] = useState(false);
  const [isWarningAlertOpen, setIsWarningAlertOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [posts, setPosts] = useState<PostType[] | null>()
  const [postCategories, setPostCategories] = useState<string[] | null>()

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

  useEffect(() => {


    searchPosts('Mexik')
    loadCategories()
  }, [])

  const loadCategories = async () => {
    try {
      {/** Itt kipróbáltam a server actionokat. Nem tűnnek rossznak, nem kell külön API-t írni ennek. */ }
      const fetchedCategories = await getPostCategories();
      setPostCategories(fetchedCategories);
    } catch (error) {
      console.error(error);
    }
  };

  const searchPosts = async (query?: string, category?: string, count?: number, page?: number) => {
    try {
      // Query paraméterek megépítése
      const queryParams = new URLSearchParams();
      if (query) queryParams.append('query', query);
      if (category) queryParams.append('category', category);
      if (count) queryParams.append('count', count.toString());
      if (page) queryParams.append('page', page.toString());

      const response = await fetch(`/api/post/search?${queryParams.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error("Sikertelen posztkeresés");
      }

      const responseData: PostType[] = await response.json();
      setPosts(responseData);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <>
      <div className={styles.forumOldal}>
        <div className="navbar bg-success w-1/1 mx-auto shadow-sm ">
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
                <select className="select select-bordered sm:join-item" defaultValue="">
                  <option disabled value="">
                    Szűrők...
                  </option>
                  {postCategories ?
                    postCategories.map((category, index) => <option value={category} key={index}>{category}</option>)
                    :
                    <option value={"nothing at all it would seem"}></option>}
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

        {/*Posztok helye*/}
        <div className="min-h-[calc(100vh-409px)] bg-black bg-opacity-75 sm:w-100 w-1/1 mx-auto pt-7 shadow-lg pb-4">
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
          {/**Posztok renderelése */}
          {posts ? posts.map(post => <Poszt key={post.id} post={post} />) : <div className="loading"></div>}


        </div>

        {/* Poszt létrehozása */}
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
                  Sikertelen posztolás! Nincsen mindegyik mező kitöltve!
                </span>
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Forum;
