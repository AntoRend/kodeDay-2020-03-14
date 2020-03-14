async function getAllCharacters() {
    let page = Math.round(Math.random()*24)
    const response = await (fetch(`https://rickandmortyapi.com/api/character/?page= ${page}`));
    const parsedJson = await response.json()
    return parsedJson.results

}

async function getCharactersById(id) {
    const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`)
    const parsedJson = await response.json()
    return parsedJson
}

export default{
    getAllCharacters,
    getCharactersById
}