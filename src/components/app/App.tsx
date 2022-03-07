import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import MarvelService from "../../services/MarvelService";

import decoration from "../../resources/img/vision.png";
import { Component } from "react";
import { Character } from "../types/types";

interface IProps {

}
interface IState {
    idInfoChar: number,
    character: Character
}

class App extends Component<IProps, IState> {
    constructor(props) {
        super(props);

        this.state = {
            idInfoChar: 1011300,
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


    getCharInfo = (id: number) => {
        // this.setState({idInfoChar: id})
        this.getInfoCharacter(id);
    }

    componentDidMount() {
        this.getInfoCharacter(this.state.idInfoChar);
    }

    serviceMarvel = new MarvelService();
    getInfoCharacter = (id: number) => {
        this.serviceMarvel
            .getCharacter(id)
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
    }
    render() {
        const {idInfoChar, character} = this.state;

        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <RandomChar/>
                    <section className="char__content">
                        <CharList getCharInfo={this.getCharInfo}/>
                        <div className="wrapper-fixed">
                            <CharInfo idCharacter={idInfoChar} character={character}/>
                        </div>
                    </section>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    }
}

export default App;