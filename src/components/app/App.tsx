// modules
import { Component, FC, useState } from "react";

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

const App: FC = () => {
    const [idSelectedChar, setIdSelectedChar] = useState<number | null>(null);

    const onCharSelected = (id: number) => {
        setIdSelectedChar(id);
    }

    return (
        <div className="app">
            <AppHeader/>
            <main>
                <RandomChar onCharSelected={onCharSelected}/>
                <section className="char__content">
                    <CharList onCharSelected={onCharSelected}/>
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

export default App;