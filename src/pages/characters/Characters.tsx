import { FC, useState } from "react";

// my modules
import AppHeader from "../../components/appHeader/AppHeader"
import RandomChar from "../../components/randomChar/RandomChar";
import CharList from "../../components/charList/CharList";
import CharInfo from "../../components/charInfo/CharInfo";
import ButtonUp from "../../components/buttonUp/ButtonUp";
import ErrorBoundary from "../../components/errorBoundary/ErrorBoundary";

// images
import decoration from "../../resources/img/vision.png";

const Characters: FC = () => {
    const [idSelectedChar, setIdSelectedChar] = useState<number | null>(null);

    const onCharSelected = (id: number) => {
        setIdSelectedChar(id);
    }

    return (
        <>
            <ErrorBoundary nameChildren="AppHeader" >
                <AppHeader/>
            </ErrorBoundary>
            <main>
                <ErrorBoundary nameChildren="random character" >
                    <RandomChar onCharSelected={onCharSelected}/>
                </ErrorBoundary>
                <section className="char__content">
                    <ErrorBoundary nameChildren="character list">
                        <CharList onCharSelected={onCharSelected}/>
                    </ErrorBoundary>
                    <div className="wrapper-sticky-char">
                        <ErrorBoundary nameChildren="Character Info">
                            <CharInfo idSelectedChar={idSelectedChar}/>
                        </ErrorBoundary>
                    </div>
                </section>
                <img className="bg-decoration" src={decoration} alt="vision"/>
                <ErrorBoundary nameChildren="button up" >
                    <ButtonUp/>
                </ErrorBoundary>
            </main>
        </>
    )
}

export default Characters;