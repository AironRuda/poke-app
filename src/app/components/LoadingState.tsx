const LoadingState = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-[200px]">
      <img src="/loading-gif.gif" alt="loading" className="w-32" />
      <p className="text-2xl text-white mt-4">Loading pokemons...</p>
    </div>
  );
};

export default LoadingState;
