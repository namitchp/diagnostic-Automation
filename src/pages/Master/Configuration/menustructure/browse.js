import { TextField, Button, MenuItem } from "@material-ui/core";
import { DataGrid } from "@mui/x-data-grid";

import React, { useEffect, useState } from "react";
// import {
//   CommonController,
// } from "../../../../";
import {
  CommonController,
} from "../../../../_redux/controller/common.controller";
import CustomPagination from "../../../../components/CustomPagination";
import CustomNoRowsOverlay from "../../../../components/customRowComponent";
import {
  debounce,
  showErrorToast,
  showSuccessToast,
} from "../../../../components/common";
import { useSelector } from "react-redux";
const ConfigGroupBrowse = ({ type, onEdit, onPreviewData }) => {
  const userRight = useSelector((state) => state.common.userRightResponse);
  console.log(userRight)
  const [browseListData, setBrowseListData] = useState([]);
  const [totalRecord, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState({
    pageNo: 0,
    pageSize: 10,
    filter_value: "",
    sort_column: "",
    sort_order: "",
  });
  const handleParams = (event) => {
    debounce(
      setParams({ ...params, [event.target.name]: event.target.value }),
      1000
    );
  };
  const getBrowseListData = async () => {
    const id=localStorage.getItem("userId")
    setLoading(true);
    try {
      await CommonController.commonApiCall(
        "master/browse_menu",
        params,
        {user_id:id},
        "node"
      )
        .then((data) => {
          if (data.status === 200) {
            setBrowseListData(data.data);
            setTotalRecords(data.totalRecords);
          }
        })
        .catch((err) => {
          showErrorToast(err);
        });
    } catch (err) {
      showErrorToast(err);
    }
    setLoading(false);
  };
  const handlePageSizeChange = (param) => {
    setParams({ ...params, pageSize: param });
  };
  const handlePageChange = (param) => {
    if (param !== 0) {
      setParams({ ...params, pageNo: param });
    }
  };
  const onDelete = async (id) => {
    try {
      await CommonController.commonApiCallFilter(
        "master/delete_category",
        { p_category_id: id },
        "post",
        "node"
      )
        .then((result) => {
          if (result.status == 200) {
            getBrowseListData();
            showSuccessToast("Success Delete");
          }
        })
        .catch((err) => {
          showErrorToast(err);
        });
    } catch (err) {
      showErrorToast(err);
    }
  };
  const onPreview = async (id) => {
    try {
      await CommonController.commonApiCallFilter(
        "master/preview_category",
        { p_category_id: id },
        "post",
        "node"
      )
        .then((result) => {
          if (result.status == 200) {
            onPreviewData(...result.data);
          }
        })
        .catch((err) => {
          showErrorToast(err);
        });
    } catch (err) {
      showErrorToast(err);
    }
  };
  useEffect(() => {
    getBrowseListData();
  }, [params]);
  return (
    <>
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
          {/* <DateFilter onDateUpdate={() => getBrowseListData()} /> */}
        </div>
      </div>

      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          columns={[
            {
              field: "transaction_id",
              headerName: "ID",
              width: 100,
            },
            {
              field: "display_name",
              headerName: "Display Name",
              width: 250,
            },
            {
              field: "transaction_name",
              headerName: "Transaction Name",
              width: 250,
            },
            {
              field: "parent_transaction",
              headerName: "Parent Name",
              width: 150,
            },
            {
              field: "level",
              headerName: "Level",
              width: 150,
            },
            {
              field: "main_form",
              headerName: "Main Form",
              width: 250,
            },
            {
              field: "sequence",
              headerName: "Sequence",
              width: 150,
            },
            {
              field: "",
              headerName: "Actions",
              renderCell: (params) => (
                <div className="action_btns">
                  {/* <i
                    className="fas fa-search mr-2"
                    onClick={() => onPreview(params.row.p_category_id)}
                  ></i> */}
                  {console.log(userRight.update_right)}
                  {userRight.update_right&&<i
                    className="far fa-edit mr-2"
                    onClick={() => onEdit(params.row)}
                  ></i>}
                 
                </div>
              ),
              width: 150,
            },
          ]}
          // pagination
          
          disableColumnFilter
          // pageSize={params.pageSize}
          // page={params.pageNo}
          // rowsPerPageOptions={[10, 15, 25, 100]}
          getRowClassName={(params) => {
            return params.row.sr_no % 2 === 0 ? "even" : "odd";
          }}
          // rowCount={totalRecord}
          // paginationMode="server"
          // onPageSizeChange={handlePageSizeChange}
          // onPageChange={handlePageChange}
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
          getRowId={(browseListData) => browseListData.transaction_id}
        />
      </div>
    </>
  );
};
export default ConfigGroupBrowse;
