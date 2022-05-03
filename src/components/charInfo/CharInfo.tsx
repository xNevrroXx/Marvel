import './charInfo.scss';
import {FC, useEffect, useState } from 'react';

import { Character } from "../types/types"
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton';
import ErrorMessage from '../erorMessage/ErrorMessage';

interface IProps {
    idSelectedChar: number | null
}

interface IState {
    character: Character,
    loading: boolean,
    error: boolean
}

const CharInfo: FC<IProps> = ({idSelectedChar}) => {
    const
        [character, setCharacter] = useState<IState["character"]>(),
        [loading, setLoading] = useState<IState["loading"]>(false),
        [error, setError] = useState<IState["error"]>(false);
 
    useEffect(() => {
        getInfoCharacter(idSelectedChar);
    }, []) 
    
    /* serviceMarvel = new MarvelService();
    getInfoCharacter = () => 
        this.serviceMarvel
            .getCharacter(this.props.idCharacter)
            .then(character => {
                this.setState({
                    character: {
                        name: character.data.results[0].name,
                        id: character.data.results[0].id,
                        description: character.data.results[0].description,
                        thumbnail: character.data.results[0].thumbnail.path + "." + character.data.results[0].thumbnail.extension,
                        homepage: character.data.results[0].urls[0].url,
                        wiki: character.data.results[0].urls[1].url,
                        comicsList: character.data.results[0].comics.items
                    }
                })
            })
    } */

    // componentDidUpdate(prevProps: IProps) {
    //     if(this.props.idSelectedChar !== prevProps.idSelectedChar && this.props.idSelectedChar !== null) {
    //         getInfoCharacter(idSelectedChar);
    //     }
    // }
    useEffect(() => {
        getInfoCharacter(idSelectedChar);
    }, [idSelectedChar])

    // const idPrevSelectedChar: IProps["idSelectedChar"] = useMemo(() => {
    //     getInfoCharacter(idSelectedChar);
    //     return idSelectedChar;
    // }, [idSelectedChar])

     
    // componentDidCatch(error, errorInfo) {
    //     console.log(error, errorInfo)
    // }

    const serviceMarvel = new MarvelService();
    function getInfoCharacter(id: number | null) {
        if(!id) { 
            return
        }

        onCharLoading();

        serviceMarvel
            .getCharacter(id)
            .then(character => onCharLoaded(character))
            .catch(() => onError())
    }

    function onCharLoading() {
        setLoading(true);
        setError(false);
    }
    
    function onCharLoaded(character: Character) {
        setCharacter(character);
        setLoading(false);
    }

    function onError() {
        setError(true); 
        setLoading(false);
    }
    
    const errorMessage = error ? <ErrorMessage/> : null;
    const loadingSpinner = loading ? <Spinner/> : null;
    const skeleton = !(character || loading || error) ? <Skeleton/> : null;
    const content = !(!character || loading || error) ? <View character={character as Character}/> : null;

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
    character: Character
}
const View: FC<IViewProps> = ({character}) => {
        const {name, description, thumbnail: {url, objectFit}, homepage, wiki, comicsList} = character;

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
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
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
                                <a href={comics.url}>{comics.name}</a>
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}

export default CharInfo;