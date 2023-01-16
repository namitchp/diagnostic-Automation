import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import ListItemIcon from "@mui/material/ListItemIcon";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import SettingsIcon from "@mui/icons-material/Settings";
import LockResetIcon from "@mui/icons-material/LockReset";
import ListItemText from "@mui/material/ListItemText";
import KeyIcon from '@mui/icons-material/Key';
import user from "../assets/image/user.jpg";
import { Avatar, Grid, Input, Stack, TextField } from "@mui/material";
import { memo } from "react";
import moment from "moment/moment";
import { nodeUrl } from "../config";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { showSuccessToast } from "./common";
import {Typography } from "@material-ui/core";
function SwipeableTemporaryDrawer({ leftTrue, profileList, updateImage }) {
  const id = localStorage.getItem("userId");
  const [state, setState] = React.useState({
    right: false,
  });
const [ modalPassword, setmodalPassword] = React.useState(false)
  const [modal, setmodal] = React.useState(false);
  const toggleDrawer = (anchor, open) => (event) => {
    console.log();
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
  const handleSubmitPassword=()=>{
    console.log("cvbnm,")
  }
  const handelUpdateImage = async (e) => {
    let value = e.target.files[0];
    let formData = new FormData();
    formData.append("file_path", value);
    formData.append("user_id", id);
    await axios({
      method: "post",
      url: `${nodeUrl}user/user_image_upload`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    }).then((data) => {
      if (data.status === 200) {
        showSuccessToast(data.message);
        updateImage();
      }
    });
  };
  const handleLogOut = () => {
    localStorage.clear();
    window.location = "/login";
  };
  const handleModalClose = () => {
    setmodal(false);
  };
  React.useEffect(() => {
    setState(leftTrue);
    toggleDrawer("right", state.right);
  }, [leftTrue]);
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <h4 className="py-5 ml-3">Profile</h4>
      <Divider />
      {/* <img src={user} class="rounded mx-auto d-block py-5" alt="..."></img> */}
      <div>
        <Avatar
          alt="Remy Sharp"
          className="mx-auto d-block m-3"
          src={`${nodeUrl + profileList.image_path}`}
          sx={{ width: 120, height: 120 }}
        />
        <div className="custom_edit">
          <label htmlFor="file-upload" style={{ cursor: "pointer" }}>
            <CameraAltIcon for="file-upload" fontSize="large" />
          </label>
          <Input
            id="file-upload"
            type="file"
            sx={{ display: "none" }}
            onChange={handelUpdateImage}
          />
        </div>
      </div>
      {/* {profileList.map(value=>{})} */}
      {/* <Typography>xcvbnm</Typography> */}
      <list
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        component="nav"
        // onClose={toggleDrawer("right", false)}
        aria-labelledby="nested-list-subheader"
      >
        {/* <ListItemButton onClick={() =>{ setmodal(true);toggleDrawer("right", false)}}> */}
        <ListItemButton
          onClick={() => {
            setmodal(true);
          }}
        >
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText
            primary="Profile"
            onClick={toggleDrawer("right", false)}
          />
        </ListItemButton>
        <ListItemButton onClick={()=>setmodalPassword(true)}>
          <ListItemIcon>
            <LockResetIcon />
          </ListItemIcon>
          <ListItemText primary="Reset Password"
          onClick={toggleDrawer("right", false)}
          />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Setting" />
        </ListItemButton>
        <ListItemButton onClick={handleLogOut}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="LogOut" />
        </ListItemButton>
      </list>
    </Box>
  );
  return (
    <div>
      <SwipeableDrawer
        anchor={"right"}
        open={state.right}
        onClose={toggleDrawer("right", false)}
        onOpen={toggleDrawer("right", true)}
      >
        {list("right")}
      </SwipeableDrawer>
      <Modal
        show={modal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {/* <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header> */}
        <Avatar
          alt="Remy Sharp"
          className="mx-auto d-block m-3"
          src={`${nodeUrl + profileList.image_path}`}
          sx={{ width: 150, height: 150 }}
        />
        <Modal.Body>
          <Grid
            container
            rowSpacing={2}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={4}>
              <TextField
                id="standard-multiline-flexible"
                label="Name"
                value={profileList.first_name + " " + profileList.last_name}
                variant="standard"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="standard-multiline-flexible"
                label="Mobile No"
                value={profileList.mobile}
                variant="standard"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="standard-multiline-flexible"
                label="Email"
                value={profileList.email}
                variant="standard"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="standard-multiline-flexible"
                label="D.O.B"
                value={moment(profileList.dob).format("DD/MM/YYYY")}
                variant="standard"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="standard-multiline-flexible"
                label="Gender"
                value={profileList.gender}
                variant="standard"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="standard-multiline-flexible"
                label="Department Name"
                value={profileList.department_name}
                variant="standard"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="standard-multiline-flexible"
                label="Relationship"
                value={profileList.m_status}
                variant="standard"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="standard-multiline-flexible"
                label="Father Or Husband Name"
                value={profileList.Father_husband_name}
                variant="standard"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="standard-multiline-flexible"
                label="Mother Name"
                value={profileList.mother_name}
                variant="standard"
              />
            </Grid>
          </Grid>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={handleModalClose}>Close</Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={modalPassword}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          {/* <Stack
            spacing={2}
            direction="column"
            justifyContent="flex-end"
            alignItems="center"
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <stack spacing={2}>
              <Button onClick={handleModalClose}>Close</Button>
              <Button onClick={handleModalClose}>Close</Button>
            </stack>
          </Stack> */}

<Box
          sx={{
            // marginTop: ,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 2, bgcolor: '#3949ac' }}>
            {/* <LockOutlinedIcon /> */}
            <KeyIcon/>
          </Avatar>
          <Typography component="h1" variant="h2">
            Reset Password
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              placeholder="Password"
              label="New Password"
              name="password"
              // autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              placeholder="Password"
              label="Confirm Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Grid container spacing={2}>
              <Grid item >
              <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmitPassword}
              >
                Continue
               </Button>
              </Grid>
              <Grid item>
               <Button
              variant="text"
              color="error"
              sx={{ mt: 3, mb: 2 }}
              onClick={()=>{setmodalPassword(false)}}>
                Cancel
               </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button onClick={handleModalClose}>Close</Button>
        </Modal.Footer> */}
      </Modal>
    </div>
  );
}
export default memo(SwipeableTemporaryDrawer);
