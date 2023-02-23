import { Checkbox, TextField } from "@material-ui/core";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { showErrorToast, showSuccessToast } from "../../../components/common";
import CustomPagination from "../../../components/CustomPagination";
import CustomNoRowsOverlay from "../../../components/customRowComponent";
import { Loader } from "../../../components/loader";
import { CommonController } from "../../../_redux/controller/common.controller";
import ActionButtons from "../../../components/action-buttons";
import { useDispatch, useSelector } from "react-redux";
import { selectedEmployeeId } from "../../../_redux/actions/masters/all.action";
import {
  updateFilterData,
  getFilterData,
} from "../../../_redux/actions/common.action";

const user_id = {
  user_id: localStorage.getItem("userId"),
};

const label = { inputProps: { "aria-label": "Checkbox" } };
const EmployeeBrowse = ({ onEdit }) => {
  const dispatch = useDispatch();
  const userRight = useSelector((state) => state.common.userRightResponse);
  const filterjsonData = useSelector((state) => state.common.getFilterData);
  const [browseListData, setBrowseListData] = useState([]);
  const [totalRecord, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const [jsonfilter, setjsonfilter] = useState(false);
  const [params, setParams] = useState({
    pageNo: 0,
    pageSize: 10,
    filter_value: "",
    sort_column: "",
    sort_order: "",
  });
  const [gridColumn, setgridColumn] = useState([
    {
      field: "user_id",
      headerName: "Sr. no",
      flex: 0,
    },
    {
      field: "Code",
      headerName: "Code",
      flex: 0.1,
    },
    {
      field: "Emp_name",
      headerName: "Emp. Name",
      flex: 0.1,
    },
    {
      field: "Address",
      headerName: "Address",
      flex: 0.1,
    },
    {
      field: "Mobile",
      headerName: "Mobile",
      flex: 0.1,
    },
    {
      field: "E-mail",
      headerName: "Email",
      flex: 0.1,
    },
    {
      field: "Department",
      headerName: "Department",
      flex: 0.1,
    },
    {
      field: "Designation",
      headerName: "Designation",
      flex: 0.1,
    },
    {
      field: "Manager",
      headerName: "Manager",
      flex: 0.1,
    },
    {
      field: "edit_button",
      headerName: "Disable",
      flex: 0.1,
      renderCell: (params) => {
        return (
          <Checkbox
            {...label}
            color="primary"
            checked={params.row.edit_button === true}
          />
        );
      },
    },
    {
      field: "",
      headerName: "Actions",
      renderCell: (params) => (
        <ActionButtons
          onPreview={() =>
            handleEdit({ id: params.row.user_id, type: "preview" })
          }
          onEdit={
            userRight.update_right
              ? () => handleEdit({ id: params.row.user_id, type: "edit" })
              : null
          }
          onDelete={
            userRight.delete_right
              ? () => handleDeleteRow(params.row.user_id)
              : null
          }
        />
      ),
      flex: 0.1,
    },
  ]);

  const handleParams = (event) => {
    setTimeout(() => {
      setParams({ ...params, [event.target.name]: event.target.value });
    }, 800);
    setjsonfilter(true);
  };

  const getBrowseListData = async () => {
    setLoading(true);
    await CommonController.commonApiCall(
      "master/browse_employee_master",
      params,
      "",
      "node"
    )
      .then((data) => {
        setBrowseListData(data.data);
        setTotalRecords(data.totalRecords);
      })
      .catch((err) => {
        showErrorToast(err);
      });
    setLoading(false);
  };

  const handlePageSizeChange = (param) => {
    setParams({ ...params, pageSize: param });
    setjsonfilter(true);
  };
  const handlePageChange = (param) => {
    setParams({ ...params, pageNo: param });
    setjsonfilter(true);
  };
  const handleUpdateFilterData = () => {
    let body = {
      filterPage: { ...params },
    };
    body.user_id = localStorage.getItem("userId");
    body.browse_id = 7;
    dispatch(updateFilterData(body));
    // if (updatefilterjsonData.status == 200) {
    //   // dispatch(getFilterData(1));
    // }
  };

  const handleColumnHide = (e) => {
    console.log(e);
    const index = gridColumn.findIndex((val) => val.field == e.field);
    let columns = [...gridColumn];
    columns[index] = { ...columns[index], hide: e.colDef.hide };
    setgridColumn(columns);
    setParams({ ...params, columns: columns });
    setjsonfilter(true);
  };

  useEffect(() => {
    if (filterjsonData) {
      setParams(filterjsonData.data.filterPage);
      if (filterjsonData?.data?.filterPage?.columns?.length > 0) {
        const data = filterjsonData?.data?.filterPage?.columns?.map(
          (val, index) => {
            const columns = [...gridColumn];
            return (columns[index] = { ...columns[index], hide: val.hide });
          }
        );
        setgridColumn(data);
      }
    }
  }, [filterjsonData]);
  useEffect(() => {
    getBrowseListData();
    dispatch(getFilterData(7));
  }, []);
  useEffect(() => {
    getBrowseListData();
    if (jsonfilter) {
      handleUpdateFilterData();
    }
  }, [params, jsonfilter]);

  const handleEdit = (id) => {
    dispatch(selectedEmployeeId(id));
    onEdit();
  };

  const handleDeleteRow = (id) => {
    CommonController.commonApiCallFilter(
      "master/delete_employee_master",
      {
        user_id: id,
      },
      "post",
      "node"
    ).then((data) => {
      if (data.valid) {
        showSuccessToast("Record Deleted Successfully");
        getBrowseListData();
      } else {
        showErrorToast("Something went wrong");
      }
    });
  };

  return (
    <div className="inner_data_wrapper">
      <div className="bg-white rounded p-3">
        {loading && <Loader />}
        <div className="filter_box mb-3">
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
        <div className="data_table_height">
          <DataGrid
            columns={gridColumn}
            pagination
            disableColumnFilter
            pageSize={params?.pageSize}
            page={params?.pageNo}
            rowsPerPageOptions={[10, 25, 100]}
            rowCount={totalRecord}
            paginationMode="server"
            onPageSizeChange={handlePageSizeChange}
            onPageChange={handlePageChange}
            loading={loading}
            rowHeight={30}
            components={
              browseListData?.length > 0
                ? {
                    Pagination: CustomPagination,
                    // NoRowsOverlay: CustomNoRowsOverlay,
                  }
                : null
            }
            headerHeight={40}
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
            getRowId={(productList) => productList.user_id}
            getRowClassName={(params) => {
              return params.id % 2 === 0 ? "even" : "odd";
            }}
            onColumnVisibilityChange={(e) => handleColumnHide(e)}
          />
        </div>
      </div>
    </div>
  );
};

export default EmployeeBrowse;
