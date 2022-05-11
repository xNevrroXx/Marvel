import { FC } from "react";

// modules
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Character from "../../pages/character/Character";

//pages
import Characters from "../../pages/characters/Characters";
import Comic from "../../pages/comic/Comic";
import Comics from "../../pages/comics/Comics";
import NotFound from "../../pages/not-found/NotFound";

const App: FC = () => {
    return (
        <BrowserRouter>
            <div className="app">
                <Routes>
                    <Route path="/" element={<Navigate to="/characters"/>} />

                    <Route path="/characters" element={<Characters />} />
                    <Route path="/comics" element={<Comics />} />

                    <Route path="/characters/:characterId" element={<Character />} />
                    <Route path={"/comics/:comicId"} element={<Comic />} />

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App;