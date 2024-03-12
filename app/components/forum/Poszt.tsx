"use client";

import Komment from "./Komment";
import { useState } from "react";
import { PostType } from "@/app/forum/page";
import { toast } from "react-toastify";
import updateToast from "@/lib/helper functions/updateToast";

interface props {
  post: PostType,
  reload?: Function
}

const Poszt: React.FC<props> = ({ post, reload }) => {
  const [postContent, setPostContent] = useState("");


  const createComment = async () => {
    const toastId = toast.loading("Komment feltöltése...")

    try {
      const response = await fetch('/api/post/comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: postContent,
          postId: post.id
        }),
      });
      const responseData = await response.json();
      if (!response.ok) {
        updateToast(toastId, 'error', responseData)
        return
      }

      updateToast(toastId, 'success', 'Sikeres kommentelés!')
    }
    catch (error) {
      updateToast(toastId, 'warning', 'A szerver nem elérhető!')

    }
  };

  const clearInputs = () => {
    setPostContent("");

  };

  const handleComment = () => {
    createComment()
  };

  const formatDate = (dateString: Date): string => {
    const date = new Date(dateString);
    const formattedDate = date
      .toLocaleDateString("hu-HU", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\//g, "-"); // Replace slashes with hyphens

    const formattedTime = date.toLocaleTimeString("hu-HU", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // 24-hour format
    });

    return `${formattedDate}, ${formattedTime}`;
  };

  return (
    <div className="collapse collapse-arrow bg-base-300 sm:w-5/6 w-full mx-auto sm:mb-3 mb-5">
      <input type="checkbox" />
      <div className="collapse-title text-xl font-medium flex justify-between items-center">
        <div className="mr-9 sm:mr-0 ">
          <div>
            <p className="text-base sm:text-lg">{post.title}</p>
          </div>
          <div className=" text-xs sm:text-sm text-info font-normal">#{post.category}</div>
        </div>

        <div className="flex items-center">
          <div tabIndex={0} className="circle avatar">
            <span className="mr-1 text-sm sm:text-lg">{post.user.username}</span>
            <div className="w-8 sm:w-10 rounded-full max-h-8 sm:max-h-10">
              <img
                alt="Profilkép"
                title={post.user.username}
                src={`https://terrifico.zapto.org/${post.user.image}`}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="collapse-content p-1">
        <p className="m-4">Készült: {formatDate(post.created_at)}</p>
        {/** Temporary anti-Söli measures (break all) */}
        <div className="bg-neutral-content border-2 border-grey p-3 rounded-lg">
          <p className=" text-black max-w-fit">{post.text}</p>
        </div>
        <h1 className="text-lg font-medium my-5 ml-2">Hozzászólások:</h1>
        {/*Comments*/}
        <div className="max-h-48 overflow-x-auto whitespace-no-wrap">
          {/** Itt renderelődnek a kommentek. Lehet hogy szabni kéne nekik valami határt. */}
          {post.comments.map((cmnt) => (
            <Komment key={cmnt.id} comment={cmnt} />
          ))}
        </div>

        {/** Hozzászólás */}
        <div className=" border-2 rounded-md border-grey sm:w-2/6 w-full bg-white mx-auto p-1 mt-3 mb-2">
          <h1 className="text-sm p-1 mb-1 text-black">Hozzászólásod:</h1>
          <div className="flex">
            <textarea
              placeholder="Új hozzászólás"
              className="input input-bordered w-full max-w-xs mb-4 h-8 text-sm"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
            />
            <div className="w-1/2 justify-end items-end text-right p-0 m-0">
              <button
                onClick={() => { handleComment(); clearInputs() }}
                className="btn btn-sm sm:btn-sm md:btn-md"
              >
                Küldés
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Poszt;
