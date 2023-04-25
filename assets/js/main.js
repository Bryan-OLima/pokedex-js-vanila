const pokeList = document.querySelector('.pokemons');
const loadMoreBtn = document.querySelector('#loadMoreBtn');
const limit = 20;
let offset = 0;

// const maxRecords = 151;

function loadPokemons(offset, limit){
    pokeApi
        .getPokemons(offset, limit)
        .then((pokemonList = []) => {
        const list = pokemonList.map((pokemon) => `             
            <li class="pokemon ${pokemon.type}">
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
            </li>`
        ).join('');

        pokeList.innerHTML += list;
    });
}

loadPokemons(offset, limit);

loadMoreBtn.addEventListener('click', () => {
    offset += limit;
    loadPokemons(offset, limit);
    // const recordsToNextPage = offset + limit;

    // if(recordsToNextPage >= maxRecords) {
    //     const warnLimit = maxRecords - offset;
    //     loadPokemons(offset, warnLimit);

    //     loadMoreBtn.parentElement.removeChild(loadMoreBtn);
    //     return
    // }
    
    // loadPokemons(offset, limit);
})