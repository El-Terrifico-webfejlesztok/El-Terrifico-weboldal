function FigyelemFel() {

  const textclass = 'md:text-4xl sm:text-3xl inline-block p-2 text-center text-black font-bold'
  return (
    <div
      className="bg-cover bg-center h-screen flex items-center justify-center"
      style={{ backgroundImage: "url('/HomeKep.jpg')" }}
    >
      <h1 className={`${textclass} bg-green-500`}>
        Éhes vagy?
      </h1>
      <h1 className={`${textclass} bg-white`}>
        Ennél egyet?
      </h1>
      <h1 className={`${textclass} bg-red-500`}>
        Itt a helyed!
      </h1>
    </div>
  );
}
export default FigyelemFel;
