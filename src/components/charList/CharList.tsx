import './charList.scss';
import { FC, useEffect, useState } from 'react';
import MarvelService from '../../services/MarvelService';

import { Character } from "../types/types";
import Spinner from '../spinner/Spinner';
import MethodGetCharList from '../methodGetCharList/MethodGetCharList';
import { useRef } from 'react';

interface IProps {
    onCharSelected: (id: number) => void
}
interface IState {
    limitAtPage: number,
    startAmountChars: number,
    offset: number,
    listCharacters: Character[],
    amountAtTime: number,
    needNewChars: number,
    isLoading: boolean,
    isAllCharacters: boolean,
    isPassedMaxOffset: boolean
}

const CharList: FC<IProps> = ({onCharSelected}) => {
    const characterRefs: HTMLElement[] = [];
    const marvelService = new MarvelService();
    const 
        [amountAtTime, setAmountAtTime] = useState<number>(9),
        [startAmountChars, setStartAmountChars] = useState<number>(9),
        [offset, setOffset] = useState<number>(210),
        [needNewChars, setNeedNewChars] = useState<number>(9),
        [listCharacters, setListCharacters] = useState<Character[]>([]),
        [isAllCharacters, setIsAllCharacters] = useState<boolean>(true),
        [isLoading, setIsLoading] = useState<boolean>(false),
        [isPassedMaxOffset, setIsPassedMaxOffset] = useState<boolean>(false);

    useEffect(() => {
        if(localStorage.getItem("prevCountChars")) {
            const prevCountChars = Number(localStorage.getItem("prevCountChars"));
            onRequest(prevCountChars)
        }
        else {
            onRequest(startAmountChars);
        }
    }, []);

    function _validateOffset() {
        setIsPassedMaxOffset(offset >= 1560 ? true : false);
    }
    
    function _setLocalStorage(prevCountChars) {
        localStorage.setItem("prevCountChars", String(prevCountChars));
    }

    async function onRequest(loadChars: number) {
        _validateOffset();
        _setLocalStorage(listCharacters.length + loadChars);
        toggleLoading();

        if (isAllCharacters) { // view all the characters
            await getAllCharacters(loadChars)
        }
        else { // view only the characters with description and image
            await getFullCharacters(loadChars)
        }

        toggleLoading();
        _validateOffset();
    }
    
    async function getFullCharacters (needNewChars: number) {
        console.log("full")
        setNeedNewChars(needNewChars);

        let newListCharacters: Character[] = [...listCharacters];
        const willCountCharacters = newListCharacters.length+needNewChars;
        const startLength = newListCharacters.length;

        while(willCountCharacters > newListCharacters.length && offset < 1560) { // выполнять, пока не найдется нужное количество персонажей с полной информацией
            const newCharacters = await getSomeCharacters(needNewChars);
            
            newListCharacters.push(...newCharacters);
        }

        setListCharacters(newListCharacters);
        setNeedNewChars(amountAtTime);
    }

    async function getSomeCharacters (needNewChars: number): Promise<Character[]>{ //находит максимально приближенное к нужному количество персонажей(персонажи с полной информацией встречаюются редко) 
        let characters: Character[] = [];
 
        await marvelService
        .getAllCharacters(100, offset)
        .then((newCharacters: Character[]) => {
            let i: number;
            for(i = 0; i < 100 && i < newCharacters.length && characters.length < needNewChars; i++) {
                const tempCharacter = newCharacters[i];

                if (tempCharacter.description !== "There is no data about this character" 
                && !tempCharacter.thumbnail.url.includes("image_not_available")) {
                    setNeedNewChars(needNewChars-1);
                    characters.push(tempCharacter);
                }
            }

            setOffset(offset => (offset + i));
        })

        console.log("characters: ", characters);
        return characters;
    }

    async function getAllCharacters (needNewChars: number) {
        let newCharacters: Character[] = [];

        while(newCharacters.length < needNewChars) {
            await marvelService
            .getAllCharacters(100, offset)
            .then((characters: Character[]) => {
                let i;
                for(i = 0; i < 100 && newCharacters.length < needNewChars; i++) {
                    newCharacters.push(characters[i])
                }

                setOffset(offset + i);
                setListCharacters([...listCharacters, ...newCharacters]);
            })
        }
    }

    function toggleLoading() {
        setIsLoading(isLoading => !isLoading);
    }

    function onChangeMethodGetChars(isAllCharacters: boolean){
        setIsAllCharacters(isAllCharacters);
    }

    function setFocusProperties(focusElem) {
        characterRefs.forEach(element => {
            element.classList.remove("char__item_selected");

            if(focusElem.target === element) {
                element.classList.add("char__item_selected");
            }
        });
    }
    
    function setRefs(elem) {
        characterRefs.push(elem);
    }

    return (          
        <div className="char__list">
            <MethodGetCharList onChangeMethodGetChars={onChangeMethodGetChars}/>

            <ul className="char__grid">
                {
                    listCharacters.map((character, index) => {
                        return (
                            <li
                                ref={setRefs}
                                className="char__item"
                                key={character.id}
                                tabIndex={0}
                                onFocus={setFocusProperties}
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
            
            {isLoading ? <Spinner/> : null}
            <button
                className="button button__main button__long"
                disabled={isLoading || isPassedMaxOffset}
                onClick={() => onRequest(amountAtTime)}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default CharList;