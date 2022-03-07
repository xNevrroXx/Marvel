import { Character } from "../components/types/types";



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

    getAllCharacters = async (limit = 9, offset = 210) => {
        const result = await this.getResource(`${this._apiBase}characters?limit=${limit}&offset=${offset}&${this._apiKey}`);
        return result.data.results.map(char => this._transformCharacter(char));
    }

    getCharacter = async (id: number) => {
        const result = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(result.data.results[0]);
    }

    _transformCharacter = (char): Character => {
        return {
            name: char.name,
            id: char.id,
            description: char.description,
            thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comicsList: char.comics.items,
        }
    }

    getAllComics = () => {

    }


}

export default MarvelService; 