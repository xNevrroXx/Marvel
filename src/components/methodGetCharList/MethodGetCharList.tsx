import { Component } from "react";

interface IProps {
    onChangeMethodGetChars: (isAllCharacters: boolean) => void
}
interface IState {
    isAllCharacters: boolean
}

class MethodGetCharList extends Component<IProps, IState> {
    state = {
        isAllCharacters: false
    }

    componentDidMount() {
        this.props.onChangeMethodGetChars(this.state.isAllCharacters);
    }

    onChangeMethodGetChars = (e) => {
        if(e.target.getAttribute("id") === "all chars method") {
            this.setState({isAllCharacters: true});
            this.props.onChangeMethodGetChars(true);
        }
        else {
            this.setState({isAllCharacters: false})
            this.props.onChangeMethodGetChars(false)
        }
        
    }

    render() {
        const {isAllCharacters} = this.state;

        return (
            <ul className="list-methods">
                <li style={{display: "flex", flexDirection: "column"}}>
                    <p>
                        <input
                            checked={isAllCharacters}
                            id="all chars method"
                            name="method"
                            type="radio"
                            onChange={this.onChangeMethodGetChars}
                        />
                        <label htmlFor="all chars method">all characters</label> 
                    </p>
                    <p>
                        <input
                            checked={!isAllCharacters}
                            id="full info method"
                            name="method"
                            type="radio" 
                            onChange={this.onChangeMethodGetChars}
                        />
                        <label htmlFor="full info method">only full info characters</label>
                    </p>
                </li>                  
            </ul> 
        )
    }
} 


export default MethodGetCharList;