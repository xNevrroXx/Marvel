import './comicsList.scss';
import { FC, useEffect, useRef, useState } from 'react';
import useMarvelService from '../../services/MarvelService';
import { typeComic } from '../types/types';
import { Link } from 'react-router-dom';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../erorMessage/ErrorMessage';

interface IState {
    offset: number,
    amountAtTime: number,
    startAmount: number,
    listComics: typeComic[],
    isLoading: boolean
}

const ComicsList: FC = () => {
    const {getMaxAmountData, isError, isLoading} = useMarvelService();
    const offset = useRef(0);
    const 
        [amountAtTime, setAmountAtTime] = useState<IState["amountAtTime"]>(8),
        [startAmount, setStartAmountChars] = useState<IState["startAmount"]>(8),
        [listComics, setListComics] = useState<IState["listComics"]>([]);
    
    useEffect(() => {
        if(localStorage.getItem("prevCountComics")) {
            const prevCountComics: number = +localStorage.getItem("prevCountComics")!;

            onLoadMore(prevCountComics)
        }
        else {
            onLoadMore(startAmount)
        }
    }, [])

    function _setLocalStorage(prevCountChars: number) {
        localStorage.setItem("prevCountComics", String(prevCountChars));
    }

    async function onLoadMore(needLoaded: number) {
        _setLocalStorage(listComics.length + needLoaded);

        // const newComics: typeComic[] = [];
        // getAllComics(needLoaded, offset.current)
        //     .then((result) => {
        //         for (let i = 0; i < result.length; i++) {
        //             const comics = result[i];
                    
        //             newComics.push(comics);
        //         }

        //         offset.current += needLoaded;
        //         setListComics([...listComics, ...newComics]);
        //     }) 
            
        getMaxAmountData(offset.current, amountAtTime, "comics")
            .then(({listData, offset: newOffset}) => {
                setListComics([...listComics, ...listData]);
                offset.current = newOffset;
            })
    }

    const error = isError ? <ErrorMessage/> : null;
    const loading = isLoading ? <Spinner/> : null;
    const content = !(!listComics || isError) ? <View listComics={listComics as typeComic[]} /> : null;

    return (
        <div className="comics__list">
            {content}
            {error}
            {loading}
            
            <button 
                className="button button__main button__long"
                disabled={isLoading}
                onClick={() => onLoadMore(amountAtTime)}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}


interface IViewProps {
    listComics: typeComic[]
}
const View: FC<IViewProps> = ({listComics}) => {
    return (
        <ul className="comics__grid">
            {
                listComics.map(comics => (
                    <li 
                        className="comics__item"
                        key={"comics" + comics.id}
                    >
                        <Link to={`/comics/${comics.id}`}>
                            <img src={comics.thumbnail} alt="ultimate war" className="comics__item-img"/>
                            <div className="comics__item-name">{comics.title}</div>
                            <div className="comics__item-price">{comics.price}</div>
                        </Link>
                    </li>
                ))
            }
        </ul>
    )
}
export default ComicsList;