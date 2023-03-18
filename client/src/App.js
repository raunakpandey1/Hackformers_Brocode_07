import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home"
import PoliceSignin from "./pages/police_signin/PoliceSignin"
import PoliceSignup from "./pages/police_signup/PoliceSignup"
import Topbar from './components/topbar/Topbar';
// import AdminDashboard from './pages/admin_dashboard/AdminDashboard';
import PolicePrivateRoute from './components/routing/PolicePrivateRoute';
// import { AddContextProvider } from './context/AddContext';
import { AppContextProvider } from './context/AppContext';
import UserSignup from './pages/user_signup/UserSignup';
import UserSignin from './pages/user_signin/UserSignin';
import UserPrivateRoute from './components/routing/UserPrivateRoute.js';
import PoliceDashboard from './pages/police_dashboard/PoliceDashboard';
import UserDashboard from './pages/user_dashboard/UserDashboard';
// import UserDashboard from './pages/user_dashboard/UserDashboard';
// import { SearchContextProvider } from './context/SearchContext';
// import ProductPage from './pages/product_page/ProductPage';

function App() {

  return (
    <AppContextProvider>
      {/* <AddContextProvider> */}
        {/* <SearchContextProvider> */}
          <div className="App">
            <BrowserRouter>
              <Topbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/police/sign-in" element={<PoliceSignin />} />
                <Route path="/police/sign-up" element={<PoliceSignup />} />
                <Route path="/police/dashboard" element={<PoliceDashboard/>}/>
                {/* <Route path="/police/dashboard/:tabs" element={<AdminPrivateRoute><AdminDashboard /></AdminPrivateRoute>} /> */}

                <Route path="/user/sign-in" element={<UserSignin />} />
                <Route path="/user/sign-up" element={<UserSignup />} />
                <Route path="/user/dashboard" element={<UserDashboard/>}/>
                {/* <Route path="/user/dashboard/:tabs" element={<UserPrivateRoute><UserDashboard /></UserPrivateRoute>} /> */}

                {/* <Route path="/product/:product_id" element={<ProductPage/>} /> */}
              </Routes>
            </BrowserRouter>
          </div>
        {/* </SearchContextProvider> */}
      {/* </AddContextProvider> */}
    </AppContextProvider>
  );
}

export default App;