"use client";

import Komment from "./Komment";
import { useState } from "react";
import { PostType } from "@/app/forum/page";
import { toast } from "react-toastify";
import updateToast from "@/lib/helper functions/updateToast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface props {
  post: PostType,
  reload?: Function
}

const Poszt: React.FC<props> = ({ post, reload }) => {
  const [postContent, setPostContent] = useState("");
  const { data: session, } = useSession()
  const router = useRouter()

  const createComment = async () => {
    if (!session) {
      router.push("/login")
    }

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
      if (reload) reload()
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

  const postdate = formatDate(post.created_at)

  return (
    <div className="collapse max-w-screen-2xl collapse-arrow bg-base-300 sm:w-5/6 w-full mx-auto sm:mb-3 mb-5">
      <input type="checkbox" />
      <div className="collapse-title text-xl font-medium flex justify-between items-center">
        {/** Cím bal odal */}
        <div className="mr-9 sm:mr-0 ">
          {/** Cím */}
          <p className="text-base sm:text-lg">{post.title}</p>
          {/** Kategória és dátum */}
          <div className="flex">
            <div className=" text-xs sm:text-sm text-info font-normal">#{post.category}</div>
            <p className="ml-2 font-light text-xs sm:text-sm">{postdate}</p>
            {post.comments.length > 0 ?
              <p className="ml-3 font-light text-xs sm:text-sm flex ">
                <p>{post.comments.length}</p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="pt-[2px] w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                </svg>
              </p>
              : null}

          </div>

        </div>
        {/** Cím jobb odal */}
        <div className="flex items-center">
          {/** Username */}
          <span className="mr-3">{post.user.username}</span>
          {/** Kep */}
          <div tabIndex={0} className="circle avatar mr-2">
            <div className="w-10 rounded-full max-h-10">
              <img
                alt="Profilkép"
                title={post.user.username}
                src={`https://terrifico.zapto.org/${post.user.image}`}
              />
            </div>
          </div>
        </div>
      </div>
      {/** Poszt body */}
      <div className="collapse-content overflow-hidden">
        <div className="bg-neutral-content border-2 border-grey p-1 sm:p-3 rounded-lg">

          <p className=" text-black break-words whitespace-pre-wrap">{post.text}</p>

        </div>
        <div className="divider divider-start text-lg font-medium my-5 ml-2 pr-3">Hozzászólások:</div>
        {/*Comments*/}
        <div className="overflow-x-auto whitespace-no-wrap">
          {/** Itt renderelődnek a kommentek. Lehet hogy szabni kéne nekik valami határt. */}
          {post.comments.length > 0 ? post.comments.map((cmnt) => (
            <Komment key={cmnt.id} comment={cmnt} />
          ))
            : <h1 className="text-center text-lg font-bold mb-6 mt-2 opacity-40 select-none">Légy az első aki hozzászól!</h1>}
        </div>

        {/** Hozzászólás */}
        <div className=" border-2 rounded-md border-grey sm:max-w-[38rem] w-full bg-stone-100 mx-auto p-1 mt-3 mb-2">
          <div className="flex p-1">
            <div tabIndex={0} className="circle avatar mr-4 hidden sm:inline-block">
              <div className="w-12 rounded-full max-h-12">
                <img
                  alt="Profilkép"
                  title={post.user.username}
                  src={session?.user ? session.user.image ?? 'https://terrifico.zapto.org/public/profile_images/defaultpfp.png' : 'https://terrifico.zapto.org/public/profile_images/defaultpfp.png'} />
              </div>
            </div>
            <textarea
              placeholder="Új hozzászólás"
              className="textarea textarea-bordered h-16 w-full text-sm"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
            />
            {/*<div className="w-1/2 justify-end items-end text-right p-0 m-0">*/}
            <button
              onClick={() => { handleComment(); clearInputs() }}
              className="btn btn-lg ml-4"
            >
              Küldés
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Poszt;
