//modules
import { Component } from "react";

//my modules
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import MarvelService from "../../services/MarvelService";

//types
import { Character } from "../types/types";

//images
import decoration from "../../resources/img/vision.png";
import ButtonUp from "../buttonUp/ButtonUp";

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
            .then(character => this.setState(({character})))
    }
    render() {
        const {idInfoChar, character} = this.state;

        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <RandomChar getCharInfo={this.getCharInfo}/>
                    <section className="char__content">
                        <CharList getCharInfo={this.getCharInfo}/>
                        <div className="wrapper-sticky-char">
                            <CharInfo idCharacter={idInfoChar} character={character}/>
                        </div>
                    </section>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                    
                    <ButtonUp/>
                </main>
            </div>
        )
    }
}

export default App;