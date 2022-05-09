import { Link, useLocation } from 'react-router-dom';
import './appHeader.scss';

const AppHeader = () => {
    const location = useLocation();

    return (
        <header className="app__header">
            <h1 className="app__title">
                <a href="#">
                    <span>Marvel</span> information portal
                </a>
            </h1>

            <nav className="app__menu">
                <ul>
                    <li>
                        <Link to="/characters"
                            style={location.pathname.includes("/characters") ? {color: "#9F0013"} : {}}
                        >
                            Characters
                        </Link>
                    </li>

                    /

                    <li>
                        <Link to="/comics"
                            style={location.pathname.includes("/comics") ? {color: "#9F0013"} : {}}
                        >
                            Comics
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;