import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { AppContext } from '../../context/AppContext';
import axios from '../../axios'
import './form.css'

export default function CreateComplaintForm(props) {

  const { user } = useContext(AppContext);
  const [open, setOpen] = React.useState(false);
  // const [myUser, setMyUser] = useState(user)

  // const handleChange = (e) => {
  //   e.preventDefault();
  //   const name = e.target.name;
  //   const value = e.target.value;
  //   setMyUser({ ...myUser, [name]: value })
  // }

  const [complaint, setComplaint] = useState({ image: "", name : "", subject: "", description: "" , complaintStatus :"" , walletAddress : "" , reward : 0})
  const [file, setFile] = useState(null);

  
  const handleClickOpen = () => {
    setOpen(true);
  };

  // const handleSubmit = async () => {
  //   const updateUser = async () => {
  //     try {
  //       const { data } = await axios.post('/api/auth/updateuserdata', { userId: user._id, ...myUser });
  //       if(data){
  //         handleClose();
  //         alert("Profile Updated Successfully")
  //       }
  //     } catch (err) {
  //       console.log("Error in updating user");
  //     }
  //   }
  //   updateUser();
  // }

  const handleClose = async () => {
    setOpen(false);
  };

  
  const handleChange = async (e) => {
    // const data = e.target.files[0]; //files array of files object
    // // console.log(data);
    // const reader = new window.FileReader();
    // reader.readAsArrayBuffer(data);
    // reader.onloadend = () => {
    //   setFile(e.target.files[0]);
    // };
    // // setFileName(e.target.files[0].name);
    e.preventDefault();
    // console.log(e.target.files[0])
  try {
        const formData = new FormData();
        formData.append("file", e.target.files[0]);
        console.log(file);
        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIzM2QwNjQ5Yy0wODdhLTRkMDItYjRlZi1hNTZkZDBjOTUwNTgiLCJlbWFpbCI6IndlZ2ViYTM4NTVAb25pZWNhbi5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiYTE3OGU2ZGE1Njc4NjE4NzMzMWQiLCJzY29wZWRLZXlTZWNyZXQiOiI2MzAxYzhkMGNmM2Y0ZTE4MGM5MzYxNTA4NTg3ZDViM2YxY2E0NDJmZTIzYzM0YjQ0ZTUyN2FhN2Q2NmQ2YTQ4IiwiaWF0IjoxNjc5MTUyNTk3fQ.N5bn_EyGxEkSUWeoX1KQlm2K1F2k3ZamJNZ5nyyv0_o"},
        });
         
        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        
        //setting imageUrl in painting object after uploading on IPFS
        setComplaint({ ...complaint, image: ImgHash });
        console.log(ImgHash)
        alert('uploaded successfully')
      } catch (e) {
        alert("Unable to upload image to Pinata");
      }
  };

  const handleChange1 = async (e) => {
    setComplaint({ ...complaint, name: e.target.value });

  }

  // console.log(complaint)

  //Function to send meta data to Pinata (IPFS)
  const handleSubmit = async (e) => {
    e.preventDefault();
    var formData = JSON.stringify(complaint);
    if (complaint) {
    //   console.log(formData);
      try {

        //format mentioned in pinata documentation
        var config = {
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
          headers: {
            "Content-Type": "application/json",
            Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIzM2QwNjQ5Yy0wODdhLTRkMDItYjRlZi1hNTZkZDBjOTUwNTgiLCJlbWFpbCI6IndlZ2ViYTM4NTVAb25pZWNhbi5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiYTE3OGU2ZGE1Njc4NjE4NzMzMWQiLCJzY29wZWRLZXlTZWNyZXQiOiI2MzAxYzhkMGNmM2Y0ZTE4MGM5MzYxNTA4NTg3ZDViM2YxY2E0NDJmZTIzYzM0YjQ0ZTUyN2FhN2Q2NmQ2YTQ4IiwiaWF0IjoxNjc5MTUyNTk3fQ.N5bn_EyGxEkSUWeoX1KQlm2K1F2k3ZamJNZ5nyyv0_o"},
          
          data: formData,
        };

        const res = await axios(config);

        // console.log(res.data);
        const CID = `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
        console.log(CID);
        alert("Successfully Painting Uploaded");
         
      } catch (e) {
        alert("Unable to upload image to Pinata");
      }
    }
  
  };


  return (

    <div>
      {
        props.signal ?
          <>
            {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
              Edit Details
            </Button> */}
            <button className="createComBtn" onClick={handleClickOpen}>
              +
            </button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Create Complaint</DialogTitle>
              {/* <DialogContent>
                  <DialogContentText>
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="profileImg"
                    name="profileImg"
                    // onChange={handleChange}
                    // value={myUser.profileImg}
                    label="Profile Image Url"
                    type="text"
                    fullWidth />

                </DialogContent> */}
                <div className="modalDiv">
                
                
 <input type="file" name="image" id="file" className="inputfile" accept="image/gif, image/jpeg, image/png" onChange={
                      (e) => handleChange(e)
                      
                    }/>
                <label for="file">Choose a file</label>
                <select 
                  value={complaint.name}
                        label="status"
                        onChange={handleChange1}>
                  <option value="add1">Address1</option>
                  <option value="add2">Address2</option>
                  <option value="add3">Address3</option>
                  <option value="add4">Address4</option>
                </select>
                <input type="text" placeholder='Subject' name="subject"
                    value={complaint.subject}
                    onChange={
                      (e) =>
                        setComplaint({
                          ...complaint,
                          subject: e.target.value,
                        })
                      // console.log(e.target.value)
                    }/>

<textarea type="text" placeholder='Description' name="description"
                    value={complaint.description}
                    onChange={
                      (e) =>
                        setComplaint({
                          ...complaint,
                          description: e.target.value,
                        })}/>
              </div>
              <DialogActions>
                <Button
                  onClick={handleClose}
                   
                >
                  Cancel
                </Button>
                <Button
                  // onClick={handleSubmit}
                  color="light"
                >
                  Submit
                </Button>
                
              </DialogActions>
              
            </Dialog>
            
          </>
          : null
      }

    </div>
  );
}
