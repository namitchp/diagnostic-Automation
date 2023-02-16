import React, { useEffect, useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { CommonController } from "../../../../../_redux/controller/common.controller";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../../../components/common";
import { SimpleTable } from "../../../../../components/basic-table";
const AddOrEditGroup = (props) => {
  const [groupValues, setGroupValues] = useState({
    tab_id: "",
    tab_name: "",
    mtab_id: 0,
    tabArray: [],
  });
  const [groupTab, setgroupTab] = useState({
    tab_name: "",
    sequence: "",
  });
  const [showMessage, setMessage] = useState({
    type: "",
    msg: "",
  });
  const tabArrayDelet = (e) => {
    const deleteArraytab = { ...groupValues };
    deleteArraytab.tabArray.splice(deleteArraytab.tabArray.indexOf(e), 1);
    setGroupValues(deleteArraytab);
  };
  const listColumn = [
    {
      id: "tab_name",
      numeric: false,
      disablePadding: false,
      label: "Tab Name",
    },
    {
      id: "sequence",
      numeric: true,
      disablePadding: false,
      label: "Sequence",
    },
  ];
  const submitAddBox = () => {
    let arrayList = { ...groupValues };
    arrayList.tabArray.push(groupTab);
    setGroupValues(arrayList);
  };
  const insertForm = async () => {
    try {
      let body = {
        user_id: localStorage.getItem("userId"),
        mtab_id: groupValues.mtab_id,
        mtab_name: groupValues.tab_name,
        tab_id: groupValues.tab_id,
        tabArray: groupValues.tabArray,
      };
      await CommonController.commonApiCallFilter(
        "master/insert_cos_tab",
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
              label="Tab ID"
              name="tab_id"
              value={groupValues.tab_id}
              onChange={handleOnChange}
              fullWidth
              variant="outlined"
              size="small"
            />
          </div>
          <div className="col-md-4">
            <TextField
              label="Tab Name*"
              name="tab_name"
              value={groupValues.group_name}
              onChange={handleOnChange}
              fullWidth
              variant="outlined"
              size="small"
            />
          </div>
        </div>
        {groupValues.tabArray?.length > 0 ? (
          <SimpleTable
            columns={listColumn}
            rows={groupValues.tabArray}
            onDelete={tabArrayDelet}
          />
        ) : null}
        <hr />
        <div className="container-fluid">
          {/* <h1>Add Box:</h1> */}
          <div className="row mt-5">
            <div className="col-md-3 mb-3">
              <TextField
                label="Tab Name"
                fullWidth
                onChange={(e) => {
                  setgroupTab({ ...groupTab, tab_name: e.target.value });
                }}
                value={groupTab.tab_name}
                variant="outlined"
                name="tab_name"
                size="small"
              />
            </div>
            <div className="col-md-4 mb-3">
              <TextField
                label="Sequence"
                fullWidth
                onChange={(e) => {
                  setgroupTab({ ...groupTab, sequence: e.target.value });
                }}
                value={groupTab.sequence}
                variant="outlined"
                name="sequence"
                size="small"
              />
            </div>
            <div className="col-md-2 mb-3 pl-5">
              <Button
                color="primary"
                className="mr-2"
                // disableElevation
                variant="contained"
                onClick={submitAddBox}
              >
                Add New
              </Button>
            </div>
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
                onClick={onSave}
                color="primary"
                disableElevation
                className="bg-primary text-white"
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
