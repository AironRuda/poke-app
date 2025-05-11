const NotResultFound = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-[200px]">
      <img src="/no-result-found.png" alt="no-result-found" />
      <p className="text-5xl text-white">No pokemons found</p>
    </div>
  );
};

export default NotResultFound;
