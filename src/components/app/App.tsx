import { FC, lazy, Suspense } from "react";

// modules
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//pages
const Characters = lazy(() => import("../../pages/characters/Characters"));
const Character = lazy(() => import("../../pages/character/Character"));
const Comic = lazy(() => import("../../pages/comic/Comic"));
const Comics = lazy(() => import("../../pages/comics/Comics"));
const NotFound = lazy(() => import("../../pages/not-found/NotFound"));
const Spinner = lazy(() => import("../spinner/Spinner"));

const App: FC = () => {
    return (
        <BrowserRouter>
            <div className="app">
                <Suspense fallback={<Spinner />}>
                    <Routes>
                        <Route path="/" element={<Navigate to="/characters"/>} />

                        <Route path="/characters" element={<Characters />} />
                        <Route path="/comics" element={<Comics />} />

                        <Route path="/characters/:characterId" element={<Character />} />
                        <Route path={"/comics/:comicId"} element={<Comic />} />

                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Suspense>
            </div>
        </BrowserRouter>
    )
}

export default App;