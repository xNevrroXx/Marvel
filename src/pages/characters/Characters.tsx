import { FC, useCallback, useState } from "react";

// my modules
import AppHeader from "../../components/appHeader/AppHeader"
import RandomChar from "../../components/randomChar/RandomChar";
import CharList from "../../components/charList/CharList";
import CharInfo from "../../components/charInfo/CharInfo";
import ButtonUp from "../../components/buttonUp/ButtonUp";
import ErrorBoundary from "../../components/errorBoundary/ErrorBoundary";
import dataContext from "../../components/context/context";

// images
import decoration from "../../resources/img/vision.png";

const {Provider} = dataContext; 
const Characters: FC = () => {
    
    const [test, setTest] = useState<any>({
        idSelectedChar: null,
        getCharInfo: useCallback((id: number) => forceChangeId(id), [])
    });
    function forceChangeId(id: number) {
        setTest({...test, idSelectedChar: id});
    }

    return (
        <Provider value={test}>
            <ErrorBoundary nameChildren="AppHeader" >
                <AppHeader/>
            </ErrorBoundary>
            <main>
                <ErrorBoundary nameChildren="random character" >
                    <RandomChar />
                </ErrorBoundary>
                <section className="char__content">
                    <ErrorBoundary nameChildren="character list">
                        <CharList />
                    </ErrorBoundary>
                    <div className="wrapper-sticky-char">
                        <ErrorBoundary nameChildren="Character Info">
                            <CharInfo />
                        </ErrorBoundary>
                    </div>
                </section>
                <img className="bg-decoration" src={decoration} alt="vision"/>
                <ErrorBoundary nameChildren="button up" >
                    <ButtonUp/>
                </ErrorBoundary>
            </main>
        </Provider>
    )
}

export default Characters;