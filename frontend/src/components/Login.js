import React, {Component} from "react"
import NavLink from "react-bootstrap/NavLink";

class Login extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div>
                <div className="card bg-light" style={{width: '400px', opacity: '0.92'}}>
                    <article className="card-body mx-auto" style={{maxwidth: '400px'}}>
                        <h4 className="card-title mt-3 text-center">Log In!</h4>
                        <form>
                            <div className="form-group input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"> <i className="fa fa-user"/> </span>
                                </div>
                                <input
                                    name="name"
                                    id="name"
                                    className="form-control"
                                    placeholder="Login"
                                    type="text"
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
                                    placeholder="Password"
                                    type="email"
                                    onChange={(event) => this.props.handleInput(event)}/>
                            </div>
                            <div className="form-group">
                                <button onClick={() => this.props.register()} type="button" className="btn btn-primary btn-block">Log in</button>
                            </div>
                        </form>
                    </article>
                </div>
            </div>
        )
    }
}

export default Login;
