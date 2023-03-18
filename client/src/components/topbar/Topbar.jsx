import "./topbar.css";
import { NavLink } from "react-router-dom";
// import UserIcon from "../../static/svg/UserIcon";
// import CartIcon from "../../static/svg/CartIcon";
import MoreIcon from "../../static/svg/MoreIcon";
import { AppContext } from "../../context/AppContext";
import { useContext } from "react";
// import { logout_admin } from "../../service/adminApi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LogoutIcon from "../../static/svg/LogoutIcon";
// import { SearchContext } from "../../context/SearchContext";
// import SearchIcon from "../../static/svg/SearchIcon";
import HomeLogo from '../../static/assests/homelogo.png'

import { ethers } from "ethers";
export default function Topbar({ account, setAccount }) {
    const connectHandler = async () => {
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        const account = ethers.utils.getAddress(accounts[0]);
        setAccount(account);
    };
    const { user, userAuth, policeAuth, dispatch } = useContext(AppContext);
    // const {setProductName, searchProduct} = useContext(SearchContext)
    // const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate();

    const handleUserLogout = async () => {
        localStorage.removeItem("userAuthToken")
        dispatch({ type: "EMPTY_STATE" });
        navigate("/")
    }

    const handlePoliceLogout = async () => {
        localStorage.removeItem("policeAuthToken")
        dispatch({ type: "EMPTY_STATE" });
        navigate("/")
    }

    // const adminLogoutHandler = async () => {
    //     const res = await logout_admin()
    //     if (res) {
    //         localStorage.removeItem("policeAuthToken")
    //         dispatch({ type: "EMPTY_STATE" });
    //         navigate("/")
    //     }
    // }

    // const handleInputChange = (e) => {
    //     e.preventDefault();
    //     setSearchValue(e.target.value);
    //     setProductName(e.target.value)
    // }

    // const handleSearch = (e)=>{
    //     e.preventDefault();
    //     searchProduct();
    // }

    return (
        <div className="topbarWrapper">
            <NavLink exact to="/" className="nav-logo">
                <img src={HomeLogo} />
            </NavLink>
            {/* <form onSubmit={handleSearch} className="searchDiv">
                <button type="submit" className="searchButton"><SearchIcon/></button>
                <input onChange={handleInputChange} value={searchValue} placeholder="Search for brands, products etc"/>
            </form> */}
            <ul className="topbarList">
                {/* {
                    !policeAuth && <>
                        <li className="nav-item">
                            <NavLink to="user/dashboard/cart" className="nav-link"><CartIcon /></NavLink>
                            {user && user.cart_products.length > 0 ? <div className="cartBadge"><span>{user.cart_products.length}</span></div> : null}
                        </li>
                        <li className="nav-item">
                            <NavLink to="user/dashboard/profile" className="nav-link"><UserIcon /></NavLink>
                        </li>
                    </>
                } */}

                {/* {
                    !userAuth ?
                        <div class="dropdown-menu">
                            <div className="dropdown-flex">
                                <div class="menu-btn"><MoreIcon /></div>
                                <div class="menu-content">
                                    {policeAuth ?
                                        <>
                                            <NavLink exact className="links-hidden" to='/admin/dashboard/profile'>Dashboard</NavLink>
                                            <span className="links-hidden" onClick={adminLogoutHandler}>Logout</span>
                                        </>
                                        :
                                        <>
                                            <NavLink exact className="links-hidden" to='/police/sign-in'>Police Signin</NavLink>
                                        </>}

                                </div>
                            </div>
                        </div> 
                    : null
                } */}

                {
                    userAuth ? (
                        <>
                            <NavLink exact className="dashboardBtn" to="/user/dashboard">
                                Dashboard
                            </NavLink>
                            {account ? (
                                <button className="nav_wA">
                                    {account.slice(0, 6) + "..." + account.slice(38, 42)}
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    className="nav__connect"
                                    onClick={connectHandler}
                                >
                                    Connect
                                </button>
                            )}
                            <div className="logoutBtn" onClick={handleUserLogout}><LogoutIcon /></div>
                        </>
                    ) : (
                        <>
                            {policeAuth ? (
                                <>
                                    <NavLink exact className="dashboardBtn" to="/police/dashboard">
                                        Dashboard
                                    </NavLink>
                                    {account ? (
                                        <button className="nav_wA">
                                            {account.slice(0, 6) + "..." + account.slice(38, 42)}
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            className="nav__connect"
                                            onClick={connectHandler}
                                        >
                                            Connect
                                        </button>
                                    )}
                                    <div className="logoutBtn" onClick={handlePoliceLogout}><LogoutIcon /></div>
                                </>
                            ) : (
                                <>
                                    <NavLink exact className="userSignInBtn" to="/user/sign-in">
                                        Sign in
                                    </NavLink>
                                    <div class="dropdown-menu">
                                        <div className="dropdown-flex">
                                            <div class="menu-btn">
                                                <MoreIcon />
                                            </div>
                                            <div class="menu-content">
                                                <NavLink
                                                    exact
                                                    className="links-hidden"
                                                    to="/police/sign-in"
                                                >
                                                    Police Sign in
                                                </NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </>
                    )
                }
            </ul >
        </div >
    );
}
