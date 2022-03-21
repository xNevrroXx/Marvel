import './charList.scss';
import { Component } from 'react';
import MarvelService from '../../services/MarvelService';

import { Character } from "../types/types";
import Spinner from '../spinner/Spinner';
import MethodGetCharList from '../methodGetCharList/MethodGetCharList';

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

class CharList extends Component<IProps, IState> {
    constructor(props) {
        super(props);

        this.state = {
            limitAtPage: 9,
            amountAtTime: 9,
            startAmountChars: 9,
            offset: 210,
            needNewChars: 9,
            listCharacters: [],
            isAllCharacters: false,
            isLoading: false,
            isPassedMaxOffset: false
        }
    }

    marvelService = new MarvelService();
    componentDidMount() {
        if(localStorage.getItem("prevCountChars")) {
            const prevCountChars = Number(localStorage.getItem("prevCountChars"));

            this.setState({
                limitAtPage: prevCountChars
            })

            this.onRequest(prevCountChars)
        }
        else {
            const {startAmountChars} = this.state;
            this.onRequest(startAmountChars);
        } 
    }

    _validateOffset = () => {
        if(this.state.offset >= 1560)
            this.setState({isPassedMaxOffset: true})
        else
            this.setState({isPassedMaxOffset: false})
    }
    
    _setLocalStorage() {
        localStorage.setItem("prevCountChars", String(this.state.listCharacters.length));
    }

    onRequest = async (loadChars: number) => {
        const {isAllCharacters} = this.state;

        this._validateOffset();
        this.toggleLoading();

        if (isAllCharacters) { // view all the characters
            await this.getAllCharacters(loadChars)
        }
        else { // view only the characters with description and image
            await this.getFullCharacters(loadChars)
        }

        this._setLocalStorage();
        this.toggleLoading();
        this._validateOffset();
    }
    
    getFullCharacters = async (needNewChars: number) => {
        this.setState({needNewChars: needNewChars})

        let listCharacters: Character[] = [...this.state.listCharacters];
        const willCountCharacters = listCharacters.length+needNewChars;
        const startLength = listCharacters.length;

        while(startLength+needNewChars > listCharacters.length && this.state.offset < 1560) { // выполнять, пока не найдется нужное количество персонажей с полной информацией
            const newCharacters = await this.getSomeCharacters(this.state.offset, this.state.needNewChars);

            if(newCharacters.length === 0)
                continue

            listCharacters.push(...newCharacters);
        }

        this.setState({
            limitAtPage: willCountCharacters,
            listCharacters: listCharacters,
            needNewChars: this.state.amountAtTime
        });
    }

    getSomeCharacters = async (offset: number, needNewChars: number): Promise<Character[]> => { //находит максимально приближенное к нужному количество персонажей(персонажи с полной информацией встречаюются редко) 
        let characters: Character[] = [];
 
        await this.marvelService
        .getAllCharacters(100, offset)
        .then((newCharacters: Character[]) => {
            let i;
            for(i = 0; i < 100 && i < newCharacters.length && characters.length < needNewChars; i++) {
                const tempCharacter = newCharacters[i];

                if (tempCharacter.description !== "There is no data about this character" 
                && !tempCharacter.thumbnail.url.includes("image_not_available")) {
                    this.setState({needNewChars: this.state.needNewChars-1})
                    characters.push(tempCharacter);
                }
            }

            this.setState({
                offset: offset + i
            })
        })

        return characters;
    }

    getAllCharacters = async (needNewChars: number) => {
        let newCharacters: Character[] = [];

        while(newCharacters.length < needNewChars) {
            await this.marvelService
            .getAllCharacters(100, this.state.offset)
            .then((characters: Character[]) => {
                let i;
                for(i = 0; i < 100 && newCharacters.length < needNewChars; i++) {
                    console.log(i)
                    newCharacters.push(characters[i])
                }

                this.setState({
                    offset: this.state.offset + i,
                    listCharacters: [...this.state.listCharacters, ...newCharacters]
                })
            })


        }
    }

    toggleLoading = () => {
        this.setState({isLoading: !this.state.isLoading})
    }

    onChangeMethodGetChars = (isAllCharacters: boolean) => {
        this.setState(({isAllCharacters}));
    }

    render() {
        const {listCharacters, isLoading, isPassedMaxOffset, amountAtTime} = this.state;

        return (          
            <div className="char__list">
                <MethodGetCharList onChangeMethodGetChars={this.onChangeMethodGetChars}/>

                <ul className="char__grid">
                    {
                        listCharacters.map(character => {
                            return (
                                <li 
                                    className="char__item" 
                                    key={character.id}
                                    onClick={() => this.props.onCharSelected(+character.id)}
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
                    onClick={() => this.onRequest(amountAtTime)}
                >
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;