import React, {Component} from "react";
import Login from "./component/Login";
import {BrowserRouter as Router, Route} from "react-router-dom";

class App extends Component {

    render() {
        return (
            <div>
                <Login />
            </div>
        )
    }
}
export default App;
