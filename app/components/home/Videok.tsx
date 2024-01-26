import FlipKartya from "./FlipKartya";

function Videok() {
  return (
    <div className="reszek">
      <h1 className="text-4xl text-red-500 font-bold text-center mb-8 mt-4">
        Ilyen jó hangulat vár rád:
      </h1>
      <div className="md:flex mb-8">
        <div className="md:w-1/3 flex items-center justify-center mb-8">
          <FlipKartya szoveg="Pincérként is jó vagyok." video="/Franco1.mp4" />
        </div>
        <div className="md:w-1/3 flex items-center justify-center mb-8">
          <FlipKartya szoveg="Néha én is kiszállítok." video="/Franco2.mp4" />
        </div>
        <div className="md:w-1/3 flex items-center justify-center mb-8">
          <FlipKartya szoveg="Mexikóóóóóó." video="/Franco5.mp4" />
        </div>
      </div>
      <div className="md:flex ">
        <div className="md:w-2/4 flex items-center justify-center mb-8">
          <FlipKartya
            szoveg="Ettől, azért én is megijedtem."
            video="/Franco3.mp4"
          />
        </div>
        <div className="md:w-2/4 flex items-center justify-center">
          <FlipKartya
            szoveg="Egy kis zene mindig felvidít."
            video="/Franco4.mp4"
          />
        </div>
      </div>
    </div>
  );
}
export default Videok;
