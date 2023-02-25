import {
  AppBar,
  Avatar,
  Box,
  Button,
  CircularProgress,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import user from "../assets/image/user.jpg";
import moment from "moment";
import AirplayIcon from "@material-ui/icons/Airplay";
import SwipeableTemporaryDrawer from "./leftModal";
import { CommonController } from "../_redux/controller/common.controller";
import { id } from "date-fns/locale";
import { nodeUrl } from "../config";
const auth = localStorage.getItem("login");
const userName = localStorage.getItem("userName");

const useStyles = makeStyles((theme) => ({
  circle: {
    strokeWidth: "8px",
    padding: "10px",
  },
  // progress: {
  //   padding: "5px",
  //   borderWidth: "2px",
  //   borderStyle: "solid",
  //   borderColor: "red",
  // },
}));

function CircularProgressWithLabel(props) {
  const classes = useStyles();

  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress
        disableShrink
        size={40}
        variant="determinate"
        {...props}
        classes={{ circle: classes.circle }}
      />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          variant="h6"
          component="div"
          color="textSecondary"
        >{`${Math.round(props.time)}`}</Typography>
      </Box>
    </Box>
  );
}
const MainBar = ({ onMenuClick }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [profilePrev, setprofilePrev] = useState({ right: false });
  const [profileList, setprofileList] = useState("");
  const open = Boolean(anchorEl);
  const [time, setTime] = useState({
    hrs: moment().format("h"),
    minutes: moment().format("mm"),
    seconds: moment().format("ss"),
    hrsValue: Math.ceil((parseInt(moment().format("h")) * 8 + 1) / 10) * 10,
    minValue: Math.ceil((parseInt(moment().format("mm")) * 2 + 1) / 10) * 10,
    secValue: Math.ceil((parseInt(moment().format("ss")) * 1.6 + 1) / 10) * 10,
  });
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const profilePrevlist = async () => {
    await CommonController.commonApiCallFilter(
      "user/profile_prev",
      { user_id: localStorage.getItem("userId") },
      "post",
      "node"
    )
      .then((result) => {
        if (result.status === 200) {
          setprofileList(result.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleClose = () => {
    setprofilePrev({ ...profilePrev, right: true });
    setAnchorEl(null);
  };
  const calculateTime = () => {
    setInterval(() => {
      setTime({
        ...time,
        hrsValue: Math.ceil((parseInt(moment().format("h")) * 8 + 1) / 10) * 10,
        hrs: moment().format("h"),
        secValue:
          Math.ceil((parseInt(moment().format("ss")) * 1.6 + 1) / 10) * 10,
        seconds: moment().format("ss"),
        minValue:
          Math.ceil((parseInt(moment().format("mm")) * 2 + 1) / 10) * 10,
        minutes: moment().format("mm"),
      });
    }, 1000);
  };
  const handleSwitch = () => {
    window.location = `http://erp.diag.in/SwitchLogin.aspx?${localStorage.getItem(
      "encrypt_userId"
    )}`;
  };
  useEffect(() => {
    calculateTime();
    profilePrevlist();
  }, []);
  return (
    <AppBar position="static" className="theme_bg" elevation={0}>
      <Toolbar variant="dense" disableGutters>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2 d-flex align-items-center">
              <div className="logo-header">
                {/* <img src={logo} className="img-fluid" /> */}
                <h4 className="mb-0">DIAGNOSTIC</h4>
                <p className="logo-text  mb-0">
                  <small>Diagnostic Automation</small>
                  <span className="ml-2">2.0</span>
                </p>
              </div>
            </div>

            <div className="col-md-10 text-right">
              <div className="row justify-content-end">
                <div className="col d-flex justify-content-end gap-3">
                  <div className="clock_container">
                    <p className="mb-0">Week</p>
                    <h2 className="mb-0 mt-2 mx-auto">{moment().isoWeek()}</h2>
                  </div>
                  <div className="clock_container">
                    <p className="mb-2 text-center">
                      {moment().format("dddd DD MMM YYYY")}
                    </p>
                    <div className="clock_circle d-flex justify-content-around gap-3">
                      <div className="circle_box">
                        <CircularProgressWithLabel
                          className="hrs"
                          value={time.hrsValue}
                          time={time.hrs}
                        />
                      </div>
                      <div className="circle_box">
                        <CircularProgressWithLabel
                          color="secondary"
                          value={time.minValue}
                          time={time.minutes}
                        />
                      </div>
                      <div className="circle_box">
                        <CircularProgressWithLabel
                          className="seconds"
                          value={time.secValue}
                          time={time.seconds}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="clock_container">
                    <p className="mb-0">Switch</p>
                    <Button
                      variant="default"
                      className="bg-white switch_btn mx-3 mt-2"
                      // variant="contained"
                      onClick={handleSwitch}
                      disableElevation
                    >
                      <AirplayIcon />
                    </Button>
                  </div>
                  {auth && (
                    <div className="clock_container">
                      <p className="mb-0">{userName}</p>
                      <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        className="pt-2 pb-0"
                        onClick={handleClose}
                        color="inherit"
                      >
                        <div className="user_header d-flex align-items-center">
                          <Avatar
                            alt="Remy Sharp"
                            src={`${nodeUrl + profileList?.image_path}`}
                          />
                          {/* <span className="ml-3">{userName}</span> */}
                        </div>
                      </IconButton>
                      {/* <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        getContentAnchorEl={null}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "center",
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "center",
                        }}
                        open={open}
                        onClick={handleClose}
                      >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                      </Menu> */}
                    </div>
                  )}
                </div>
                {/* <div className="col-md-1 text-center py-1"></div>
                <div className="col-md-2 py-1"></div>
                <div className="col-md-2 text-right d-flex align-items-center py-1">
                  
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </Toolbar>
      <SwipeableTemporaryDrawer
        leftTrue={profilePrev}
        profileList={profileList}
        updateImage={useCallback(() => profilePrevlist(), [profileList])}
      />
    </AppBar>
  );
};
export default MainBar;
