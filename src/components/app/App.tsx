// modules
import { Component } from "react";

// my modules
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

// types
// import { Character } from "../types/types";

// images
import decoration from "../../resources/img/vision.png";
import ButtonUp from "../buttonUp/ButtonUp";

interface IProps {

}
interface IState {
    idSelectedChar: number,
    isAllCharacters: boolean
}

class App extends Component<IProps, IState> {
    constructor(props) {
        super(props);

        this.state = {
            idSelectedChar: 1011300,
            isAllCharacters: true
        }
    }


    onCharSelected = (id: number) => {
        this.setState({idSelectedChar: id})
    }

    
    render() {
        const {idSelectedChar, isAllCharacters} = this.state;

        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <RandomChar onCharSelected={this.onCharSelected}/>
                    <section className="char__content">
                        <CharList isAllCharacters={isAllCharacters} onCharSelected={this.onCharSelected}/>
                        <div className="wrapper-sticky-char">
                            <CharInfo idSelectedChar={idSelectedChar}/>
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