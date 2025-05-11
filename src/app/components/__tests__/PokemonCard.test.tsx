import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import PokemonCard from "../card/PokemonCard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CapturedPokemonProvider } from "@/app/context/CapuredPokemonContext";
import { act } from "react";

// Mock del hook useGetPokemonDetails
jest.mock("../../hooks/useGetPokemonDetails", () => ({
  useGetPokemonDetails: () => ({
    pokemonDetails: {
      id: 1,
      name: "Pikachu",
      image: "/pikachu.png",
      types: ["electric"],
    },
    isLoading: false,
    isError: false,
  }),
}));

describe("PokemonCard", () => {
  const mockPokemonDetails = {
    id: 1,
    name: "Pikachu",
    image: "/pikachu.png",
    types: ["electric"],
  };

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
    },
  });

  const renderWithProviders = (component: React.ReactNode) => {
    return render(
      <QueryClientProvider client={queryClient}>
        <CapturedPokemonProvider>{component}</CapturedPokemonProvider>
      </QueryClientProvider>
    );
  };

  beforeEach(() => {
    localStorage.clear();
    queryClient.clear();
  });

  describe("Given a Pokemon card with Pikachu details", () => {
    it("should display the correct information", () => {
      // Given
      renderWithProviders(<PokemonCard pokemonDetails={mockPokemonDetails} />);

      // Then
      expect(screen.getByText("Pikachu")).toBeInTheDocument();
      expect(screen.getByText("1")).toBeInTheDocument();
      expect(screen.getByAltText("Pikachu")).toHaveAttribute(
        "src",
        "/pikachu.png"
      );
    });

    it("should change pokeball to red when captured", async () => {
      // Given
      const user = userEvent.setup();
      renderWithProviders(<PokemonCard pokemonDetails={mockPokemonDetails} />);
      const captureButton = screen.getByRole("button");
      const pokeball = screen.getByAltText("pokeball");

      // When
      expect(pokeball).toHaveAttribute("src", "/white-pokeball.png");
      await act(async () => {
        await user.click(captureButton);
      });

      // Then
      await waitFor(
        () => {
          expect(pokeball).toHaveAttribute("src", "/red-pokeball.png");
        },
        { timeout: 1000 }
      );
    });

    it("should change pokeball to white when released", async () => {
      // Given
      const user = userEvent.setup();
      renderWithProviders(<PokemonCard pokemonDetails={mockPokemonDetails} />);
      const captureButton = screen.getByRole("button");
      const pokeball = screen.getByAltText("pokeball");

      // When - Capture
      await act(async () => {
        await user.click(captureButton);
      });

      // Then - Verify capture
      await waitFor(
        () => {
          expect(pokeball).toHaveAttribute("src", "/red-pokeball.png");
        },
        { timeout: 1000 }
      );

      // When - Release
      await act(async () => {
        await user.click(captureButton);
      });

      // Then - Verify release
      await waitFor(
        () => {
          expect(pokeball).toHaveAttribute("src", "/white-pokeball.png");
        },
        { timeout: 1000 }
      );
    });

    it("should have the correct background color for electric type", () => {
      // Given
      renderWithProviders(<PokemonCard pokemonDetails={mockPokemonDetails} />);

      // Then
      const card = screen.getByRole("listitem");
      expect(card).toHaveClass("bg-electric");
    });
  });
});
