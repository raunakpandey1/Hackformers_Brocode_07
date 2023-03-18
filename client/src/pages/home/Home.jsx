import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './home.css';
import HomeImg from '../../static/assests/homeimage.png'
export default function Home() {

    const navigate = useNavigate();

    const gotoUserDashbaord = (e) => {
        e.preventDefault();
        navigate('/user/dashboard')
    }

    return (
        <>
            <div className='homeDiv'>
                <div className="homeDivWrapper">
                    <div className="hdLeft">
                        <h2 className='hUpper'>Online</h2>
                        <h2 className='hUpper'><span>Complaint</span> Portal</h2>
                        <p>The only place where your complaints are precious to us! if you have a complaint againt any private or public entity in India, you are at the right place.</p>
                        <button onClick={gotoUserDashbaord}>Register Complaint</button>
                    </div>
                    <div className="hdRight">
                        <img src={HomeImg}/>
                    </div>
                </div>
            </div>
        </>
    )
}


