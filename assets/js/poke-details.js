const pokeId = new URLSearchParams(window.location.search).get('id');
const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokeId}`;
const pokeInfos = document.querySelector('.pokemon');

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

function getPokemon() {
    fetch(pokemonUrl)
    .then((res) => res.json())
    .then((pokemonInfos) => getPokemonDetails(pokemonInfos))
    .then((pokemon) => printPokemonPage(pokemon))
    .catch()
    .finally();
}

getPokemon();

console.log(pokeId);
console.log(pokemonUrl);

module.exports = {getPokemon}