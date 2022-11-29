import { TextField, Button, MenuItem } from "@material-ui/core";
import { DataGrid } from "@mui/x-data-grid";
import { DatePicker } from "@material-ui/pickers";
import React, { useEffect, useState } from "react";
import { showErrorToast, showSuccessToast } from "../../../components/common";
import CustomPagination from "../../../components/CustomPagination";
import CustomNoRowsOverlay from "../../../components/customRowComponent";
import { Loader } from "../../../components/loader";
import { CommonController } from "../../../_redux/controller/common.controller";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import DateFilter from "../../../components/dateFilter";

const user_id = {
  user_id: localStorage.getItem("userId"),
};
const SupportTicketApprovalBrowse = (props) => {
  const history = useHistory();
  const [browseListData, setBrowseListData] = useState([]);
  const [totalRecord, setTotalRecords] = useState(0);

  const [loading, setLoading] = useState(false);

  const [empList, setEmpList] = useState(false);
  const [params, setParams] = useState({
    pageNo: 1,
    pageSize: 10,
    filter_value: "",
    sort_column: "",
    sort_order: "",
  });
  const [bodyParam, setBodyParam] = useState({
    menu: "",
    transaction: "",
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
        "TicketCommercialApproval/TicketCommercialApprovalBrowse",
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

  const handlePageSizeChange = (param) => {
    setParams({ ...params, pageSize: param });
  };
  const handlePageChange = (param) => {
    setParams({ ...params, pageNo: param });
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
          <div className="col-md-2">
            <TextField
              fullWidth
              id="outlined-basic"
              size="small"
              onKeyUp={handleBodyParam}
              name="menu"
              label="Menu"
              variant="outlined"
            />
          </div>
          <div className="col-md-2 ">
            <TextField
              fullWidth
              id="outlined-basic"
              size="small"
              onKeyUp={handleBodyParam}
              name="transaction"
              label="Transaction"
              variant="outlined"
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
              field: "date",
              headerName: "Date",
              width: 100,
            },
            {
              field: "ticket_no",
              headerName: "Ticket No",
              width: 120,
              renderCell: (param) => {
                return (
                  <button
                    className="btn btn-link"
                    onClick={() => {
                      history.push({
                        pathname: "/support/ticket-commercial",
                        state: {
                          index: 1,
                          id: param.row.tran_id,
                        },
                      });
                    }}
                  >
                    {param.row.ticket_no}
                  </button>
                );
              },
            },
            {
              field: "menu",
              headerName: "Menu",
              width: 120,
            },
            {
              field: "transaction",
              headerName: "Transaction",
              width: 170,
            },

            {
              field: "details",
              headerName: "Details",
              width: 200,
            },
            {
              field: "charges",
              headerName: "Charges",
              width: 130,
            },
            {
              field: "remarks",
              headerName: "Status",
              width: 100,
            },
            {
              field: "approved_charges",
              headerName: "Approved Charges",
              width: 170,
            },
            {
              field: "approved_remarks",
              headerName: "Approved Remarks",
              width: 170,
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

export default SupportTicketApprovalBrowse;
