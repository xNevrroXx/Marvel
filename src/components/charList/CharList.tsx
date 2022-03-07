import './charList.scss';
import { Component } from 'react';
import MarvelService from '../../services/MarvelService';

import { Character } from "../types/types";

interface IProps {
    getCharInfo: (id: number) => void
}
interface IState {
    limitAtPage: number,
    offset: number,
    lastIndex: number,
    listCharacters: Character[],
    ifOnlyFullCharacters: boolean
}

class CharList extends Component<IProps, IState> {
    constructor(props) {
        super(props);

        this.state = {
            limitAtPage: 9,
            offset: 210,
            lastIndex: 0,
            listCharacters: [],
            ifOnlyFullCharacters: false
        }

    }

    marvelService = new MarvelService();
    componentDidMount() {
        this.getListCharacters();
    }

    getListCharacters = () => {
        let listCharacters: Character[] = [];
        
        if(this.state.ifOnlyFullCharacters) {
            let lastIndex = 0;

            this.marvelService
            .getAllCharacters(100, this.state.offset)
            .then((characters: Character[]) => {
                let index = 0;
                while(listCharacters.length < this.state.limitAtPage && index < 100) {
                    const character = characters[index];
                    
                    if (character.description !== "" 
                    && !character.thumbnail.includes("image_not_available")) 
                        listCharacters.push(character)

                    lastIndex = index;
                    index++;
                }
            })
            .then(() => {
                this.setState({offset: this.state.offset + lastIndex + 1});
                this.setState(({listCharacters}));
            })
        }
        else {
            this.marvelService
            .getAllCharacters(this.state.limitAtPage)
            .then((characters: Character[]) => {
                characters.forEach(character => listCharacters.push(character))
            })
            .then(() => {
                this.setState(({listCharacters}));
                this.setState({limitAtPage: this.state.limitAtPage+9})
            })
        }
    }

    getCharInfo = (e) => {
        const idCharacter = e.currentTarget.getAttribute("data-id");
        this.props.getCharInfo(+idCharacter);
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
                                    onClick={this.getCharInfo}
                                >
                                    <img src={character.thumbnail} alt={character.name}/>
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