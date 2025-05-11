import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
  removeItem: jest.fn(),
  length: 0,
  key: jest.fn(),
};

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

// Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Suppress React 18 Strict Mode warnings
const originalError = console.error;
console.error = (...args) => {
  if (
    typeof args[0] === "string" &&
    (args[0].includes("Warning: ReactDOM.render is no longer supported") ||
      args[0].includes("Warning: ReactDOMTestUtils.act") ||
      args[0].includes("Warning: An update to") ||
      args[0].includes("Warning: React.createFactory()"))
  ) {
    return;
  }
  originalError.call(console, ...args);
};

// Add TextEncoder/TextDecoder for tests
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Suppress React 18 Strict Mode warnings
const originalWarn = console.warn;
console.warn = (...args) => {
  if (
    typeof args[0] === "string" &&
    (args[0].includes("Warning: ReactDOM.render is no longer supported") ||
      args[0].includes("Warning: ReactDOMTestUtils.act") ||
      args[0].includes("Warning: An update to") ||
      args[0].includes("Warning: React.createFactory()"))
  ) {
    return;
  }
  originalWarn.call(console, ...args);
};
