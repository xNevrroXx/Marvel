import { FC, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Helmet from "react-helmet";

// own modules
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../erorMessage/ErrorMessage';

// types
import { typeComic } from '../types/types';
// styles
import './singleComic.scss';


const SingleComic: FC = () => {
    const charId = useParams().comicId;
    const {getComic, isError, isLoading} = useMarvelService();
    const [comic, setComic] = useState<typeComic>();

    useEffect(() => {
        if(charId) {
            onUpdateId(+charId)
        }
    }, [charId])

    const onUpdateId = (charId: number) => {
        getComic(charId)
            .then(setComic)
    }

    const content = !(!comic || isLoading || isError) ? <View comic={comic as typeComic} /> : null;
    const error = isError ? <ErrorMessage /> : null;
    const loading = isLoading ? <Spinner /> : null;
    return (
        <div className="single-comic">
            {content}
            {error}
            {loading}
            
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>
    )
}


interface IViewProps {
    comic: typeComic
}
const View: FC<IViewProps> = ({comic}) => {

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content={`${comic.title} comic page`}
                />
                <title>{comic.title}</title>
            </Helmet>
            <img src={comic.thumbnail} alt="x-men" className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{comic.title}</h2>
                <p className="single-comic__descr">{comic.description}</p>
                <p className="single-comic__descr">{comic.pageCount} pages</p>
                <p className="single-comic__descr">Language: {comic.language}</p>
                <div className="single-comic__price">{comic.price}</div>
            </div>
        </>
    )
}

export default SingleComic;