import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
  CapturedPokemonProvider,
  useCapturedPokemonContext,
} from "../CapuredPokemonContext";
import { ReactNode } from "react";

// Mock de localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
  removeItem: jest.fn(),
  length: 0,
  key: jest.fn(),
};

Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage,
});

// Componente de prueba que usa el contexto
const TestComponent = () => {
  const {
    capturedPokemons,
    addCapturedPokemon,
    removeCapturedPokemon,
    isCaptured,
  } = useCapturedPokemonContext();

  return (
    <div>
      <div data-testid="captured-count">{capturedPokemons.length}</div>
      <button onClick={() => addCapturedPokemon("1")} data-testid="add-button">
        Add Pokemon
      </button>
      <button
        onClick={() => removeCapturedPokemon("1")}
        data-testid="remove-button"
      >
        Remove Pokemon
      </button>
      <div data-testid="is-captured">{isCaptured("1").toString()}</div>
    </div>
  );
};

const renderWithContext = (component: ReactNode) => {
  return render(<CapturedPokemonProvider>{component}</CapturedPokemonProvider>);
};

describe("CapturedPokemonContext", () => {
  beforeEach(() => {
    // Limpiar todos los mocks antes de cada test
    jest.clearAllMocks();
    mockLocalStorage.getItem.mockReturnValue(null);
    mockLocalStorage.setItem.mockImplementation((key, value) => {
      mockLocalStorage.getItem.mockReturnValue(value);
    });
  });

  describe("Given a fresh CapturedPokemonContext", () => {
    it("should start with an empty list of captured pokemons", () => {
      // Given
      mockLocalStorage.getItem.mockReturnValue(null);
      renderWithContext(<TestComponent />);

      // Then
      expect(screen.getByTestId("captured-count")).toHaveTextContent("0");
      expect(screen.getByTestId("is-captured")).toHaveTextContent("false");
    });

    it("should add a pokemon to the captured list", async () => {
      // Given
      mockLocalStorage.getItem.mockReturnValue(null);
      renderWithContext(<TestComponent />);
      const addButton = screen.getByTestId("add-button");

      // When
      await act(async () => {
        addButton.click();
      });

      // Then
      expect(screen.getByTestId("captured-count")).toHaveTextContent("1");
      expect(screen.getByTestId("is-captured")).toHaveTextContent("true");
    });

    it("should remove a pokemon from the captured list", async () => {
      // Given
      mockLocalStorage.getItem.mockReturnValue(null);
      renderWithContext(<TestComponent />);
      const addButton = screen.getByTestId("add-button");
      const removeButton = screen.getByTestId("remove-button");

      // When - Add Pokemon
      await act(async () => {
        addButton.click();
      });

      // Then - Verify Pokemon was added
      expect(screen.getByTestId("captured-count")).toHaveTextContent("1");
      expect(screen.getByTestId("is-captured")).toHaveTextContent("true");

      // When - Remove Pokemon
      await act(async () => {
        removeButton.click();
      });

      // Then - Verify Pokemon was removed
      expect(screen.getByTestId("captured-count")).toHaveTextContent("0");
      expect(screen.getByTestId("is-captured")).toHaveTextContent("false");
    });

    it("should persist captured pokemons in localStorage", async () => {
      // Given
      mockLocalStorage.getItem.mockReturnValue(null);
      renderWithContext(<TestComponent />);
      const addButton = screen.getByTestId("add-button");

      // When
      await act(async () => {
        addButton.click();
      });

      // Then
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        "capturedPokemons",
        JSON.stringify(["1"])
      );
    });

    it("should load captured pokemons from localStorage on initialization", () => {
      // Given
      const storedPokemons = ["1", "2"];
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(storedPokemons));

      // When
      renderWithContext(<TestComponent />);

      // Then
      expect(screen.getByTestId("captured-count")).toHaveTextContent("2");
      expect(screen.getByTestId("is-captured")).toHaveTextContent("true");
    });

    it("should handle multiple pokemons and maintain order", async () => {
      // Given
      mockLocalStorage.getItem.mockReturnValue(null);
      renderWithContext(<TestComponent />);
      const addButton = screen.getByTestId("add-button");

      // When - Add Pokemon
      await act(async () => {
        addButton.click();
      });

      // Then - Verify order is maintained
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        "capturedPokemons",
        JSON.stringify(["1"])
      );
    });
  });
});
