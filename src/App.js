import React, {Component} from "react";
import Login from "./component/Login";
import Sidebar from "./component/Sidebar";
import Tab from "./component/Tab";
import {BrowserRouter as Router, HashRouter, Route} from "react-router-dom";
import Relation from "./component/Relation";
import AddRelations from "./component/AddRelations";
import UserPanel from "./component/UserPanel";


class App extends Component {

    render() {
        return (
            <div>
                <Router>
                    <Route path='/(||home|relation|addRelations|userPanel)' component={Sidebar}/>
                    <Route path='/home' component={Tab}/>
                    <Route path='/relation' component={Relation}/>
                    <Route path='/addRelations' component={AddRelations}/>
                    <Route path='/userPanel' component={UserPanel}/>
                    <Route path='/login' component={Login}/>
                    {/*<Route path='/item' component={Item}/>*/}
                </Router>
            </div>
        )
    }
}
export default App;
