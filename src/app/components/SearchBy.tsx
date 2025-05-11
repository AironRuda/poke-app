import {
  IPokemonDetails,
  useGetPokemonDetails,
} from "../hooks/useGetPokemonDetails";
import PokemonCard from "./card/PokemonCard";
import ErrorState from "./ErrorState";
import LoadingState from "./LoadingState";

const SearchBy = ({ searchTerm }: { searchTerm: string }) => {
  const { pokemonDetails, isLoading, isError } =
    useGetPokemonDetails(searchTerm);

  const renderPokemonCard = ({
    pokemonDetails,
    isLoading,
    isError,
  }: {
    pokemonDetails?: IPokemonDetails;
    isLoading: boolean;
    isError: boolean;
  }) => {
    if (isLoading) return <LoadingState />;
    if (isError) return <ErrorState />;
    if (!pokemonDetails) return <ErrorState />;

    return (
      <PokemonCard key={pokemonDetails.id} pokemonDetails={pokemonDetails} />
    );
  };

  return (
    <div className="all-pokemons mt-10 flex flex-col items-center h-[500px] ">
      {renderPokemonCard({ pokemonDetails, isLoading, isError })}
    </div>
  );
};

export default SearchBy;
