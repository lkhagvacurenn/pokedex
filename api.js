export async function getPokemons() {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=10");
  const data = await res.json();

  for (const p of data.results) {
    const pokemonRes = await fetch(p.url);
    const pokemonData = await pokemonRes.json();

    console.log({
      id: pokemonData.id,
      name: pokemonData.name,
      image: pokemonData.sprites.front_default,
      types: pokemonData.types.map(t => t.type.name),
      abilities: pokemonData.abilities.map(a => a.ability.name)
    });
  }
}


