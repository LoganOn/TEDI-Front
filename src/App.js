import React, {Component} from "react";
import './Login.css';
import RegisterImage from './img/register.svg'
import LoginImage from './img/login.svg'

class App extends Component {

    state = {
        signUpMode: false
    }


        // componentDidMount() {
        // fetch('Http://localhost:8080/api/users')
        //     .then(response => response.json())
        //     .then(data =>{
        //         console.log(data);
        //         this.setState({data})
        //     })
        // }

    constructor(props) {
        super(props);
        this.state = {signUpMode: false};
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(state => ({
            signUpMode: !state.signUpMode
        }));
    }


    render() {
        return (
           <div className={`container ${this.state.signUpMode ? 'sign-up-mode' : null }`}>
                <div className="forms-container">
                    <div className="signin-signup">
                        <form action="#" className="sign-in-form">
                            <h2 className="title">Sign in</h2>
                            <div className="input-field">
                                <i className="fas fa-user"></i>
                                <input type="text" placeholder="Email"/>
                            </div>
                            <div className="input-field">
                                <i className="fas fa-lock"></i>
                                <input type="password" placeholder="Password"/>
                            </div>
                            <input type="submit" value="Login" className="btn solid"/>
                        </form>
                        <form action="#" className="sign-up-form">
                            <h2 className="title">Sign up</h2>
                            <div className="input-field">
                                <i className="fas fa-user"></i>
                                <input type="text" placeholder="Company"/>
                            </div>
                            <div className="input-field">
                                <i className="fas fa-envelope"></i>
                                <input type="email" placeholder="Email"/>
                            </div>
                            <div className="input-field">
                                <i className="fas fa-lock"></i>
                                <input type="password" placeholder="Password"/>
                            </div>
                            <input type="submit" className="btn" value="Sign up" />
                        </form>
                    </div>
                </div>

                <div className="panels-container">
                    <div className="panel left-panel">
                        <div className="content">
                            <h3>New here ?</h3>
                            <p>
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
                                ex ratione. Aliquid!
                            </p>
                            <button className="btn transparent" id="sign-in-btn" onClick={this.handleClick}>
                                Sign up
                            </button>
                        </div>
                        <img className="image"  src={LoginImage} alt=""/>
                    </div>
                    <div className="panel right-panel">
                        <div className="content">
                            <h3>One of us ?</h3>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                                laboriosam ad deleniti.
                            </p>
                            <button className="btn transparent" id="sign-in-btn" onClick={this.handleClick}>
                                Sign in
                            </button>
                        </div>
                        <img src={RegisterImage}  className="image" alt=""/>
                    </div>
                </div>
            </div>
        );
    }
}
export default App;
