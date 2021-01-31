import React, {Component} from "react";
import Login from "./component/Login";
import Sidebar from "./component/Sidebar";
import Tab from "./component/Tab";
import {BrowserRouter as Router, HashRouter, Route} from "react-router-dom";
import Users from "./component/Users";
import styled from 'styled-components'

// const Container = styled.div`
//   width: 70%;
//   left: 300px;
//   height: 70%;
// `

class App extends Component {

    render() {
        return (
            <div>
            <Router>
               <Route path='/' component={Sidebar} />
               {/*<Container>*/}
               <Route path='/home' component={Tab} />
               {/*</Container>*/}
            </Router>
         {/*//   <Tab />*/}
            </div>
        )
    }
}
export default App;
