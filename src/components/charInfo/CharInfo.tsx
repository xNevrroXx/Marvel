import './charInfo.scss';
import { Component } from 'react';

import { Character } from "../types/types"
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton';
import ErrorMessage from '../erorMessage/ErrorMessage';

interface IProps {
    idSelectedChar: number | null
}

interface IState {
    character: Character,
    loading: boolean,
    error: boolean
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
            },
            loading: false,
            error: false
        }
    }
 
    componentDidMount() {//если по умолчанию установят значение
        this.getInfoCharacter(this.props.idSelectedChar);
    }
    
    /* serviceMarvel = new MarvelService();
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

    componentDidUpdate(prevProps: IProps) {
        if(this.props.idSelectedChar !== prevProps.idSelectedChar && this.props.idSelectedChar !== null) {
            this.getInfoCharacter(this.props.idSelectedChar);
        }
    }
/* 
    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo)
    } */

    serviceMarvel = new MarvelService();
    getInfoCharacter = (id: number | null) => {
        if(!id) { 
            return
        }

        this.onCharLoading();

        this.serviceMarvel
            .getCharacter(id)
            .then(character => this.onCharLoaded(character))
            .catch(() => this.onError())

            
    }

    onCharLoading = () => {
        this.setState({
            loading: true,
            error: false
        })
    }
    onCharLoaded = (character: Character) => {
        this.setState(({
            character, 
            loading: false
        }));
    }
    onError = () => {
        this.setState({error: true, loading: false})
    }

    render() {
        const {idSelectedChar} = this.props;
        const {character, loading, error} = this.state;
        
        const errorMessage = error ? <ErrorMessage/> : null 
        const loadingSpinner = loading ? <Spinner/> : null;
        const skeleton = !(idSelectedChar || error || loading) ? <Skeleton/> : null
        const content = !(!idSelectedChar || loading || error) ? <View character={character}/> : null

        return (
            <div className="char__info" key={"info" + character.id}>
                {skeleton}
                {errorMessage}
                {loadingSpinner}
                {content}
            </div>
        )
    }
}


interface IViewProps {
    character: Character
}
class View extends Component<IViewProps> {
    render() {
        const {name, description, thumbnail: {url, objectFit}, homepage, wiki, comicsList} = this.props.character;

        return (
            <>
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
            </>
        )
    }
}

export default CharInfo;