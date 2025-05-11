export function extractQueryParams(url: string): string {
  if (!url || typeof url !== "string") {
    return "";
  }
  const queryIndex = url.indexOf("?");
  return queryIndex !== -1 ? url.substring(queryIndex) : "";
}

export function extractPokemonId(url: string): string {
  if (!url || typeof url !== "string") {
    return "";
  }
  const parts = url.split("/").filter(Boolean);
  if (parts.length === 0) {
    return "";
  }
  const id = parts[parts.length - 1];
  return id;
}
