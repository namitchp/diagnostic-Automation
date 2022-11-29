import { TextField, Button, MenuItem } from "@material-ui/core";
import { DataGrid } from "@mui/x-data-grid";

import React, { useEffect, useState } from "react";

import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import {
  CommonController,
  currenyMasking,
} from "../../../_redux/controller/common.controller";
import CustomPagination from "../../../components/CustomPagination";
import CustomNoRowsOverlay from "../../../components/customRowComponent";
import { debounce, showErrorToast } from "../../../components/common";
import DateFilter from "../../../components/dateFilter";
import moment from "moment";

const DeliveryChallanBrowse = ({ type ,slType }) => {
  
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
    status: "",
    chk_all: false,
    sl_type:slType,
  });

  const handleParams = (event) => {
    debounce(
      setParams({ ...params, [event.target.name]: event.target.value }),
      1000
    );
  };
  const handleBodyParam = (event) => {
    setTimeout(() => {
     setBodyParam({...bodyParam,sl_type:event})
    }, 800);
  };

  const getBrowseListData = async () => {
    setLoading(true);
    try {
      await CommonController.commonApiCall(
        "logistics/dc/browseDelivery",
        params,
        bodyParam,

        "node"
      ).then((data) => {
        if (data.status === 200) {
          setBrowseListData(data.data);
          setTotalRecords(data.recordsFiltered);
          setAmountFigures({
            amount: data.amount,
            mdc_amount: data.mdc_amount,
            actual_amount: data.actual_amount,
          });
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
    handleBodyParam(slType)
  
  }, [slType]);

  useEffect(() => {
    getBrowseListData();
  }, [params, bodyParam]);

  return (
    <>
      <div className="d-flex align-items-center">
        <div className="filter_box ">
          <div className="row">
            <div className="col-md-1 d-flex align-items-center">
              <h4 className="mb-2">Filters</h4>
            </div>
          </div>
          <div className="row " style={{"width":"200%"}}>
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
        <div className="widget-container pl-5">
          <div className="widget-box first">
            <span>Amount</span>
            <p>{currenyMasking(amountFigures.amount)}</p>
          </div>
          <div className="widget-box second">
            <span>MDC Amount</span>
            <p>{currenyMasking(amountFigures.mdc_amount)}</p>
          </div>
          <div className="widget-box third">
            <span>Actual Amount</span>
            <p>{currenyMasking(amountFigures.actual_amount)}</p>
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
              headerName: "D.C No.",
              width: 120,
            },
            {
              field: "company_name",
              headerName: "Company Name",
              width: 120,
            },

            {
              field: "contact",
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
              headerName: "S.O. Date",
              width: 120,
            },
            {
              field: "ref_date",
              headerName: "Ref Date",
              width: 120,
            },
            {
              field: "ref_no",
              headerName: "Ref No",
              width: 120,
            },
            {
              field: "di_no",
              headerName: "DI No",
              width: 120,
            },
            {
              field: "pi_no",
              headerName: "PI No",
              width: 120,
            },
            {
              field: "dispatch_thr",
              headerName: "Dispatch Thr.",
              width: 120,
            },
            {
              field: "destination",
              headerName: "Destination",
              width: 150,
            },
            {
              field: "vehicle_no",
              headerName: "Vehicle No",
              width: 120,
            },
            {
              field: "amount",
              headerName: "Amount",
              width: 120,
            },
            {
              field: "mdc_amount",
              headerName: "MDC Amount",
              width: 120,
            },
            {
              field: "actual_amount",
              headerName: "Actual Amount",
              width: 120,
            },
            {
              field: "remarks",
              headerName: "Remarks",
              width: 200,
            },
            {
              field: "status",
              headerName: "Status",
              width: 120,
            },
            {
              field: "comments",
              headerName: "Comments",
              width: 200,
            },
            {
              field: "datetime",
              headerName: "Datetime",
              width: 120,
            },
            {
              field: "",
              headerName: "Actions",
              width: 120,
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

export default DeliveryChallanBrowse;
