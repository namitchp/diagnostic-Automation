import { DatePicker } from "@material-ui/pickers";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { CommonController } from "../_redux/controller/common.controller";
import { showErrorToast } from "./common";

const DateFilter = ({ onDateUpdate }) => {
  const [dateUpdate, setDateUpdate] = useState(0)
  const [dateParams, setDateParams] = useState({
    user_id: localStorage.getItem("userId"),
    from_date: null,
    to_date: null,
  });

  const { from_date, to_date } = dateParams;
  const getDateFilter = async () => {
    try {
      let user_id=localStorage.getItem("userId")
      await CommonController.commonApiCallFilter(
        "user/date_filter",
        {user_id:user_id},
        "get",
        "node"
      ).then((data) => {
        if (data.status===200) {
         const [getDate]=data.data;
         setDateParams({...dateParams,from_date:getDate.start_date,to_date:getDate.end_date
         })
          onDateUpdate();
        } else {
          showErrorToast(data.msg);
        }
      });
    } catch (err) {
      showErrorToast(err);
    }
  };

  const updateDateFilter = async () => {
    try {
      let date = { ...dateParams };
      date.from_date = moment(date.from_date).format("MM/DD/yyyy");
      date.to_date = moment(date.to_date).format("MM/DD/yyyy");
      await CommonController.commonApiCallFilter(
        "user/insert_date_filter",
        date,
        "post",
        "node"
      ).then((data) => {
        if (data.status===200) {

          getDateFilter()
        } else {
          showErrorToast(data.msg);
        }
      });
    } catch (err) {
      showErrorToast(err);
    }
  };
 

  const handleDateChange = (name, date) => {
    setDateParams({ ...dateParams, [name]: date });
    setDateUpdate(dateUpdate+1);
  };
  useEffect(() => {
getDateFilter()
  },[])
  
  useEffect(() => {
    if (from_date && to_date) {
      updateDateFilter();
    }
  }, [dateUpdate]);
  return (
    <React.Fragment>
      <div className="col-md-2">
        <DatePicker
          label="From Date"
          value={from_date}
          format="dd/MM/yyyy"
          onChange={(date) => handleDateChange("from_date", date)}
          animateYearScrolling
          inputVariant="outlined"
          size="small"
          fullWidth
        />
      </div>
      <div className="col-md-2">
        <DatePicker
          label="To Date"
          value={to_date}
          onChange={(date) => handleDateChange("to_date", date)}
          animateYearScrolling
          format="dd/MM/yyyy"
          minDate={from_date}
          inputVariant="outlined"
          size="small"
          fullWidth
        />
      </div>
    </React.Fragment>
  );
};

export default DateFilter;
