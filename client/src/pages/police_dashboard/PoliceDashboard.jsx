import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import './policedashboard.css'

export default function PoliceDashboard() {

    const {police} = useContext(AppContext)

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
                </div>
                <div className="pdComplaints">

                    <div className="pComplaintDiv">
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
                    </div>
                    <div className="pComplaintDiv">
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
                    </div>
                    <div className="pComplaintDiv">
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
                    </div>
                    <div className="pComplaintDiv">
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
                    </div>

                </div>
            </div>
        </div>
    )
}