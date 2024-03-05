import { CommentType } from "@/app/forum/page";

interface props {
  comment: CommentType;
}

const Komment: React.FC<props> = ({comment}) => {
  return (
    <div className=" border-2 rounded-md border-grey sm:w-3/4 w-full bg-white mx-auto p-1 mb-2 flex">
      <div tabIndex={0} className="circle avatar">
        <div className="w-10 rounded-full max-h-10">
          <img
            alt="Profilkép"
            title={comment.User.username}
            src={`https://terrifico.zapto.org/${comment.User.image}`}
          />
        </div>
      </div>
      <div>
        <h1 className=" my-auto font-medium text-md ml-3 text-black">{comment.User.username}</h1>
        <p className="ml-3 text-sm text-black">{comment.text}</p>
      </div>
    </div>
  );
}

export default Komment;
