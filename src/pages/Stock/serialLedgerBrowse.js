import { TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Autocomplete } from "@material-ui/lab";

import { CommonController } from "../../_redux/controller/common.controller";
import { DataGrid } from "@mui/x-data-grid";
import CustomPagination from "../../components/CustomPagination";
import CustomNoRowsOverlay from "../../components/customRowComponent";
import { showErrorToast } from "../../components/common";

const user_id = {
  user_id: localStorage.getItem("userId"),
};

const SerialLedgerBrowse = () => {
  const [bodyParam, setBodyParam] = useState({
    product_id: "",
    serial_no: "",
    category_id: "",
  });
  const [categoryList, setCategoryList] = useState([]);
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
  const [selectedValue, setSelectedValue] = useState({
    category: "",
    mlfb: "",
  });

  const handlePageSizeChange = (param) => {
    setParams({ ...params, pageSize: param });
  };
  const handlePageChange = (param) => {
    setParams({ ...params, pageNo: param });
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
  }, [bodyParam]);

  const handleAutoChange = (name, value) => {
    setBodyParam({ ...bodyParam, [name]: value });
  };

  const getBrowseListData = async () => {
    setLoading(true);
    try {
      await CommonController.commonApiCall(
        "Stock/ProductLedgerSerialNoReport",
        params,
        bodyParam,
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
            <div className="col-md-2">
              <TextField
                variant="outlined"
                size="small"
                name="serial_no"
                label="Serial No"
                onChange={(e) =>
                  setBodyParam({ ...bodyParam, serial_no: e.target.value })
                }
                value={bodyParam.serial_no}
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
                field: "mlfb_no",
                headerName: "In Qty",
                flex: 0.1,
              },

              {
                field: "serial_no",
                headerName: "Out Qty",
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
            rows={[]}
          />
        </div>
      </div>
    </>
  );
};

export default SerialLedgerBrowse;
