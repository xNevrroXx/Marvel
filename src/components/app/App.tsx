import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import MarvelService from "../../services/MarvelService";

import decoration from "../../resources/img/vision.png";
import { Component } from "react";

interface IProps {

}
interface IState {
    idInfoChar: number
}

class App extends Component<IProps, IState> {
    constructor(props) {
        super(props);

        this.state = {
            idInfoChar: 1011300
        }
    }


    onGetCharInfo = (id: number) => {
        this.setState({idInfoChar: id})
    }

    render() {
        const {idInfoChar} = this.state;

        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <RandomChar/>
                    <div className="char__content">
                        <CharList onGetCharInfo={this.onGetCharInfo}/>
                        <CharInfo idCharacter={idInfoChar}/>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    }
}

export default App;