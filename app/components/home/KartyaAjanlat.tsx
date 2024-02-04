import Image from "next/image";

interface props {
  kep: string;
  cim: string;
  alt: string;
  back: string;
}

function KartyaAjanlat({ kep, cim, alt, back }: props) {
  return (
    <>
      <div className={back}>
        <div className="card md:w-96 md:h-96 sm:h-40 sm:w-40 shadow-xl kartya">
          <figure className="px-10 pt-10 md:h-80 sm:h-28">
            <Image src={kep} alt={alt} width={200} height={200} />
          </figure>
          <div className="card-body flex items-center justify-center">
            <h2 className="card-title md:text-4xl sm:text-2xl font-bold ">{cim}</h2>
          </div>
        </div>
      </div>
    </>
  );
}
export default KartyaAjanlat;
