import './comicsList.scss';
import { FC, useEffect, useRef, useState } from 'react';
import useMarvelService from '../../services/MarvelService';
import { typeComic } from '../types/types';
import { Link } from 'react-router-dom';
import Spinner from '../spinner/Spinner';

interface IState {
    offset: number,
    amountAtTime: number,
    startAmount: number,
    listComics: typeComic[],
    isLoading: boolean
}

const ComicsList: FC = () => {
    const marvelService = useMarvelService();
    const offset = useRef(0);
    const 
        [amountAtTime, setAmountAtTime] = useState<IState["amountAtTime"]>(8),
        [startAmount, setStartAmountChars] = useState<IState["startAmount"]>(8),
        [listComics, setListComics] = useState<IState["listComics"]>([]),
        [isLoading, setIsLoading] = useState<IState["isLoading"]>(false);
    
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
        toggleLoading();

        const newComics: typeComic[] = [];
        await marvelService
            .getAllComics(needLoaded, offset.current)
            .then((result) => {
                for (let i = 0; i < result.length; i++) {
                    const comics = result[i];
                    
                    newComics.push(comics);
                }

                offset.current += needLoaded;
                setListComics([...listComics, ...newComics]);
            })
        
        toggleLoading();
    }

    function toggleLoading() {
        console.log(isLoading)
        setIsLoading(isLoading => !isLoading)
    };

    return (
        <div className="comics__list">
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

                
                {isLoading ? <Spinner /> : null}
            </ul>
            <button 
                className="button button__main button__long"
                onClick={() => onLoadMore(amountAtTime)}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;

function toggleLoading() {
    throw new Error('Function not implemented.');
}
