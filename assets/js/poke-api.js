const pokeApi = {}

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