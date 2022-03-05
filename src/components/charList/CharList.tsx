import './charList.scss';
import { Component } from 'react';
import MarvelService from '../../services/MarvelService';

interface IProps {
    onGetCharInfo: (id: number) => void
}
interface IState {
    limit: number,
    listCharacters: any[]
}

class CharList extends Component<IProps, IState> {
    constructor(props) {
        super(props);

        this.state = {
            limit: 9,
            listCharacters: []
        }

    }

    marvelService = new MarvelService();
    componentDidMount() {
        this.getListCharacters();
    }

    getListCharacters = () => {
        let listCharacters: any[] = [];

        this.marvelService
            .getAllCharacters(this.state.limit)
            .then(result => {
                result.data.results.forEach(character => listCharacters.push(character));

                this.setState(({listCharacters}));
            })
        this.setState({limit: this.state.limit+9})
    }

    onGetCharInfo = (e) => {
        const idCharacter = e.currentTarget.getAttribute("data-id");
        this.props.onGetCharInfo(+idCharacter);
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
                                    onClick={this.onGetCharInfo}
                                >
                                    <img src={character.thumbnail.path + "." + character.thumbnail.extension} alt={character.name}/>
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