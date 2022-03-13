import './charList.scss';
import { Component } from 'react';
import MarvelService from '../../services/MarvelService';

import { Character } from "../types/types";

interface IProps {
    onCharSelected: (id: number) => void,
    isAllCharacters: boolean
}
interface IState {
    limitAtPage: number,
    startsAmount: number,
    offset: number,
    lastIndex: number,
    listCharacters: Character[],
    amountAtTime: number,
    needNewChars: number
}

class CharList extends Component<IProps, IState> {
    constructor(props) {
        super(props);

        this.state = {
            limitAtPage: 9,
            amountAtTime: 9,
            startsAmount: 18,
            offset: 210,
            lastIndex: 0,
            needNewChars: 9,
            listCharacters: [
                // {
                //     name: "Captain Marvel (Carol Danvers)",
                //     id: 1010338,
                //     description: "There is no data about this character",
                //     thumbnail: {
                //         url: "http://i.annihil.us/u/prod/marvel/i/mg/6/80/5269608c1be7a.jpg", 
                //         objectFit:"cover"
                //     },
                //     homepage: "http://marvel.com/comics/characters/1010338/captain_marvel_carol_danvers?utm_campaign=apiRef&utm_source=890c5cf83c64ce517e983bfad999b508",
                //     wiki: "http://marvel.com/universe/Ms._Marvel_(Carol_Danvers)?utm_campaign=apiRef&utm_source=890c5cf83c64ce517e983bfad999b508",
                //     comicsList: [
                //         {
                //             name: "Marvel New Year's Eve Special Infinite Comic (2017) #1",
                //             url: "http://gateway.marvel.com/v1/public/comics/58636"
                //         }
                //     ]
                // }
            ]
        }
    }

    marvelService = new MarvelService();
    componentDidMount() {
        this.getListCharacters();
    }

    getFullCharacters = async () => {
        let listCharacters: Character[] = this.state.listCharacters;
        const willCountCharacters = this.state.limitAtPage+this.state.amountAtTime;

        const startLength = listCharacters.length;
        let nowLength = listCharacters.length;

        console.log("before")
        while(startLength+this.state.amountAtTime > nowLength) {
            console.log('repeat')
            const newCharacters = await this.getCharacters();
            if(newCharacters.length === 0)
                continue
            
            listCharacters.push(...newCharacters);
            nowLength = listCharacters.length;
        }
        console.log("after")

        this.setState({
            limitAtPage: willCountCharacters,
            listCharacters: listCharacters,
            needNewChars: 9
        });
    }

    getCharacters = async (): Promise<Character[]> => {
        console.log("start func")
        let characters: Character[] = [];
        
        await this.marvelService
        .getAllCharacters(100, this.state.offset)
        .then((character: Character[]) => {
            let i;
            for(i = 0; i < 100 && characters.length < this.state.needNewChars; i++) {
                const tempCharacter = character[i];
                
                if (tempCharacter.description !== "There is no data about this character" 
                && !tempCharacter.thumbnail.url.includes("image_not_available")) {
                    this.setState({
                        needNewChars: this.state.needNewChars-1 
                    })
                    characters.push(tempCharacter);
                }
            }

            this.setState({
                offset: this.state.offset + i
            })
        })
        
        return characters;
    }

    getAllCharacters = (amountItem: number, offset: number) => {
        let listCharacters: Character[] = [...this.state.listCharacters];

        this.marvelService
        .getAllCharacters(amountItem, offset)
        .then((characters: Character[]) => {
            characters.forEach(character => listCharacters.push(character))
        })
        .then(() => {
            this.setState({
                offset: amountItem + offset,
                listCharacters: listCharacters
            })
        })
    }

    getListCharacters = () => {
        const {amountAtTime, offset} = this.state;
        if(false) {// view all the characters
            this.getAllCharacters(amountAtTime, offset);
        }
        else {// view only the characters with description and image
            this.getFullCharacters();
        }
    }

    onCharSelected = (e) => {
        const idCharacter = e.currentTarget.getAttribute("data-id");
        this.props.onCharSelected(+idCharacter);
    }

    render() {
        const {listCharacters} = this.state;
        return (
            <div className="char__list">
                <ul className="char__grid">
                    {
                        listCharacters.map(character => {
                            return (
                                <li 
                                    className="char__item" 
                                    key={character.id}
                                    data-id={character.id}
                                    onClick={this.onCharSelected}
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
                <button 
                    className="button button__main button__long"
                    onClick={this.getListCharacters}
                >
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;