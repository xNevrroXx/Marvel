import { FC } from "react";
import { useParams } from "react-router-dom";
import AppBanner from "../../components/appBanner/AppBanner";
import AppHeader from "../../components/appHeader/AppHeader";
import SingleComic from "../../components/singleComic/SingleComic";

const Comic: FC = () => {
    const locationId = useParams().comicId;
    
    return (
        <>
            <AppHeader />
            <main>
                <AppBanner />
                <SingleComic comicId={locationId} />
            </main>
        </>
    )
}

export default Comic;