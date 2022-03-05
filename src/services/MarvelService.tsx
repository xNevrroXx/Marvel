


class MarvelService {
    private _apiBase = "https://gateway.marvel.com:443/v1/public/";
    private _apiKey = "apikey=890c5cf83c64ce517e983bfad999b508";

    getResource = async (url: string) => {
        const result = await fetch(url);

        if(!result.ok) {
            console.log(`Could not fetch ${url} with status ${result.status}`);
        }

        return result.json();
    }

    getAllCharacters = (limit = 9, offset = 210) => {
        return this.getResource(`${this._apiBase}characters?limit=${limit}&offset=${offset}&${this._apiKey}`);
    }

    getCharacter = (id: number) => {
        return this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`)
    }

    getAllComics = () => {

    }
}

export default MarvelService; 