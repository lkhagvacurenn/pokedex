export async function getPokemons() {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=20");
  const data = await res.json();
  return data.results;
}


