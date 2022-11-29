import { TextField, Button, MenuItem } from "@material-ui/core";
import { DataGrid } from "@mui/x-data-grid";

import React, { useEffect, useState } from "react";

import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import { CommonController } from "../../_redux/controller/common.controller";
import CustomPagination from "../../components/CustomPagination";
import CustomNoRowsOverlay from "../../components/customRowComponent";
import { showErrorToast } from "../../components/common";
import DateFilter from "../../components/dateFilter";

const DCBrowseList = (props) => {
  const history = useHistory();
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

  const [bodyParam, setBodyParam] = useState({
    user_id: localStorage.getItem("userId"),
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
    try {
      await CommonController.commonApiCall(
        "dc/browseDCPackage",
        params,
        bodyParam,

        "node"
      ).then((data) => {
        if (data.status === 200) {
          setBrowseListData(data.data);
          setTotalRecords(data.recordsFiltered);
        } else {
          showErrorToast("Something went wrong");
        }
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

  useEffect(() => {
    getBrowseListData();
  }, []);

  useEffect(() => {
    getBrowseListData();
  }, [params, bodyParam]);

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
          <DateFilter onDateUpdate={() => getBrowseListData()} />
        </div>
      </div>

      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          columns={[
            {
              field: "id",
              headerName: "Sr. no",
              flex: 0,
            },
            {
              field: "entry_no",
              headerName: "Entry No.",
              width: 100,
            },

            {
              field: "date",
              headerName: "Date",
              width: 120,
            },
            {
              field: "company_name",
              headerName: "Company Name",
              width: 400,
            },

            {
              field: "remarks",
              headerName: "Remarks",
              width: 400,
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
        />
      </div>
    </>
  );
};

export default DCBrowseList;
