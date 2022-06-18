import { Component } from "react";
import ErrorMessage from "../erorMessage/ErrorMessage";


interface IState {
    error: boolean
}

interface IProps {
    nameChildren: string,
    children: any
}

class ErrorBoundary extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        
        this.state = { 
            error: false
        }
    }

    componentDidCatch(error, errorInfo) {
        this.setState({error: true});
        console.log(error, errorInfo)
    }

    render() {
        const {nameChildren} = this.props;

        if(this.state.error)
            return (
                <>
                    {nameChildren}
                    <ErrorMessage/>
                </>
            )

        return this.props.children;
    }
}

export default ErrorBoundary;