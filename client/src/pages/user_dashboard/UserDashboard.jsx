import React, { useState } from 'react';
import CreateComplaintForm from '../../components/form/CreateComplaintForm'
import './userdashboard.css'

export default function UserDashboard({ provider, account, complaintContract}) {

    return (
        <div className='policeDashboard'>
            <div className="pdWrapper">
                <div className="pdProfile">
                    <div className="pdfLeft">
                        <img src="https://fpslakeland.com/wp-content/uploads/bb-importer/0270baba-a05b-5a2e-9170-b277e47d2353/Portrait_Placeholder.png" />
                    </div>
                    <div className="pdfRight">
                        <h2>Chulbul Pandey</h2>
                        <p>pandey@mahapolice.in</p>
                        <p>+91 9876543210</p>
                        <p>Mumbai, Maharashtra, India - 400057</p>
                    </div>
                </div>

                <div className="createComplaints">
                    {/* <button className="createComBtn">
                        +
                    </button> */}
                    <CreateComplaintForm signal={true}/>
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