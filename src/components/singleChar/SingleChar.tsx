import { FC, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useMarvelService from "../../services/MarvelService";
import AppHeader from "../appHeader/AppHeader";
import ErrorMessage from "../erorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import { typeCharacter } from "../types/types";

const SingleChar: FC = () => {
    const charId = useParams().characterId;
    const {getCharacter, isError, isLoading} = useMarvelService();
    const [character, setCharacter] = useState<typeCharacter>();

    useEffect(() => {
        if(charId) {
            onUpdateId(+charId)
        }
    }, [charId])

    const onUpdateId = (charId: number) => {
        getCharacter(charId)
            .then(setCharacter)
    }

    const content = !(!character || isLoading || isError) ? <View character={character as typeCharacter} /> : null;
    const error = isError ? <ErrorMessage /> : null;
    const loading = isLoading ? <Spinner /> : null;
    
    return (
        <div className="single-char">
            {content}
            {error}
            {loading}
        </div>
    )
}

interface IViewProps {
    character: typeCharacter
}
const View: FC<IViewProps> = ({character}) => {
    return (
        <>
            <img src={character.thumbnail.url} style={{objectFit: character.thumbnail.objectFit}} alt="x-men" className="single-char__img"/>
            <div className="single-char__info">
                <h2 className="single-char__name">{character.name}</h2>
                <p className="single-char__descr">{character.description}</p>
            </div>
            <Link to="/characters" className="single-char__back">Back to all</Link>
        </>
    )
}

export default SingleChar;