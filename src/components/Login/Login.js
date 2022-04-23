import React, { useState } from 'react';
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { Link, useHistory } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Login = () => {
    const [loginData, setLoginData] = useState({});
    const { loginUser } = useAuth();


    const history = useHistory();

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData);
    }

    const handleLoginSubmit = e => {
        loginUser(loginData.email, loginData.password, history);
        e.preventDefault();
    }

    return (
        <div className="bg">
            <div className="container">
                <div className="row d-flex justify-content-center align-items-center vh-100">
                    {/* <div className="col-md-8 col-lg-5 col-xl-8 mx-auto mb-4 mb-lg-0">
                    </div> */}
                    <div className="col-11 col-md-8 col-lg-7 col-xl-4 shadow-lg p-3 p-md-5 rounded-3 mx-auto mx-xl-0 ms-xl-auto bg-white">
                        <h1 className="text-start login-title mb-5 fw-bold">Login</h1>
                        <form onSubmit={handleLoginSubmit}>
                            <div className="form-floating mb-3">
                                <input
                                    onBlur={handleOnBlur}
                                    name="email"
                                    type="email" className="form-control" id="floatingLoginEmail" placeholder="name@example.com" />
                                <label htmlFor="floatingLoginEmail">Email address</label>
                            </div>
                            <div className="form-floating mb-4">
                                <input
                                    onBlur={handleOnBlur}
                                    name="password"
                                    type="password" className="form-control" id="floatingLoginPassword" placeholder="Password" />
                                <label htmlFor="floatingLoginPassword">Password</label>
                            </div>

                            <div className="d-flex justify-content-between align-items-center">

                                <div className="form-check mb-0">
                                    <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                                    <label className="form-check-label" htmlFor="form2Example3">
                                        Remember me
                                    </label>
                                </div>
                                <a href="#!" className="text-body">Forgot password?</a>
                            </div>

                            <div className="text-center  mt-4 pt-2">
                                <button className="btn btn-success w-100" type="submit">Login <FontAwesomeIcon icon={faSignInAlt} /></button>
                                <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="/signup" type="button" onClick={() => {
                                    history.replace('/signup')
                                    window.location.reload();
                                }}
                                    className="link-danger">Sign Up</a></p>
                            </div>

                            <div className="divider d-flex align-items-center my-4">
                                <p className="text-center fw-bold mx-2 mb-0" style={{ color: 'rgb(69, 82, 110)' }}>OR</p>
                            </div>

                            <div className="d-flex flex-row align-items-center justify-content-center">
                                <p className="lead fw-normal mb-0 me-3">Sign in with</p>
                                <button type="button" className="btn btn-outline-success rounded-circle mx-1">
                                    <i className="fab fa-facebook-f"></i>
                                </button>

                                <button type="button" className="btn btn-outline-success rounded-circle mx-1">
                                    <i className="fab fa-google"></i>
                                </button>

                                <button type="button" className="btn btn-outline-success rounded-circle mx-1">
                                    <i className="fab fa-twitter"></i>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;