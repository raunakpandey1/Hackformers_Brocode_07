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
                <select>
                  <option value="add1">Address1</option>
                  <option value="add1">Address2</option>
                  <option value="add1">Address3</option>
                  <option value="add1">Address4</option>
                </select>
                <input type="text" placeholder='Subject' />
                <textarea type="text" placeholder='Description' />
                {/* <input type="file" name="my-image" id="image" accept="image/gif, image/jpeg, image/png" /> */}
                <input type="file" name="file" id="file" className="inputfile" accept="image/gif, image/jpeg, image/png" />
                <label for="file">Choose a file</label>
              </div>
              <DialogActions>
                <Button
                  onClick={handleClose}
                  color="primary"
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
