const ErrorCard = () => {
  return (
    <li className="pokemon-card bg-tertiary">
      <div className="flex items-center justify-center h-48">
        <p className="text-black">Error loading pokemon</p>
      </div>
    </li>
  );
};

export default ErrorCard;
