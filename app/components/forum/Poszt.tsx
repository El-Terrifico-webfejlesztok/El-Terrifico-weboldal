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

  return (
    <div className="collapse collapse-arrow bg-base-300 sm:w-5/6 w-full mx-auto sm:mb-3 mb-5">
      <input type="checkbox" />
      <div className="collapse-title text-xl font-medium">
        <div>{post.title}</div> <div className=" text-sm text-info font-normal">#{post.category}</div>
      </div>

      <div className="collapse-content p-1">
        {/** Temporary anti-Söli measures (break all) */}
        <p className="break-all bg-neutral-content border-2 border-grey p-4 rounded-lg text-black">
          {post.text}
        </p>
        <h1 className="text-lg font-medium my-5 ml-2">Hozzászólások:</h1>
        {/*Comments*/}
        <div className="h-48 overflow-x-auto whitespace-no-wrap">
          {/** Itt renderelődnek a kommentek. Lehet hogy szabni kéne nekik valami határt. */}
          {post.comments.map(cmnt => <Komment key={cmnt.id} comment={cmnt} />)}
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
                onClick={() => { handleComment() }}
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
                    strokeWidth="10"
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
