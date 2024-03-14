"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import styles from "./forumPage.module.css";
import Poszt from "../components/forum/Poszt";
import Footer from "../components/footer/Footer";
import { getPostCategories } from "../server";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import updateToast from "@/lib/helper functions/updateToast";

export type UserType = {
  id: number;
  username: string;
  image: string;
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
  const router = useRouter();
  const URLsearchParams = useSearchParams();
  {
    /** Popup */
  }
  const [isSuccessAlertOpen, setIsSuccessAlertOpen] = useState(false);
  const [isWarningAlertOpen, setIsWarningAlertOpen] = useState(false);

  const [isExpanded, setIsExpanded] = useState(false);

  {
    /** Posztfeltöltés adatai */
  }
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postCategory, setPostCategory] = useState("");
  const [postErrorMessage, setPostErrorMessage] = useState("");

  {
    /** Posztkereséssel kapcsolatos változók */
  }
  const [posts, setPosts] = useState<PostType[] | null>();
  const [postCategories, setPostCategories] = useState<string[] | null>();
  const [loading, setLoading] = useState<boolean>(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const clearInputs = () => {
    setPostTitle("");
    setPostContent("");
    setPostCategory("");
    setPostErrorMessage("");
  };

  const handleFeedback = (success: boolean) => {
    if (!success) {
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
    loadCategories();
    searchPosts(URLsearchParams);
  }, []);

  const reload = () => {
    searchPosts(URLsearchParams);
  }

  const loadCategories = async () => {
    try {
      {
        /** Itt kipróbáltam a server actionokat. Nem tűnnek rossznak, nem kell külön API-t írni ennek. */
      }
      const fetchedCategories = await getPostCategories();
      setPostCategories(fetchedCategories);
    } catch (error) {
      console.error(error);
    }
  };

  const setPath = (queryParams: URLSearchParams) => {
    // Build new URL with updated parameters
    const newUrl = `/forum?${queryParams.toString()}`;
    // Use router.push to update the URL
    router.push(newUrl, { scroll: false });
  };

  const buildForumQuery = (
    query?: string,
    category?: string,
    count?: number,
    page?: number
  ) => {
    const queryParams = new URLSearchParams();
    if (query) queryParams.append("query", query);
    if (category) queryParams.append("category", category);
    if (count) queryParams.append("count", count.toString());
    if (page) queryParams.append("page", page.toString());
    return queryParams;
  };
  {
    /** Posztok keresése */
  }
  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const query = formData.get("query") as string;
    const category = formData.get("category") as string;

    // Jelenleg 50 posztot ad vissza az első oldalról defaultból, majd lehet ezt változtatni
    const queryParams = buildForumQuery(query, category, 50, 1);
    searchPosts(queryParams);
  };
  const searchPosts = async (queryParams?: URLSearchParams) => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/post/search?${queryParams ? queryParams!.toString() : ""}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Sikertelen posztkeresés");
      }
      const responseData: PostType[] = await response.json();
      setPosts(responseData);
      queryParams ? setPath(queryParams) : null;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  {
    /** Posztok létrehozása */
  }
  const createPost = async (title: string, text: string, category: string) => {
    setLoading(true);
    const toastId = toast.loading("Poszt feltöltése...")

    console.log(title, text, category);
    try {
      if (!title || !text || !category) {
        handleFeedback(false);
        updateToast(toastId, 'warning', 'Nincs minden mező kitöltve')
        return
      }
      const response = await fetch("/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          text: text,
          category: category,
        }),
      });

      if (!response.ok) {
        handleFeedback(false);
        const responseData: string = await response.json();
        updateToast(toastId, 'error', responseData)
        setPostErrorMessage(responseData);
        throw new Error("Sikertelen poszt létrehozás");
      }
      searchPosts(buildForumQuery(title));
      clearInputs();
      setIsExpanded(false);
      handleFeedback(true);
      updateToast(toastId, 'success', `Sikeres posztolás (${title})`)
    } catch (error) {
      updateToast(toastId, 'error', 'A szerver nem érhető el')
      console.error("A szerver nem érhető el", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={styles.forumOldal}>
        <div className="navbar bg-success w-1/1 mx-auto shadow-sm ">
          <div className="navbar-start">
            <a
              className="sm:text-lg text-md text-white font-bold uppercase sm:ml-4"
              href="/forum"
            >
              Colegauno
            </a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <form
              className="form-control"
              name="searchform"
              onSubmit={handleSearch}
            >
              <div className="join">
                <div>
                  <div>
                    <input
                      className="input input-bordered join-item"
                      placeholder="Keresés.."
                      name="query"
                    />
                  </div>
                </div>
                <select
                  defaultValue=""
                  name="category"
                  className="select select-bordered sm:join-item"
                >
                  <option value="">Szűrők...</option>
                  {postCategories ? (
                    postCategories.map((category, index) => (
                      <option value={category} key={index}>
                        {category}
                      </option>
                    ))
                  ) : (
                    <option></option>
                  )}
                </select>
                <div className="indicator">
                  <button className="btn join-item w-24" type="submit">
                    <span className={loading ? "loading" : ""}>Keresés</span>
                  </button>
                </div>
              </div>
            </form>
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
            <form className="sm:join" name="searchform" onSubmit={handleSearch}>
              <div className="join">
                <input
                  className="input input-bordered join-item w-full "
                  placeholder="Keresés.."
                  name="query"
                />
                <select
                  defaultValue=""
                  name="category"
                  className="select select-bordered join-item sm:float-none float-left"
                >
                  <option value="">Szűrők...</option>
                  {postCategories ? (
                    postCategories.map((category, index) => (
                      <option value={category} key={index}>
                        {category}
                      </option>
                    ))
                  ) : (
                    <option></option>
                  )}
                </select>
              </div>
              <button className="btn w-64 join-item mt-2" type="submit">
                <span className={loading ? "loading" : ""}>Keresés</span>
              </button>
            </form>
          </div>
          {/**Posztok renderelése */}
          {posts ? (
            posts.map((post) => <Poszt key={post.id} post={post} reload={reload}/>)
          ) : (
            <div className="loading"></div>
          )}
        </div>

        {/* Poszt létrehozása */}
        {isExpanded && (
          <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-30">
            <div className="bg-neutral-content rounded-lg shadow-md p-4 md:w-1/2 lg:1/3">
              <h3 className="text-lg font-semibold mb-2">
                Új poszt létrehozása
              </h3>

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
              <div>
                <div className="label">
                  <span className="label-text">Kategória:</span>
                </div>

                <select
                  name="category"
                  className="select select-bordered join-item sm:float-none float-left"
                  onChange={(e) => setPostCategory(e.target.value)}
                  defaultValue={""}
                >
                  <option disabled hidden value={""}></option>
                  {postCategories ? (
                    postCategories.map((category, index) => (
                      <option value={category} key={index}>
                        {category}
                      </option>
                    ))
                  ) : (
                    <option></option>
                  )}
                </select>
              </div>

              <div>
                <div className="label">
                  <span className="label-text">Szöveg:</span>
                </div>

                <textarea
                  className="textarea textarea-bordered h-24 w-full"
                  placeholder="Mi jár a fejedben?"
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                ></textarea>
              </div>

              <div className="flex justify-between items-center">
                <button
                  onClick={() => {
                    toggleExpand();
                    clearInputs();
                  }}
                  className="text-blue-500 hover:underline mt-2"
                >
                  Bezárás
                </button>
                <p className="mt-2 text-error">{postErrorMessage}</p>
                <button
                  className="text-white hover:underline mt-2 btn btn-info "
                  onClick={() => {
                    createPost(postTitle, postContent, postCategory);
                  }}
                >
                  <span className={loading ? "loading" : ""}>Küldés</span>
                </button>
              </div>
            </div>
            {/** Hibaüzenetek */}
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
                <span>Sikertelen posztolás!</span>
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
