//modules
import { Component, FC, useEffect, useState } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';

//types
import { Character } from '../types/types';

//styles and images
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import ErrorMessage from '../erorMessage/ErrorMessage';

interface IRandomCharProps {
    onCharSelected: (id: number) => void
}
interface IRandomCharState {
    character: Character,
    loading: boolean,
    error: boolean
}

const RandomChar: FC<IRandomCharProps> = ({onCharSelected}) => {
    
    const 
        [character, setCharacter] = useState<Character>({
            name: "",
            description: "",
            thumbnail: {url: "", objectFit:"cover"},
            homepage: "",
            wiki: "",
            id: 0,
            comicsList: []
        }),
        [isLoading, setIsLoading] = useState<boolean>(true),
        [isError, setIsError] = useState<boolean>(false);
    
    useEffect(() => {
        getRandomCharacter();
    }, [])

    const shortenDescriptionChar = (description: Character["description"], maxLength: number = 200): string => {
        if(description.length >= maxLength)
            return description.slice(0, maxLength-3) + "...";

        return description;
    }

    const marvelService = new MarvelService();
    const getRandomCharacter = () => {
        onCharLoading();
        const id = Math.floor(Math.random() * (1011400 - 1011000 + 1) + 1011000)

        marvelService
            .getCharacter(id)
            .then(onCharLoaded)
            .catch(onError)
    }

    const onCharLoading = () => {
        setIsLoading(true);
        setIsError(false);
    }
    const onCharLoaded = (character: Character) => {
        character.description = shortenDescriptionChar(character.description);
        setCharacter(character);
        setIsLoading(false);
    }

    const onError = () => {
        setIsLoading(false);
        setIsError(true);
    }


    const errorMessage = isError ? <ErrorMessage/> : null;
    const loadingSpinner = isLoading ? <Spinner/> : null;
    const content = !(isError || isLoading) ? <View character={character} getCharInfo={onCharSelected}/> : null;

    return (
        <div className="randomchar">
            {errorMessage}
            {loadingSpinner}
            {content}

            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button 
                    className="button button__main"
                    onClick={getRandomCharacter}    
                >
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}



interface IViewProps {
    character: Character,
    getCharInfo: (id: number) => void
}

const View: FC<IViewProps> = ({character, getCharInfo}) => {
    const {name, id, description, thumbnail: {url, objectFit}, homepage, wiki} = character;
    // const styleObjectFit: CSSProperties | undefined = thumbnail.includes("image_not_available") ? {objectFit: "contain"} : undefined;

    return (
        <div 
        className="randomchar__block"
        data-id={id}
        onClick={() => getCharInfo(character.id)}
        >
            <img 
                src={url} 
                alt="Random character" 
                className="randomchar__img"
                style={{objectFit: objectFit}}
            />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">{description}</p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;