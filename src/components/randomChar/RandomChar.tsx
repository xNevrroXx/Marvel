import { Component } from 'react';

import MarvelService from '../../services/MarvelService';

import mjolnir from '../../resources/img/mjolnir.png';
import './randomChar.scss';
import { Character } from '../types/types';

interface IProps {
    getCharInfo: (id: number) => void
}

interface IState {
    character: Character
}

class RandomChar extends Component<IProps, IState> {
    constructor(props) {
        super(props);

        this.state = {
            character: {
                name: "",
                description: "",
                thumbnail: "",
                homepage: "",
                wiki: "",
                id: 0,
                comicsList: []
            }
        }

        this.getRandomCharacter();
    }
    

    shortenDescriptionChar = (description: Character["description"], maxLength: number = 200): string => {
        if(description.length >= maxLength)
            return description.slice(0, maxLength-3) + "...";

        return description;
    }

    marvelService = new MarvelService();
    getRandomCharacter = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000 + 1) + 1011000)

        this.marvelService
            .getCharacter(id)
            .then(character => {
                character.description = this.shortenDescriptionChar(character.description);
                this.setState(({character}))
            })
    }

    getCharInfo = (e) => {
        const idCharacter = e.currentTarget.getAttribute("data-id");
        this.props.getCharInfo(+idCharacter);
    }

    render() {
        const {name, id, description, thumbnail, homepage, wiki} = this.state.character;

        return (
            <div className="randomchar">
                <div 
                    className="randomchar__block"
                    data-id={id}
                    onClick={this.getCharInfo}
                >
                    <img src={thumbnail} alt="Random character" className="randomchar__img"/>
                    <div className="randomchar__info">
                        <p className="randomchar__name">{name}</p>
                        <p className="randomchar__descr">{description}</p>
                        <div className="randomchar__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button 
                        className="button button__main"
                        onClick={this.getRandomCharacter}    
                    >
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

export default RandomChar;