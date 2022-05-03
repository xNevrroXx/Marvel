import { FC, useEffect, useState } from "react";

interface IProps {
    onChangeMethodGetCharsProp: (isAllCharacters: boolean) => void,
    startIsAllCharacters: boolean
}

const MethodGetCharList: FC<IProps> = ({onChangeMethodGetCharsProp, startIsAllCharacters}) => {
    const [isAllCharacters, setIsAllCharacters] = useState<boolean>(startIsAllCharacters);

    useEffect(() => {
        onChangeMethodGetCharsProp(isAllCharacters);
    }, [])

    function onChangeMethodGetChars(e) {
        const activeMethod = e.target.getAttribute("id");

        if(activeMethod === "all chars method") {
            setIsAllCharacters(true);
            onChangeMethodGetCharsProp(true);
        }
        else {
            setIsAllCharacters(false)
            onChangeMethodGetCharsProp(false)
        }
    }

    return (
        <ul className="list-methods">
            <li style={{display: "flex", flexDirection: "column"}}>
                <p>
                    <input
                        checked={isAllCharacters}
                        id="all chars method"
                        name="method"
                        type="radio"
                        onChange={onChangeMethodGetChars}
                    />
                    <label htmlFor="all chars method">all characters</label> 
                </p>
                <p>
                    <input
                        checked={!isAllCharacters}
                        id="full info method"
                        name="method"
                        type="radio" 
                        onChange={onChangeMethodGetChars}
                    />
                    <label htmlFor="full info method">only full info characters</label>
                </p>
            </li>                  
        </ul> 
    )
} 


export default MethodGetCharList;