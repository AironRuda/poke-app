"use client";
import PokemonList from "../components/PokemonList";
import { useCapturedPokemonContext } from "../context/CapuredPokemonContext";

const CapturedPokemonView = () => {
  const { capturedPokemons } = useCapturedPokemonContext();

  return (
    <section className="wrapper">
      <div className="all-pokemons">
        <h1>Captured Pokemons</h1>
        <PokemonList pokemonIdsList={capturedPokemons} />
      </div>
    </section>
  );
};

export default CapturedPokemonView;
