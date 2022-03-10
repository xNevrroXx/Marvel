import "./spinner.scss";

const Spinner = () => {
    return (
        // <svg version="1.0" width="259px" height="34px" viewBox="0 0 457 60" style={styles}>
        //     <g>
        //         <circle fill="#000" cx="-31" cy="30" r="30"/>
        //         <circle fill="#323232" cx="-97" cy="30" r="24"/>
        //         <circle fill="#646464" cx="-163" cy="30" r="19"/>
        //         <circle fill="#c8c8c8" cx="-229.5" cy="30.5" r="13.5"/>
        //         <circle fill="#e1e1e1" cx="-295" cy="31" r="11"/>
        //         <animateTransform attributeName="transform" type="translate" values="61 0;127 0;193 0;259 0;325 0;391 0;457 0;523 0;589 0;655 0;721 0;787 0;0 0;0 0;0 0;0 0;0 0;0 0;0 0;0 0;0 0;0 0;0 0;" calcMode="discrete" dur="1760ms" repeatCount="indefinite"/>
        //     </g>
        //     <g>
        //         <circle fill="#000" cx="488" cy="30" r="30"/>
        //         <circle fill="#323232" cx="554" cy="30" r="24"/>
        //         <circle fill="#646464" cx="620" cy="30" r="19"/>
        //         <circle fill="#c8c8c8" cx="686.5" cy="30.5" r="13.5"/>
        //         <circle fill="#e1e1e1" cx="753" cy="31" r="11"/>
        //         <animateTransform attributeName="transform" type="translate" values="0 0;0 0;0 0;0 0;0 0;0 0;0 0;0 0;0 0;0 0;0 0;-61 0;-127 0;-193 0;-259 0;-325 0;-391 0;-457 0;-523 0;-589 0;-655 0;-721 0;-787 0;" calcMode="discrete" dur="1760ms" repeatCount="indefinite"/>
        //     </g>
        // </svg>
        <svg className="spinner" xmlns="http://www.w3.org/2000/svg" version="1.0" width="64px" height="64px" viewBox="0 0 128 128">
            <path d="M64.4 16a49 49 0 0 0-50 48 51 51 0 0 0 50 52.2 53 53 0 0 0 54-52c-.7-48-45-55.7-45-55.7s45.3 3.8 49 55.6c.8 32-24.8 59.5-58 60.2-33 .8-61.4-25.7-62-60C1.3 29.8 28.8.6 64.3 0c0 0 8.5 0 8.7 8.4 0 8-8.6 7.6-8.6 7.6z">
                <animateTransform attributeName="transform" type="rotate" from="0 64 64" to="360 64 64" dur="1800ms" repeatCount="indefinite">
                </animateTransform>
            </path>
        </svg>
    )
}

export default Spinner;