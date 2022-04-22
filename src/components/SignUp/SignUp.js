import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { Link, useHistory } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import swal from 'sweetalert';

const SignUp = () => {
    const [signUpData, setSignUpData] = useState({});
    const { registerUser } = useAuth();

    const history = useHistory();


    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newSignUpData = { ...signUpData };
        newSignUpData[field] = value;
        setSignUpData(newSignUpData);
    }

    const handleSignUpSubmit = e => {
        if (signUpData.password !== signUpData.password2) {
            swal("Passwords doesn't match!", "Please check password and then try again", "error");
        }
        else {
            registerUser(signUpData.name, signUpData.email, signUpData.password, history);
            e.target.reset();
        }

        e.preventDefault();

    }
    return (
        <div className="bg">
            <div className="container">
                <div className="row d-flex justify-content-center align-items-center vh-100">
                    {/* <div className="col-md-8 col-lg-5 col-xl-8 mx-auto mb-4 mb-lg-0">
                </div> */}
                    <div className="col-11 col-md-8 col-lg-7 col-xl-4 shadow-lg p-3 p-md-5 rounded-3 mx-auto mx-xl-0 ms-xl-auto bg-white">
                        <h1 className="text-start login-title mb-5 fw-bold">Sign Up</h1>
                        <form onSubmit={handleSignUpSubmit}>
                            <div className="form-floating mb-3">
                                <input
                                    onBlur={handleOnBlur}
                                    name="name"
                                    type="text" className="form-control" id="floatingSignUpName" placeholder="Your Name" />
                                <label htmlFor="floatingSignUpName">Your Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    onBlur={handleOnBlur}
                                    name="email"
                                    type="email" className="form-control" id="floatingLoginEmail" placeholder="name@example.com" />
                                <label htmlFor="floatingSignUpEmail">Email Address</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    onBlur={handleOnBlur}
                                    name="password"
                                    type="password" className="form-control" id="floatingSignUpPassword1" placeholder="Password" />
                                <label htmlFor="floatingSignUpPassword">Password</label>
                            </div>
                            <div className="form-floating mb-4">
                                <input
                                    onBlur={handleOnBlur}
                                    name="password2"
                                    type="password" className="form-control" id="floatingSignUpPassword2" placeholder="Confirm Password" />
                                <label htmlFor="floatingSignUpPassword2">Confirm Password</label>
                            </div>

                            <div className="text-center  mt-4 pt-2">
                                <button className="btn btn-success w-100" type="submit">Sign Up <FontAwesomeIcon icon={faSignInAlt} /></button>
                                <p className="small fw-bold mt-2 pt-1 mb-0">Already have an account? <a href="/login" type="button" onClick={() => {
                                    history.replace('/login')
                                    window.location.reload();
                                }}
                                    className="link-danger">Login</a></p>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;