import './charInfo.scss';
import thor from '../../resources/img/thor.jpeg';
import { Component } from 'react';
import MarvelService from '../../services/MarvelService';

type Character = {
    name: string,
    id: number,
    description: string,
    thumbnail: string,
    homepage: string,
    wiki: string,
    comicsList: {url: string, name: string}[]
} 

interface IProps {
    idCharacter: number
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
                thumbnail: "",
                homepage: "",
                wiki: "",
                comicsList: []
            }
        }
    }
 
    componentDidMount() {
        this.getInfoCharacter();
    }

    serviceMarvel = new MarvelService();
    getInfoCharacter = () => {
        console.log("done")
        this.serviceMarvel
            .getCharacter(this.props.idCharacter)
            .then(result => {
                this.setState({
                    character: {
                        name: result.data.results[0].name,
                        id: result.data.results[0].id,
                        description: result.data.results[0].description,
                        thumbnail: result.data.results[0].thumbnail.path + "." + result.data.results[0].thumbnail.extension,
                        homepage: result.data.results[0].urls[0].url,
                        wiki: result.data.results[0].urls[1].url,
                        comicsList: result.data.results[0].comics.items,

                    }
                })
            })
    }

    render() {
        const {name, id, description, thumbnail, homepage, wiki, comicsList} = this.state.character;
        console.log(this.props.idCharacter)
        return (
            <div className="char__info" key={"info" + id} data-info-id={id}>
                <div className="char__basics">
                    <img src={thumbnail} alt={name}/>
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