interface props {
  image: string;
  name: string;
  comment: string;
}

function Komment({ image, name, comment }: props) {
  return (
    <div className=" border-2 rounded-md border-grey sm:w-3/4 w-full bg-white mx-auto p-1 mb-2 flex">
      <div tabIndex={0} className="circle avatar">
        <div className="w-10 rounded-full max-h-10">
          <img
            alt="Tailwind CSS Navbar component"
            title="Emberke neve"
            src={image}
          />
        </div>
      </div>
      <div>
        <h1 className=" my-auto font-medium text-md ml-3">{name}</h1>
        <p className="ml-3 text-sm">{comment}</p>
      </div>
    </div>
  );
}

export default Komment;
