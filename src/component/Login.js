import axios from "axios";
import '../css/Login.css';
import RegisterImage from '../img/register.svg'
import LoginImage from '../img/login.svg'
import React, {Component} from "react";

const emailRegex = /\S+@\S+\.\S+/;

class Login extends Component{
state = {
    email: {
        fieldName: 'email',
        value: '',
        showError: false,
        validate: () => this.validateEmail(),
    },
    password: {
        fieldName: 'password',
        value: '',
        showError: false,
        validate: () => this.validatePassword(),
    },
    repassword: {
        fieldName: 'repassword',
        value: '',
        showError: false,
        validate: () => this.validatePassword(),
    },
    role: {
        fieldName: 'role',
        value: '',
        showError: false,
    },
    company: {
        fieldName: 'company',
        value: '',
        showError: false,
    },
    loginResponse: {
        fieldName: 'loginResponse',
        response: null,
    },
    avatar: {
        fieldName: 'avatar',
        avatarImg: '',
        avatarUserId: '',
    },
    isModalOpen: false,
    signUpMode: false
};

refresh = () => {
    window.location.reload(false);
};

toggleIsModalOpen = () => {
    const { isModalOpen } = this.state;
    this.setState({ isModalOpen: !isModalOpen });
};

updateField = (fieldName, value) => {
    const { state } = this;
    state[fieldName].value = value;
    this.setState(state);
};

validatePassword = () => {
    const { password } = this.state;
    password.showError = password.value.length < 6;
    this.setState({ password });
};

validateEmail = () => {
    const { email } = this.state;
    email.showError = !emailRegex.test(email.value);
    this.setState({ email });
};

areAllFieldsCorrect = () => {
    const { state } = this;
    const fields = Object.values(state);
    for (let i = 0; i < fields.length - 1; i += 1) {
        if (fields[i].showError) return false;
    }
    return true;
};
handleLogin = (e) => {
    e.preventDefault();

    const { state } = this;
    Object.values(state)
        .forEach((field) => {
            if (field.fieldName != 'loginResponse' && field.fieldName != 'avatar' && field.fieldName) {
                //field.validate();
            }
        });
    if (this.areAllFieldsCorrect()) {
        delete state.isLoginError;
        const data = {};
        Object.keys(state)
            .forEach((fieldName) => {
                data[fieldName] = state[fieldName].value;
            });
        axios
            .post('http://localhost:8080/api/login', data
            )
            .then((response) => {
                localStorage.setItem('userId', response.data.userId);
                localStorage.setItem('role', response.data.role);
                if (response.data.role == 'supplier') {
                     this.props.history.push('/home');
                    console.log("supplier")
                } else if (response.data.role == 'customer') {
                    this.props.history.push('/home');
                    console.log("customer")
                } else  {
                    console.log("chuj wie");
                }
            })
    }
};

// onAuth = (data) => {
//     this.props.onAuth({
//         authenticated: true,
//         role: data.role,
//         token: data.token,
//         refreshToken: data.refreshToken,
//     });
// };

handleRegister = (e) => {
    e.preventDefault();

    const { state } = this;
    Object.values(state)
        .forEach((field) => {
            if (field.fieldName != 'loginResponse' && field.fieldName != 'avatar' && field.fieldName) {
                //field.validate();
            }
        });

    if (this.areAllFieldsCorrect()) {
        delete state.isLoginError;
        const data = {};
        Object.keys(state)
            .forEach((fieldName) => {
                data[fieldName] = state[fieldName].value;
            });
        axios
            .post('http://localhost:8080/api/register', data
            )
            .then((response) => {
                localStorage.setItem('userId', response.data.userId);
                if (response.status == 200) {
                    this.handleClick()
                }
            })
    }
};
// onLoadedData = (data) => {
//     this.props.onLoadedData({
//         //name: data.name,
//         phone: data.phone,
//         email: data.email,
//         userId: data.userId,
//         imageUrl: data.imageUrl,
//     });
// };
//
// onAuth = (data) => {
//     this.props.onAuth({
//         authenticated: true,
//         role: data.role,
//         token: data.token,
//         refreshToken: data.refreshToken,
//     });
// };

constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
}

handleClick() {
    this.setState(state => ({
        signUpMode: !state.signUpMode
    }));
}


render() {
    const { t } = this.props;
    return (
        <div className={`container ${this.state.signUpMode ? 'sign-up-mode' : null }`}>
            <div className="forms-container">
                <div className="signin-signup">
                    <form action="#" className="sign-in-form">
                        <h2 className="title">Sign in</h2>
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <input type="text" onChange={(e) => this.updateField('email', e.target.value)} placeholder="Email" value={this.state.email.value} />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input type="password" onChange={(e) => this.updateField('password', e.target.value)} placeholder="Password"/>
                        </div>
                        <input type="submit" value="Login" className="btn solid" onClick={this.handleLogin}/>
                    </form>
                    <form action="#" className="sign-up-form">
                        <h2 className="title">Sign up</h2>
                        {/*<div className="">*/}
                            <i className="fas fa-user"></i>
                            <select defaultValue="select" className="input-field" onChange={(e) => this.updateField('company', e.target.value)}>
                                <option  hidden value="select" disabled>Rola</option>
                                <option  data-id="supplier">supplier</option>
                                <option  data-id="customer">customer</option>
                            </select>
                        {/*</div>*/}
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <input type="text" onChange={(e) => this.updateField('company', e.target.value)} placeholder="Company"/>
                        </div>
                        <div className="input-field">
                            <i className="fas fa-envelope"></i>
                            <input type="email" onChange={(e) => this.updateField('email', e.target.value)} placeholder="Email"/>
                        </div>
                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input type="password" onChange={(e) => this.updateField('password', e.target.value)} placeholder="Password"/>
                        </div>
                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input type="password" onChange={(e) => this.updateField('repassword', e.target.value)} placeholder="Repassword"/>
                        </div>
                        <input type="submit" className="btn" value="Sign up" onClick={this.handleRegister}/>
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
export default Login