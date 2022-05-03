//modules
import { FC } from "react";

//styles
import "./ButtonUp.scss";

const ButtonUp: FC = () => {
    const onGoUp = () => {
        window.scroll(0, 0);
    }

    return (
        <button 
            className="button-up"
            onClick={onGoUp}
        >
            <svg width="100px" height="100px" viewBox="0 0 512 512">
                <title></title>
                <g id="icomoon-ignore">
                </g>
                <path d="M438.627 201.373l-160-160c-12.496-12.497-32.757-12.497-45.254 0l-160 160c-12.497 12.497-12.497 32.758 0 45.255s32.758 12.498 45.255 0l105.372-105.373v306.745c0 17.673 14.327 32 32 32s32-14.327 32-32v-306.745l105.373 105.373c6.248 6.248 14.438 9.372 22.627 9.372s16.379-3.124 22.627-9.373c12.497-12.497 12.497-32.757 0-45.254z"></path>
            </svg>
        </button>
    )
}

export default ButtonUp;