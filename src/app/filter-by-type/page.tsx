"use client";

import { useMemo, useState } from "react";
import { extractPokemonId } from "../utils/stringsCutter";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import NotResultFound from "../components/NoResultFound";
import PokemonList from "../components/PokemonList";
import { useGetPokemonByType } from "../hooks/useGetPokemonByType";
import TypesSection from "../components/TypesSection";
import { pokemonTypesMap } from "../utils/typesMap";

const FilterByType = () => {
  const [typeSelected, setTypeSelected] = useState<string>("");

  const { pokemonByType, isLoading, isError } =
    useGetPokemonByType(typeSelected);

  const pokemonIdsList = useMemo(() => {
    if (!pokemonByType?.pokemonList) return [];
    return pokemonByType.pokemonList.map((pokemon) =>
      extractPokemonId(pokemon.url)
    );
  }, [pokemonByType]);

  const renderContent = () => {
    if (!typeSelected) return null;
    if (isLoading) return <LoadingState />;
    if (isError) return <ErrorState />;
    if (!pokemonByType?.pokemonList?.length) return <NotResultFound />;

    return <PokemonList pokemonIdsList={pokemonIdsList} />;
  };

  return (
    <section className="wrapper">
      <h1>Pokemons By Type</h1>
      <TypesSection
        typeSelected={typeSelected}
        setTypeSelected={setTypeSelected}
        pokemonTypesMap={pokemonTypesMap}
      />
      <div className="all-pokemons">{renderContent()}</div>
    </section>
  );
};

export default FilterByType;
