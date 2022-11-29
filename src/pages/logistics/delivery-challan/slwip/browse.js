import { TextField, Button, MenuItem } from "@material-ui/core";
import { DataGrid } from "@mui/x-data-grid";

import React, { useEffect, useState } from "react";



import {
  CommonController,
  currenyMasking,
} from "../../../../_redux/controller/common.controller";
import CustomPagination from "../../../../components/CustomPagination";
import CustomNoRowsOverlay from "../../../../components/customRowComponent"; 
import { debounce, showErrorToast } from "../../../../components/common";
import DateFilter from "../../../../components/dateFilter";
import moment from "moment";
import ActionButtons from "../../../../components/action-buttons";

const SlWipBrowse = ({slType}) => {
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
    chk_all:false,
    status: "",
    approval:"",
    sl_type:""
  });
  const handleParams = (event) => {
    debounce(     
      setParams({...params, [event.target.name]: event.target.value }),
      1000
    );
  };

  const handleBodyParam = (sl) => {

      setBodyParam({...bodyParam,sl_type:sl})
     
  };

  const getBrowseListData = async () => {
    setLoading(true);
    try {
      await CommonController.commonApiCall(
        "logistics/dc/browseWip",
        params,
        bodyParam,
        "node"
      ).then((data) => {
    
        if (data.status === 200) {
          setBrowseListData(data.data);
          setTotalRecords(data.totaldata);
          
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
    handleBodyParam(slType)
  
  }, [slType]);
 

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
              headerName: "SR. no",
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
              field: "dc_no",
              headerName: "DC No",
              width: 120,
            },
         
            {
              field: "Company",
              headerName: "Company Name",
              width: 120,
            },
          
            {
              field: "Contact",
              headerName: "Contact",
              width: 120,
            },
            {
              field: "sales_order",
              headerName: "Sales Order",
              width: 120,
            },
            {
                field: "so_date",
                headerName: "So Date",
                width: 120,
                renderCell:(params)=>{
                  return moment(params.row.so_date).format("DD/MM/YYYY");
                }
              },
              {
                field: "ref_date",
                headerName: "Ref Date",
                width: 120,
                renderCell:(params)=>{
                  return moment(params.row.ref_date).format("DD/MM/YYYY");
                }
              },
            {
              field: "ref_no",
              headerName: "Ref No",
              width: 120,
            },
            {
              field: "di_no",
              headerName: "DI No.",
              width: 120,
            },
            {
              field: "pi_no",
              headerName: "PI No.",
              width: 150,
            },
            
            {
              field: "dis_through",
              headerName: "Dispatch Thr",
              width: 120,
            }, {
              field: "Destination",
              headerName: "Destination",
              width: 120,
            }, {
              field: "vehicle_no",
              headerName: "Vehicle No",
              width: 120,
            },
            {
              field: "amount",
              headerName: "Amount",
              width: 120,
            },{
              field: "mdc_amount",
              headerName: "MDC Amount",
              width: 120,
            },{
              field: "actual_amount",
              headerName: "Actual Amount",
              width: 120,
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

export default SlWipBrowse;
