import AppBanner from "../../components/appBanner/AppBanner";
import AppHeader from "../../components/appHeader/AppHeader";

const NotFound = () => {

    return (
        <>
            <AppHeader />
            <AppBanner />
            
            <div className="not-found">
                page not found - 404
            </div>
        </>
    )
}

export default NotFound;