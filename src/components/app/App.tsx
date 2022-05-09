import { FC } from "react";

// modules
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//pages
import Characters from "../../pages/characters/Characters";
import Comic from "../../pages/comic/Comic";
import Comics from "../../pages/comics/Comics";

const App: FC = () => {
    return (
        <BrowserRouter>
            <div className="app">
                <Routes>
                    <Route path="/" element={<Navigate to="/characters"/>} />

                    <Route path="/characters" element={<Characters />} />
                    <Route path="/comics" element={<Comics />} />

                    <Route path={"/comics/:comicId"} element={<Comic />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App;