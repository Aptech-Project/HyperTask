import React, { Component } from 'react';
import { connect } from 'react-redux';
import history from "@history";

class Auth extends Component {

    /*eslint-disable-next-line no-useless-constructor*/
    constructor(props) {
        super(props);
        this.checkLogin();
    }

    checkLogin = () => {
        if (this.props.user === 'undefined') {
            history.push({
                pathname: "/login",
            });
        }
    }

    render() {
        const { children } = this.props;
        return (
            < React.Fragment >
                {children}
            </React.Fragment >
        );
    }
}

const mapStateToProps = state => ({
    user: state.login.userAuth
});
export default connect(mapStateToProps, null)(Auth);
