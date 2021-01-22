import React, {Component} from "react";
import ReactDOM from 'react-dom';
import './Login.css';
import {Login} from 'src/Login'

class Sign extends Component {
render() {
    return (
<div className="container">
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
                <input type="submit" className="btn" value="Sign up"/>
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
                <button className="btn transparent" id="sign-up-btn">
                    Sign up
                </button>
            </div>
            <img src="img/login.svg" className="image" alt=""/>
        </div>
        <div className="panel right-panel">
            <div className="content">
                <h3>One of us ?</h3>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                    laboriosam ad deleniti.
                </p>
                <button className="btn transparent" id="sign-in-btn">
                    Sign in
                </button>
            </div>
            <img src="img/register.svg" className="image" alt=""/>
        </div>
    </div>
</div>
    );
}
}
export default Sign;