import {
  TextField,
  MenuItem,
  ListItem,
  ListItemText,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  List,
  ListItemAvatar,
  Avatar,
} from "@material-ui/core";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { showErrorToast, showSuccessToast } from "../../../components/common";
import CustomPagination from "../../../components/CustomPagination";
import CustomNoRowsOverlay from "../../../components/customRowComponent";
import { CommonController } from "../../../_redux/controller/common.controller";
import ImageIcon from "@material-ui/icons/Image";
import DateFilter from "../../../components/dateFilter";

const user_id = {
  user_id: localStorage.getItem("userId"),
};
const SupportTicketBrowse = (props) => {
  const [browseListData, setBrowseListData] = useState([]);
  const [totalRecord, setTotalRecords] = useState(0);
  const [remarksModal, setRemarksModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [remarksList, setRemarksList] = useState(null);
  const [remarkLoading, setRemarkLoading] = useState(false);
  const [attachedFile, setAttachedFile] = useState(null);
  const [remarks, setRemarks] = useState({
    mtran_id: "",
    comments: "",
    status: "",
    attach_file: "",
    rit_user: localStorage.getItem("userName"),
    user_id: localStorage.getItem("userId"),
  });

  const [empList, setEmpList] = useState(false);
  const [params, setParams] = useState({
    pageNo: 1,
    pageSize: 10,
    filter_value: "",
    sort_column: "",
    sort_order: "",
  });
  const [bodyParam, setBodyParam] = useState({
    user_id: 1,
    generated_by: "",
    status: "",
    fromDate: null,
    toDate: null,
  });

  const onRemarkChange = (event) => {
    setRemarks({ ...remarks, [event.target.name]: event.target.value });
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
    try {
      await CommonController.commonApiCall(
        "Ticket/SupportTicketBrowse",
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

  const getEmployeeList = async () => {
    try {
      await CommonController.commonApiCallFilter(
        `Dropdown/GetEmpListInSupport`,
        { user_id: localStorage.getItem("userId") },
        "get"
      ).then((data) => {
        setEmpList(data);
      });
    } catch (err) {
      showErrorToast(err);
    }
  };

  const handlePageSizeChange = (param) => {
    setParams({ ...params, pageSize: param });
  };
  const handlePageChange = (param) => {
    setParams({ ...params, pageNo: param });
  };
  useEffect(() => {
    getBrowseListData();
    getEmployeeList();
  }, []);
  useEffect(() => {
    getBrowseListData();
  }, [params, bodyParam]);
  const toggleRemarks = () => setRemarksModal(!remarksModal);
  const saveRemarks = async () => {
    setLoading(true);
    try {
      let formdata = new FormData();
      formdata.append("file", attachedFile);
      await CommonController.commonApiFile(
        "Ticket/TicketImageInsert",
        formdata
      );
      await CommonController.commonApiCallFilter(
        "Ticket/TicketCommentInsert",
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

  const getRemarkList = async (id) => {
    setRemarks({ ...remarks, mtran_id: id });
    setRemarkLoading(true);
    await CommonController.commonApiCallFilter(
      "Ticket/GetTicketComment",
      {
        mtran_id: id,
      },
      "post"
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
              onChange={(e) => {
                handleBodyParam(e);
              }}
              name="generated_by"
              select
              label="Generated By"
              variant="outlined"
            >
              <MenuItem value={""}>None</MenuItem>
              {empList &&
                empList.map((emp, index) => {
                  return (
                    <MenuItem key={index} value={emp.value}>
                      {emp.value}
                    </MenuItem>
                  );
                })}
            </TextField>
          </div>
          <div className="col-md-2">
            <TextField
              fullWidth
              id="outlined-basic"
              size="small"
              onChange={(e) => {
                handleBodyParam(e);
              }}
              name="status"
              select
              label="Status"
              variant="outlined"
            >
              <MenuItem value={"all"}>All</MenuItem>
              <MenuItem value={"open"}>Open</MenuItem>
              <MenuItem value={"close"}>Close</MenuItem>
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
            name="status"
            onChange={onRemarkChange}
            label="Status*"
          >
            <MenuItem value={"0"}>Close</MenuItem>
            <MenuItem value={"1"}>Open</MenuItem>
          </TextField>
          <TextField
            variant="outlined"
            multiline
            size="small"
            name="comment"
            onChange={onRemarkChange}
            label="Comments*"
            fullWidth
          />
          <div className="form-group mt-3">
            <label>Upload Attachment</label>
            <input
              className="form-control"
              id="files"
              onChange={(e) => {
                if (e.target.files.length > 0) {
                  setAttachedFile(e.target.files[0]);
                  setRemarks({
                    ...remarks,
                    attach_file: e.target.files[0].name,
                  });
                } else {
                  setAttachedFile(null);
                  setRemarks({
                    ...remarks,
                    attach_file: "",
                  });
                }
              }}
              type="file"
            />
          </div>
          <List>
            {remarksList &&
              remarksList.length > 0 &&
              remarksList.map((remark, index) => {
                return (
                  <ListItem key={index}>
                    <ListItemAvatar>
                      {remark.attach_file !== "" ? (
                        <img
                          src={
                            "https://diagapi.quickgst.in/Support_Attachment/" +
                            remark.attach_file
                          }
                        />
                      ) : (
                        <Avatar>
                          <ImageIcon />
                        </Avatar>
                      )}
                    </ListItemAvatar>
                    <ListItemText
                      primary={remark.emp_name}
                      secondary={
                        <p className="mb-0">
                          {remark.comments}{" "}
                          <span className="float-right">{remark.datetime}</span>
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
              remarks.remarks === "" || remarks.status_id === "" || loading
            }
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

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
              field: "type",
              headerName: "Type",
              width: 150,
            },
            {
              field: "priority",
              headerName: "Priority",
              width: 100,
            },
            {
              field: "details",
              headerName: "Details",
              width: 200,
            },
            {
              field: "generated_by",
              headerName: "Generated By",
              width: 130,
            },
            {
              field: "status",
              headerName: "Status",
              width: 100,
            },
            {
              field: "remarks",
              headerName: "Remarks",
              width: 170,
            },
            {
              field: "attachments",
              headerName: "Attachments",
              width: 100,
            },

            {
              field: "",
              headerName: "",
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
                        Comment
                      </Button>
                    )}
                  </>
                );
              },
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

export default SupportTicketBrowse;
