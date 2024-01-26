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
        <div className="card w-96 h-96 shadow-xl kartya">
          <figure className="px-10 pt-10 h-80">
            <Image src={kep} alt={alt} width={250} height={250} />
          </figure>
          <div className="card-body flex items-center justify-center">
            <h2 className="card-title text-4xl font-bold ">{cim}</h2>
          </div>
        </div>
      </div>
    </>
  );
}
export default KartyaAjanlat;
