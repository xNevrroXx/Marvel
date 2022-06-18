import { createContext } from "react";

const dataContext = createContext({
    idSelectedChar: 10,
    getCharInfo: (id: number): void => {},
})

export default dataContext;