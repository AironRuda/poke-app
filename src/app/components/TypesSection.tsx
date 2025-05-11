"use client";

import { useState } from "react";
import { IPokemonType } from "../utils/typesMap";
import FilterTypeBadgeOption from "./FilterTypeBadgeOption";

const TypesSection = ({
  typeSelected,
  setTypeSelected,
  pokemonTypesMap,
}: {
  typeSelected: string;
  setTypeSelected: (type: string) => void;
  pokemonTypesMap: IPokemonType[];
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleTypeSelected = (type: string) => {
    if (typeSelected === type) return setTypeSelected("");
    return setTypeSelected(type);
  };

  return (
    <>
      <button
        className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/80 transition-all duration-300"
        onClick={() => setIsVisible(!isVisible)}
      >
        {isVisible ? "Hide types" : "Show types"}
      </button>
      {isVisible && (
        <section className="badge-types mt-5">
          <ul>
            {pokemonTypesMap.map((badgeInfo) => {
              return (
                <FilterTypeBadgeOption
                  isSelected={typeSelected === badgeInfo.id}
                  badgeInfo={badgeInfo}
                  key={badgeInfo.id}
                  onClick={() => {
                    handleTypeSelected(badgeInfo.id);
                  }}
                />
              );
            })}
          </ul>
        </section>
      )}
    </>
  );
};

export default TypesSection;
