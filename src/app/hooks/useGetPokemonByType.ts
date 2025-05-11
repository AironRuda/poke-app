import { AxiosRepository } from "@/api/axios/AxiosRepository";
import { useQuery } from "@tanstack/react-query";

const api = new AxiosRepository();

interface IPokemon {
  name: string;
  url: string;
}

interface IPokemonByType {
  pokemonList: IPokemon[];
}

interface IPokemonDTO {
  name: string;
  url: string;
}

interface IPokemonByTypeDTO {
  pokemon: IPokemonDTO;
}

interface IPokemonByTypeResponseDTO {
  pokemon: IPokemonByTypeDTO[];
}

const pokemonByTypeResponseAdapter = (
  pokemonByTypeResponseDTO: IPokemonByTypeResponseDTO
): IPokemonByType => {
  return {
    pokemonList: pokemonByTypeResponseDTO.pokemon.map(
      (pokemon) => pokemon.pokemon
    ),
  };
};

async function getPokemonByType(typeId: string): Promise<IPokemonByType> {
  try {
    const response = await api.Get<IPokemonByTypeResponseDTO>(
      `/type/${typeId}`
    );

    return pokemonByTypeResponseAdapter(response);
  } catch (error) {
    console.log("error", error);
    throw new Error("Error fetching pokemon by type");
  }
}

export const useGetPokemonByType = (typeId: string) => {
  const query = useQuery({
    queryKey: ["get-pokemon-by-type", typeId],
    queryFn: () => getPokemonByType(typeId),
  });
  return {
    pokemonByType: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
  };
};
