export async function getPokemons() {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=100");
  const data = await res.json();
  return data.results;
}
export async function getPokemon(id){
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
  const data = await res.json();
  return data;
}

