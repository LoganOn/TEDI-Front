import React, {Component} from "react";
import Login from "./component/Login";
import Sidebar from "./component/Sidebar";
import Tab from "./component/Tab";
import {BrowserRouter as Router, HashRouter, Route} from "react-router-dom";
import Relation from "./component/Relation";
import AddRelations from "./component/AddRelations";
import UserPanel from "./component/UserPanel";
import Items from "./component/Items";


class App extends Component {

    render() {
        return (
            <div>
                <Router>
                    <Route path='/(||home|relation|addRelations|userPanel|items)' component={Sidebar}/>
                    <Route path='/home' component={Tab}/>
                    <Route path='/relation' component={Relation}/>
                    <Route path='/addRelations' component={AddRelations}/>
                    <Route path='/userPanel' component={UserPanel}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/items' component={Items}/>
                </Router>
            </div>
        )
    }
}
export default App;
