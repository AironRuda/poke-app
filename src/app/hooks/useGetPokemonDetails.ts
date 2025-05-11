import { AxiosRepository } from "@/api/axios/AxiosRepository";
import { useQuery } from "@tanstack/react-query";

const api = new AxiosRepository();

export interface IPokemonDetails {
  id: number;
  name: string;
  image: string;
  types: string[];
}

export interface IPokemonDetailsDTO {
  id: number;
  name: string;
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  types: ITypesDTO[];
}

interface ITypesDTO {
  type: { name: string };
}

export const pokemonDetailsAdapter = (
  pokemonDetailsDTO: IPokemonDetailsDTO
): IPokemonDetails => {
  return {
    id: pokemonDetailsDTO.id,
    name: pokemonDetailsDTO.name,
    image: pokemonDetailsDTO.sprites.other["official-artwork"].front_default,
    types: pokemonDetailsDTO.types.map((type) => type.type.name),
  };
};

async function getPokemonDetails(id: string): Promise<IPokemonDetails> {
  try {
    const response = await api.Get<IPokemonDetailsDTO>(`/pokemon/${id}`);
    return pokemonDetailsAdapter(response);
  } catch (error) {
    console.log("error", error);
    throw new Error("Error fetching pokemon details");
  }
}

export const useGetPokemonDetails = (id: string) => {
  const query = useQuery({
    queryKey: ["get-pokemon-details", id],
    queryFn: () => getPokemonDetails(id),
  });
  return {
    pokemonDetails: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
  };
};
