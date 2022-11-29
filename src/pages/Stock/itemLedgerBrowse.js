import { DatePicker } from "@material-ui/pickers";
import { Button, MenuItem, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Autocomplete } from "@material-ui/lab";
import { FormControlLabel, FormGroup, Checkbox } from "@mui/material";
import { CommonController } from "../../_redux/controller/common.controller";
import { DataGrid } from "@mui/x-data-grid";
import CustomPagination from "../../components/CustomPagination";
import CustomNoRowsOverlay from "../../components/customRowComponent";
import { showErrorToast } from "../../components/common";
import moment from "moment";

const user_id = {
  user_id: localStorage.getItem("userId"),
};

const ItemLedgerBrowse = () => {
  const [bodyParam, setBodyParam] = useState({
    sdate: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
    edate: new Date(),
    product_id: "",
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

  const [mlfbList, setMLFBList] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");

  const getProductList = async () => {
    await CommonController.commonApiCallFilter(
      "Dropdown/GetProductMlfb",
      {}
    ).then((data) => setMLFBList(data));
  };

  const handleDateChange = (name, date) => {
    setBodyParam({ ...bodyParam, [name]: date });
  };

  const handlePageSizeChange = (param) => {
    setParams({ ...params, pageSize: param });
  };
  const handlePageChange = (param) => {
    setParams({ ...params, pageNo: param });
  };

  useEffect(() => {
    getProductList();
    getBrowseListData();
  }, []);

  useEffect(() => {
    getBrowseListData();
  }, [bodyParam]);

  const handleAutoChange = (name, value) => {
    setBodyParam({ ...bodyParam, [name]: value });
  };

  const getBrowseListData = async () => {
    setLoading(true);
    try {
      let body = { ...bodyParam };
      body.sdate = moment(bodyParam.sdate).format("DD-MM-yyyy");
      body.edate = moment(bodyParam.edate).format("DD-MM-yyyy");
      await CommonController.commonApiCall(
        "Stock/NewDailyLedgerReportInStock",
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
                label="From Date"
                value={bodyParam.sdate}
                format="dd/MM/yyyy"
                onChange={(date) => handleDateChange("sdate", date)}
                animateYearScrolling
                inputVariant="outlined"
                size="small"
                fullWidth
              />
            </div>
            <div className="col-md-2 mb-5 mb-md-0">
              <DatePicker
                label="To Date"
                value={bodyParam.edate}
                format="dd/MM/yyyy"
                onChange={(date) => handleDateChange("edate", date)}
                animateYearScrolling
                inputVariant="outlined"
                size="small"
                minDate={bodyParam.sdate}
                fullWidth
              />
            </div>

            <div className="col-md-2 mb-5 mb-md-0">
              <Autocomplete
                disablePortal
                id="combo-box-demo2"
                options={mlfbList}
                fullWidth
                getOptionLabel={(option) => option.value}
                value={selectedValue}
                onChange={(event, value) => {
                  handleAutoChange("product_id", value ? value.id : null);
                  setSelectedValue(value);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    size="small"
                    label="MLFB No."
                  />
                )}
              />
            </div>
          </div>
        </div>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            columns={[
              {
                field: "id",
                headerName: "Sr. no",
                flex: 0,
                hide: true,
              },
              {
                field: "entry_type",
                headerName: "Entry Type",
                flex: 0.1,
              },
              {
                field: "comp_id",
                headerName: "Comp Id",
                flex: 0.1,
              },
              {
                field: "tran_no",
                headerName: "Tran No",
                flex: 0.1,
              },
              {
                field: "date",
                headerName: "Date",
                flex: 0.1,
              },
              {
                field: "party",
                headerName: "Party",
                flex: 0.1,
              },
              {
                field: "in_qty",
                headerName: "In Qty",
                flex: 0.1,
              },

              {
                field: "out_qty",
                headerName: "Out Qty",
                flex: 0.1,
                align: "right",
              },
              {
                field: "balance",
                headerName: "Balance",
                flex: 0.1,
                align: "right",
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
      </div>
    </>
  );
};

export default ItemLedgerBrowse;
