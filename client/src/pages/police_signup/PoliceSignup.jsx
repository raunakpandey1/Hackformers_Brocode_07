import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "../../axios"
import './signup.css'
import { AppContext } from '../../context/AppContext';

export default function UserSignup() {

    const [errors, setErrors] = useState("");
    const [user, setUser] = useState({ name: "", email: "", password: "", cpassword: "" })
    const [isLoading, setIsLoading] = useState(false);
    const { setContext } = useContext(AppContext)

    const navigate = useNavigate();
    const gotoSignin = (e) => {
        e.preventDefault();
        navigate('/user/sign-in')
    }

    const handleChange = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        setUser({ ...user, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        setErrors(false);
        const config = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            }
        }
        try {
            const { data } = await axios.post("/api/user/auth/sign-up", user, config).catch(err => {
                if (err.response.status === 401) {
                    setErrors(err.response.data.error)
                    throw new Error(err.response.data.error);
                } else {
                    setErrors("Internal Server Error")
                    throw new Error(`Internal Server Error`);
                }
            });
            localStorage.setItem("userAuthToken", data.userAuthToken);
            localStorage.removeItem("adminAuthToken");
            setContext()
            setIsLoading(false);
            navigate('/user/dashboard/profile')
        } catch (err) {
            setIsLoading(false)
        }

    }

    return (
        <div className='signupPage'>
            <form onSubmit={handleSubmit}>
                <div className="signupWrapper">
                    <div className="signupLeft">
                        <h3>User Sign Up</h3>
                        {errors ?
                            <div className="errorDiv">
                                <span className="errorMessage">{errors}</span>
                            </div> : null}
                        <input type="text" placeholder='Name' required name="name" value={user.name} onChange={handleChange} />
                        <input type="email" placeholder='Email' required name="email" value={user.email} onChange={handleChange} />
                        <input type="password" placeholder='Password' required name="password" value={user.password} onChange={handleChange} />
                        <input type="password" placeholder='Confirm Password' required name="cpassword" value={user.cpassword} onChange={handleChange} />
                        <button type="submit" className='signupButton' disabled={isLoading}>{isLoading ? "Loading..." : "Register"}</button>
                        <button className='gotosignInButton' onClick={gotoSignin} >Sign In</button>
                    </div>
                </div>
            </form>
        </div>
    )
}