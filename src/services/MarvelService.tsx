import { typeCharacter, typeComic } from "../components/types/types";
import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
    const {isLoading, isError, setIsError, request, clearError} = useHttp();
    const _apiBase = "https://gateway.marvel.com:443/v1/public/";
    const _apiKey = "apikey=890c5cf83c64ce517e983bfad999b508";
    const _baseOffsetCharacters = 210;
    const _baseOffsetComics = 0;

    //universal
    const _validateArguments = ( {limit = 100, offsetChars = 0, offsetComics = 0}: {limit?: number, offsetChars?: number, offsetComics?: number}) => {
        if(limit !== undefined && limit > 100) {
            setIsError(true);
            throw new Error("'limit' could not to be more than 100 or less than 1")
        }

        if(offsetChars > 1560 || offsetChars < 0) {
            setIsError(true);
            throw new Error("'offset' could not to be more than 1560 or less than 0")
        }
    }

    const getMaxAmountData = async ( offset: number, needNewChars: number, charactersOrComics: "characters" | "comics" ) => {
        let listData: any = [];
 
        if(charactersOrComics === "characters") {
            while(listData.length < needNewChars) { 
                await getAllCharacters(100, offset)
                        .then((characters: any[]) => {
                            let i: number;
                            for(i = 0; i < 100 && listData.length < needNewChars; i++) {
                                listData.push(characters[i])
                            }
    
                            offset += i;
                        })
            }
        }
        else {            
            while(listData.length < needNewChars) { 
                await getAllComics(100, offset)
                        .then((comics: any[]) => {
                            let i: number;
                            for(i = 0; i < 100 && listData.length < needNewChars; i++) {
                                listData.push(comics[i])
                            }

                            offset += i;
                        })
            }
        }

        return {listData, offset};
    }

    // Characters
    const getAllCharacters = async (limit = 9, offset = _baseOffsetCharacters) => {
        _validateArguments({limit: limit, offsetChars: offset})
        const result = await request({url: `${_apiBase}characters?limit=${limit}&offset=${offset}&${_apiKey}`});

        return ( result.data.results.map(_transformCharacter) ) as typeCharacter[];
    }

    const getCharacter = async (id: number) => {
        const result = await request({url:`${_apiBase}characters/${id}?${_apiKey}`});

        return _transformCharacter(result.data.results[0]) as typeCharacter;
    }

    const getCharacterByName = async (name: string) => {
        const result = await request({url:`${_apiBase}characters?${_apiKey}&name=${name}`});

        return _transformCharacter(result.data.results[0]) as typeCharacter;
    }
    const _transformCharacter = (char: any): typeCharacter => {
        if(char.description === "")
            char.description = "There is no data about this character";

        let objectFit: typeCharacter["thumbnail"]["objectFit"] = "cover";
        if(char.thumbnail.path.includes("image_not_available"))
            objectFit = "fill";

        let comicsList: typeCharacter["comicsList"] = char.comics.items.map(item => {
            return (
                {
                    url: item.resourceURI,
                    name: item.name
                }
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

    // Comics
    const getAllComics = async (limit = 9, offset = _baseOffsetComics) => {
        _validateArguments({limit: limit, offsetComics: offset});
        const result = await request({url: `${_apiBase}comics?limit=${limit}&offset=${offset}&${_apiKey}`});
        
        return result.data.results.map(_transformComics) as typeComic[];
    }

    const getComic = async (id: number) => {
        const result = await request({url: `${_apiBase}comics/${id}?${_apiKey}`});

        return _transformComics(result.data.results[0]) as typeComic;
    }

    const _transformComics = (comics: any): typeComic => {
        if(comics.prices[0].price === 0) {
            comics.prices[0].price = "not available".toUpperCase();
        }
        if(comics.textObjects.length === 0) {
            comics.textObjects.push({
                language: "en-us"
            })
        }
        if(comics.pageCount === 0) {
            comics.pageCount = "unknown";
        }

        return {
            title: comics.title,
            id: comics.id,
            url: comics.urls.url,
            thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
            price: comics.prices[0].price,
            description: comics.description,
            pageCount: comics.pageCount,
            language: comics.textObjects[0].language
        };
    }

    return {getComic, getAllComics, getCharacter, getCharacterByName, getAllCharacters, getMaxAmountData, clearError, isLoading, isError}
}

export default useMarvelService;