const pokeApi = {}
// const pokeId = new URLSearchParams(window.location.search).get('id');
const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/`;
const pokeInfos = document.querySelector('.pokemon');

function pokeApiToPokemon(pokeDetail) {
    const pokemon = new Pokemon();

    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;

    const types = pokeDetail.types.map((e) => e.type.name);
    const [type] = types;

    pokemon.type = type;
    pokemon.types = types;
    pokemon.img = pokeDetail.sprites.other.dream_world.front_default;

    return pokemon;
}

pokeApi.getPokemonDetails = (pokemon) => {
    return fetch(pokemon.url)
        .then((res) => res.json())
        .then((e) => pokeApiToPokemon(e));
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const URL = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(URL)
        .then((response) => response.json())
        .then((json) => json.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetails))
        .then((detailReq) => Promise.all(detailReq))
        .then((pokeDetails) => pokeDetails)
        .catch((error) => {
            console.error(error);
        });
}

pokeApi.getDetailedPokemons = (pokemon) => {
    return fetch(pokemon.url)
    .then((res) => res.json())
    .then((e) => pokeApiToPokemon(e));
}

pokeApi.getPokemonById = (pokemonId) => {

}


function getPokemonDetails(pokemonInfos) {
    const pokemon = new UniquePokemon();
    // Pokemon Details
    pokemon.id = pokemonInfos.id;
    pokemon.name = pokemonInfos.name;
    pokemon.type = pokemonInfos.types[0].type.name;
    pokemon.specie = pokemonInfos.species;
    pokemon.height = pokemonInfos.height;
    pokemon.weight = pokemonInfos.weight;
    pokemon.abilities = pokemonInfos.abilities.map((e) => e.ability.name).join(`<br>`);

    pokemon.img = pokemonInfos.sprites.other.dream_world.front_default;

    pokemon.status = pokemonInfos.stats.map((e) => e);
    pokemon.hp = pokemon.status[0].base_stat;
    pokemon.attack = pokemon.status[1].base_stat;
    pokemon.deffense = pokemon.status[2].base_stat;
    pokemon.spAttack = pokemon.status[3].base_stat;
    pokemon.spDeffense = pokemon.status[4].base_stat;
    pokemon.speed = pokemon.status[5].base_stat;

    return pokemon;
}

function printPokemonPage(pokemon) {

    const printPokemon = `
        <p class="pokemon-name">
            Name: ${pokemon.name}

            <ul>
                <li>
                    Tipo: ${pokemon.type}
                </li>

                <li>
                    Height: ${pokemon.height}
                </li>

                <li>
                    Weight: ${pokemon.weight}
                </li>

                <li>
                    Abilities: <br> ${pokemon.abilities}
                </li>

                <li>       
                    Hp: ${pokemon.hp}
                </li>

                <li>
                    Attack: ${pokemon.attack}
                </li>

                <li>
                    Deffense: ${pokemon.deffense}
                </li>

                <li>
                    Special Attack: ${pokemon.spAttack}
                </li>

                <li>
                    Special Deffense: ${pokemon.spDeffense}
                </li>

                <li>
                    Speed: ${pokemon.speed}
                </li>
            </ul>
        </p>
    `;
    return pokeInfos.innerHTML = printPokemon;     
}
