import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { CommonController } from "../../../../_redux/controller/common.controller";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../../components/common";

const AddOrEditGroup = (props) => {
  const [groupValues, setGroupValues] = useState({
    transaction_id: 0,
    transaction_name: "",
    display_name: "",
    sequence: null,
    parent_id: null,
    main_form: null,
    level: null,
  });
  const [listtransection, setlisttransection] = useState([]);
  const [showMessage, setMessage] = useState({
    type: "",
    msg: "",
  });
  const insertForm = async () => {
    try {
      let body = { ...groupValues };
      body.user_id = localStorage.getItem("userId");

      await CommonController.commonApiCallFilter(
        "master/insert_menu",
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
  const listTransection = async () => {
    try {
      let body = {
        transaction_id: groupValues.transaction_id,
      };
      await CommonController.commonApiCallFilter(
        "master/list_transection",
        body,
        "post",
        "node"
      ).then((result) => {
        if (result.status == 200) {
          setlisttransection(result.data);
        }
      });
    } catch (err) {
      showErrorToast(err);
    }
  };
  useEffect(() => {
    if (props.editData) {
      setGroupValues(props.editData);
      listTransection();
    }
  }, [props.editData]);
  const onSave = () => {
    insertForm();
  };
  const handleOnChange = (event) => {
    console.log(event.target.value);
    console.log(event.target.name);
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
              label="Transaction ID"
              name="transaction_id"
              disabled
              value={groupValues.transaction_id}
              onChange={handleOnChange}
              fullWidth
              variant="outlined"
              size="small"
            />
          </div>
          <div className="col-md-4">
            <TextField
              label="Display Name"
              name="display_name"
              value={groupValues.display_name}
              onChange={handleOnChange}
              fullWidth
              variant="outlined"
              size="small"
            />
          </div>
          <div className="col-md-4">
            <TextField
              multiline
              label="sequence"
              value={groupValues.sequence}
              onChange={handleOnChange}
              name="sequence"
              fullWidth
              variant="outlined"
              size="small"
              type="number"
            />
          </div>
          <div className="col-md-4 py-5">
            <TextField
              multiline
              label="Level"
              value={groupValues.level}
              onChange={handleOnChange}
              name="level"
              fullWidth
              variant="outlined"
              size="small"
              type="number"
            />
          </div>
          <div className="col-md-4 py-5">
            <TextField
              //  id="outlined-select-currency"
              select
              label="Parent Id"
              onChange={handleOnChange}
              name="parent_id"
              fullWidth
              variant="outlined"
              size="small"
              SelectProps={{
                native: true,
              }}
            >
              <option value={groupValues.parent_id}>
                {groupValues.parent_transaction}
              </option>
              {listtransection.map((val) => (
                <option key={val.transaction_id} value={val.transaction_id}>
                  {val.transaction_name}
                </option>
              ))}
            </TextField>
          </div>
          <div className="col-md-4 py-5">
            {/* <FormControlLabel control={<Checkbox color="primary" checked={groupValues.main_form ===true}/>} label="Main Form" /> */}
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={groupValues.main_form === true}
                  onChange={(e) =>
                    setGroupValues({
                      ...groupValues,
                      main_form: e.target.checked,
                    })
                  }
                />
              }
              label="Main Form"
            />
          </div>
          <div className="col-md-12 mt-3 text-right">
            <Button
              variant="contained"
              className="mr-2"
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
