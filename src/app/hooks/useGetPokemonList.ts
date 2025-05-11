import { useQuery } from "@tanstack/react-query";
import { AxiosRepository } from "@/api/axios/AxiosRepository";

const api = new AxiosRepository();

interface IPokemon {
  name: string;
  url: string;
}

interface IPokemonListResponse {
  count: number;
  next: string;
  previous: string;
  pokemonList: IPokemon[];
}

interface IPokemonDTO {
  name: string;
  url: string;
}

interface IPokemonListResponseDTO {
  count: number;
  next: string;
  previous: string;
  results: IPokemonDTO[];
}

const pokemonListResponseAdapter = (
  pokemonListResponseDTO: IPokemonListResponseDTO
): IPokemonListResponse => {
  return {
    count: pokemonListResponseDTO.count,
    next: pokemonListResponseDTO.next,
    previous: pokemonListResponseDTO.previous,
    pokemonList: pokemonListResponseDTO.results.map((pokemon) => ({
      name: pokemon.name,
      url: pokemon.url,
    })),
  };
};

async function getPokemonList(
  pagination: string
): Promise<IPokemonListResponse> {
  try {
    console.log("pagination", pagination);
    const response = await api.Get<IPokemonListResponseDTO>(
      `/pokemon${pagination}`
    );
    console.log("response", response);
    return pokemonListResponseAdapter(response);
  } catch (error) {
    throw new Error("Error fetching pokemon list");
  }
}

export const useGetPokemonList = (pagination: string) => {
  const query = useQuery({
    queryKey: ["get-pokemons", pagination],
    queryFn: () => getPokemonList(pagination),
  });
  return {
    pokemonsListResponse: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
  };
};
