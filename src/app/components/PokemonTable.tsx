"use client";
import { useMemo, useState } from "react";
import { useGetPokemonList } from "../hooks/useGetPokemonList";
import { extractPokemonId } from "../utils/stringsCutter";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";
import NotResultFound from "./NoResultFound";
import PaginationComponent from "./PaginationComponent";
import PokemonList from "./PokemonList";

const PokemonTable = () => {
  const [pagination, setPagination] = useState("");

  const { pokemonsListResponse, isLoading, isError } =
    useGetPokemonList(pagination);

  const pokemonIdsList = useMemo(
    () =>
      pokemonsListResponse?.pokemonList.map((pokemon) =>
        extractPokemonId(pokemon.url)
      ),
    [pokemonsListResponse]
  );

  const renderContent = () => {
    if (isLoading) return <LoadingState />;
    if (isError) return <ErrorState />;
    if (pokemonsListResponse?.pokemonList?.length === 0)
      return <NotResultFound />;

    return (
      <>
        <PokemonList pokemonIdsList={pokemonIdsList || []} />
        <PaginationComponent
          previous={pokemonsListResponse?.previous || ""}
          next={pokemonsListResponse?.next || ""}
          setPagination={setPagination}
        />
      </>
    );
  };

  return renderContent();
};

export default PokemonTable;
