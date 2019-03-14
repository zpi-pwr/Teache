import React, {Component} from "react"

class Register extends Component {
    render() {
        return (
            <div>
                <div className="card bg-light" style={{width: '400px', opacity: '0.92'}}>
                    <article className="card-body mx-auto" style={{maxwidth: '400px'}}>
                        <h4 className="card-title mt-3 text-center">Create Account</h4>
                        <p>
                            <a href="" className="btn btn-block btn-google"> <i
                                className="fab fa-facebook-f"/> Login via Google</a>
                        </p>
                        <p className="divider-text text-center">
                            <span className="bg-light">OR</span>
                        </p>
                        <form>
                            <div className="form-group input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"> <i className="fa fa-user"/> </span>
                                </div>
                                <input name="" className="form-control" placeholder="Full name" type="text"/>
                            </div>
                            {/*// form-group// */}
                            <div className="form-group input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"> <i className="fa fa-envelope"/> </span>
                                </div>
                                <input name="" className="form-control" placeholder="Email address" type="email"/>
                            </div>
                            {/*// <!-- form-group end.// -->*/}
                            <div className="form-group input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"> <i className="fa fa-lock"/> </span>
                                </div>
                                <input className="form-control" placeholder="Create password" type="password"/>
                            </div>
                            {/*// <!-- form-group// -->*/}
                            <div className="form-group input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"> <i className="fa fa-lock"/> </span>
                                </div>
                                <input className="form-control" placeholder="Repeat password" type="password"/>
                            </div>
                            {/*// <!-- form-group// -->*/}
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary btn-block"> Create Account</button>
                            </div>
                            {/*// <!-- form-group// -->*/}
                            <p className="text-center">Have an account? <a href="">Log In</a></p>
                        </form>
                    </article>
                </div>
                {/*// <!-- card.// -->*/}
            </div>
        )
    }
}

export default Register;
