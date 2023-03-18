import "./topbar.css";
import { NavLink } from "react-router-dom";
// import UserIcon from "../../static/svg/UserIcon";
// import CartIcon from "../../static/svg/CartIcon";
// import MoreIcon from "../../static/svg/MoreIcon";
import { AppContext } from "../../context/AppContext";
import { useContext } from "react";
import { logout_admin } from "../../service/policeApi";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
// import { SearchContext } from "../../context/SearchContext";
// import SearchIcon from "../../static/svg/SearchIcon";

export default function Topbar() {

    const { user, userAuth, adminAuth, dispatch } = useContext(AppContext)
    // const {setProductName, searchProduct} = useContext(SearchContext)
    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate();

    const adminLogoutHandler = async () => {
        const res = await logout_admin()
        if (res) {
            localStorage.removeItem("adminAuthToken")
            dispatch({ type: "EMPTY_STATE" });
            navigate("/")
        }
    }

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
            <NavLink exact to="/" className="nav-logo">Icon Here</NavLink>
            {/* <form onSubmit={handleSearch} className="searchDiv">
                <button type="submit" className="searchButton"><SearchIcon/></button>
                <input onChange={handleInputChange} value={searchValue} placeholder="Search for brands, products etc"/>
            </form> */}
            <ul className="topbarList">
                {/* {
                    !adminAuth && <>
                        <li className="nav-item">
                            <NavLink to="user/dashboard/cart" className="nav-link">
                                <CartIcon />
                            </NavLink>
                            {user && user.cart_products.length>0 ? <div className="cartBadge"><span>{user.cart_products.length}</span></div> : null}
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
                                    {adminAuth ?
                                        <>
                                            <NavLink exact className="links-hidden" to='/admin/dashboard/profile'>Dashboard</NavLink>
                                            <span className="links-hidden" onClick={adminLogoutHandler}>Logout</span>
                                        </>
                                        :
                                        <>
                                            <NavLink exact className="links-hidden" to='/admin/sign-in'>admin signin</NavLink>
                                        </>}

                                </div>
                            </div>
                        </div> 
                    : null
                } */}
            </ul>
        </div>
    );
}