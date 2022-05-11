import './charInfo.scss';
import {FC, useEffect, useState } from 'react';

import { typeCharacter } from "../types/types"
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton';
import ErrorMessage from '../erorMessage/ErrorMessage';
import { Link } from 'react-router-dom';

interface IProps {
    idSelectedChar: number | null
}

interface IState {
    character: typeCharacter,
    loading: boolean,
    error: boolean
}

const CharInfo: FC<IProps> = ({idSelectedChar}) => {
    const serviceMarvel = useMarvelService();
    const [character, setCharacter] = useState<IState["character"]>();

    useEffect(() => {
        if(idSelectedChar) {
            serviceMarvel
                .getCharacter(idSelectedChar)
                .then(character => setCharacter(character));
        }
    }, [idSelectedChar])
    
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
     
    // componentDidCatch(error, errorInfo) {
    //     console.log(error, errorInfo)
    // }

    const errorMessage = serviceMarvel.isError ? <ErrorMessage/> : null;
    const loadingSpinner = serviceMarvel.isLoading ? <Spinner/> : null;
    const skeleton = !(character || serviceMarvel.isLoading || serviceMarvel.isError) ? <Skeleton/> : null;
    const content = !(!character || serviceMarvel.isLoading || serviceMarvel.isError) ? <View character={character as typeCharacter}/> : null;

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
const View: FC<IViewProps> = ({character}) => {
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
}

export default CharInfo;