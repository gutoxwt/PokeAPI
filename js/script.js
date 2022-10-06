const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number')
const pokemonImage = document.querySelector('.pokemon_image')

const form = document.querySelector('.form')
const input = document.querySelector('.input_search')
const buttonPrev = document.querySelector('.btn-prev')
const buttonNext = document.querySelector('.btn-next')
const buttonShiny = document.querySelector('.btn-shiny')

let searchPokemon = 1;

let a = 13;

const fetchPokemon = async (pokemon) => {

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status == 200) {
              const data = await APIResponse.json(); // salvando o retorno da API em formato json
              return data;
    } 
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...'

    const data =  await fetchPokemon(pokemon);

    if (data) {
        pokemonImage.style.display = 'block'
        pokemonName.innerHTML = data.name; // Enviando para o campo 'pokemon_name' o valor name trazido pela função fetchPokemon
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        searchPokemon = data.id

        input.value = ''; // Limpando o input
   } else {

        pokemonImage.style.display = 'none'
        pokemonName.innerHTML = 'Not found'
        pokemonNumber.innerHTML = '';
   }

}

form.addEventListener('submit', (event) => {
        event.preventDefault();
        renderPokemon(input.value.toLowerCase())
});

buttonPrev.addEventListener('click', (event) => {
    if (searchPokemon > 1 ) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon)
    }
});

buttonNext.addEventListener('click', (event) => {
    searchPokemon += 1;
    renderPokemon(searchPokemon)
});

const renderPokemonShiny = async (pokemon) => {
    
    const data =  await fetchPokemon(pokemon);

    if (data) {
        pokemonImage.style.display = 'block'
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_shiny'];
        searchPokemon = data.id
        input.value = ''; // Limpando o input
   } else {
        pokemonImage.style.display = 'none'
   }

}

buttonShiny.addEventListener('click', (event) => {
    renderPokemonShiny(searchPokemon)
})

renderPokemon(searchPokemon)
