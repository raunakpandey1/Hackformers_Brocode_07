import React, { useState } from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "../../axios"
import { AppContext } from '../../context/AppContext';
import './signin.css'

export default function AdminSignin() {
    const [errors, setErrors] = useState("");
    const [user, setUser] = useState({ email: "", password: "" })
    const [isLoading, setIsLoading] = useState(false);
    const {setContext} = useContext(AppContext)

    const navigate = useNavigate();
    const gotoSignup = (e) => {
        e.preventDefault();
        navigate('/police/sign-up')
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
            const { data } = await axios.post("/api/auth/signinpolice", user, config).catch(err => {
                if (err.response.status === 401) {
                    setErrors(err.response.data.error)
                    throw new Error(err.response.data.error);
                } else {
                    setErrors("Internal Server Error")
                    throw new Error(`Internal Server Error`);
                }
            });
            localStorage.setItem("policeAuthToken", data.token);
            localStorage.removeItem("userAuthToken");
            setContext()
            setIsLoading(false);
            navigate('/admin/dashboard')
        } catch (err) {
            setIsLoading(false)
        }
    }

    return (
        <div className='signinPage'>
            <form onSubmit={handleSubmit}>
                <div className="signinWrapper">
                    <h3>Police Sign In</h3>
                    {errors ?
                        <div className="errorDiv">
                            <span className="errorMessage">{errors}</span>
                        </div> : null}
                    <input type="email" placeholder='Email' required name="email" value={user.email} onChange={handleChange} />
                    <input type="password" placeholder='Password' required name="password" value={user.password} onChange={handleChange} />
                    <button type="submit" className='signinButton' disabled={isLoading}>{isLoading ? "Loading...": "Login"}</button>
                    <button className='gotosignUpButton' onClick={gotoSignup} >Register</button>
                </div>
            </form>
        </div>
    )
}