"use client";

import { useState } from "react";
import { useDebounce } from "./utils/hooks/useDebounce";
import Search from "./components/Search";
import PokemonTable from "./components/PokemonTable";
import SearchBy from "./components/SearchBy";

const PokemonsView = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearch = useDebounce(searchTerm, 400);

  return (
    <div className="wrapper">
      <header className="banner">
        <img className="w-80" src="/imagen-pokemon-png.png" alt="hero-banner" />
        <h1>
          Discover
          <span className="text-gradient"> Pokémon </span>
          you&apos;ll love, no grinding, just fun
        </h1>
      </header>
      <Search search={searchTerm} setSearch={setSearchTerm} />
      {!searchTerm ? (
        <PokemonTable />
      ) : (
        <SearchBy searchTerm={debouncedSearch} />
      )}
    </div>
  );
};

export default PokemonsView;
