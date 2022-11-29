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

const StockBrowse = () => {
  const [bodyParam, setBodyParam] = useState({
    date: new Date(),
    zero: false,
    category_id: "",
    product_id: "",
    siemens_product: "",
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

  const [categoryList, setCategoryList] = useState([]);
  const [mlfbList, setMLFBList] = useState([]);
  const [selectedValue, setSelectedValue] = useState({
    category: "",
    mlfb: "",
  });

  const handleChange = (e) => {
    if (e.target.name === "zero") {
      setBodyParam({ ...bodyParam, [e.target.name]: e.target.checked });
    } else {
      setBodyParam({ ...bodyParam, [e.target.name]: e.target.value });
    }
  };

  const handleDateChange = (date) => {
    setBodyParam({ ...bodyParam, date: date });
  };

  const handlePageSizeChange = (param) => {
    setParams({ ...params, pageSize: param });
  };
  const handlePageChange = (param) => {
    setParams({ ...params, pageNo: param });
  };

  const handleParams = (event) => {
    setTimeout(() => {
      setParams({ ...params, [event.target.name]: event.target.value });
    }, 800);
  };

  const getMLFBList = async (id) => {
    await CommonController.commonApiCallFilter(
      `Dropdown/GetMlfbListInStock`,
      {
        category_id: id,
      },
      "get"
    ).then((data) => setMLFBList(data));
  };

  const getCategoryList = async () => {
    await CommonController.commonApiCallFilter("Dropdown/GetCategoryList").then(
      (data) => setCategoryList(data)
    );
  };

  useEffect(() => {
    getCategoryList();
    getBrowseListData();
  }, []);

  useEffect(() => {
    getBrowseListData();
  }, [params]);

  const handleAutoChange = (name, value) => {
    setBodyParam({ ...bodyParam, [name]: value });
  };

  const getBrowseListData = async () => {
    setLoading(true);
    try {
      let body = { ...bodyParam };
      body.date = moment(bodyParam.date).format("DD-MM-yyyy");
      body.zero = bodyParam.zero ? "0" : "";
      await CommonController.commonApiCall(
        "Stock/NewDailyStockReportInStock",
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
                label="Date"
                value={bodyParam.date}
                format="dd/MM/yyyy"
                onChange={(date) => handleDateChange(date)}
                animateYearScrolling
                inputVariant="outlined"
                size="small"
                fullWidth
              />
            </div>
            <div className="col-md-2 mb-5 mb-md-0">
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={categoryList}
                onChange={(event, value) => {
                  setSelectedValue({ ...selectedValue, category: value });
                  handleAutoChange("category_id", value ? value.id : null);
                  if (value) {
                    getMLFBList(value.id);
                  }
                }}
                fullWidth
                getOptionLabel={(option) => option.value}
                value={selectedValue.category}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    size="small"
                    label="Category"
                  />
                )}
              />
            </div>
            <div className="col-md-2 mb-5 mb-md-0">
              <Autocomplete
                disablePortal
                id="combo-box-demo2"
                options={mlfbList}
                fullWidth
                getOptionLabel={(option) => option.value}
                value={selectedValue.mlfb}
                onChange={(event, value) => {
                  handleAutoChange("product_id", value ? value.id : null);
                  setSelectedValue({ ...selectedValue, mlfb: value });
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
            <div className="col-md-2 mb-5 mb-md-0">
              <TextField
                fullWidth
                id="outlined-basic"
                size="small"
                onChange={(e) => {
                  handleChange(e);
                }}
                name="siemens_product"
                select
                label="Siemen Product"
                variant="outlined"
              >
                <MenuItem value={"siemens"}>Siemens</MenuItem>
                <MenuItem value={"non-siemens"}>Non-Siemens</MenuItem>
              </TextField>
            </div>
            <div className="col-md-1 mb-5 mb-md-0">
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Zero"
                  name="zero"
                  checked={bodyParam.zero}
                  onChange={handleChange}
                />
              </FormGroup>
            </div>
            <div className="col-md-2">
              <TextField
                variant="outlined"
                size="small"
                name="filter_value"
                label="Search"
                onChange={handleParams}
                value={params.filter_value}
              />
            </div>
            <div className="col-md-12 text-right">
              <Button
                variant="contained"
                onClick={getBrowseListData}
                disableElevation
              >
                Refresh
              </Button>
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
                field: "erp_code",
                headerName: "ERP Code",
                flex: 0.1,
              },
              {
                field: "category",
                headerName: "Category",
                flex: 0.1,
              },
              {
                field: "group",
                headerName: "Group",
                flex: 0.1,
              },
              {
                field: "item",
                headerName: "Item",
                flex: 0.1,
              },
              {
                field: "mlfb",
                headerName: "MLFB",
                flex: 0.1,
              },
              {
                field: "description",
                headerName: "Description",
                flex: 0.1,
              },

              {
                field: "store_qty",
                headerName: "Store Qty",
                flex: 0.1,
                align: "right",
              },
              {
                field: "di_qty",
                headerName: "DI Qty",
                flex: 0.1,
                align: "right",
              },
              {
                field: "open_qty",
                headerName: "Open Qty",
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

export default StockBrowse;
