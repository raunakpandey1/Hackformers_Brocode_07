import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import './policedashboard.css'
import { ethers } from "ethers";
import RefreshIcon from "../../static/svg/RefreshIcon";
import axios from "../../axios";

export default function PoliceDashboard({
    provider,
    account,
    complaintContract,
}) {

    const { police } = useContext(AppContext)

    const [data, setData] = useState([]);
    let newArr = [];
    // console.log(police.name)
    const Getdata = async () => {
        let dataArray;

        try {
            // console.log(police.name)
            dataArray = await complaintContract.displayReceivedComplaint("add1");
            // console.log(dataArray)
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
            for (let i = 0; i < dataArray.length; i++) {
                let dat1 = await axios.get(dataArray[i]);
                newArr.push(dat1.data);
            }
            setData(newArr)
            // dataArray.forEach(async (e) => {
            //     let dat1 = await axios.get(e);
            //     newArr.push(dat1.data);
            //     // setData([...data,  dat1.data]);
            //     // console.log(typeof dat1.data)
            // });

            //   console.log(newArr);
            //   setData(newArr)
        } catch (e) {

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

    const rewardUser = async (event, e) => {
        event.preventDefault()
        console.log(e)
        const amount = { value: ethers.utils.parseEther("0.001") };
        const signer = complaintContract.connect(provider.getSigner());
        //   console.log(signer)
        const transaction = await signer.Reward(e, amount);
        await transaction.wait();
        console.log("Transaction is done");
    }

    return (
        <div className='policeDashboard'>
            <div className="pdWrapper">
                <div className="pdProfile">
                    <div className="pdfLeft">
                        <img src="https://fpslakeland.com/wp-content/uploads/bb-importer/0270baba-a05b-5a2e-9170-b277e47d2353/Portrait_Placeholder.png" />
                    </div>
                    <div className="pdfRight">
                        <h2>{police.name}</h2>
                        <p>{police.email}</p>
                        <p>{police.contact}</p>
                        <p>{police.address} - {police.pincode}</p>
                    </div>
                </div>

                {/* <div className="createComplaints">
                    <button className="createComBtn">
                        +
                    </button>
                </div> */}
                <div className="comHeading">
                    <h3>All Complaints</h3>
                    <button className="refreshBtn" onClick={Getdata}>
                        <RefreshIcon />
                    </button>
                </div>
                <div className="pdComplaints">
                    {/* <button className="primary" onClick={Getdata}>
                        Get url
                    </button>{" "}
                    <button className="primary" onClick={Getdata1}>
                        Get Data
                    </button> */}
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
                                        <button className="rewardBtn" onClick={(event) => rewardUser(event, e.walletAddress)}>Reward</button>
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
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore rerum reprehenderit perspiciatis dignissimos magnam, quis minima repellat sapiente sunt, eos ea? Assumenda perspiciatis beatae sit aliquam laboriosam alias ipsum corrupti!</p>
                            <select>
                                <option value="Action">Action</option>
                                <option value="Accept">Accept</option>
                                <option value="Reject">Reject</option>
                            </select>
                            <button className='rewardBtn'>Reward</button>
                        </div>
                    </div> */}


                </div>
            </div>
        </div>
    )
}