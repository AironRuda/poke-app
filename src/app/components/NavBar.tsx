"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const pathname = usePathname();

  return (
    <header className="bg-primary">
      <nav>
        <ul className="flex justify-between items-center p-4 font-black">
          <li
            className={`nav-link ${
              pathname === "/" ? "bg-secondary" : "bg-primary"
            }`}
          >
            <Link className="flex items-center gap-2" href="/">
              <img
                src="/pokedex.png"
                alt="pokeball"
                style={{ width: "20px", height: "20px" }}
              />
              <p>Pokedex</p>
            </Link>
          </li>

          <li>
            <ul className="flex flex-row items-center gap-2">
              <li
                className={`nav-link ${
                  pathname === "/filter-by-type" ? "bg-secondary" : "bg-primary"
                }`}
              >
                <Link
                  className="flex items-center justify-center gap-2"
                  href="/filter-by-type"
                >
                  <img
                    src="/white-pokeball.png"
                    alt="white-pokeball"
                    style={{ width: "20px", height: "20px" }}
                  />
                  Pokemons By Type
                </Link>
              </li>
              <li
                className={`nav-link ${
                  pathname === "/captured-pokemon"
                    ? "bg-secondary"
                    : "bg-primary"
                }`}
              >
                <Link
                  className="flex items-center justify-center gap-2"
                  href="/captured-pokemon"
                >
                  <img
                    src="/red-pokeball.png"
                    alt="pokeball"
                    style={{ width: "20px", height: "20px" }}
                  />
                  Captured Pokémon
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
