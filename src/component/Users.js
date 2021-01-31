import React, {Component} from "react";
class Users extends Component {


    render() {
        return (
            <div className="Users">
                <p>------------------------------</p>

                <p>{this.props.list.userId}</p>
                <p>{this.props.list.name}</p>
                <p>{this.props.list.email}</p>
                <p>{this.props.list.role}</p>
            </div>
        );
    }
}
export default Users;
