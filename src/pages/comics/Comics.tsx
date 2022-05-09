import { FC } from "react";
import AppBanner from "../../components/appBanner/AppBanner";
import AppHeader from "../../components/appHeader/AppHeader";
import ComicsList from "../../components/comicsList/ComicsList";

const Comics: FC = () => {
    return (
        <>
            <AppHeader />
            <main>
                <AppBanner />
                <ComicsList />
            </main>
        </>
    )
}

export default Comics;