import { FC } from "react";
import AppBanner from "../../components/appBanner/AppBanner";
import AppHeader from "../../components/appHeader/AppHeader";
import ErrorBoundary from "../../components/errorBoundary/ErrorBoundary";
import SingleComic from "../../components/singleComic/SingleComic";

const Comic: FC = () => {
    return (
        <>
            <ErrorBoundary nameChildren="AppHeader">
                <AppHeader />
            </ErrorBoundary>
            <main>
                <ErrorBoundary nameChildren="AppBanner">
                    <AppBanner />
                </ErrorBoundary>
                <ErrorBoundary nameChildren="SingleComic">
                    <SingleComic />
                </ErrorBoundary>
            </main>
        </>
    )
}

export default Comic;