import React, { Component, useState, useEffect } from "react";
import "./Auth.css";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser, loginUser } from "../../redux/actions/authActions";
import classnames from "classnames";

const Login = ({ auth, registerUser, errors, loginUser }) => {
  let send = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  useEffect(() => {
    if (auth && auth.isAuthenticated) {
      send("/dashboard/overview");
    }
  });
  console.log(auth);
  const LOGINUser = (e) => {
    e.preventDefault();
    const newUser = {
      email: email,
      password: password,
    };
    loginUser(newUser);
  };
  return (
    <section className="register">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="signup-right">
              <form className="AuthForm">
                <img className="form-logo" src="./logo.PNG" alt="" />
                <h1>Login</h1>

                <div class="form-row">
                  <div class="form-group col-md-12">
                    <label htmlFor="Email">Email</label> <br />
                    <input
                      type="email"
                      className="input-control"
                      placeholder="Enter your email"
                      id="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />{" "}
                    <br />
                    <span className="text-danger">
                      {errors && errors.email ? errors.email : null}
                      {errors && errors.emailNotFound
                        ? errors.emailNotFound
                        : null}
                    </span>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-12">
                    <label htmlFor="Password">Password</label> <br />
                    <input
                      type="password"
                      className="input-control"
                      placeholder="Enter your password"
                      id="password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />{" "}
                    <br />
                    <span className="text-danger">
                      {errors && errors.password ? errors.password : null}
                      {errors && errors.passwordIncorrect
                        ? errors.passwordIncorrect
                        : null}
                    </span>
                  </div>
                </div>
                <p
                  onClick={() => {
                    send("/forget-password");
                  }}
                  className="forget-password"
                >
                  Forget Password?
                </p>
                <div
                  style={{ marginTop: "30px" }}
                  className="bottom-btn-wrapper form-btns"
                >
                  <button onClick={LOGINUser} className="bottom-btn left">
                    Login
                  </button>
                  <button
                    onClick={() => {
                      send("/");
                    }}
                    className="bottom-btn right"
                  >
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
Login.propTypes = {
  registerUser: PropTypes.func.isRequired,

  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, { registerUser, loginUser })(Login);

// class Register extends Component {
//   constructor() {
//     super();
//     this.state = {
//       name: "",
//       email: "",
//       password: "",
//       password2: "",
//       errors: {},
//     };
//   }
//   componentDidMount() {
//     // If logged in and user navigates to Register page, should redirect them to dashboard
//     if (this.props.auth.isAuthenticated) {
//       // Send("/dashboard");
//     }
//   }

//   componentWillReceiveProps(nextProps) {
//     if (nextProps.errors) {
//       this.setState({
//         errors: nextProps.errors,
//       });
//     }
//   }

//   onChangeRegister = (e) => {
//     this.setState({ [e.target.id]: e.target.value });
//   };
//   registerSubmit = (e) => {
//     e.preventDefault();
//     const newUser = {
//       name: this.state.name,
//       email: this.state.email,
//       password: this.state.password,
//       password2: this.state.password2,
//     };
//     this.props.registerUser(newUser, this.props.history);
//   };

//   render() {

//     return (

//     );
//   }
// }
// Register.propTypes = {
//   registerUser: PropTypes.func.isRequired,

//   auth: PropTypes.object.isRequired,
//   errors: PropTypes.object.isRequired,
// };
// const mapStateToProps = (state) => ({
//   auth: state.auth,
//   errors: state.errors,
// });
// export default connect(mapStateToProps, { registerUser })(Register);
