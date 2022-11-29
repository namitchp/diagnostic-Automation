import { Checkbox, TextField } from "@material-ui/core";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { showErrorToast, showSuccessToast } from "../../../components/common";
import CustomPagination from "../../../components/CustomPagination";
import CustomNoRowsOverlay from "../../../components/customRowComponent";
import { Loader } from "../../../components/loader";
import { CommonController } from "../../../_redux/controller/common.controller";
import ActionButtons from "../../../components/action-buttons";
import { useDispatch } from "react-redux";
import { selectedEmployeeId } from "../../../_redux/actions/masters/all.action";

const user_id = {
  user_id: localStorage.getItem("userId"),
};

const label = { inputProps: { "aria-label": "Checkbox" } };
const EmployeeBrowse = ({ onEdit }) => {
  const dispatch = useDispatch();
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

  const handleParams = (event) => {
    setTimeout(() => {
      setParams({ ...params, [event.target.name]: event.target.value });
    }, 800);
  };

  const getBrowseListData = async () => {
    setLoading(true);
    await CommonController.commonApiCall(
      "Employee/EmpMasterBrowse",
      params,
      user_id
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

  const handlePageSizeChange = (param) => {
    setParams({ ...params, pageSize: param.pageSize });
  };
  const handlePageChange = (param) => {
    setParams({ ...params, pageNo: param.page });
  };

  useEffect(() => {
    getBrowseListData();
  }, []);

  useEffect(() => {
    getBrowseListData();
  }, [params]);

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
            },
            {
              field: "code",
              headerName: "Code",
              flex: 0.1,
            },
            {
              field: "empname",
              headerName: "Emp. Name",
              flex: 0.1,
            },
            {
              field: "address",
              headerName: "Address",
              flex: 0.1,
            },
            {
              field: "mobile",
              headerName: "Mobile",
              flex: 0.1,
            },
            {
              field: "email",
              headerName: "Email",
              flex: 0.1,
            },
            {
              field: "department",
              headerName: "Department",
              flex: 0.1,
            },
            {
              field: "designation",
              headerName: "Designation",
              flex: 0.1,
            },
            {
              field: "manager",
              headerName: "Manager",
              flex: 0.1,
            },
            {
              field: "disable",
              headerName: "Disable",
              flex: 0.1,
              renderCell: (params) => {
                return (
                  <Checkbox
                    {...label}
                    color="primary"
                    checked={params.row.disable === "True"}
                  />
                );
              },
            },
            {
              field: "",
              headerName: "Actions",
              renderCell: (params) => (
                <ActionButtons
                  onEdit={() => handleEdit(params.row.id)}
                  onDelete={() => handleDeleteRow(params.row.id)}
                />
              ),
              flex: 0.1,
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
          components={{
            Pagination: CustomPagination,
            NoRowsOverlay: CustomNoRowsOverlay,
          }}
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

export default EmployeeBrowse;
