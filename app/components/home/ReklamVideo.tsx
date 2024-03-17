function ReklamVideo() {
  return (
    <div className="md:flex reszek">
      <div className="md:w-3/5 flex items-center justify-center">
        <h1 className="text-4xl text-success font-bold text-center mt-12 mb-12 lg:mb-40 lg:mt-40 md:mb-32 md:mt-32">
          Az étterem reklám videója
        </h1>
      </div>
      <div className="md:w-2/5">
        <iframe
          className="youtube aspect-video rounded-r-md"
          src={`https://www.youtube.com/embed/wLKPwPXm9HM`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        ></iframe>
      </div>
    </div>
  );
}
export default ReklamVideo;
