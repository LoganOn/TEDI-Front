import React, {Component} from "react";
import Users from "./Users";
class App extends Component {

    state =
        {
            data: [],
            name: "elo",
            languages: ["1", "2", "3"]
        }


        componentDidMount() {
        fetch('Http://localhost:8080/api/users')
            .then(response => response.json())
            .then(data =>{
                console.log(data);
                this.setState({data})
            })
        }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <p>
                        Edit <code>src/App.js</code> and save to reload .
                    </p>
                    <div>
                        {this.state.data.map(users => <Users list={users}/>)}
                    </div>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                </header>
            </div>
        );
    }
}
export default App;
