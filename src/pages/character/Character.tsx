import AppBanner from "../../components/appBanner/AppBanner";
import AppHeader from "../../components/appHeader/AppHeader";
import SingleChar from "../../components/singleChar/SingleChar";

const Character = () => {
    return (
        <>
            <AppHeader />
            <main>
                <AppBanner />
                <SingleChar />
            </main>
        </>
    )
}

export default Character;