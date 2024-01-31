function SearchBarPro() {
  return (
    <div className="flex items-center">
      <input
        type="text"
        placeholder="Keresés..."
        className="border rounded-md p-2 focus:outline-none focus:ring focus:border-lime-700 lg:w-96 md:w-80 sm:w-72 inline-block"
      />
    </div>
  );
}

export default SearchBarPro;
