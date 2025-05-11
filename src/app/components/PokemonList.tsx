"use client";

import { useEffect, useRef, useState } from "react";
import NotResultFound from "./NoResultFound";
import LoadingCard from "./card/LoadingCard";
import ErrorCard from "./card/ErrorCard";
import PokemonCard from "./card/PokemonCard";
import { useGetPokemonDetails } from "../hooks/useGetPokemonDetails";

const ITEMS_PER_PAGE = 12;

const PokemonList = ({ pokemonIdsList }: { pokemonIdsList: string[] }) => {
  const [visibleItems, setVisibleItems] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVisibleItems(pokemonIdsList.slice(0, ITEMS_PER_PAGE));
    setPage(1);
  }, [pokemonIdsList]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const nextPage = page + 1;
          const nextItems = pokemonIdsList.slice(0, nextPage * ITEMS_PER_PAGE);
          if (nextItems.length > visibleItems.length) {
            setVisibleItems(nextItems);
            setPage(nextPage);
          }
        }
      },
      { threshold: 0.1 }
    );

    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }

    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [page, pokemonIdsList, visibleItems.length]);

  const PokemonCardWrapper = ({ id }: { id: string }) => {
    const { pokemonDetails, isLoading, isError } = useGetPokemonDetails(id);

    if (isLoading) return <LoadingCard />;
    if (isError) return <ErrorCard />;
    if (!pokemonDetails) return <NotResultFound />;

    return <PokemonCard pokemonDetails={pokemonDetails} />;
  };

  return (
    <section className="all-pokemons">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {visibleItems.map((id) => (
          <PokemonCardWrapper key={id} id={id} />
        ))}
      </ul>
      {visibleItems.length < pokemonIdsList.length && (
        <div ref={loadingRef} className="h-10 w-full" />
      )}
    </section>
  );
};

export default PokemonList;
