import { FC } from "react";
import Helmet from "react-helmet";

// own components
import AppBanner from "../../components/appBanner/AppBanner";
import AppHeader from "../../components/appHeader/AppHeader";
import ComicsList from "../../components/comicsList/ComicsList";
import ErrorBoundary from "../../components/errorBoundary/ErrorBoundary";


const Comics: FC = () => {
    return (
        <>
          <Helmet>
            <meta
              name="description"
              content="Page with comics"
            />
            <title>Marvel comics list</title>
          </Helmet>
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