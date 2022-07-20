import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
// import "./Navbar.css";
import { FaGithub } from "react-icons/fa";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../redux/actions/authActions";

class Navbar extends Component {
  constructor(props) {
    super(props);
  }
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
    console.log(this.props.auth);
    return (
      <nav class="navbar navbar-expand-md navbar-dark fixed-top">
        <div className="container">
          <Link class="navbar-brand border-none" to="/">
            MERN
          </Link>
          <button
            class="navbar-toggler d-lg-none"
            type="button"
            data-toggle="collapse"
            data-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="collapsibleNavId">
            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
              {/* <li class="nav-item active">
                <Link class="nav-link" to="#">
                  Home <span class="sr-only">(current)</span>
                </Link>
              </li> */}
              {this.props.auth.isAuthenticated === false ? (
                <>
                  <li class="nav-item">
                    <Link
                      className="nav-link btn btn-login button-outline-none"
                      to="/login"
                    >
                      Login
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link
                      className="nav-link btn btn-register button-outline-none"
                      to="/register"
                    >
                      Signup
                    </Link>
                  </li>
                </>
              ) : null}

              {this.props.auth.isAuthenticated ? (
                <li onClick={this.onLogoutClick} class="nav-item">
                  <Link
                    className="nav-link btn btn-register button-outline-none"
                    to="/register"
                  >
                    Logout
                  </Link>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
