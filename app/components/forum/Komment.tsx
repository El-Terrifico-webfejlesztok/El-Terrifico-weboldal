import { CommentType } from "@/app/forum/page";
import formatDate from "@/lib/helper functions/formatDate";
import updateToast from "@/lib/helper functions/updateToast";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

interface props {
  comment: CommentType;
  reload?: Function
}



const Komment: React.FC<props> = ({ comment, reload }) => {
  const { data: session, } = useSession()


  const deleteComment = async (commentId: number) => {
    const toastId = toast.loading("Hozzászólás törlése...")
    const isConfirmed = window.confirm(`Biztosan törölni a hozzászólást?`);
    if (!isConfirmed) {
      updateToast(toastId, 'info', 'Hozzászólás törlése félbeszakítva')
      return;
    }
    try {
      const response = await fetch(`/api/post/comment?id=${commentId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const responseData = await response.json();
      if (!response.ok) {
        updateToast(toastId, 'error', responseData)
        return
      }
      updateToast(toastId, 'success', 'Sikeres komment törlés!')
      if (reload) reload()

    } catch (error) {
      updateToast(toastId, 'warning', 'A szerver nem elérhető')
    }
  };

  return (
    <div className=" border-2 rounded-md border-grey sm:w-3/4 w-full bg-white mx-auto p-1 mb-2 flex">
      <div tabIndex={0} className="circle avatar ">
        <div className="w-10 mt-[2px] rounded-full max-h-10">
          <img
            alt="Profilkép"
            title={comment.User.username}
            src={session?.user ? session.user.image ?? 'https://terrifico.zapto.org/public/profile_images/defaultpfp.png' : 'https://terrifico.zapto.org/public/profile_images/defaultpfp.png'} />
        </div>
      </div>
      <div className="overflow-hidden">
        <div className="flex space-x-2 items-center">
          <h1 className="my-auto font-medium text-md ml-3 text-black">{comment.User.username}</h1>
          <p className="text-xs font-light">{formatDate(comment.created_at)}</p>
          {comment.User.username === session?.user?.name || session?.user?.role === 'admin' ?
            <button onClick={() => deleteComment(comment.id)}
              className="z-20 btn btn-xs btn-ghost mx-5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="black" className="w-4 h-4">
                <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z" clipRule="evenodd" />
              </svg>
            </button> :
            null}
        </div>
        <p className="ml-3 text-sm break-words whitespace-pre-wrap text-black">{comment.text}</p>
      </div>
    </div>
  );
}

export default Komment;
