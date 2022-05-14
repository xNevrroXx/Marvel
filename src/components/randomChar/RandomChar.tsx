//modules
import { FC, memo, useCallback, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

//own modules
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../erorMessage/ErrorMessage';

//types
import { typeCharacter } from '../types/types';

//styles and images
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import dataContext from '../context/context';


interface IRandomCharState {
    character: typeCharacter,
    randomId: number,
    loading: boolean,
    error: boolean,
}

const RandomChar: FC = () => {
    const {getCharacter, clearError, isLoading, isError} = useMarvelService();
    const 
        [character, setCharacter] = useState<IRandomCharState["character"]>({
            name: "",
            description: "",
            thumbnail: {url: "", objectFit:"cover"},
            homepage: "",
            wiki: "",
            id: 0,
            comicsList: []
        }),
        [randomId, setRandomId] = useState<IRandomCharState["randomId"]>(getRandomId());
    
    const context = useContext(dataContext);

    useEffect(() => {
        if(isError) clearError();
        
        getCharacter(randomId)
            .then(onCharLoaded)
    }, [randomId])

    function getRandomId(): number {
        return Math.floor(Math.random() * (1011400 - 1011000 + 1) + 1011000);
    }

    function shortenDescriptionChar(description: typeCharacter["description"], maxLength: number = 200): string {
        if(description.length >= maxLength)
            return description.slice(0, maxLength-3) + "...";

        return description;
    }

    function onCharLoaded(character: typeCharacter): void {
        character.description = shortenDescriptionChar(character.description);
        setCharacter(character);
    }

    const errorMessage = isError ? <ErrorMessage/> : null;
    const loadingSpinner = isLoading ? <Spinner/> : null;
    const content = !(isError || isLoading) ? <View character={character} /* getCharInfo={getCharInfo} *//> : null;

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
                    onClick={() => setRandomId(getRandomId())}    
                >
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}




interface IViewProps {
    character: typeCharacter,
    /* getCharInfo: (id: number) => void */
}

const View = memo<IViewProps>(({character/* , getCharInfo */}) => {
    const {name, id, description, thumbnail: {url, objectFit}, homepage} = character;
    const context = useContext(dataContext);

    // console.log(context)
    return (
        <div 
        className="randomchar__block"
        data-id={id}
        onClick={() => /* getCharInfo(character.id) */context.getCharInfo(character.id)}
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
                    <Link to={`/characters/${id}`} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </Link >
                </div>
            </div>
        </div>
    )
}, propsCompare)

function propsCompare(
    prevProp: {character: typeCharacter, getCharInfo?: (id: number) => void}, 
    nextProps: {character: typeCharacter, getCharInfo?: (id: number) => void}) 
    { //for React.memo()
    const {name, id, description, thumbnail, homepage, wiki, comicsList} = prevProp.character;
    const newChar = nextProps.character;

    if( name === newChar.name &&
        id === newChar.id &&
        description === newChar.description &&
        thumbnail.url === newChar.thumbnail.url &&
        thumbnail.objectFit === newChar.thumbnail.objectFit &&
        homepage === newChar.homepage &&
        wiki === newChar.wiki
    ) return true;
    else return false;
}

export default RandomChar;