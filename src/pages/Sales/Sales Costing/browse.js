import { TextField, MenuItem } from "@material-ui/core";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import {
  getBrowseUserRight,
  showErrorToast,
  showSuccessToast,
} from "../../../components/common";
import CustomPagination from "../../../components/CustomPagination";
import CustomNoRowsOverlay from "../../../components/customRowComponent";
import { Loader } from "../../../components/loader";
import { CommonController } from "../../../_redux/controller/common.controller";
import ActionButtons from "../../../components/action-buttons";
import { useDispatch, useSelector } from "react-redux";
import { selectedEmployeeId } from "../../../_redux/actions/masters/all.action";

import moment from "moment";

import { DatePicker } from "@material-ui/pickers";
import DateFilter from "../../../components/dateFilter";

const SalesCostingBrowse = ({ onEdit }) => {
  const dispatch = useDispatch();

  const getuserRightListResponse = useSelector(
    (state) => state.common.userRightList
  );

  const [browseListData, setBrowseListData] = useState([]);
  const [totalRecord, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);

  const [markEng, setMarkEng] = useState(null);

  const [params, setParams] = useState({
    pageNo: 1,
    pageSize: 15,
    filter_value: "",
    sort_column: "",
    sort_order: "desc",
  });

  const [bodyParam, setBodyParam] = useState({
    user_id: "",
    chk_All: "1",
    company_name: "",
    type: "all",
    status: "all",
    mark_engg: "",
    fromDate: null,
    toDate: null,
  });

  const handleParams = (event) => {
    setTimeout(() => {
      setParams({ ...params, [event.target.name]: event.target.value });
    }, 800);
  };

  const handleBodyParam = (event) => {
    setTimeout(() => {
      setBodyParam({ ...bodyParam, [event.target.name]: event.target.value });
    }, 800);
  };

  const getBrowseListData = async () => {
    setLoading(true);
    await CommonController.commonApiCall(
      "Costing/SalesCostingBrowse",
      params,
      bodyParam
    )
      .then((data) => {
        setBrowseListData(data.data);
        setTotalRecords(data.recordsFiltered);
      })
      .catch((err) => {
        showErrorToast(err);
      });
    setLoading(false);
  };

  const getMarkEngList = () => {
    CommonController.commonApiCallFilter("Dropdown/SalesEnquiryDropdown").then(
      (data) => setMarkEng(data.employeeList)
    );
  };

  const handlePageSizeChange = (param) => {
    setParams({ ...params, pageSize: param.pageSize });
  };
  const handlePageChange = (param) => {
    setParams({ ...params, pageNo: param.page });
  };

  const handleDateChange = (type, date) => {
    setBodyParam({ ...bodyParam, [type]: date });
  };

  useEffect(() => {
    getBrowseListData();

    getMarkEngList();
  }, []);

  useEffect(() => {
    getBrowseListData();
  }, [params, getuserRightListResponse, bodyParam]);

  const handleEdit = (id) => {
    dispatch(selectedEmployeeId(id));
    onEdit();
  };

  const handleDeleteRow = (id) => {
    CommonController.commonApiCallFilter("Employee/EmployeeMasterDelete", {
      employee_id: id,
    }).then((data) => {
      if (data.valid) {
        showSuccessToast("Record Deleted Successfully");
        getBrowseListData();
      } else {
        showErrorToast("Something went wrong");
      }
    });
  };

  return (
    <>
      {loading && <Loader />}

      <div className="filter_box mb-5">
        <div className="row">
          <div className="col-md-1 d-flex align-items-center">
            <h4 className="mb-0">Filters</h4>
          </div>

          <div className="col-md-2">
            <TextField
              fullWidth
              id="outlined-basic"
              size="small"
              onKeyDown={(e) => {
                if (e.keyCode === 13) {
                  handleParams(e);
                }
              }}
              name="filter_value"
              label="Search"
              variant="outlined"
            />
          </div>
          <DateFilter onDateUpdate={() => getBrowseListData()} />
          
         
          <div className="col-md-2">
            <TextField
              fullWidth
              id="outlined-basic"
              size="small"
              onKeyDown={(e) => {
                if (e.keyCode === 13) {
                  handleBodyParam(e);
                }
              }}       
              name="party_name"
              label="Company Name"
              variant="outlined"
            />
          </div>
          <div className="col-md-1">
            <TextField
              fullWidth
              id="outlined-basic"
              size="small"
              onChange={(e) => {
                handleBodyParam(e);
              }}
              name="type"
              select
              label="Type"
              variant="outlined"
            >
              <MenuItem value={"all"}>All</MenuItem>
              <MenuItem value={"spares"}>Spares</MenuItem>
              <MenuItem value={"projects"}>Projects</MenuItem>
              <MenuItem value={"service"}>Service</MenuItem>
            </TextField>
          </div>
          <div className="col-md-1">
            <TextField
              fullWidth
              id="outlined-basic"
              size="small"
              onChange={(e) => {
                handleBodyParam(e);
              }}
              select
              name="status"
              label="Status"
              variant="outlined"
            >
              <MenuItem value={"all"}>All</MenuItem>
              <MenuItem value={"spares"}>Close</MenuItem>
              <MenuItem value={"spares"}>Open</MenuItem>
            </TextField>
          </div>
          <div className="col-md-2 mt-3">
            <TextField
              fullWidth
              id="outlined-basic"
              size="small"
              onChange={(e) => {
                handleBodyParam(e);
              }}
              select
              name="mark_engg"
              label="Marketing Eng."
              variant="outlined"
            >
              <MenuItem value={""}>None</MenuItem>
              {markEng &&
                markEng.map((eng, indx) => {
                  return (
                    <MenuItem value={eng.value} key={indx}>
                      {eng.value}
                    </MenuItem>
                  );
                })}
            </TextField>
          </div>
        </div>
      </div>
      {/* Update remarks modal */}

      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          columns={[
            {
              field: "id",
              headerName: "Sr. no",
              width: 80,
            },
            {
              field: "date",
              headerName: "Date",
              width: 100,
            },
            {
              field: "riv",
              headerName: "Costing No",
              width: 120,
            },
            {
              field: "company_id",
              headerName: "Comp Id",
              width: 100,
            },
            {
              field: "company_name",
              headerName: "Company Name",
              width: 200,
            },
            {
              field: "mark_engg",
              headerName: "Marketing Eng.",
              width: 150,
            },

            {
              field: "type",
              headerName: "Type",
              width: 100,
            },
            {
              field: "status_name",
              headerName: "Status",
              width: 100,
            },
            {
              field: "reference_name",
              headerName: "Reference",
              width: 120,
            },
            {
              field: "description",
              headerName: "Description",
              width: 200,
            },

            {
              field: "",
              headerName: "Actions",
              renderCell: (params) => (
                <ActionButtons
                  onPreview={
                    getBrowseUserRight(getuserRightListResponse)?.view_right ==
                    "True"
                      ? () => handleEdit(params.row.id)
                      : null
                  }
                  onEdit={
                    getBrowseUserRight(getuserRightListResponse)?.edit_button ==
                    "True"
                      ? () => handleEdit(params.row.id)
                      : null
                  }
                  onDelete={
                    getBrowseUserRight(getuserRightListResponse)
                      ?.delete_right == "True"
                      ? () => handleDeleteRow(params.row.id)
                      : null
                  }
                />
              ),
              width: 100,
            },
          ]}
          pagination
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
          //components={{
          //Pagination: CustomPagination,
          //NoRowsOverlay: CustomNoRowsOverlay,
          //       }}
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
    </>
  );
};

export default SalesCostingBrowse;
