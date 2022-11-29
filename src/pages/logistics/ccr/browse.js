import { TextField, Button, MenuItem } from "@material-ui/core";
import { DataGrid } from "@mui/x-data-grid";

import React, { useEffect, useState } from "react";



import {
  CommonController,
  currenyMasking,
} from "../../../_redux/controller/common.controller";
import CustomPagination from "../../../components/CustomPagination";
import CustomNoRowsOverlay from "../../../components/customRowComponent"; 
import { debounce, showErrorToast } from "../../../components/common";
import DateFilter from "../../../components/dateFilter";
import moment from "moment";
import ActionButtons from "../../../components/action-buttons";

const CcrBrowse = ({ type }) => {
  const [browseListData, setBrowseListData] = useState([]);

  const [totalRecord, setTotalRecords] = useState(0);
  const [amountFigures, setAmountFigures] = useState({
    amount: 0,
    mdc_amount: 0,
    actual_amount: 0,
  });

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
    chk_all:true,
    status: "",
    approval:"",
  });
  const handleParams = (event) => {
    debounce(     
      setParams({...params, [event.target.name]: event.target.value }),
      1000
    );
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
        "logistic/browse_ccrin",
        params,
        bodyParam,

        "node"
      ).then((data) => {
        if (data.status === 200) {
          setBrowseListData(data.data);
          setTotalRecords(data.totalRecords);
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
  const handleRowId=(e)=>{
    console.log(e)
  }
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
              field: "tran_id",
              headerName: "ID",
              flex: 0,
            },
            {
              field: "date",
              headerName: "Date",
              width: 100,
              renderCell: (params) => {
                return moment(params.row.date).format("DD/MM/YYYY");
              },
            },

            {
              field: "ccrin_no",
              headerName: "JWIN No.",
              width: 120,
            },
            // {
            //   field: "mrn_date",
            //   headerName: "MRN Date",
            //   width: 120,
            // },
            
           
            {
              field: "company_id",
              headerName: "Party ID",
              width: 120,
            },
            {
              field: "company_name",
              headerName: "Party Name",
              width: 120,
            },
          
            {
              field: "cperson_name",
              headerName: "Contact",
              width: 120,
            },
            {
              field: "notification_no",
              headerName: "Notification No",
              width: 120,
            },
            {
              field: "notification_date",
              headerName: "Notification Date",
              width: 100,
              renderCell: (params) => {
                return moment(params.row.notification_date).format("DD/MM/YYYY");
              },
            },
            {
                field: "carrier",
                headerName: "carrier",
                width: 120,
              },
              {
                field: "destination",
                headerName: "Destination",
                width: 120,
              },
            {
              field: "vehicle_no",
              headerName: "Vehicle No",
              width: 120,
            },
            {
              field: "fault",
              headerName: "Fault",
              width: 120,
            },
            {
              field: "remarks",
              headerName: "Remarks",
              width: 150,
            },
           
            {
              field: "action",
              headerName: "Actions",
              width: 120,
            },
          ]}
          
          pagination
          // getRowId={handleRowId}
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
          getRowId={(browseListData) =>  browseListData.tran_id}
        />
      </div>
  
    </>
  );
};

export default CcrBrowse;
