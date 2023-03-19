import React, { useContext, useEffect, useState } from "react";
import CreateComplaintForm from "../../components/form/CreateComplaintForm";
import "./userdashboard.css";
import axios from "../../axios";
import { AppContext } from "../../context/AppContext";
import { ethers } from "ethers";
import RefreshIcon from "../../static/svg/RefreshIcon";

export default function UserDashboard({
  provider,
  account,
  complaintContract,
}) {
  const { user } = useContext(AppContext);
  const [data, setData] = useState([]);
  let newArr = [];

  const Getdata = async () => {
    let dataArray;
    try {
      dataArray = await complaintContract.displayComplaint(account);
      console.log("dataArray", dataArray)
      for(let i=0; i<dataArray.length; i++){
        let dat1 = await axios.get(dataArray[i]);
        newArr.push(dat1.data);
      }
      setData(newArr)
    } catch (e) {
      alert("You don't have access");
    }
  };

  const Getdata1 = () => {
    setData(newArr)
    console.log(newArr);
  };

  const rewardUser = async () => {
    const amount = { value: ethers.utils.parseEther("0.005") };
    const transaction = await complaintContract.Reward(account, amount);
    await transaction.wait();
    console.log("Transaction is done");
  }

  return (
    <div className="policeDashboard">
      <div className="pdWrapper">
        <div className="pdProfile">
          <div className="pdfLeft">
            <img src={user.profileImg} />
          </div>
          <div className="pdfRight">
            <h2>{user.fullname}</h2>
            <p>{user.email}</p>
            <div className="strikeDiv">
              <div className={`${user.accountStatus ? "strike" : "strikeRed"}`}>
                {user.strike}
              </div>
              <div className={`${user.accountStatus ? "accStatus" : "accInactive"}`}>
                {user.accountStatus ? "Active" : "Inactive"}
              </div>
            </div>
          </div>
        </div>

        <div className="createComplaints">
          <button className="refreshBtn" onClick={Getdata}>
            <RefreshIcon />
          </button>
          <CreateComplaintForm
            signal={true}
            provider={provider}
            account={account}
            disable={user.strike > 5}
            complaintContract={complaintContract}
          />
        </div>

        <div className="pdComplaints">
          {data.length > 0 &&
            data.map((e) => {
              return (
                <div className="pComplaintDiv">
                  <div className="pcdLeft">
                    <img src={e.image} />
                  </div>
                  <div className="pcdRight">
                    <h3>{e.subject}</h3>

                    <p>{e.description}</p>
                    <h3>{e.walletAddress}</h3>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
