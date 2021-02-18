import React, {Component} from "react";
import Switch from "react-switch";
import axios from "axios";
import '../css/UserPanel.css'


class UserPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                email: "",
                phone: "",
                password: "",
                repassword: "",
                notification: false,
            },
            checked: false,
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(checked) {
        this.setState({checked});
    }

    async componentDidMount() {
        this.setState({isLoading: true})
        axios
            .get(`http://localhost:8080/api/users/${localStorage.getItem("userId")}`)
            .then((response) => {
                console.log(response.data)
                this.loadData(response.data)
            })
    }

    loadData(data) {
        this.setState({user:{phone: data.phone, email:data.email}});
    }

    render() {
        return (
            <div className="user">
            <div className="box-user">
                <div className="grid-container-user">
                    <label className="grid-rows">Email</label>
                    <input className="grid-rows-input" value={this.state.user.email} onChange={event => this.setState({user:{email: event.target.value}})}/>
                    <label className="grid-rows">Telefon</label>
                    <input className="grid-rows-input" value={this.state.user.phone}/>
                    <label className="grid-rows">Hasło</label>
                    <input className="grid-rows-input" type="password"/>
                    <label className="grid-rows">Powtórz hasło</label>
                    <input className="grid-rows-input" type="password"/>
                    <label className="grid-rows">Notification</label>
                    <Switch className="grid-rows" onChange={this.handleChange} checked={this.state.checked}/>
                </div>
                <button type="submit" onChange={this.handleChange} checked={this.state.checked}>Zapisz</button>
            </div>
            </div>
        );
    }
}

export default UserPanel;
