"use client";

import { useState } from "react";

const Search = ({
  search,
  setSearch,
}: {
  search: string;
  setSearch: (search: string) => void;
}) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div className={`search ${isFocused ? "outline-2 outline-primary" : ""}`}>
      <div>
        <img src="/search.svg" alt="search-icon" />
        <input
          type="text"
          placeholder="Search pokemon"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>
    </div>
  );
};

export default Search;
