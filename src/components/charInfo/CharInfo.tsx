import './charInfo.scss';
import { Component } from 'react';

import { Character } from "../types/types"
import MarvelService from '../../services/MarvelService';

interface IProps {
    idSelectedChar: number
}

interface IState {
    character: Character
}

class CharInfo extends Component<IProps, IState> {
    constructor(props) {
        super(props);

        this.state = {
            character: {
                name: "",
                id: 0,
                description: "",
                thumbnail: {url: "", objectFit:"cover"},
                homepage: "",
                wiki: "",
                comicsList: []
            }
        }
    }
 
/*     componentDidMount() {
        this.getInfoCharacter();
    }
    
    serviceMarvel = new MarvelService();
    getInfoCharacter = () => 
        this.serviceMarvel
            .getCharacter(this.props.idCharacter)
            .then(character => {
                this.setState({
                    character: {
                        name: character.data.results[0].name,
                        id: character.data.results[0].id,
                        description: character.data.results[0].description,
                        thumbnail: character.data.results[0].thumbnail.path + "." + character.data.results[0].thumbnail.extension,
                        homepage: character.data.results[0].urls[0].url,
                        wiki: character.data.results[0].urls[1].url,
                        comicsList: character.data.results[0].comics.items
                    }
                })
            })
    } */

    componentDidMount() {
        this.getInfoCharacter(this.props.idSelectedChar);
    }

    componentDidUpdate(prevProps: IProps) {
        if(this.props.idSelectedChar !== prevProps.idSelectedChar)
            this.getInfoCharacter(this.props.idSelectedChar);
    }

    serviceMarvel = new MarvelService();
    getInfoCharacter = (id: number) => {
        this.serviceMarvel
            .getCharacter(id)
            .then(character => this.setState(({character})))
    }

    render() {
        const {name, id, description, thumbnail: {url, objectFit}, homepage, wiki, comicsList} = this.state.character;

        return (
            <div className="char__info" key={"info" + id} data-info-id={id}>
                <div className="char__basics">
                    <img 
                        src={url} 
                        alt={name} 
                        style={{objectFit: objectFit}}
                    />
                    <div>
                        <div className="char__info-name">{name}</div>
                        <div className="char__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="char__descr">{description}</div>
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                    {
                        comicsList.map(comics => {
                            return (
                                <li className="char__comics-item" key={comics.name}>
                                    <a href={comics.url}>{comics.name}</a>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default CharInfo;