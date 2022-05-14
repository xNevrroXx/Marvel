import './charInfo.scss';
import {FC, useEffect, useState, memo, useContext } from 'react';

import { typeCharacter } from "../types/types"
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton';
import ErrorMessage from '../erorMessage/ErrorMessage';
import { Link } from 'react-router-dom';
import dataContext from '../context/context';


interface IState {
    character: typeCharacter,
    loading: boolean,
    error: boolean
}

const CharInfo: FC = () => {
    const {getCharacter, isLoading, isError} = useMarvelService();
    const [character, setCharacter] = useState<IState["character"]>();
    
    const context = useContext(dataContext);

    useEffect(() => {
        if(context.idSelectedChar) {
            getCharacter(context.idSelectedChar)
                .then(setCharacter)
        }
    }, [context])

    const errorMessage = isError ? <ErrorMessage/> : null;
    const loadingSpinner = isLoading ? <Spinner/> : null;
    const skeleton = !(character || isLoading || isError) ? <Skeleton/> : null;
    const content = !(!character || isLoading || isError) ? <View character={character as typeCharacter}/> : null;

    return (
        <div className="char__info" key={(character ? "infoChar " + character.id : "undefinedChar")}>
            {skeleton}
            {errorMessage}
            {loadingSpinner}
            {content}
        </div>
    )
}

interface IViewProps {
    character: typeCharacter
}
const View: FC<IViewProps> = memo(({character}) => {
    const {name, id, description, thumbnail: {url, objectFit}, homepage, comicsList} = character;

    return (
        <>
            <div className="char__basics">
                <img
                    src={url} 
                    alt={name} 
                    style={{objectFit: objectFit}}
                />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <Link to={`/characters/${id}`} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="char__descr">{description}</div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {
                    comicsList.map(comics => {
                        return (
                            <li className="char__comics-item" key={comics.name}>
                                <Link to={`/comics/${comics.name}`}>{comics.name}</Link>
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}, propsCompare)

function propsCompare(prevProp: {character: typeCharacter}, nextProps: {character: typeCharacter}) { //for React.memo()
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

export default CharInfo;