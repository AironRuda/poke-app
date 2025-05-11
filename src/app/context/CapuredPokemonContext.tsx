"use client";
import { createContext, useContext, useEffect, useState } from "react";

interface CapturedPokemonContextType {
  capturedPokemons: string[];
  addCapturedPokemon: (pokemonId: string) => void;
  removeCapturedPokemon: (pokemonId: string) => void;
  isCaptured: (pokemonId: string) => boolean;
}

const STORAGE_KEY = "capturedPokemons";

const CapturedPokemonContext = createContext<CapturedPokemonContextType>({
  capturedPokemons: [],
  addCapturedPokemon: () => {},
  removeCapturedPokemon: () => {},
  isCaptured: () => false,
});

export const useCapturedPokemonContext = () =>
  useContext(CapturedPokemonContext);

export const CapturedPokemonProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [capturedPokemons, setCapturedPokemons] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(capturedPokemons));
    } catch (error) {
      console.error("Error saving captured pokemons:", error);
    }
  }, [capturedPokemons]);

  const addCapturedPokemon = (pokemonId: string) => {
    setCapturedPokemons((prev) => {
      const newList = [...prev, pokemonId];
      return newList.sort((a, b) => parseInt(a) - parseInt(b));
    });
  };

  const removeCapturedPokemon = (pokemonId: string) => {
    setCapturedPokemons((prev) =>
      prev.filter((storedPokemonId) => storedPokemonId !== pokemonId)
    );
  };

  const isCaptured = (pokemonId: string) => {
    return capturedPokemons.includes(pokemonId);
  };

  const value = {
    capturedPokemons,
    addCapturedPokemon,
    removeCapturedPokemon,
    isCaptured,
  };

  return (
    <CapturedPokemonContext.Provider value={value}>
      {children}
    </CapturedPokemonContext.Provider>
  );
};
