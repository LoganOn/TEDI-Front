import React, {Component} from "react";
import "./App.css";
import Users from "./Users";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Sidebar from "./components/Sidebar";


function App(){
    return(
        <div className={"App"}>
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

    // render() {
    //     return (
            // <div className="App">
            //     <header className="App-header">
            //         <p>
            //             Edit <code>src/App.js</code> and save to reload .
            //         </p>
            //        {/*<div>*/}
          //          {/*    {this.state.data.map(users => <Users list={users}/>)}*/}
          //          {/*</div>*/}
          //           <>
          //           <Router>
          //              <Switch>
          //                  <Route path='/' />
          //              </Switch>
          //
          //           <Navbar></Navbar>
          //           </Router>
          //           </>
            //         <a
            //             className="App-link"
            //             href="https://reactjs.org"
            //             target="_blank"
            //             rel="noopener noreferrer"
            //         >
            //             Learn React
            //         </a>
            //     </header>
            // </div>
//         );
//     }
// }
export default App;
