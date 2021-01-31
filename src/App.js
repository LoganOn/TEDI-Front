import React, {Component} from "react";
import Login from "./component/Login";
import {BrowserRouter as Router, HashRouter, Route} from "react-router-dom";
import Users from "./component/Users";

class App extends Component {

    render() {
        return (
            <Router>
               <Route path='/' component={Login} />
               <Route path='/home' component={Users} />
            <div>

                <Login />
            </div>
            </Router>
        )
    }
}
export default App;
