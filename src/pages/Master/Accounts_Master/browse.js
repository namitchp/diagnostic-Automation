import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import {
  setAccountHide,
  setAccountVerified,
} from "../../../_redux/actions/masters/account.action";
import {
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  withStyles,
  Button,
  FormControlLabel,
} from "@material-ui/core";
import CustomPagination from "../../../components/CustomPagination";
import CustomNoRowsOverlay from "../../../components/customRowComponent";
import ActionButtons from "../../../components/action-buttons";
import { selectedAccountId } from "../../../_redux/actions/masters/all.action";

import { getBrowseUserRight, showErrorToast } from "../../../components/common";
import { CommonController } from "../../../_redux/controller/common.controller";

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}))(Tooltip);
const user_id = {
  user_id: localStorage.getItem("userId"),
};
const BrowseAccount = ({ onEdit, onPreview,accountType }) => {
  const dispatch = useDispatch();
  const getuserRightListResponse = useSelector(
    (state) => state.common.userRightList
  );
  const [browseListData, setBrowseListData] = useState([]);
  const [totalRecord, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const [accountMasterFilter, setAccountMasterFilter] = useState({
    region_name: "",
    group_name: "",
    verified: "",
    mark_engg: "",
    account_type:accountType
  });
  const [tempVerifed, setTempVerified] = useState([]);
  const [regionList, setRegionList] = useState([]);
  const [groupList, setGroupList] = useState([]);
  const [enggList, setEnggList] = useState([]);
  const [params, setParams] = useState({
    pageNo: 1,
    pageSize: 15,
    filter_value: "",
    sort_column: "",
    sort_order: "",
  });
  let columns = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
      hide: false,
    },
    {
      field: "region",
      headerName: "Region",
      width: 180,
      hide: false,
    },
    {
      field: "short_name",
      headerName: "Short Name",
      renderCell: (params) => (
        <LightTooltip title={params.row.short_name}>
          <span>{params.row.short_name}</span>
        </LightTooltip>
      ),
      width: 200,
      hide: false,
    },
    {
      field: "company",
      headerName: "Company",
      renderCell: (params) => (
        <LightTooltip title={params.row.company}>
          <span>{params.row.company}</span>
        </LightTooltip>
      ),
      width: 180,
      hide: false,
    },
    {
      field: "address",
      headerName: "Address",
      renderCell: (params) => (
        <LightTooltip title={params.row.address}>
          <span>{params.row.address}</span>
        </LightTooltip>
      ),
      width: 300,
      hide: false,
    },
    {
      field: "pin",
      headerName: "Pin",
      width: 80,
      hide: false,
    },
    {
      field: "mobile",
      headerName: "Mobile",
      renderCell: (params) => (
        <LightTooltip title={params.row.mobile}>
          <span>{params.row.mobile}</span>
        </LightTooltip>
      ),
      width: 150,
      hide: false,
    },
    {
      field: "email",
      headerName: "Email",
      renderCell: (params) => (
        <LightTooltip title={params.row.email}>
          <span>{params.row.email}</span>
        </LightTooltip>
      ),
      width: 200,
      hide: false,
    },
    {
      field: "verified",
      headerName: "Verified",
      renderCell: (params) => (
        <FormControlLabel
          className={"formControlLabel"}
          control={
            <Checkbox
              defaultChecked={params.row.edit === "True"}
              size="small"
              color="primary"
              onChange={(event) =>
                updateVerifiedStatus(event.target.checked, params.id)
              }
              inputProps={{ "aria-label": "checkbox with small size" }}
            />
          }
          label={
            <span
              className={
                "font_13 " +
                (params.row.edit === "True" ||
                tempVerifed.indexOf(params.row.id) > -1
                  ? "text-success"
                  : "text-danger")
              }
            >
              {params.row.edit === "True" ||
              tempVerifed.indexOf(params.row.id) > -1
                ? "Verified"
                : "Not Verified"}
            </span>
          }
        />
      ),
      width: 120,
      hide: false,
    },
    {
      field: "hide",
      headerName: "Hide",
      renderCell: (params) => (
        <Checkbox
          size="small"
          color="primary"
          defaultChecked={params.row.hide === "True"}
          onChange={(event) =>
            updateHideStatus(event.target.checked, params.id)
          }
          // onChange={() => console.log(params.id)}
          inputProps={{ "aria-label": "checkbox with small size" }}
        />
      ),
      width: 80,
      hide: false,
    },
    {
      field: "mark_engg",
      headerName: "Markt. Engg",
      renderCell: (params) => (
        <LightTooltip title={params.row.mark_engg}>
          <span>{params.row.mark_engg}</span>
        </LightTooltip>
      ),
      width: 150,
      hide: false,
    },
   
    {
      field: "datetime",
      headerName: "Date Time",
      width: 120,
      hide: false,
    },
    {
      field: "",
      headerName: "Actions",
      renderCell: (params) => (
        <ActionButtons
          onPreview={
            getBrowseUserRight(getuserRightListResponse)?.level == 1
              ? () => handleEdit(params.row.id)
              : null
          }
          onEdit={
            getBrowseUserRight(getuserRightListResponse)?.level == 1
              ? () => handleEdit(params.row.id)
              : null
          }
          // onDelete={
          //   getBrowseUserRight(getuserRightListResponse)?.delete_right == "True"
          //     ? () => handleDeleteRow(params.row.id)
          //     : null
          // }
        />
      ),
      width: 120,
    },
  ];

  const handleFilters = (event) => {
    setAccountMasterFilter({
      ...accountMasterFilter,
      [event.target.name]: event.target.value,
    });
  };

  const handleParams = (event) => {
    setParams({ ...params, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    // getUserFilter();
    getBrowseListData();
    getFilterListData();
  }, []);

  const getBrowseListData = async () => {
    setLoading(true);
    await CommonController.commonApiCall(
      "Account/AccountMasterBrowse",
      params,
      accountMasterFilter
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

  const getFilterListData = async () => {
    await CommonController.commonApiCallFilter(
      "Dropdown/AccountMasterDropdown",
      user_id,
      "post"
    )
      .then((data) => {
        setRegionList(data.regionList);
        setGroupList(data.groupList);
        setEnggList(data.employeeList);
      })
      .catch((err) => {
        showErrorToast(err);
      });
  };

  useEffect(() => {
    getBrowseListData();
  }, [params, accountMasterFilter]);

  const handlePageSizeChange = (param) => {
    setParams({ ...params, pageSize: param });
  };
  const handlePageChange = (param) => {
    setParams({ ...params, pageNo: param });
  };

  const updateHideStatus = (val, id) => {
    const param = {
      company_id: id,
      hide: val ? "1" : "0",
      user_id: localStorage.getItem("userId"),
    };
    dispatch(setAccountHide(param));
  };

  const updateVerifiedStatus = (val, id) => {
    var temp = [...tempVerifed];
    var tempIndex = temp.indexOf(id);
    const param = {
      company_id: id,
      edit: val ? "1" : "0",
      user_id: localStorage.getItem("userId"),
    };

    if (tempIndex > -1) {
      temp.splice(tempIndex, 1);
    } else {
      if (val) {
        temp.push(id);
      }
    }
    setTempVerified(temp);
    dispatch(setAccountVerified(param));
  };

  const handleEdit = (id) => {
    dispatch(selectedAccountId(id));
    onEdit();
  };

  return (
    <React.Fragment>
      <div className="filter_box mb-5">
        <div className="row">
          <div className="col-md-1 d-flex align-items-center">
            <h4 className="mb-0">Filters</h4>
          </div>
          <div className="col-md-2">
            <FormControl fullWidth size="small" variant="outlined">
              <InputLabel id="demo-simple-select-outlined-label">
                Region Name
              </InputLabel>
              <Select
                name="region_name"
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={accountMasterFilter.region_name}
                onChange={handleFilters}
                label="Region Name"
              >
                <MenuItem value="">None</MenuItem>
                {regionList.length > 0
                  ? regionList.map((region, index) => {
                      return (
                        <MenuItem key={"region" + index} value={region.value}>
                          {region.value}
                        </MenuItem>
                      );
                    })
                  : null}
              </Select>
            </FormControl>
          </div>
          <div className="col-md-2">
            <FormControl fullWidth size="small" variant="outlined">
              <InputLabel id="demo-simple-select-outlined-label">
                Group
              </InputLabel>
              <Select
                name="group_name"
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={accountMasterFilter.group_name}
                onChange={handleFilters}
                label="Group"
              >
                <MenuItem value="">None</MenuItem>
                {groupList.length > 0
                  ? groupList.map((group, index) => {
                      return (
                        <MenuItem key={"groupList" + index} value={group.value}>
                          {group.value}
                        </MenuItem>
                      );
                    })
                  : null}
              </Select>
            </FormControl>
          </div>
          <div className="col-md-1">
            <FormControl fullWidth size="small" variant="outlined">
              <InputLabel id="demo-simple-select-outlined-label">
                Verified
              </InputLabel>
              <Select
                name="verified"
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={accountMasterFilter.region}
                onChange={handleFilters}
                label="Verified"
              >
                <MenuItem value={""}>All</MenuItem>
                <MenuItem value={"1"}>Verified</MenuItem>
                <MenuItem value={"0"}>Not Verified</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="col-md-2">
            <FormControl fullWidth size="small" variant="outlined">
              <InputLabel id="demo-simple-select-outlined-label">
                Markt. Engg
              </InputLabel>
              <Select
                name="mark_engg"
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={accountMasterFilter.mark_engg}
                onChange={handleFilters}
                label="Markt. Engg"
              >
                <MenuItem value="">None</MenuItem>
                {enggList.length > 0
                  ? enggList.map((engg, index) => {
                      return (
                        <MenuItem key={"enggList" + index} value={engg.value}>
                          {engg.value}
                        </MenuItem>
                      );
                    })
                  : null}
              </Select>
            </FormControl>
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
          <div className="col-md-2 text-right">
            <Button color="primary" disableElevation variant="contained">
              Export Excel
            </Button>
          </div>
        </div>
      </div>
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          pagination
          disableColumnFilter
          pageSize={params.pageSize}
          page={params.pageNo}
          rowsPerPageOptions={[15, 25, 50, 100]}
          rowCount={totalRecord}
          paginationMode="server"
          onPageSizeChange={handlePageSizeChange}
          onPageChange={handlePageChange}
          loading={loading}
          rowHeight={30}
          components={{
            Pagination: CustomPagination,
            NoRowsOverlay: CustomNoRowsOverlay,
          }}
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
          columns={columns}
          rows={browseListData} //accountMasterList
        />
      </div>
    </React.Fragment>
  );
};

export default BrowseAccount;
