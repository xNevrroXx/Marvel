import { FC } from "react";

import "./errorMessage.scss";
import gif from "./error.gif";

const ErrorMessage: FC = () => {

    return (
        <div className="error-image">
            <img 
            src={gif}
            alt="error"
            />
        </div>
    )
}

export default ErrorMessage;