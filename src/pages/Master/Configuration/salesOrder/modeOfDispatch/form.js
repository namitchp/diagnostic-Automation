import React, { useEffect, useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { CommonController } from "../../../../../_redux/controller/common.controller";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../../../components/common";
const AddOrEditGroup = (props) => {
  const [groupValues, setGroupValues] = useState({
    mode_of_dispatch_id: 0,
    mode_of_dispatch_name: "",
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
        description: groupValues.description,
        mode_of_dispatch_name: groupValues.mode_of_dispatch_name,
        mode_of_dispatch_id: groupValues.mode_of_dispatch_id,
      };
      await CommonController.commonApiCallFilter(
        "master/insert_sale_mode",
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
      setGroupValues(props.editData);
    }
  }, [props.editData]);
  const onSave = () => {
    insertForm();
  };
  const handleOnChange = (event) => {
    setGroupValues({
      ...groupValues,
      [event.target.name]: event.target.value,
    });
  };
  const onCancelClick = () => {
    props.onClose(0);
  };
  return (
    <React.Fragment>
      <div className="container-fluid bg-white p-4">
        <div className="row">
          <div className="col-md-4">
            <TextField
              label="Mode Of Dispatch ID"
              name="mode_of_dispatch_id"
              disabled
              value={groupValues.mode_of_dispatch_id}
              onChange={handleOnChange}
              fullWidth
              variant="outlined"
              size="small"
            />
          </div>
          <div className="col-md-4">
            <TextField
              label="Mode Of Dispatch Name"
              name="mode_of_dispatch_name"
              value={groupValues.mode_of_dispatch_name}
              onChange={handleOnChange}
              fullWidth
              variant="outlined"
              size="small"
            />
          </div>
          <div className="col-md-4">
            <TextField
              multiline
              label="Description"
              value={groupValues.description}
              onChange={handleOnChange}
              name="description"
              fullWidth
              variant="outlined"
              size="small"
            />
          </div>
          <div className="col-md-12 mt-3 text-right">
            <Button
              variant="contained"
              className="mr-2 bg-danger text-white"
              onClick={onCancelClick}
              disableElevation
            >
              Cancel
            </Button>
            {groupValues.type == "preview" ? (
              ""
            ) : (
              <Button
                variant="contained"
                className="bg-primary text-white"
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
export default AddOrEditGroup;
