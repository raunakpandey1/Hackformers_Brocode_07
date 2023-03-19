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
    const [complaint, setComplaint] = useState();
    let newArr = [];
    // console.log(police.name)
    const Getdata = async () => {
        let dataArray;

        try {
            // console.log(police.name)
            dataArray = await complaintContract.displayReceivedComplaint(police.name);
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
                newArr.push({...dat1.data, cid : dataArray[i].split('/')[4]});
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


     
      const [cmpStatus, setCmpStatus] = useState();

      const handleChange1 = async(event , e)=>{


        // setComplaint({...e , complaintStatus : event.target.value});

        console.log(e?.cid)
        

        // var data1 = JSON.stringify({ "ipfsPinHash": complaint?.cid ,"name": "Name1",
        // "keyvalues": {
        //     "complaintStatus" :  event.target.value,
        //     "cid": complaint?.cid,
        //     "description" : complaint.description,
        //     "image" : complaint.image,
        //     "name" : complaint.name,
        //     "reward" : complaint.reward,
        //     "subject" : complaint.subject,
        //     "walletAddress" : complaint.walletAddress


        // }});

        // var config = {
        // method: 'put',
        // url: 'https://api.pinata.cloud/pinning/hashMetadata',
        // headers: { 
        //     Authorization:
        //       "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIzM2QwNjQ5Yy0wODdhLTRkMDItYjRlZi1hNTZkZDBjOTUwNTgiLCJlbWFpbCI6IndlZ2ViYTM4NTVAb25pZWNhbi5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiYTE3OGU2ZGE1Njc4NjE4NzMzMWQiLCJzY29wZWRLZXlTZWNyZXQiOiI2MzAxYzhkMGNmM2Y0ZTE4MGM5MzYxNTA4NTg3ZDViM2YxY2E0NDJmZTIzYzM0YjQ0ZTUyN2FhN2Q2NmQ2YTQ4IiwiaWF0IjoxNjc5MTUyNTk3fQ.N5bn_EyGxEkSUWeoX1KQlm2K1F2k3ZamJNZ5nyyv0_o"
        //   ,
        //     "Content-Type": "application/json"
        // },
        // data: data1
        // };

        // const res = await axios(config);

        // console.log(res.data);
        // // e.complainStatus = event.target.value
        // console.log(complaint)
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
                                        <h3>{e.subject}</h3>

                                        <p>{e.description}</p>
                                        <h5>{e.walletAddress}</h5>
                                        <select value={e.status}  onChange={(event)=>handleChange1(event, e)}>
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