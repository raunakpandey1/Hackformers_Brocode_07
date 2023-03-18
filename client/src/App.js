import { ethers } from "ethers";
import { useEffect, useState } from "react";
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home"
import PoliceSignin from "./pages/police_signin/PoliceSignin"
import PoliceSignup from "./pages/police_signup/PoliceSignup"
import Topbar from './components/topbar/Topbar';
// import AdminDashboard from './pages/admin_dashboard/AdminDashboard';
import PolicePrivateRoute from './components/routing/PolicePrivateRoute';

import { AppContextProvider } from './context/AppContext';
import UserSignup from './pages/user_signup/UserSignup';
import UserSignin from './pages/user_signin/UserSignin';
import UserPrivateRoute from './components/routing/UserPrivateRoute.js';
import PoliceDashboard from './pages/police_dashboard/PoliceDashboard';
import UserDashboard from './pages/user_dashboard/UserDashboard';
// import UserDashboard from './pages/user_dashboard/UserDashboard';
 
// import ProductPage from './pages/product_page/ProductPage';


// ABIs
import Complaints from "./abis/Complaints.json";

// Config
import config from "./config.json";


function App() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);     
  const [complaintContract, setComplaintContract] = useState(null);  
  const loadBlockchainData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum); //creates a new instance of the Web3Provider class from the ethers.js library, which is used to interact with the Ethereum blockchain.
    
    setProvider(provider);
    const network = await provider.getNetwork();  //information about the current Ethereum network
    
    // console.log(config[network.chainId].paintingMarketPlace.address , config[network.chainId].escrow.address)
    
    //Create a JavaScript object that represents an Ethereum smart contract.
    const complaint = new ethers.Contract(
      config[network.chainId].complaints.address,
      Complaints,
      provider
    );
   
    setComplaintContract(complaint)

    //listens for changes to the currently selected Ethereum account
    window.ethereum.on("accountsChanged", async () => {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = ethers.utils.getAddress(accounts[0]);
      setAccount(account);
    });
  };
 

  useEffect(() => {
    loadBlockchainData();
    // retrieveFiles();
  }, []);


  return (
    <AppContextProvider>
       
          <div className="App">
            <BrowserRouter>
              <Topbar account={account} setAccount={setAccount}/>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/police/sign-in" element={<PoliceSignin />} />
                <Route path="/police/sign-up" element={<PoliceSignup />} />
                <Route path="/police/dashboard" element={<PolicePrivateRoute><PoliceDashboard/></PolicePrivateRoute>}/>
                {/* <Route path="/police/dashboard/:tabs" element={<AdminPrivateRoute><AdminDashboard /></AdminPrivateRoute>} /> */}

                <Route path="/user/sign-in" element={<UserSignin />} />
                <Route path="/user/sign-up" element={<UserSignup />} />
                <Route path="/user/dashboard" element={<UserPrivateRoute><UserDashboard/></UserPrivateRoute>}/>
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