import { Button, MenuItem, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  buttonLoader,
  showErrorToast,
  showSuccessToast,
} from "../../../components/common";
import {
  getUserFilterList,
  getUserRightList,
} from "../../../_redux/actions/common.action";
import { CommonController } from "../../../_redux/controller/common.controller";

const AddSupportTicket = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [userRightListArr, setUserRightList] = useState([]);
  const getuserRightListResponse = useSelector(
    (state) => state.common.userRightList
  );

  const [attachments, setAttachments] = useState({
    attach_file: null,
    attach_file1: null,
    attach_file2: null,
  });

  const [subMenuList, setSubMenuList] = useState([]);

  useEffect(() => {
    dispatch(getUserRightList());
    // dispatch(getUserFilterList());
  }, []);

  const groupBy = (array, key) => {
    // Return the end result
    return array.reduce((result, currentValue) => {
      // If an array already present for key, push it to the array. Else create an array and push the object
      (result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue
      );
      // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
      return result;
    }, {}); // empty object is the initial value for result object
  };

  useEffect(() => {
    if (getuserRightListResponse.length > 0) {
      const groupedMenu = groupBy(getuserRightListResponse, "group_name");

      setUserRightList(getuserRightListResponse);
    }
  }, [getuserRightListResponse]);

  const handleMenuChange = (id) => {
    var tempMenuIndex = userRightListArr.findIndex((x) => x.menu_id === id);
    if (tempMenuIndex > -1) {
      setSubMenuList(userRightListArr[tempMenuIndex].transaction_lst);
    }
    setFormData({
      ...formData,
      menu: userRightListArr[tempMenuIndex].menu_id,
      menu_name: userRightListArr[tempMenuIndex].menu_name,
    });
  };

  const [formData, setFormData] = useState({
    tran_id: "",
    ticket_no: "",
    date: "",
    menu: "",
    menu_name: "",
    transaction: "",
    type: "",
    priority: "",
    details: "",
    attach_file: "",
    attach_file1: "",
    attach_file2: "",
    user_id: localStorage.getItem("userId"),
  });

  const {
    date,
    ticket_no,
    menu,
    transaction,
    details,

    type,
    priority,
  } = formData;

  useEffect(() => {
    getSupportTicketData();
  }, []);

  const getSupportTicketData = async () => {
    try {
      await CommonController.commonApiCallFilter(
        "Ticket/SupportTicketPreview",
        formData,
        "post"
      ).then((data) => {
        setFormData({
          ...formData,
          date: data.date,
          ticket_no: data.ticket_no,
        });
      });
    } catch (err) {
      showErrorToast(err);
    }
  };

  const handleFormData = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setAttachments({ ...attachments, [e.target.name]: e.target.files[0] });
      setFormData({ ...formData, [e.target.name]: e.target.files[0].name });
    } else {
      setAttachments({ ...attachments, [e.target.name]: null });
      setFormData({ ...formData, [e.target.name]: "" });
    }
  };

  const generateTicket = async () => {
    try {
      if (validateForm()) {
        let formdata = new FormData();
        for (var key in attachments) {
          if (attachments.hasOwnProperty(key) && attachments[key]) {
            formdata.append(key, attachments[key]);
          }
        }
        await CommonController.commonApiFile(
          "Ticket/TicketImageInsert",
          formdata
        );
        await CommonController.commonApiCallFilter(
          "Ticket/SupportTicketInsert",
          formData
        ).then((data) => {
          if (data.valid) {
            showSuccessToast("Ticket Generated Successfully");
          } else {
            showErrorToast(data.msg);
          }
        });
      }
    } catch (err) {
      showErrorToast(err);
    }
  };

  const validateForm = () => {
    let errors = {};
    if (formData.menu == "") {
      errors.menu = "Menu required";
    } else {
      delete errors.menu;
    }

    console.log(formData.type);
    if (formData.type == "") {
      errors.type = "Type required";
    } else {
      delete errors.type;
    }

    const valid = Object.keys(errors).length === 0 ? true : false;
    setErrors(errors);
    return valid;
  };

  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <div className="col-md-4 mb-5">
          <TextField
            fullWidth
            id="outlined-basic"
            disabled
            size="small"
            name="date"
            label="Date"
            variant="outlined"
            value={date}
            onChange={handleFormData}
          />
        </div>
        <div className="col-md-4  mb-5">
          <TextField
            fullWidth
            id="outlined-basic"
            size="small"
            name="ticket_no"
            label="Ticket No"
            disabled
            variant="outlined"
            value={ticket_no}
            onChange={handleFormData}
          />
        </div>
        <div className="col-md-4  mb-5">
          <TextField
            fullWidth
            id="outlined-basic"
            size="small"
            name="generated_by"
            disabled
            label="Generated By"
            value={localStorage.getItem("userName")}
            variant="outlined"
            onChange={handleFormData}
          />
        </div>
        <div className="col-md-3  mb-5">
          <TextField
            fullWidth
            id="outlined-basic"
            size="small"
            name="menu"
            select
            label="Menu*"
            value={menu}
            variant="outlined"
            onChange={(e) => {
              handleMenuChange(e.target.value);
            }}
          >
            <MenuItem value={""}>None</MenuItem>
            {userRightListArr.length > 0 &&
              userRightListArr.map((menu, index) => {
                return (
                  <MenuItem key={index} value={menu.menu_id}>
                    {menu.menu_name}
                  </MenuItem>
                );
              })}
          </TextField>
          {errors.menu && <p className="text-danger mb-0">{errors.menu}</p>}
        </div>
        <div className="col-md-3  mb-5">
          <TextField
            fullWidth
            id="outlined-basic"
            size="small"
            name="transaction"
            select
            label="Transaction"
            value={transaction}
            variant="outlined"
            onChange={handleFormData}
          >
            {subMenuList.length > 0 &&
              subMenuList.map((transaction, index) => {
                return (
                  <MenuItem key={index} value={transaction.transaction_name}>
                    {transaction.transaction_name}
                  </MenuItem>
                );
              })}
          </TextField>
        </div>
        <div className="col-md-3  mb-5">
          <TextField
            fullWidth
            id="outlined-basic"
            size="small"
            name="type"
            select
            label="Type*"
            value={type}
            variant="outlined"
            onChange={handleFormData}
          >
            <MenuItem value={"New Development"}>New Development</MenuItem>
            <MenuItem value={"Modification"}>Modification</MenuItem>
            <MenuItem value={"Problem"}>Problem</MenuItem>
            <MenuItem value={"Other"}>Other</MenuItem>
          </TextField>
          {errors.type && <p className="text-danger mb-0">{errors.type}</p>}
        </div>
        <div className="col-md-3  mb-5">
          <TextField
            fullWidth
            id="outlined-basic"
            size="small"
            name="priority"
            select
            label="Priority"
            variant="outlined"
            value={priority}
            onChange={handleFormData}
          >
            <MenuItem value={"High"}>High</MenuItem>
            <MenuItem value={"Medium"}>Medium</MenuItem>
            <MenuItem value={"Low"}>Low</MenuItem>
          </TextField>
        </div>
        <div className="col-md-12  mb-5">
          <TextField
            fullWidth
            id="outlined-basic"
            size="small"
            name="details"
            multiline
            label="Details"
            value={details}
            onChange={handleFormData}
            variant="outlined"
          />
        </div>
        <div className="col-md-1">
          <label className="font-weight-bold">Attachment</label>
        </div>
        <div className="col-md-3">
          <input
            type="file"
            name="attach_file"
            onChange={handleFileChange}
            className="form-control"
          />
        </div>
        <div className="col-md-3">
          <input
            type="file"
            name="attach_file1"
            onChange={handleFileChange}
            className="form-control"
          />
        </div>
        <div className="col-md-3">
          <input
            type="file"
            name="attach_file2"
            onChange={handleFileChange}
            className="form-control"
          />
        </div>
        <div className="col-md-12 mt-5 text-right">
          <Button
            variant="contained"
            className="mr-2"
            color="primary"
            disableElevation
          >
            Cancel
          </Button>
          {buttonLoader(loading, "Save", generateTicket, "primary")}
        </div>
      </div>
    </div>
  );
};

export default AddSupportTicket;
