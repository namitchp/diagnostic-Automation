import { DatePicker } from "@material-ui/pickers";
import { TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Autocomplete } from "@material-ui/lab";

import { CommonController } from "../../_redux/controller/common.controller";
import { DataGrid } from "@mui/x-data-grid";
import CustomPagination from "../../components/CustomPagination";
import CustomNoRowsOverlay from "../../components/customRowComponent";
import { showErrorToast } from "../../components/common";
import moment from "moment";

const user_id = {
  user_id: localStorage.getItem("userId"),
};

const AttendanceBrowse = () => {
  const [bodyParam, setBodyParam] = useState({
    from_date: new Date().setDate(new Date().getDate() - 1),
    to_date: new Date(),
    emp_id: "1",
  });

  const [browseListData, setBrowseListData] = useState([]);
  const [totalRecord, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);

  const [params, setParams] = useState({
    pageNo: 1,
    pageSize: 10,
    filter_value: "",
    sort_column: "",
    sort_order: "",
  });

  const handlePageSizeChange = (param) => {
    setParams({ ...params, pageSize: param });
  };
  const handlePageChange = (param) => {
    setParams({ ...params, pageNo: param });
  };

  useEffect(() => {
    getBrowseListData();
  }, []);

  useEffect(() => {
    getBrowseListData();
  }, [bodyParam]);

  const getBrowseListData = async () => {
    setLoading(true);
    try {
      let body = { ...bodyParam };
      body.from_date = moment(bodyParam.from_date).format("DD-MM-yyyy");
      body.to_date = moment(bodyParam.to_date).format("DD-MM-yyyy");
      await CommonController.commonApiCall(
        "Attandance/EmpAttandanceBrowse",
        params,
        body,
        user_id
      ).then((data) => {
        setBrowseListData(data.data);
        setTotalRecords(data.recordsFiltered);
      });
    } catch (err) {
      showErrorToast(err);
    }
    setLoading(false);
  };

  const handleParams = (event) => {
    setTimeout(() => {
      setParams({ ...params, [event.target.name]: event.target.value });
    }, 800);
  };

  const handleDateChange = (name, date) => {
    setBodyParam({ ...bodyParam, [name]: date });
  };

  return (
    <>
      <div className="card card-custom gutter-b  px-7 py-3">
        <div className="filter_box mb-5">
          <div className="row">
            <div className="col-md-1 d-flex align-items-center">
              <h4 className="mb-0">Filters</h4>
            </div>
            <div className="col-md-2 mb-5 mb-md-0">
              <DatePicker
                label="Date"
                value={bodyParam.from_date}
                format="dd/MM/yyyy"
                onChange={(date) => handleDateChange("from_date", date)}
                animateYearScrolling
                inputVariant="outlined"
                size="small"
                fullWidth
              />
            </div>
            <div className="col-md-2 mb-5 mb-md-0">
              <DatePicker
                label="Date"
                value={bodyParam.to_date}
                format="dd/MM/yyyy"
                onChange={(date) => handleDateChange("to_date", date)}
                animateYearScrolling
                inputVariant="outlined"
                size="small"
                fullWidth
              />
            </div>

            <div className="col-md-2 mb-5 mb-md-0">
              <TextField
                fullWidth
                id="outlined-basic"
                size="small"
                onKeyUp={handleParams}
                name="filter_value"
                label="Search"
                variant="outlined"
              />
            </div>
          </div>
        </div>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            columns={[
              {
                field: "srno",
                headerName: "Sr. no",
                flex: 0,
                hide: true,
              },
              {
                field: "date",
                headerName: "Date",
                flex: 0.1,
              },
              {
                field: "emp_code",
                headerName: "Emp Code",
                flex: 0.1,
              },
              {
                field: "emp_name",
                headerName: "Emp Name",
                flex: 0.1,
              },
              {
                field: "in_time",
                headerName: "In Time",
                flex: 0.1,
              },
              {
                field: "out_time",
                headerName: "Out Time",
                flex: 0.1,
              },
              {
                field: "m_in_time",
                headerName: "Req. In Time",
                flex: 0.1,
              },

              {
                field: "m_out_time",
                headerName: "Req. Out Time",
                flex: 0.1,
              },
              {
                field: "remarks",
                headerName: "Remarks",
                flex: 0.1,
              },
            ]}
            pagination
            getRowId={(row) => row.srno}
            disableColumnFilter
            pageSize={params.pageSize}
            page={params.pageNo}
            rowsPerPageOptions={[10, 15, 25, 100]}
            rowCount={totalRecord}
            paginationMode="server"
            onPageSizeChange={handlePageSizeChange}
            onPageChange={handlePageChange}
            loading={loading}
            rowHeight={30}
            components={
              browseListData.length > 0
                ? {
                    Pagination: CustomPagination,
                    NoRowsOverlay: CustomNoRowsOverlay,
                  }
                : {}
            }
            onSortModelChange={(sort) => {
              if (sort.length > 0) {
                setParams({
                  ...params,
                  sort_column: sort[0].field,
                  sort_order: sort[0].sort,
                });
              }
            }}
            rows={browseListData}
          />
        </div>
      </div>
    </>
  );
};

export default AttendanceBrowse;
