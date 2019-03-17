import React, {Component} from "react"
import NavLink from "react-bootstrap/NavLink";

class Register extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div>
                <div className="card bg-light" style={{width: '400px', opacity: '0.92'}}>
                    <article className="card-body mx-auto" style={{maxwidth: '400px'}}>
                        <h4 className="card-title mt-3 text-center">Create Account</h4>
                        <form>
                            <div className="form-group input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"> <i className="fa fa-user"/> </span>
                                </div>
                                <input
                                    name="name"
                                    id="name"
                                    className="form-control"
                                    placeholder="Full name"
                                    type="text"
                                    value={this.props.nameVal}
                                    onChange={(event) => this.props.handleInput(event)}/>
                            </div>
                            <div className="form-group input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"> <i className="fa fa-envelope"/> </span>
                                </div>
                                <input
                                    name="email"
                                    id="email"
                                    className="form-control"
                                    placeholder="Email address"
                                    type="email"
                                    value={this.props.emailVal}
                                    onChange={(event) => this.props.handleInput(event)}/>
                            </div>
                            <div className="form-group input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"> <i className="fa fa-lock"/> </span>
                                </div>
                                <input
                                    name="password"
                                    id="password"
                                    className="form-control"
                                    placeholder="Create password"
                                    type="password"
                                    value={this.props.passwordVal}
                                    onChange={(event) => this.props.handleInput(event)}/>
                            </div>
                            <div className="form-group input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"> <i className="fa fa-lock"/> </span>
                                </div>
                                <input
                                    name="passwordCheck"
                                    id="passwordCheck"
                                    className="form-control"
                                    placeholder="Repeat password"
                                    type="password"
                                    value={this.props.passwordCheckVal}
                                    onChange={(event) => this.props.handleInput(event)}/>
                            </div>
                            <div className="form-group">
                                <button onClick={() => this.props.register()} type="button" className="btn btn-primary btn-block"> Create Account</button>
                            </div>
                            <p className="text-center">
                                Have an account? <NavLink to="/login">Log In</NavLink>
                            </p>
                        </form>
                    </article>
                </div>
            </div>
        )
    }
}

export default Register;
