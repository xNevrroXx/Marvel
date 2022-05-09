import './singleComic.scss';
import { FC, useEffect, useState } from 'react';
import { typeComic } from '../types/types';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import { Link } from 'react-router-dom';

interface IProps {
    comicId: string | undefined
}

const SingleComic: FC<IProps> = ({comicId}) => {
    const marvelService = useMarvelService()
    const [comic, setComic] = useState<typeComic>()

    useEffect(() => {
        if(comicId) {
            marvelService
                .getComic(+comicId)
                .then(comic => setComic(comic));
        }
    }, [comicId])

    return (
        <div className="single-comic">
            {
                comic ?
                (
                    <>
                    <img src={comic.thumbnail} alt="x-men" className="single-comic__img"/>
                    <div className="single-comic__info">
                        <h2 className="single-comic__name">{comic.title}</h2>
                        <p className="single-comic__descr">{comic.description}</p>
                        <p className="single-comic__descr">{comic.pageCount} pages</p>
                        <p className="single-comic__descr">Language: {comic.language}</p>
                        <div className="single-comic__price">{comic.price}</div>
                    </div>
                    <Link to="/comics" className="single-comic__back">Back to all</Link>
                    </>
                ) : <Spinner />
            }
        </div>
    )
}

export default SingleComic;