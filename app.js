import { getPokemons, getPokemon} from "./api.js";
import { getBackgroundColor,getAbilityColor} from "./pokemonColor.js";

getPokemons();

const filterMenu = document.querySelector('.filterMenu');
const filterBtn = document.getElementById('filterBtn');
const closeFiltersBtn = document.getElementById('close-filters');
const resetFiltersBtn = document.getElementById('reset-filters');
const pokemonContainer = document.getElementById('pokemonContainer');
const sortSelect = document.getElementById('sort');
const typeFilterContainer = document.getElementById('filter-options');
const applyFiltersBtn = document.getElementById('apply-filters');
const searchInput = document.getElementById('search-input');
const searchBox = document.getElementById('searchbox');

searchBox.addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = searchInput.value.toLowerCase().trim();
    try{
        const allPokemons = await getPokemons();
        const filteredPokemons = [];
        for (const pokemon of allPokemons) {
            const pokemonRes = await fetch(pokemon.url);
            const pokemonData = await pokemonRes.json();      
            if(pokemonData.name.includes(query) || String(pokemonData.id) === query || pokemonData.types.some(t => t.type.name === query)){
                filteredPokemons.push(pokemon);
            } 
        }
        if(filteredPokemons.length === 0){
            pokemonContainer.innerHTML = `
            <div class="no-results">
            <svg width="127" height="128" viewBox="0 0 127 128" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="63.4649" cy="64" r="27.7022" fill="#212121" fill-opacity="0.16"/>
            <path d="M126.929 55.6895C122.855 24.2695 95.9937 0 63.4639 0C30.9342 0.000152588 4.07418 24.2697 0 55.6895H23.3682C27.2087 37.063 43.7013 23.0587 63.4648 23.0586C83.2284 23.0588 99.7211 37.0631 103.562 55.6895H126.929ZM63.4639 128C95.9937 128 122.855 103.731 126.929 72.3105H103.562C99.7211 90.937 83.2284 104.941 63.4648 104.941C43.7012 104.941 27.2087 90.937 23.3682 72.3105H0C4.07411 103.73 30.9342 128 63.4639 128Z" fill="#FF5858"/>
            </svg>
            <p>No pokémon matched your search!</p>
            </div>
            `;
            return;
        }
        displayPokemons(() => Promise.resolve(filteredPokemons));
    }catch(error){
        console.error("Error fetching pokemons for search:", error);
    }
});




function renderTypeOptions(types) {
  // dedupe
  typeFilterContainer.innerHTML = `<h3>Type</h3>`; // reset content
  const unique = [...new Set(types)].sort();
  for (const type of unique) {

    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
      <input type="checkbox" id="type-${type}" name="type" value="${type}">
      <label for="type-${type}">${type}</label>
    `;
    typeFilterContainer.appendChild(wrapper);
  }
}

resetFiltersBtn.addEventListener('click', () => {
    const checkboxes = filterMenu.querySelectorAll('input[type="checkbox"]');

    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
});



applyFiltersBtn.addEventListener('click', async () => {
    const selectedTypes = [];
    const checkboxes = filterMenu.querySelectorAll('input[type="checkbox"]');

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selectedTypes.push(checkbox.value);
        }
    });
    try{
        const allPokemons = await getPokemons();
        const filteredPokemons = [];

        for (const pokemon of allPokemons) {
            const pokemonRes = await fetch(pokemon.url);
            const pokemonData = await pokemonRes.json();
            const types = pokemonData.types.map(t => t.type.name);
            if (selectedTypes.some(type => types.includes(type))) {
                filteredPokemons.push(pokemon);
            }
        }
        console.log("Filtered Pokemons:", filteredPokemons);
        filterMenu.classList.toggle('active');
        displayPokemons(() => Promise.resolve(filteredPokemons));
    }
    catch(error){
        console.error("Error fetching pokemons:", error);
    }
});





closeFiltersBtn.addEventListener('click', () => {
    filterMenu.classList.toggle('active');
});


// when mouse leaves
filterMenu.addEventListener('mouseleave', () => {
    filterMenu.classList.remove('active');
});





filterBtn.addEventListener('click', () => {
    filterMenu.classList.toggle('active');
});





async function displayPokemons(callback) {
    pokemonContainer.innerHTML = '';
    // Fetch and display pokemons based on filters
    try{
        const pokemons = await callback();
        const types = [];
        for (const p of pokemons){
            const pokemonRes = await fetch(p.url);
            const pokemonData = await pokemonRes.json();
            types.push(...pokemonData.types.map(t => t.type.name));
            const div = document.createElement('div');
            div.classList.add('pokemon-card');
            div.id = `pokemon-${pokemonData.id}`;
            div.style.backgroundColor = getBackgroundColor(pokemonData.types[0].type.name);
            const formattedId = String(pokemonData.id).padStart(3, '0');
            const typeList = pokemonData.types.map(t => `
                <button id="typeBtn-${formattedId}-${t.type.name}" style="background-color: ${getAbilityColor(t.type.name)}">
                <img src="/svg/${t.type.name}.svg" alt="${t.type.name} icon"> 
                <span>${t.type.name}</span>
            </button>`).join(' ');
            div.innerHTML = `
                <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
                <h3>${pokemonData.name}</h3>
                <p>#${formattedId}</p>
                <svg width="98" height="109" viewBox="0 0 98 109" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M97.2012 68.0928C92.2194 29.6749 59.3766 0.000213623 19.6016 0C-20.1735 0.000106812 -53.0172 29.6748 -57.999 68.0928H-29.4258C-24.7296 45.3177 -4.5631 28.1943 19.6025 28.1943C43.7678 28.1947 63.9329 45.318 68.6289 68.0928H97.2012ZM19.6016 156.51C59.3768 156.51 92.2197 126.834 97.2012 88.416H68.6289C63.9332 111.191 43.7681 128.315 19.6025 128.315C-4.5634 128.315 -24.7299 111.192 -29.4258 88.416H-57.999C-53.0176 126.834 -20.1738 156.51 19.6016 156.51Z" fill="white" fill-opacity="0.16"/>
                </svg>
                <div class="typeList">${typeList}</div>
                
            `;
            pokemonContainer.appendChild(div);
        }
        renderTypeOptions(types);
    }catch(error){
        console.error("Error fetching pokemons:", error);
    }
}

displayPokemons(getPokemons);




sortSelect.addEventListener('change', async e => {
    try{
        var pokemons = await getPokemons();
        console.log(pokemons);
        const value = e.target.value;
        if (value === 'number-desc') pokemons.reverse();
        else if (value === 'name-asc') pokemons.sort((a, b) => a.name.localeCompare(b.name));
        else if (value === 'name-desc') pokemons.sort((a, b) => b.name.localeCompare(a.name));
        displayPokemons(() => Promise.resolve(pokemons));
    }catch(error){
        console.error("Error fetching pokemons for sorting:", error);
    }
  });









  async function renderMoreInfo(id) {
    try{
        const pokemon = await getPokemon(id);
        const moreInfoDiv = document.createElement('div');
        moreInfoDiv.classList.add('more-info');
        moreInfoDiv.classList.toggle('active');
        moreInfoDiv.style.backgroundColor = getBackgroundColor(pokemon.types[0].type.name);
        const formattedId = String(pokemon.id).padStart(3, '0');
        const typeList = pokemon.types.map(t => `
                <button id="typeBtn-${formattedId}-${t.type.name}" style="background-color: ${getAbilityColor(t.type.name)}">
                <img src="/svg/${t.type.name}.svg" alt="${t.type.name} icon"> 
                <span>${t.type.name}</span>
            </button>`).join(' ');

        moreInfoDiv.innerHTML = `
            <svg id = "moreInfoCloseBtn" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.70679 16.707C9.51926 16.8944 9.26495 16.9998 8.99979 16.9998C8.73462 16.9998 8.48031 16.8944 8.29279 16.707L2.29279 10.707C2.10532 10.5194 2 10.2651 2 9.99997C2 9.73481 2.10532 9.4805 2.29279 9.29297L8.29279 3.29297C8.48139 3.11081 8.73399 3.01002 8.99619 3.01229C9.25838 3.01457 9.5092 3.11974 9.6946 3.30515C9.88001 3.49056 9.98518 3.74137 9.98746 4.00357C9.98974 4.26577 9.88894 4.51837 9.70679 4.70697L5.41379 8.99997H16.9998C17.265 8.99997 17.5194 9.10533 17.7069 9.29286C17.8944 9.4804 17.9998 9.73475 17.9998 9.99997C17.9998 10.2652 17.8944 10.5195 17.7069 10.7071C17.5194 10.8946 17.265 11 16.9998 11H5.41379L9.70679 15.293C9.89426 15.4805 9.99957 15.7348 9.99957 16C9.99957 16.2651 9.89426 16.5194 9.70679 16.707Z" fill="white"/>
            </svg>
            <div class = "moreInfoHeader" >
                <img src="${pokemon.sprites.front_default}" alt="pokemon.name">
                <div>
                    <p>#${formattedId}</p>
                    <h2>${pokemon.name}</h2>
                    <div class="typeList">${typeList}</div>
                </div>
            </div>
            <div class="moreInfoContent">
                <div class="moreInfoBtnContainer">
                    <button class = "moreInfoBtn active" id="aboutBtn">About</button>
                    <button class = "moreInfoBtn" id="statsBtn">Base stats</button>
                    <button class = "moreInfoBtn" id="evolutionBtn">Evolution</button>
                </div>
                <div class="moreInfoMainContainer">
                    <li>Species <span>types are here</span></li>
                    <li>Height <span>${pokemon.height}</span></li>
                    <li>Weight <span>${pokemon.width}</span></li>
                    <li>Abilities <span>ab</span></li>
                </div>
            </div>
        `
        pokemonContainer.appendChild(moreInfoDiv);

        const closeBtn = moreInfoDiv.querySelector("#moreInfoCloseBtn");
        closeBtn.addEventListener("click", () => {
        moreInfoDiv.classList.remove("active");
        });

    } catch(error){
        console.log("Error fetching pokemon", error)
    }
  };

  

  


  pokemonContainer.addEventListener('click', async (e) => {
    const pokemonCard = e.target.closest('.pokemon-card');
    if(pokemonCard){
        const pokemonId = e.target.closest('.pokemon-card')?.id.split('-').pop();
        renderMoreInfo(pokemonId);
    }
});

