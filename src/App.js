import React, {Component} from "react";
import Login from "./component/Login";
import Sidebar from "./component/Sidebar";
import Tab from "./component/Tab";
import {BrowserRouter as Router, HashRouter, Route} from "react-router-dom";
import Users from "./component/Users";
import Relation from "./component/Relation";
import AddRelations from "./component/AddRelations";


class App extends Component {

    render() {
        return (
            <div>
            <Router>
                {/*path="/(|main-panel|home|login|register|restore-password|*/}
                {/*invalid-token|change-password|verify|news|why-is-it-worth|about-project|contact|about-us)/"*/}
               <Route path='/(|home|relation|addRelations)' component={Sidebar} />
               <Route path='/home' component={Tab} />
               <Route path='/relation' component={Relation} />
               <Route path='/addRelations' component={AddRelations}/>
               <Route path='/login' component={Login}/>

            </Router>
            </div>
        )
    }
}
export default App;
