import {
  Checkbox,
  TextField,
  Button,
  MenuItem,
  List,
  Avatar,
  ListItemAvatar,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import {
  getBrowseUserRight,
  showErrorToast,
  showSuccessToast,
} from "../../../../components/common";
import CustomPagination from "../../../../components/CustomPagination";
import CustomNoRowsOverlay from "../../../../components/customRowComponent";
import { Loader } from "../../../../components/loader";
import { CommonController } from "../../../../_redux/controller/common.controller";
import ActionButtons from "../../../../components/action-buttons";
import { useDispatch, useSelector } from "react-redux";
import { selectedEmployeeId } from "../../../../_redux/actions/masters/all.action";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import DialogTitle from "@material-ui/core/DialogTitle";
import moment from "moment";
import ImageIcon from "@material-ui/icons/Image";
import { DatePicker } from "@material-ui/pickers";

const user_id = {
  user_id: localStorage.getItem("userId"),
};

const label = { inputProps: { "aria-label": "Checkbox" } };

const SalesSlSoPosSummariseBrowse = ({ onEdit }) => {
  const dispatch = useDispatch();

  const getuserRightListResponse = useSelector(
    (state) => state.common.userRightList
  );

  const [browseListData, setBrowseListData] = useState([]);
  const [totalRecord, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const [remarksModal, setRemarksModal] = useState(false);
  const [remarksList, setRemarksList] = useState(null);
  const [remarkLoading, setRemarkLoading] = useState(false);
  const [markEng, setMarkEng] = useState(null);
  const [remarks, setRemarks] = useState({
    status_id: "",
    remarks: "",
    user_id: localStorage.getItem("userId"),
  });
  const [params, setParams] = useState({
    pageNo: 1,
    pageSize: 15,
    filter_value: "",
    sort_column: "",
    sort_order: "desc",
  });

  const [bodyParam, setBodyParam] = useState({
    user_id: localStorage.getItem("userId"),
    chk_All: "1",
    company_name: "",
    type: "all",
    status: "all",
    mark_engg: "",
    fromDate: null,
    toDate: null,
  });

  const toggleRemarks = () => {
    setRemarksModal(!remarksModal);
  };

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
    await CommonController.commonApiCall(
      "Sales/SalesEnquiryBrowse",
      params,
      bodyParam
    )
      .then((data) => {
        setBrowseListData(data.data);
        setTotalRecords(data.recordsFiltered);
      })
      .catch((err) => {
        showErrorToast(err);
      });
    setLoading(false);
  };

  const getRemarkList = async (id) => {
    setRemarks({ ...remarks, tran_id: id });
    setRemarkLoading(true);
    await CommonController.commonApiCallFilter(
      "Sales/CloseSalesEnquiry",
      {
        enquiry_id: id,
      },
      "get"
    )
      .then((data) => {
        setRemarksList(data);
        setRemarksModal(true);
      })
      .catch((err) => {
        showErrorToast(err);
      });
    setRemarkLoading(false);
  };

  const getMarkEngList = () => {
    CommonController.commonApiCallFilter("Dropdown/SalesEnquiryDropdown").then(
      (data) => setMarkEng(data.employeeList)
    );
  };

  const onRemarkChange = (event) => {
    setRemarks({ ...remarks, [event.target.name]: event.target.value });
  };

  const handlePageSizeChange = (param) => {
    setParams({ ...params, pageSize: param.pageSize });
  };
  const handlePageChange = (param) => {
    setParams({ ...params, pageNo: param.page });
  };

  const handleDateChange = (type, date) => {
    setBodyParam({ ...bodyParam, [type]: date });
  };

  useEffect(() => {
    getBrowseListData();
    getMarkEngList();
  }, []);

  useEffect(() => {
    getBrowseListData();
  }, [params, getuserRightListResponse, bodyParam]);

  const handleEdit = (id) => {
    dispatch(selectedEmployeeId(id));
    onEdit();
  };

  const handleDeleteRow = (id) => {
    CommonController.commonApiCallFilter("Employee/EmployeeMasterDelete", {
      employee_id: id,
    }).then((data) => {
      if (data.valid) {
        showSuccessToast("Record Deleted Successfully");
        getBrowseListData();
      } else {
        showErrorToast("Something went wrong");
      }
    });
  };

  const saveRemarks = () => {
    setLoading(true);
    try {
      CommonController.commonApiCallFilter(
        "Sales/UpdateSalesEnquiryRemarks",
        remarks
      ).then((data) => {
        if (data.valid) {
          getBrowseListData();
          showSuccessToast("Remarks Updated Successfully");
          setRemarksModal(false);
        } else {
          showErrorToast(data.msg);
        }
      });
    } catch (err) {
      showErrorToast("Something went wrong");
    }
    setLoading(false);
  };

  return (
    <div className="inner_data_wrapper">
      <div className="p-3 rounded bg-white">
        {loading && <Loader />}
        <div className="filter_box mb-3">
          <div className="row">
            <div className="col">
              <h4 className="mb-0">Filters</h4>
            </div>
            <div className="col-md-2">
              <TextField
                fullWidth
                id="outlined-basic"
                size="small"
                onKeyDown={(e) => {
                  if (e.keyCode === 13) {
                    handleParams(e);
                  }
                }}
                name="filter_value"
                label="Search"
                variant="outlined"
              />
            </div>
            <div className="col">
              <DatePicker
                label="From Date"
                value={bodyParam.fromDate}
                format="dd/MM/yyyy"
                onChange={(date) => handleDateChange("fromDate", date)}
                animateYearScrolling
                inputVariant="outlined"
                size="small"
                fullWidth
              />
            </div>
            <div className="col">
              <DatePicker
                label="To Date"
                value={bodyParam.toDate}
                onChange={(date) => handleDateChange("toDate", date)}
                animateYearScrolling
                inputVariant="outlined"
                size="small"
                fullWidth
              />
            </div>
            <div className="col">
              <TextField
                fullWidth
                id="outlined-basic"
                size="small"
                onKeyDown={(e) => {
                  if (e.keyCode === 13) {
                    handleBodyParam(e);
                  }
                }}
                name="party_name"
                label="Company Name"
                variant="outlined"
              />
            </div>
            <div className="col">
              <TextField
                fullWidth
                id="outlined-basic"
                size="small"
                onChange={(e) => {
                  handleBodyParam(e);
                }}
                name="type"
                select
                label="Type"
                variant="outlined"
              >
                <MenuItem value={"all"}>All</MenuItem>
                <MenuItem value={"spares"}>Spares</MenuItem>
                <MenuItem value={"projects"}>Projects</MenuItem>
                <MenuItem value={"service"}>Service</MenuItem>
              </TextField>
            </div>
            <div className="col">
              <TextField
                fullWidth
                id="outlined-basic"
                size="small"
                onChange={(e) => {
                  handleBodyParam(e);
                }}
                select
                name="status"
                label="Status"
                variant="outlined"
              >
                <MenuItem value={"all"}>All</MenuItem>
                <MenuItem value={"spares"}>Close</MenuItem>
                <MenuItem value={"spares"}>Open</MenuItem>
              </TextField>
            </div>
            <div className="col">
              <TextField
                fullWidth
                id="outlined-basic"
                size="small"
                onChange={(e) => {
                  handleBodyParam(e);
                }}
                select
                name="mark_engg"
                label="Marketing Eng."
                variant="outlined"
              >
                <MenuItem value={""}>None</MenuItem>
                {markEng &&
                  markEng.map((eng, indx) => {
                    return (
                      <MenuItem value={eng.value} key={indx}>
                        {eng.value}
                      </MenuItem>
                    );
                  })}
              </TextField>
            </div>
          </div>
        </div>
        <Dialog
          open={remarksModal}
          fullWidth
          onClose={toggleRemarks}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">Add Comment</DialogTitle>
          <DialogContent>
            <TextField
              variant="outlined"
              className="mb-4"
              size="small"
              fullWidth
              id="select-1"
              select
              name="status_id"
              onChange={onRemarkChange}
              label="Enquiry Status*"
            >
              <MenuItem value={"0"}>Close</MenuItem>
              <MenuItem value={"1"}>Open</MenuItem>
            </TextField>
            <TextField
              variant="outlined"
              multiline
              size="small"
              name="remarks"
              onChange={onRemarkChange}
              label="Remarks*"
              fullWidth
            />
            <List>
              {remarksList &&
                remarksList.length > 0 &&
                remarksList.map((remark, index) => {
                  return (
                    <ListItem key={index}>
                      <ListItemAvatar>
                        <Avatar>
                          <ImageIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={remark.user_name}
                        secondary={
                          <p className="mb-0">
                            {remark.remarks}{" "}
                            <span className="float-right">
                              {remark.datetime}
                            </span>
                          </p>
                        }
                      />
                    </ListItem>
                  );
                })}
            </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={toggleRemarks} color="primary">
              Close
            </Button>
            <Button
              onClick={saveRemarks}
              disabled={
                remarks.remarks == "" || remarks.status_id == "" || loading
              }
              color="primary"
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
        <div className="data_table_height">
          <DataGrid
            columns={[
              {
                field: "id",
                headerName: "Sr. no",
                width: 80,
              },
              {
                field: "date",
                headerName: "Date",
                width: 100,
                renderCell: (params) => {
                  return moment(params.row.date).format("DD/MM/yyyy");
                },
              },
              {
                field: "enquiry_no",
                headerName: "Enquiry No",
                width: 120,
              },
              {
                field: "company_id",
                headerName: "Comp Id",
                width: 100,
              },
              {
                field: "company_name",
                headerName: "Company Name",
                width: 200,
              },
              {
                field: "description",
                headerName: "Description",
                width: 200,
              },
              {
                field: "type",
                headerName: "Type",
                width: 100,
              },
              {
                field: "priority_name",
                headerName: "Priority Name",
                width: 100,
              },
              {
                field: "reference_name",
                headerName: "Reference",
                width: 120,
              },
              {
                field: "status",
                headerName: "Status",
                width: 100,
              },
              {
                field: "employee_name",
                headerName: "Employee Name",
                width: 150,
              },
              {
                field: "mark_engg",
                headerName: "Marketing Eng.",
                width: 150,
              },
              {
                field: "remarks",
                headerName: "Remarks",
                width: 150,
                renderCell: (param) => {
                  return (
                    <>
                      {remarkLoading ? (
                        <img src="/asset/images/circle.gif" width={20} />
                      ) : (
                        <Button
                          className="text-lowercase"
                          color="primary"
                          onClick={() => {
                            getRemarkList(param.row.tran_id);
                          }}
                        >
                          {param.row.remarks}
                        </Button>
                      )}
                    </>
                  );
                },
              },

              {
                field: "",
                headerName: "Actions",
                renderCell: (params) => (
                  <ActionButtons
                    onPreview={
                      getBrowseUserRight(getuserRightListResponse)
                        ?.view_right == "True"
                        ? () => handleEdit(params.row.id)
                        : null
                    }
                    onEdit={
                      getBrowseUserRight(getuserRightListResponse)
                        ?.edit_button == "True"
                        ? () => handleEdit(params.row.id)
                        : null
                    }
                    onDelete={
                      getBrowseUserRight(getuserRightListResponse)
                        ?.delete_right == "True"
                        ? () => handleDeleteRow(params.row.id)
                        : null
                    }
                  />
                ),
                width: 100,
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
            //components={{
            //Pagination: CustomPagination,
            //NoRowsOverlay: CustomNoRowsOverlay,
            //       }}
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
            headerHeight={40}
          />
        </div>
      </div>
    </div>
  );
};

export default SalesSlSoPosSummariseBrowse;
