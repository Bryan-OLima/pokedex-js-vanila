const pokeId = new URLSearchParams(window.location.search).get('id');
const pokemonUrl2 = `https://pokeapi.co/api/v2/pokemon/`;
const pokeList = document.querySelector('.pokemons');
const loadMoreBtn = document.querySelector('#loadMoreBtn');
const limit = 20;
let offset = 0;

function loadPokemons(offset, limit){
    pokeApi
        .getPokemons(offset, limit)
        .then((pokemonList = []) => {
        const list = pokemonList.map((pokemon) => `             
            <li class="pokemon ${pokemon.type}" onclick="pokeInfo('${pokemon.number}')" data-toggle="modal" data-target="#${pokemon.name}">
                <span class="number">
                    #${pokemon.number}
                </span>
                <span class="name">
                    ${pokemon.name}
                </span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.img}" alt="${pokemon.name}">
                </div>
            

            </li>
            <div class="modal fade" id="${pokemon.name}">
            </div>
            `
        ).join('');

        pokeList.innerHTML += list;
    });
}

function pokeInfo(id) {

    function getPokemon() {
        fetch(`${pokemonUrl2}${id}`)
        .then((res) => res.json())
        .then((pokemonInfos) => getPokemonDetails(pokemonInfos))
        .then((pokemon) => { 
            const pokemonDetailed = document.querySelector(`#${pokemon.name}`);
            const poke = `

            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <!-- Modal Header -->
                    <div class="${pokemon.type} modal-header">
                        <h4 class="modal-title">Modal Heading</h4>
                        <button type="button" class="close" data-dismiss="#${pokemon.id}" onclick="location.reload()">&times;</button>
                    </div>
                    
                    <!-- Modal body -->
                    <div class="modal-body">
                        ${pokemon.name}
                    </div>
                    
                    <!-- Modal footer -->
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="${pokemon.name}" onclick="location.reload()">Back to Home</button>
                    </div>
                </div>
            </div>

        `;

    pokemonDetailed.innerHTML += poke
})
        .catch()
    }

    getPokemon();
}

function getPokemonDetails(pokemonInfos) {
    const pokemon = new UniquePokemon();

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

loadPokemons(offset, limit);

loadMoreBtn.addEventListener('click', () => {
    offset += limit;
    loadPokemons(offset, limit);
})