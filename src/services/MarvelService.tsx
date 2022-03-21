import { Character } from "../components/types/types";



class MarvelService {
    private _apiBase = "https://gateway.marvel.com:443/v1/public/";
    private _apiKey = "apikey=890c5cf83c64ce517e983bfad999b508";
    private _baseOffsetCharacters = 210;

    private _validateArguments = ( {limit = 100, offset = 0}: {limit?: number, offset?: number}) => {
        if(limit !== undefined && limit > 100)
            throw new Error("'limit' could not to be more than 100 or less than 1")

        if(offset > 1560 || offset < 0) 
            throw new Error("'offset' could not to be more than 1560 or less than 0")
    }

    getResource = async (url: string) => {
        const result = await fetch(url);

        if(!result.ok) {
            console.log(`Could not fetch ${url} with status ${result.status}`);
        }

        return result.json();
    }

    getAllCharacters = async (limit = 9, offset = this._baseOffsetCharacters) => {
        this._validateArguments({limit: limit, offset: offset})
        const result = await this.getResource(`${this._apiBase}characters?limit=${limit}&offset=${offset}&${this._apiKey}`);
        return result.data.results.map(char => this._transformCharacter(char));
    }

    getCharacter = async (id: number) => {
        const result = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(result.data.results[0]);
    }

    _transformCharacter = (char: any): Character => {
        if(char.description === "")
            char.description = "There is no data about this character";

        let objectFit: Character["thumbnail"]["objectFit"] = "cover";
        if(char.thumbnail.path.includes("image_not_available"))
            objectFit = "contain";

        let comicsList: Character["comicsList"] = char.comics.items.map(item => {
            return (
                {url: item.resourceURI,
                name: item.name}
            )
        })

        return {
            name: char.name,
            id: char.id,
            description: char.description,
            thumbnail: {
                url: char.thumbnail.path + "." + char.thumbnail.extension,
                objectFit: objectFit
            },
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comicsList: comicsList
        }
    }

    getAllComics = () => {

    }


}

export default MarvelService; 