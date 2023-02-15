import React, { useEffect, useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../../../components/common";
import { CommonController } from "../../../../../_redux/controller/common.controller";
const AddOrEditPincode = (props) => {
  const [formValues, setFormValues] = useState({
    pin_code_id: 0,
    pin_code_no: "",
    city: "",
    state: "",
    district: "",
    description: "",
  });
  const [showMessage, setMessage] = useState({
    type: "",
    msg: "",
  });
  const insertForm = async () => {
    try {
      let body = {
        user_name: localStorage.getItem("userName"),
        user_id: localStorage.getItem("userId"),
        description: formValues.description,
        pin_code_id: formValues.pin_code_id,
        pin_code_no: formValues.pin_code_no,
        city: formValues.city,
        state: formValues.state,
        district: formValues.district,
      };

      await CommonController.commonApiCallFilter(
        "master/insert_pincode",
        body,
        "post",
        "node"
      ).then((result) => {
        if (result.status == 200) {
          showSuccessToast(result.message);
          props.onClose(0);
        }
      });
    } catch (err) {
      showErrorToast(err);
    }
  };
  useEffect(() => {
    if (props.editData) {
      setFormValues(props.editData);
    }
  }, [props.editData]);
  const onSave = () => {
    insertForm();
  };
  const handleOnChange = (event) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };

  const onCancelClick = () => {
    props.onClose(0);
  };

  //     useEffect(() => {
  //         console.log(updatePincodeInfoResponse)
  //         if(updatePincodeInfoResponse){
  //              setMessage({...showMessage,
  //                 type:updatePincodeInfoResponse.valid ? "success" : "error",
  //                 msg:updatePincodeInfoResponse.valid ? getPincodeInfo ? "Pincode updated successfully" : "Pincode Saved successfully" : "Something went wrong"
  //             });
  //             setTimeout(() => {
  //                 setMessage({
  //                     type:"",
  //                     msg:""
  //                 });
  //                 props.onClose(0);
  //             }, 2000);
  //             dispatch(clearPincodeInfoResponse());
  //         }
  //     },[updatePincodeInfoResponse]);
  // //

  return (
    <React.Fragment>
      <div className="container-fluid bg-white p-4">
        <div className="row">
          <div className="col-md-4 mb-3">
            <TextField
              label="Pincode ID"
              type="number"
              disabled
              name="pin_code_id"
              value={formValues.pin_code_id}
              onChange={handleOnChange}
              fullWidth
              variant="outlined"
              size="small"
            />
          </div>
          <div className="col-md-4 mb-3">
            <TextField
              label="Pincode"
              type="number"
              name="pin_code_no"
              value={formValues.pin_code_no}
              onChange={handleOnChange}
              fullWidth
              variant="outlined"
              size="small"
            />
          </div>
          <div className="col-md-4">
            <TextField
              label="City"
              name="city"
              value={formValues.city}
              onChange={handleOnChange}
              fullWidth
              variant="outlined"
              size="small"
            />
          </div>
          <div className="col-md-4">
            <TextField
              label="State"
              name="state"
              value={formValues.state}
              onChange={handleOnChange}
              fullWidth
              variant="outlined"
              size="small"
            />
          </div>
          <div className="col-md-4">
            <TextField
              label="District"
              name="district"
              value={formValues.district}
              onChange={handleOnChange}
              fullWidth
              variant="outlined"
              size="small"
            />
          </div>
          {/* <div className="col-md-4">
                    <TextField multiline label="Description" name="description" value={formValues.description} onChange={handleOnChange} fullWidth variant="outlined" size="small"/>
                </div> */}

          <div className="col-md-12 mt-3 text-right">
            <Button
              variant="contained"
              className="mr-2"
              onClick={onCancelClick}
              disableElevation
            >
              Cancel
            </Button>
            {formValues.type == "preview" ? (
              ""
            ) : (
              <Button
                variant="contained"
                onClick={onSave}
                color="primary"
                disableElevation
              >
                Save
              </Button>
            )}
          </div>
          {showMessage.type != "" ? (
            <Alert severity={showMessage.type}>{showMessage.msg}</Alert>
          ) : null}
        </div>
      </div>
    </React.Fragment>
  );
};

export default AddOrEditPincode;
