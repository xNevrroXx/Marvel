//styles
import './charList.scss';

//tech modules
import { FC, useEffect, useState, useRef, useContext } from 'react';
import { CSSTransition, TransitionGroup } from "react-transition-group";

//own modules
import Spinner from '../spinner/Spinner';
import MethodGetCharList from '../methodGetCharList/MethodGetCharList';
import useMarvelService from '../../services/MarvelService';

//types
import { typeCharacter } from "../types/types";
import ErrorMessage from '../erorMessage/ErrorMessage';
import dataContext from '../context/context';


interface IState {
    startAmountChars: number,
    offset: number,
    listCharacters: typeCharacter[],
    amountAtTime: number,
    isLoading: boolean,
    isAllCharacters: boolean,
    isPassedMaxOffset: boolean
}

const CharList: FC = () => {
    const characterRefs: React.MutableRefObject<any[]> = useRef([]);
    const marvelService = useMarvelService();
    const offset: React.MutableRefObject<IState["offset"]> = useRef(210);
    const 
        [amountAtTime, setAmountAtTime] = useState<IState["amountAtTime"]>(9),
        [startAmountChars, setStartAmountChars] = useState<IState["startAmountChars"]>(9),
        [listCharacters, setListCharacters] = useState<IState["listCharacters"]>([]),
        [isAllCharacters, setIsAllCharacters] = useState<IState["isAllCharacters"]>(true),
        [isPassedMaxOffset, setIsPassedMaxOffset] = useState<IState["isPassedMaxOffset"]>(false),
        [isLoading, setIsLoading] = useState<boolean>(false);

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
        setIsPassedMaxOffset(offset.current >= 1560);
    }
    
    function _setLocalStorage(prevCountChars) {
        localStorage.setItem("prevCountChars", String(prevCountChars));
    }

    async function onRequest({needLoaded = amountAtTime}: {needLoaded?: number}) {
        _setLocalStorage(listCharacters.length + needLoaded);

        if (isAllCharacters) { // view all the characters
            await getAllCharacters(needLoaded)
        }
        else { // view only the characters with description and image
            await getFullCharacters(needLoaded)
        }
        
        _validateOffset();
    }
    
    async function getFullCharacters (needNewChars: number) {
        setIsLoading(true);
        let newListCharacters: typeCharacter[] = [...listCharacters];
        const willCountCharacters = newListCharacters.length+needNewChars;
        let newCharacters: typeCharacter[] = [];

        while(willCountCharacters > newListCharacters.length && offset.current < 1560) { // выполнять, пока не найдется нужное количество персонажей с полной информацией
            needNewChars -= newCharacters.length;
            newCharacters = await getSomeCharacters(needNewChars);
            
            newListCharacters.push(...newCharacters);
        }
    
        setListCharacters(newListCharacters);
        setIsLoading(false);
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
        marvelService
            .getMaxAmountData(offset.current, needNewChars, "characters")
            .then(({listData, offset: newOffset}) => {
                setListCharacters([...listCharacters, ...listData]);
                offset.current = newOffset;
            })
    }

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

    const error = marvelService.isError ? <ErrorMessage/> : null;
    const loading = isAllCharacters ? (marvelService.isLoading ? <Spinner/> : null) : (isLoading ? <Spinner /> : null);
    const content = !(!listCharacters || marvelService.isError) 
                    ?   <View
                            listCharacters={listCharacters as typeCharacter[]} 
                            setFocusProperties={setFocusProperties}
                            characterRefs={characterRefs}
                        /> : null;
                        
    return (          
        <div className="char__list">
            <MethodGetCharList onChangeMethodGetCharsProp={onChangeMethodGetChars} startIsAllCharacters={isAllCharacters} />      
                  
            {content}
            {error}
            {loading}
            
            <button
                className="button button__main button__long"
                disabled={isLoading || isPassedMaxOffset}
                onClick={() => onRequest({})}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

interface IViewProps {
    listCharacters: typeCharacter[],
    setFocusProperties: (index: number) => void,
    characterRefs: any
}
const View: FC<IViewProps> = ({listCharacters, setFocusProperties, characterRefs}) => {
    const context = useContext(dataContext);
    
    const duration = 1;
    const items = listCharacters.map((character, i) => {
        return (
            <CSSTransition
                classNames="char__item"
                timeout={duration}
                key={character.id}
            >
                <li
                    ref={(element) => characterRefs.current[i] = element}
                    className="char__item"
                    tabIndex={0}
                    onFocus={() => setFocusProperties(i)}
                    onClick={() => context.getCharInfo(character.id)}
                >
                    <img
                        src={character.thumbnail.url}
                        alt={character.name}
                        style={{objectFit: character.thumbnail.objectFit}}
                    />
                    <div className="char__name">{character.name}</div>
                </li>
            </CSSTransition>
        )
    })

    return (
        <ul className="char__grid">
            <TransitionGroup component={null}>
                 {items}
            </TransitionGroup>
        </ul>
    )
}
export default CharList;