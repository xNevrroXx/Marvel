// modules
import { Component } from "react";

// my modules
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ButtonUp from "../buttonUp/ButtonUp";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

// types
// import { Character } from "../types/types";

// images
import decoration from "../../resources/img/vision.png";

interface IProps {

}
interface IState {
    idSelectedChar: number | null
}

class App extends Component<IProps, IState> {
    constructor(props) {
        super(props);

        this.state = {
            idSelectedChar: null
        }
    }


    onCharSelected = (id: number) => {
        this.setState({idSelectedChar: id});
    }
    
    render() {
        const {idSelectedChar} = this.state;

        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <RandomChar onCharSelected={this.onCharSelected}/>
                    <section className="char__content">
                        <CharList onCharSelected={this.onCharSelected}/>
                        <div className="wrapper-sticky-char">
                            <ErrorBoundary nameChildren="Character Info">
                                <CharInfo idSelectedChar={idSelectedChar}/>
                            </ErrorBoundary>
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