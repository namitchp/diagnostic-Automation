import React from "react";
import { TextField } from "@material-ui/core";

const Profile = () => {
  return (
    <div className="container-fluid ">
      <div className="card shadow">
        <div className="card-body">
          <div className="row">
            <div className="col-md-3 mb-5">
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                disabled
                name="p"
                label="Employee ID"
              />
            </div>
            <div className="col-md-3 mb-5">
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                label="Employee Code"
              />
            </div>
            <div className="col-md-3 mb-5">
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                label="Card No."
              />
            </div>
            <div className="col-md-3 mb-5">
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                label="First Name"
              />
            </div>
            <div className="col-md-3 mb-5">
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                label="Last Name"
              />
            </div>
            <div className="col-md-3 mb-5">
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                label="Father/Husband Name"
              />
            </div>
            <div className="col-md-3 mb-5">
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                label="Mother Name"
              />
            </div>
            <div className="col-md-3 mb-5">
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                label="Martial Status"
              />
            </div>
            <div className="col-md-3 mb-5">
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                label="Gender"
              />
            </div>
            <div className="col-md-3 mb-5">
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                label="Date of Birth"
              />
            </div>
            <div className="col-md-12 mb-5">
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                label="Present Address"
              />
            </div>
            <div className="col-md-3 mb-6">
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                label="Phone No."
              />
            </div>
            <div className="col-md-3 mb-6">
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                label="Mobile No."
              />
            </div>
            <div className="col-md-12 mb-5">
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                label="Permanent Address"
              />
            </div>
            <div className="col-md-6 mb-5">
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                label="Phone No."
              />
            </div>
            <div className="col-md-6 mb-5">
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                label="Mobile No."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
