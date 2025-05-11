const ErrorState = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-[200px]">
      <img src="/error-img.png" alt="no-result-found" className="w-80" />
      <p className="text-5xl text-white">Error loading pokemons</p>
    </div>
  );
};

export default ErrorState;
