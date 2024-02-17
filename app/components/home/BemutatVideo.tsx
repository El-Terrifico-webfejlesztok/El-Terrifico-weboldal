interface props {
  videoId: string;
}

function BemutatVideo({ videoId }: props) {
  return (
    <div className="md:flex reszek">
      <div className="md:w-2/5">
        <iframe
          className="youtube"
          src={`https://www.youtube.com/embed/${videoId}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        ></iframe>
      </div>
      <div className="md:w-3/5 flex items-center justify-center">
        <h1 className="text-4xl text-white font-bold text-center mt-12 mb-12 lg:mb-40 lg:mt-40 md:mb-32 md:mt-32">
          Videó az étteremről és annak történetéről:
        </h1>
      </div>
    </div>
  );
}
export default BemutatVideo;
