import React, { useContext, useEffect, useState } from "react";
import CreateComplaintForm from "../../components/form/CreateComplaintForm";
import "./userdashboard.css";
import axios from "../../axios";
import { AppContext } from "../../context/AppContext";
import { ethers } from "ethers";

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
    // console.log("helo", complaintContract, account)
    try {
        console.log(account)
       dataArray = await complaintContract.displayComplaint(account);

      //   setData(dataArray)

      //   await dataArray.forEach(async (e) => {
      //     await fetch(e).then(async (response) => {
      //         let ob = await response.json()
      //         // console.log(ob)
      //         // newArr.push(ob)
      //         setData((dat) => [...dat, ob]);
      //     });
      //     // setData((dat) => [...dat, e]);
      //   });
      dataArray.forEach(async (e) => {
        // let dat1 = await axios.get(e);
        let dat1 = await axios.get(e);
          newArr.push(dat1.data);
        // setData([...data,  dat1.data]);
        // console.log(typeof dat1.data)
      });

      //   console.log(newArr);
      //   setData(newArr)
    } catch (e) {
    //   console.log("Helo", e)
      alert("You don't have access");
    }
    // const isEmpty = Object.keys(dataArray).length === 0;

    // if (!isEmpty) {

    //   const str = dataArray.toString();
    //   const str_array = str.split(",");
    //   // console.log(str);
    //   console.log(str_array);
    //   const images = str_array.map(async(item, i) => {
    //     let dat1 = await axios.get(item);
    //     // setData([...data,  dat1.data]);

    //   });
    //   console.log(images)
    //   setData([...images]);
    // } else {
    //   alert("No image to display");
    // }
    //   console.log(dataArray)
  };
  const Getdata1 = () => {
    setData(newArr)
    console.log(newArr);
  };
  console.log(data)

  const rewardUser = async () => {
    const amount = { value: ethers.utils.parseEther("0.005") };
    const transaction = await complaintContract.Reward(account, amount);
    await transaction.wait();
    console.log("Transaction is done");
  }

  console.log(newArr)
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
          {/* <button className="createComBtn">
                        +
                    </button> */}
          <CreateComplaintForm
            signal={true}
            provider={provider}
            account={account}
            disable={user.strike > 5}
            complaintContract={complaintContract}
          />
        </div>

        <div className="pdComplaints">
          <button className="primary" onClick={Getdata}>
            Get url
          </button>{" "}
          <button className="primary" onClick={Getdata1}>
            Get Data
          </button>
          {/* <div className="image-list">{newArr}</div>
          {console.log(data.length)} */}
          {data.length > 0 &&
            data.map((e) => {
              return (
                <div className="pComplaintDiv">
                  <div className="pcdLeft">
                    <img src={e.image} />
                  </div>
                  <div className="pcdRight">
                    <h3>{e.name}</h3>

                    <p>{e.description}</p>
                    <h3>{e.walletAddress}</h3>
                    <select value={e.status}>
                      <option value="Action">Action</option>
                      <option value="Accept">Accept</option>
                      <option value="Reject">Reject</option>
                    </select>
                    <button className="rewardBtn" onClick={rewardUser}>Reward</button>
                  </div>
                </div>
              );
            })}
          {/* <div className="pComplaintDiv">
            <div className="pcdLeft">
              <img src="https://i.ndtvimg.com/mt/2014-12/indian_traffic_generic_thinkstock_650_bigstry.jpg" />
            </div>
            <div className="pcdRight">
              <h3>Pollution due to daily road rage</h3>
              <span>18/03/2023 16:25</span>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
                rerum reprehenderit perspiciatis dignissimos magnam, quis minima
                repellat sapiente sunt, eos ea? Assumenda perspiciatis beatae
                sit aliquam laboriosam alias ipsum corrupti!
              </p>
              <select>
                <option value="Action">Action</option>
                <option value="Accept">Accept</option>
                <option value="Reject">Reject</option>
              </select>
              <button className="rewardBtn">Reward</button>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
