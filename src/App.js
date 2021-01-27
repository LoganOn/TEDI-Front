import React, {Component} from "react";
import "./App.css";
import Users from "./Users";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Sidebar from "./components/Sidebar";


function App(){
    return(
        <div>
            <Sidebar />
        </div>
    )
}
// class App extends Component {
//
//     state =
//         {
//             data: [],
//             name: "elo",
//             languages: ["1", "2", "3"]
//         }


        // componentDidMount() {
        // fetch('Http://localhost:8080/api/users')
        //     .then(response => response.json())
        //     .then(data =>{
        //         console.log(data);
        //         this.setState({data})
        //     })
        // }
export default App;
