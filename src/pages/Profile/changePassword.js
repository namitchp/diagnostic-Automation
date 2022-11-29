import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { showErrorToast, showSuccessToast } from "../../components/common";
import { CommonController } from "../../_redux/controller/common.controller";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    oldpass: "",
    newpass: "",
    confpass: "",
    user_id: localStorage.getItem("userId"),
    errors: {},
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    let errors = { ...formData.errors };
    if (formData.oldpass == "") {
      errors.oldpass = "Please enter old password";
    } else {
      delete errors.oldpass;
    }
    if (formData.newpass == "") {
      errors.newpass = "Please enter new password";
    } else {
      delete errors.newpass;
    }
    if (formData.confpass == "") {
      errors.confpass = "Please enter confirm password";
    } else {
      delete errors.confpass;
    }
    console.log(errors);
    setFormData({ ...formData, errors: errors });
    return Object.keys(errors).length !== 0;
  };

  const onSubmit = async () => {
    try {
      setLoading(true);
      if (!validateForm()) {
        await CommonController.commonApiCallFilter(
          "Profile/UpdateEmployeePassword",
          formData,
          "post"
        ).then((data) => {
          if (data.valid) {
            showSuccessToast("Password changed successfully ");
          } else {
            showErrorToast(data.msg);
          }
        });
      }
      setLoading(false);
    } catch (err) {
      showErrorToast(err);
    }
  };

  return (
    <div className="card shadow">
      <div className="card-body">
        <div className="row">
          <div className="col-md-3">
            <TextField
              variant="outlined"
              fullWidth
              size="small"
              value={formData.oldpass}
              name="oldpass"
              type="password"
              label="Old Password"
              onChange={handleChange}
            />
            {formData.errors && (
              <p className="mb-0 text-danger">{formData.errors.oldpass}</p>
            )}
          </div>
          <div className="col-md-3">
            <TextField
              variant="outlined"
              fullWidth
              size="small"
              name="newpass"
              type="password"
              value={formData.newpass}
              label="New Password"
              onChange={handleChange}
            />
            {formData.errors && (
              <p className="mb-0 text-danger">{formData.errors.newpass}</p>
            )}
          </div>
          <div className="col-md-3">
            <TextField
              variant="outlined"
              fullWidth
              size="small"
              name="confpass"
              value={formData.confpass}
              label="Conf. Password"
              onChange={handleChange}
            />
            {formData.errors && (
              <p className="mb-0 text-danger">{formData.errors.confpass}</p>
            )}
          </div>
          <div className="col-md-12 mt-5">
            <Button
              disable={loading}
              variant="contained"
              onClick={onSubmit}
              disableElevation
              color="primary"
            >
              {loading ? "Processing..." : "Update Password"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
