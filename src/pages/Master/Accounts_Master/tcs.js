import { Button } from "@material-ui/core";
import { Autocomplete, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { showErrorToast, showSuccessToast } from "../../../components/common";
import CustomPagination from "../../../components/CustomPagination";
import CustomNoRowsOverlay from "../../../components/customRowComponent";
import { CommonController } from "../../../_redux/controller/common.controller";
export const TCSAccount = ({ accountType }) => {
  const [companyList, setCompanyList] = useState([]);
  const [browseListData, setBrowseListData] = useState([]);
  const [totalRecord, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setformData] = useState({
    company_id:0,
    tcs_per: "",
    company_name:""
  });
  const [params, setParams] = useState({
    pageNo:0,
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
  const getBrowseListData = async () => {
    setLoading(true);
    await CommonController.commonApiCall(
      "master/browse_account_master_tcs",
      params,
      { account_type: accountType },
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
    setLoading(false);
  };
  const saveForm = async () => {
    try {
      await CommonController.commonApiCallFilter(
        "master/insert_account_master_tcs",
        formData,
        "post",
        "node"
      ).then((data) => {
        if (data.status === 200) {
          showSuccessToast("success");
          getBrowseListData();
          setformData({...formData, tcs_per: "" });
        }
      });
    } catch (err) {
      showErrorToast(err);
    }
  };
  useEffect(() => {
    getBrowseListData();
  }, [accountType, params]);
  useEffect(() => {
    CommonController.commonApiCallFilter(
      "master/list_account_master_tcs",
      "",
      "post",
      "node"
    ).then((data) => {
      if (data.status === 200){
        setCompanyList(data[accountType]);
      } 
    });
  }, []);
  return (
    <div className="py-3">
      <div className="row">
        <div className="col-md-3 ml-3">
          <Autocomplete
            size="small"
            options={companyList}
            getOptionLabel={(option) => option.company_name}
            fullWidth
            value={formData.company_name!=""?{company_name:formData.company_name ,company_id:formData.company_id}:null}
            onChange={(event, value) =>
              setformData({ ...formData, company_id: value.company_id ,company_name:value.company_name})
            }
            variant="outlined"
            renderInput={(params) => (
              <TextField {...params} label="Company Name" variant="outlined" />
            )}
          />
        </div>
        <div className="col-md-3 mb-3">
          <TextField
            label="tcs(%)"
            fullWidth
            // disabled
            variant="outlined"
            size="small"
            value={formData.tcs_per}
            onChange={(e) =>
              setformData({ ...formData, tcs_per: e.target.value })
            }
          />
        </div>
        <div className="col-md-3 mb-3">
          <Button
            variant="contained"
            onClick={saveForm}
            color="primary"
            disableElevation
          >
            Submit
          </Button>
        </div>
      </div>
      <hr />
      <div className="col-md-3 mb-5">
        <TextField
          label="Search"
          fullWidth
          // disabled
          variant="outlined"
          size="small"
          name="company_id"
          value={params.filter_value}
          onChange={(e)=>setParams({...params,filter_value:e.target.value})}
        />
      </div>
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          columns={[
            {
              field: "company_id",
              headerName: "ID",
              width: 300,
              hide: false,
            },
            {
              field: "company_name",
              headerName: "Company Name",
              width: 700,
              hide: false,
            },
            {
              field: "tcs_per",
              headerName: "TCS Per",
              width: 400,
              hide: false,
            },
            {
              field: "",
              headerName: "Action",
              width: 180,
              hide: false,
            },
          ]}
          pagination
          disableColumnFilter
          pageSize={params.pageSize}
          page={params.pageNo}
          getRowClassName={(params) => {
            return params.row.sr_no % 2 === 0 ? "even" : "odd";
          }}
          rowCount={totalRecord}
          rowsPerPageOptions={[10]}
          paginationMode="server"
          onPageSizeChange={handlePageSizeChange}
          onPageChange={handlePageChange}
          loading={loading}
          headerHeight={42}
          autoPageSize
          rowHeight={35}
          maxColumns= {6}
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
          // onColumnVisibilityChange={(e) => handleColumnHide(e)}

          rows={browseListData} //accountMasterList
          getRowId={(browseListData) => browseListData.company_id}
        />
      </div>
    </div>
  );
};
