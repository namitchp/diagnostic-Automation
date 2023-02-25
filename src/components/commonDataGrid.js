import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
// import { getbodyFiltersList } from "../_redux/actions/masters/account.action";
import { getbodyFiltersList } from "../";

import { Tooltip, withStyles } from "@material-ui/core";
import CustomPagination from "../components/CustomPagination";
import CustomNoRowsOverlay from "../components/customRowComponent";
import { selectedAccountId } from "../_redux/actions/masters/all.action";
import { showErrorToast } from "../components/common";
import { CommonController } from "../_redux/controller/common.controller";
import {
  getFilterData,
  updateFilterData,
} from "../_redux/actions/common.action";
const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}))(Tooltip);
const user_id = localStorage.getItem("userId");
const CommonDataGrid = ({ url, body, columns, browse_id }) => {
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
  const [gridColumn, setgridColumn] = useState([]);
  const [bodyFilter, setBodyFilter] = useState({});
  const [params, setParams] = useState({
    pageNo: 1,
    pageSize: 15,
    // filter_value: "",
    sort_column: "",
    sort_order: "",
    columns: [],
  });
  const getBrowseListData = async () => {
    setLoading(true);
    await CommonController.commonApiCall(url, params, bodyFilter, "node")
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
  const handlePageSizeChange = (param) => {
    setParams({ ...params, pageSize: param });
    setfilter(true);
  };
  const handlePageChange = (param) => {
    setParams({ ...params, pageNo: param });
    setfilter(true);
  };
  //json
  const handleUpdateFilterData = () => {
    let body = {
      filterpage: { ...params },
      filterData: { ...bodyFilter },
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
      setBodyFilter(filterjsonData.data.filterData);
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
  }, [params, bodyFilter, filter]);
  return (
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
            : ""
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
  );
};
export default CommonDataGrid;
