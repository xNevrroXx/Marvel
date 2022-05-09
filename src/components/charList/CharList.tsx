import './charList.scss';
import { FC, useEffect, useState, useRef } from 'react';
import useMarvelService from '../../services/MarvelService';

import { typeCharacter } from "../types/types";
import Spinner from '../spinner/Spinner';
import MethodGetCharList from '../methodGetCharList/MethodGetCharList';

interface IProps {
    onCharSelected: (id: number) => void
}
interface IState {
    startAmountChars: number,
    offset: number,
    listCharacters: typeCharacter[],
    amountAtTime: number,
    isLoading: boolean,
    isAllCharacters: boolean,
    isPassedMaxOffset: boolean
}

const CharList: FC<IProps> = ({onCharSelected}) => {
    const characterRefs: React.MutableRefObject<any[]> = useRef([]);
    const marvelService = useMarvelService();
    const offset: React.MutableRefObject<IState["offset"]> = useRef(210);
    const 
        [amountAtTime, setAmountAtTime] = useState<IState["amountAtTime"]>(9),
        [startAmountChars, setStartAmountChars] = useState<IState["startAmountChars"]>(9),
        [listCharacters, setListCharacters] = useState<IState["listCharacters"]>([]),
        [isAllCharacters, setIsAllCharacters] = useState<IState["isAllCharacters"]>(true),
        [isPassedMaxOffset, setIsPassedMaxOffset] = useState<IState["isPassedMaxOffset"]>(false);

    useEffect(() => {
        if(localStorage.getItem("prevCountChars")) {
            const prevCountChars = Number(localStorage.getItem("prevCountChars"));
            onRequest({needLoaded: prevCountChars})
        }
        else {
            onRequest({needLoaded: startAmountChars});
        }
    }, []);

    function _validateOffset() {
        setIsPassedMaxOffset(offset.current >= 1560 ? true : false);
    }
    
    function _setLocalStorage(prevCountChars) {
        localStorage.setItem("prevCountChars", String(prevCountChars));
    }

    async function onRequest({needLoaded = amountAtTime}: {needLoaded?: number}) {
        _setLocalStorage(listCharacters.length + needLoaded);
        // toggleLoading();

        if (isAllCharacters) { // view all the characters
            await getAllCharacters(needLoaded)
        }
        else { // view only the characters with description and image
            await getFullCharacters(needLoaded)
        }

        // toggleLoading();
        _validateOffset();
    }
    
    async function getFullCharacters (needNewChars: number) {
        let newListCharacters: typeCharacter[] = [...listCharacters];
        const willCountCharacters = newListCharacters.length+needNewChars;
        let newCharacters: typeCharacter[] = [];

        while(willCountCharacters > newListCharacters.length && offset.current < 1560) { // выполнять, пока не найдется нужное количество персонажей с полной информацией
            needNewChars -= newCharacters.length;
            newCharacters = await getSomeCharacters(needNewChars);
            
            newListCharacters.push(...newCharacters);
        }

        setListCharacters(newListCharacters);
    }

    async function getSomeCharacters (needNewChars: number): Promise<typeCharacter[]>{ //находит максимально приближенное к нужному количество персонажей(персонажи с полной информацией встречаюются редко) 
        let characters: typeCharacter[] = [];
 
        await marvelService
        .getAllCharacters(100, offset.current)
        .then((newCharacters: typeCharacter[]) => {
            let i: number;
            for(i = 0; i < 100 && i < newCharacters.length && characters.length < needNewChars; i++) {
                const tempCharacter = newCharacters[i];

                if (tempCharacter.description !== "There is no data about this character" 
                && !tempCharacter.thumbnail.url.includes("image_not_available")) {
                    characters.push(tempCharacter);
                }
            }

            offset.current += i;
        })

        return characters;
    }

    async function getAllCharacters (needNewChars: number) {
        let newCharacters: typeCharacter[] = [];

        while(newCharacters.length < needNewChars) {
            await marvelService
            .getAllCharacters(100, offset.current)
            .then((characters: typeCharacter[]) => {
                let i;
                for(i = 0; i < 100 && newCharacters.length < needNewChars; i++) {
                    newCharacters.push(characters[i])
                }

                offset.current += i;
                setListCharacters([...listCharacters, ...newCharacters]);
            })
        }
    }

    // function toggleLoading() {
    //     marvelService.isLoading(isLoading => !isLoading);
    // }

    function onChangeMethodGetChars(isAllCharacters: boolean){
        setIsAllCharacters(isAllCharacters);
    }

    function setFocusProperties(index: number) {
        characterRefs.current.forEach(element => {
            element.classList.remove("char__item_selected");
        });
        characterRefs.current[index].classList.add("char__item_selected");
        characterRefs.current[index].focus();
    }

    return (          
        <div className="char__list">
            <MethodGetCharList onChangeMethodGetCharsProp={onChangeMethodGetChars} startIsAllCharacters={isAllCharacters} />

            <ul className="char__grid">
                {
                    listCharacters.map((character, i) => {
                        return (
                            <li
                                ref={(element) => characterRefs.current[i] = element}
                                className="char__item"
                                key={character.id}
                                tabIndex={0}
                                onFocus={() => setFocusProperties(i)}
                                onClick={() => onCharSelected(character.id)}
                            >
                                <img
                                    src={character.thumbnail.url} 
                                    alt={character.name}
                                    style={{objectFit: character.thumbnail.objectFit}}
                                />
                                <div className="char__name">{character.name}</div>
                            </li>
                        )
                    })
                }
            </ul>
            
            {marvelService.isLoading ? <Spinner/> : null}
            <button
                className="button button__main button__long"
                disabled={marvelService.isLoading || isPassedMaxOffset}
                onClick={() => onRequest({})}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default CharList;