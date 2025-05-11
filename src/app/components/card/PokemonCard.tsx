import { useCapturedPokemonContext } from "@/app/context/CapuredPokemonContext";
import { IPokemonDetails } from "@/app/hooks/useGetPokemonDetails";
import TypeBadge from "../TypeBadge";

const PokemonCard = ({
  pokemonDetails,
}: {
  pokemonDetails: IPokemonDetails;
}) => {
  const { isCaptured, addCapturedPokemon, removeCapturedPokemon } =
    useCapturedPokemonContext();

  const isPokemonCaptured = isCaptured(String(pokemonDetails.id));

  const handleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (isPokemonCaptured) {
      removeCapturedPokemon(String(pokemonDetails.id));
    } else {
      addCapturedPokemon(String(pokemonDetails.id));
    }
  };

  const getBackgroundColor = () => {
    if (
      !pokemonDetails ||
      !pokemonDetails.types ||
      pokemonDetails.types.length === 0
    ) {
      return "bg-tertiary";
    }

    const firstType = pokemonDetails.types[0].toLowerCase();
    const secondType = pokemonDetails.types[1]?.toLowerCase();

    if (pokemonDetails.types.length === 1) {
      return `bg-${firstType}`;
    }

    return `bg-gradient-to-r from-${firstType} to-${secondType}`;
  };

  const bgColor = getBackgroundColor();

  return (
    <li
      className={`${bgColor} relative pokemon-card cursor-pointer hover:scale-105 transition-all duration-300`}
    >
      <div className="absolute top-5 right-5">
        <button
          className="text-white bg-dark-100 rounded-full h-10 w-10 p-1 text-2xl cursor-pointer hover:bg-dark-100/70 transition-all duration-300"
          onClick={handleFavorite}
        >
          {isPokemonCaptured ? (
            <img src="/red-pokeball.png" alt="pokeball" />
          ) : (
            <img src="/white-pokeball.png" alt="pokeball" />
          )}
        </button>
      </div>
      <h3 className="absolute text-black text-2xl top-5 left-5">
        {pokemonDetails?.id}
      </h3>

      <img
        src={pokemonDetails?.image ? pokemonDetails.image : "/no-movie.png"}
        alt={pokemonDetails?.name}
      />
      <div className="mt-4 flex flex-col items-center">
        <h3 className="text-black text-2xl">{pokemonDetails?.name}</h3>
        <div className="content">
          <TypeBadge types={pokemonDetails?.types || []} />
        </div>
      </div>
    </li>
  );
};

export default PokemonCard;
