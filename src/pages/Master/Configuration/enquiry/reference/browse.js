import { TextField, Button, MenuItem } from "@material-ui/core";
import { DataGrid } from "@mui/x-data-grid";

import React, { useEffect, useState } from "react";
import { CommonController } from "../../../../../_redux/controller/common.controller";
import CustomPagination from "../../../../../components/CustomPagination";
import CustomNoRowsOverlay from "../../../../../components/customRowComponent";
import {
  debounce,
  showErrorToast,
  showSuccessToast,
} from "../../../../../components/common";
import { useSelector } from "react-redux";
const ConfigGroupBrowse = ({ type, onEdit, onPreviewData }) => {
  const userRight = useSelector((state) => state.common.userRightResponse);
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
    setLoading(true);
    try {
      await CommonController.commonApiCall(
        "master/browse_enq_reference",
        params,
        "",
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
        "master/delete_enq_reference",
        { enq_ref_id: id },
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
        "master/preview_enq_reference",
        { enq_ref_id: id },
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
    <div className="bg-white p-4 rounded w-100">
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
          {/* <DateFilter onDateUpdate={() => getBrowseListData()} /> */}
        </div>
      </div>

      <div className="data_table_height">
        <DataGrid
          columns={[
            {
              field: "enq_ref_id",
              headerName: "ID",
              flex: 10,
            },
            {
              field: "enq_ref",
              headerName: "Name",
              width: 450,
            },

            {
              field: "",
              headerName: "Actions",
              renderCell: (params) => (
                <div className="action_btns">
                  <i
                    className="fas fa-search mr-2"
                    onClick={() => onPreview(params.row.enq_ref_id)}
                  ></i>
                  {userRight.update_right && (
                    <i
                      className="far fa-edit mr-2"
                      onClick={() => onEdit(params.row)}
                    ></i>
                  )}
                  {userRight.delete_right && (
                    <i
                      className="far fa-trash-alt mr-2"
                      onClick={() => onDelete(params.row.enq_ref_id)}
                    ></i>
                  )}
                </div>
              ),
              width: 150,
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
          getRowId={(browseListData) => browseListData.enq_ref_id}
        />
      </div>
    </div>
  );
};
export default ConfigGroupBrowse;
