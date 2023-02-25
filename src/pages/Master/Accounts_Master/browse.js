import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { getAccountMasterFiltersList } from "../../../_redux/actions/masters/account.action";
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
  makeStyles,
} from "@material-ui/core";
import CustomPagination from "../../../components/CustomPagination";
import CustomNoRowsOverlay from "../../../components/customRowComponent";
import ActionButtons from "../../../components/action-buttons";
import { selectedAccountId } from "../../../_redux/actions/masters/all.action";
import {
  getBrowseUserRight,
  showErrorToast,
  showSuccessToast,
  UserRight,
} from "../../../components/common";
import { CommonController } from "../../../_redux/controller/common.controller";
import {
  getFilterData,
  updateFilterData,
} from "../../../_redux/actions/common.action";
import moment from "moment";
import excelIcon from "../../../assets/image/excel.png";
import CommonDataGrid from "../../../components/commonDataGrid";

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}))(Tooltip);

const user_id = localStorage.getItem("userId");

const BrowseAccount = ({ onEdit, onPreview, accountType, browse_id }) => {
  const userRight = useSelector((state) => state.common.userRightResponse);
  const dispatch = useDispatch();

  const filterList = useSelector(
    (state) => state.AccountMaster.accountFilterList
  );
  const filterjsonData = useSelector((state) => state.common.getFilterData);
  const updatefilterjsonData = useSelector(
    (state) => state.common.updateFilterData
  );
  const [browseListData, setBrowseListData] = useState([]);
  const [totalRecord, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filter, setfilter] = useState(false);
  const [gridColumn, setgridColumn] = useState([
    {
      field: "ID",
      headerName: "ID",
      width: 70,
      hide: false,
    },
    {
      field: "Region",
      headerName: "Region",
      width: 180,
      hide: false,
    },
    {
      field: "Group",
      headerName: "Group",
      width: 200,
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
      field: "Company",
      headerName: "Company",
      renderCell: (params) => (
        <LightTooltip title={params.row.Company}>
          <span>{params.row.Company}</span>
        </LightTooltip>
      ),
      width: 180,
      hide: false,
    },
    {
      field: "Address",
      headerName: "Address",
      renderCell: (params) => (
        <LightTooltip title={params.row.Address}>
          <span>{params.row.Address}</span>
        </LightTooltip>
      ),
      width: 300,
      hide: false,
    },
    {
      field: "Pin",
      headerName: "Pin",
      width: 80,
      hide: false,
    },
    {
      field: "Mobile",
      headerName: "Mobile",
      renderCell: (params) => (
        <LightTooltip title={params.row.Mobile}>
          <span>{params.row.Mobile}</span>
        </LightTooltip>
      ),
      width: 150,
      hide: false,
    },
    {
      field: "Email",
      headerName: "Email",
      renderCell: (params) => (
        <LightTooltip title={params.row.Email}>
          <span>{params.row.Email}</span>
        </LightTooltip>
      ),
      width: 200,
      hide: false,
    },
    {
      field: "edit",
      headerName: "Verified",
      renderCell: (params) => (
        <FormControlLabel
          className={"formControlLabel"}
          disabled
          control={
            <Checkbox
              defaultChecked={params.row.edit === true}
              size="small"
              color="primary"
              onChange={(event) =>
                updateVerifiedStatus(event.target.checked, params.ID)
              }
              inputProps={{ "aria-label": "checkbox with small size" }}
            />
          }
          label={
            <span
              className={
                "font_13 " +
                (params.row.edit === true ||
                tempVerifed.indexOf(params.row.ID) > -1
                  ? "text-success"
                  : "text-danger")
              }
            >
              {params.row.edit === true ||
              tempVerifed.indexOf(params.row.ID) > -1
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
          disabled
          size="small"
          color="primary"
          defaultChecked={params.row.hide === true}
          onChange={(event) =>
            updateHideStatus(event.target.checked, params.ID)
          }
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
      renderCell: (params) => {
        return moment(params.row.datetime).format("DD/MM/YYYY");
      },
      width: 120,
      hide: false,
    },
    {
      field: "Actions",
      headerName: "Actions",
      hide: false,
      renderCell: (params) => (
        <ActionButtons
          onPreview={() => handleEdit({ id: params.row.ID, type: "preview" })}
          onEdit={
            userRight?.update_right
              ? () => handleEdit({ id: params.row.ID, type: "edit" })
              : null
          }
          onDelete={
            userRight?.delete_right
              ? () => handleDeleteRow(params.row.id)
              : null
          }
        />
      ),
      width: 120,
    },
  ]);
  //json

  const [accountMasterFilter, setAccountMasterFilter] = useState({
    region_name: "",
    group_name: "",
    verified: "",
    mark_engg: "",
    account_type: accountType,
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
    columns: [],
  });
  const handleFilters = (event) => {
    setAccountMasterFilter({
      ...accountMasterFilter,
      [event.target.name]: event.target.value,
    });
    setfilter(true);
    // handleUpdateFilterData()
  };
  const handleParams = (event) => {
    setParams({ ...params, [event.target.name]: event.target.value });
    setfilter(true);
  };
  const getBrowseListData = async () => {
    setLoading(true);
    await CommonController.commonApiCall(
      "master/browse_account_master",
      params,
      accountMasterFilter,
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
  useEffect(() => {
    if (filterList) {
      setRegionList(filterList.listregion);
      setGroupList(filterList.listGroup);
      setEnggList(filterList.listengg);
    }
  }, [filterList]);

  const handlePageSizeChange = (param) => {
    setParams({ ...params, pageSize: param });
    setfilter(true);
  };
  const handlePageChange = (param) => {
    setParams({ ...params, pageNo: param });
    setfilter(true);
  };
  const updateHideStatus = (val, id) => {
    const param = {
      company_id: id,
      hide: val ? "1" : "0",
      user_id: localStorage.getItem("userId"),
    };
    // dispatch(setAccountHide(param));
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
    // dispatch(setAccountVerified(param));
  };
  const handleDeleteRow = (id) => {
    CommonController.commonApiCallFilter(
      "master/delete_account_master",
      {
        company_id: id,
      },
      "post",
      "node"
    ).then((data) => {
      if (data.status === 200) {
        showSuccessToast("Delete Success");
      }
    });
  };
  const handleEdit = (id) => {
    dispatch(selectedAccountId(id));
    onEdit();
  };
  //json
  const handleUpdateFilterData = () => {
    let body = {
      filterpage: { ...params },
      filterData: { ...accountMasterFilter },
    };
    body.user_id = user_id;
    body.browse_id = browse_id;
    dispatch(updateFilterData(body));
    // if (updatefilterjsonData.status == 200) {
    //   // dispatch(getFilterData(1));
    // }
  };

  const handleColumnHide = (e) => {
    const index = gridColumn.findIndex((val) => val.field == e.field);
    let columns = [...gridColumn];
    columns[index] = { ...columns[index], hide: e.colDef.hide };
    setgridColumn(columns);
    setParams({ ...params, columns: columns });
    setfilter(true);
  };
  useEffect(() => {
    if (filterjsonData) {
      setParams(filterjsonData.data.filterpage);
      setAccountMasterFilter(filterjsonData.data.filterData);
      if (filterjsonData?.data?.filterpage?.columns?.length > 0) {
        const data = filterjsonData.data.filterpage?.columns?.map(
          (val, index) => {
            const columns = [...gridColumn];
            return (columns[index] = { ...columns[index], hide: val.hide });
          }
        );
        setgridColumn(data);
      }
    }
  }, [filterjsonData]);
  useEffect(() => {
    dispatch(getFilterData(browse_id));
    getBrowseListData();
    dispatch(selectedAccountId());
  }, []);
  useEffect(() => {
    getBrowseListData();
    if (filter) {
      handleUpdateFilterData();
    }
  }, [params, accountMasterFilter, filter]);

  // `${params?.pageSize + 30}rem` }
  return (
    <div className="inner_data_wrapper">
      <div className="bg-white p-3 rounded">
        <div className="filter_box mb-3">
          <div className="row align-items-center">
            <div className="col">
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
                  value={accountMasterFilter?.region_name}
                  onChange={handleFilters}
                  label="Region Name"
                >
                  <MenuItem value="">None</MenuItem>
                  {regionList?.length > 0
                    ? regionList.map((region, index) => {
                        return (
                          <MenuItem
                            key={"region" + index}
                            value={region.region_name}
                          >
                            {region.region_name}
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
                  value={accountMasterFilter?.group_name}
                  onChange={handleFilters}
                  label="Group"
                >
                  <MenuItem value="">None</MenuItem>
                  {groupList?.length > 0
                    ? groupList.map((group, index) => {
                        return (
                          <MenuItem
                            key={"groupList" + index}
                            value={group.group_name}
                          >
                            {group.group_name}
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
                  Verified
                </InputLabel>
                <Select
                  name="verified"
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={accountMasterFilter?.verified}
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
                  value={accountMasterFilter?.mark_engg}
                  onChange={handleFilters}
                  label="Markt. Engg"
                >
                  <MenuItem value="">None</MenuItem>
                  {enggList?.length > 0
                    ? enggList.map((engg, index) => {
                        return (
                          <MenuItem key={"enggList" + index} value={engg.name}>
                            {engg.name}
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
                    // handleUpdateFilterData();
                    handleParams(e);
                    setfilter(true);
                  }
                }}
                name="filter_value"
                label="Search"
                variant="outlined"
                // value={"dfhnjsdv"}
              />
            </div>
            <div className="col">
              <Button
                color="primary"
                className="bg-success text-white w-100"
                disableElevation
                variant="contained"
              >
                {/* Export  */}
                <img src={excelIcon} className="excel_icons" />
              </Button>
            </div>
          </div>
        </div>
        <div className="data_table_height">
          <DataGrid
            pagination
            disableColumnFilter
            columns={gridColumn}
            pageSize={params?.pageSize}
            page={params?.pageNo}
            getRowClassName={(params) => {
              return params.row.sr_no % 2 === 0 ? "even" : "odd";
            }}
            rowsPerPageOptions={[15, 25, 50, 100]}
            rowCount={totalRecord}
            paginationMode="server"
            onPageSizeChange={handlePageSizeChange}
            onPageChange={handlePageChange}
            loading={loading}
            rowHeight={40}
            getRowHeight={() => "auto"}
            components={
              browseListData?.length > 0
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
            onColumnVisibilityChange={(e) => handleColumnHide(e)}
            getRowId={(browseListData) => browseListData.sr_no}
            rows={browseListData} //accountMasterList
            headerHeight={40}
          />
        </div>
        {/* <CommonDataGrid/> */}
      </div>
    </div>
  );
};
export default BrowseAccount;
