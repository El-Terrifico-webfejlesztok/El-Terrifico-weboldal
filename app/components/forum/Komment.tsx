import { CommentType } from "@/app/forum/page";
import formatDate from "@/lib/helper functions/formatDate";

interface props {
  comment: CommentType;
}

const Komment: React.FC<props> = ({comment}) => {
  return (
    <div className=" border-2 rounded-md border-grey sm:w-3/4 w-full bg-white mx-auto p-1 mb-2 flex">
      <div tabIndex={0} className="circle avatar ">
        <div className="w-10 mt-[2px] rounded-full max-h-10">
          <img
            alt="Profilkép"
            title={comment.User.username}
            src={`https://terrifico.zapto.org/${comment.User.image}`}
          />
        </div>
      </div>
      <div className="overflow-hidden">
        <div className="flex space-x-2 items-center">
          <h1 className="my-auto font-medium text-md ml-3 text-black">{comment.User.username}</h1>
          <p className="text-xs font-light">{formatDate(comment.created_at)}</p>
        </div>
        <p className="ml-3 text-sm break-words whitespace-pre-wrap text-black">{comment.text}</p>
      </div>
    </div>
  );
}

export default Komment;
