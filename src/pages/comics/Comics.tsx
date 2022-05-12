import { FC } from "react";
import AppBanner from "../../components/appBanner/AppBanner";
import AppHeader from "../../components/appHeader/AppHeader";
import ComicsList from "../../components/comicsList/ComicsList";
import ErrorBoundary from "../../components/errorBoundary/ErrorBoundary";

const Comics: FC = () => {
    return (
        <>
            <ErrorBoundary nameChildren="appHeader" >
                <AppHeader />
            </ErrorBoundary >
                
            <main>
                <ErrorBoundary nameChildren="appBanner" >
                    <AppBanner />
                </ErrorBoundary>
                    
                <ErrorBoundary nameChildren="comicsList" >
                    <ComicsList />
                </ErrorBoundary>
            </main>
        </>
    )
}

export default Comics;