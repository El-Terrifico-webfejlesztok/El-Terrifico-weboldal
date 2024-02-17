function FigyelemFel() {
  return (
    <div
      className="bg-cover bg-center h-screen flex items-center justify-center"
      style={{ backgroundImage: "url('/HomeKep.jpg')" }}
    >
      <h1 className="md:text-4xl sm:text-3xl text-black font-bold bg-green-500 inline-block p-2 text-center">
        Éhes vagy?
      </h1>
      <h1 className="md:text-4xl sm:text-3xl text-black font-bold bg-white inline-block p-2 text-center">
        Ennél egyet?
      </h1>
      <h1 className="md:text-4xl sm:text-3xl text-black font-bold bg-red-500 inline-block p-2 text-center">
        Itt a helyed!
      </h1>
    </div>
  );
}
export default FigyelemFel;
