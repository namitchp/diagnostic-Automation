import { TextField } from "@material-ui/core";
import { DataGrid } from "@mui/x-data-grid";
import { DatePicker } from "@material-ui/pickers";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ActionButtons from "../../../components/action-buttons";
import { showErrorToast, showSuccessToast } from "../../../components/common";
import CustomPagination from "../../../components/CustomPagination";
import CustomNoRowsOverlay from "../../../components/customRowComponent";
import { Loader } from "../../../components/loader";
import {
  materialCodeEditId,
  searchMaterialCodeData,
} from "../../../_redux/actions/masters/materialcode.action";
import { MaterialCodeMasterController } from "../../../_redux/controller/Masters/materialcode.controller";
import { CommonController } from "../../../_redux/controller/common.controller";
import DateFilter from "../../../components/dateFilter";
import moment from "moment";
import {
  getFilterData,
  updateFilterData,
} from "../../../_redux/actions/common.action";
const MaterialCodeBrowse = ({ onEditMaterial, type, browse_id }) => {
  const dispatch = useDispatch();
  const userRight = useSelector((state) => state.common.userRightResponse);
  const [browseListData, setBrowseListData] = useState([]);
  const [totalRecord, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const user_id = {
    user_id: localStorage.getItem("userId"),
  };

  const filterjsonData = useSelector((state) => state.common.getFilterData);
  const [params, setParams] = useState({
    pageNo: 0,
    pageSize: 10,
    filter_value: "",
    sort_column: "",
    sort_order: "",
    columns: [],
  });
  const [jsonfilter, setjsonfilter] = useState(false);
  const [gridColumn, setgridColumn] = useState([
    {
      field: "tran_id",
      headerName: "ID",
      flex: 0,
    },
    {
      field: "customer",
      headerName: "Customer",
      flex: 0.1,
    },
    {
      field: "add_by",
      headerName: "Add By",
      flex: 0.1,
    },
    {
      field: "datetime",
      headerName: "Date",
      flex: 0.1,
      renderCell: (params) => {
        return moment(params.row.datetime).format("DD/MM/YYYY");
      },
    },
    {
      field: "",
      headerName: "Actions",
      renderCell: (params) => (
        <ActionButtons
          onPreview={() =>
            handleEditMaterial({ id: params.row.tran_id, type: "preview" })
          }
          onEdit={
            userRight?.update_right
              ? () =>
                  handleEditMaterial({ id: params.row.tran_id, type: "edit" })
              : null
          }
          onDelete={
            userRight?.delete_right
              ? () => deleteMaterialData(params.row.tran_id)
              : null
          }
        />
      ),
      flex: 0.1,
    },
  ]);
  const handleColumnHide = (e) => {
    const index = gridColumn.findIndex((val) => val.field == e.field);
    let columns = [...gridColumn];
    columns[index] = { ...columns[index], hide: e.colDef.hide };
    setgridColumn(columns);
    setParams({ ...params, columns: columns });
    setjsonfilter(true);
  };
  const handleParams = (event) => {
    setTimeout(() => {
      setParams({ ...params, [event.target.name]: event.target.value });
    }, 800);
    setjsonfilter(true);
  };

  const getBrowseListData = async () => {
    setLoading(true);
    const filter = {
      customer_type: type,
      user_id: localStorage.getItem("userId"),
    };
    await CommonController.commonApiCall(
      "master/browse_material_code",
      params,
      filter,
      "node"
    )
      .then((data) => {
        setBrowseListData(data.data);
        setTotalRecords(data.totalRecords);
      })
      .catch((err) => {
        showErrorToast(err);
      });
    setLoading(false);
  };

  const handlePageSizeChange = (param) => {
    setParams({ ...params, pageSize: param });
    setjsonfilter(true);
  };
  const handlePageChange = (param) => {
    setParams({ ...params, pageNo: param });
    setjsonfilter(true);
  };

  const handleEditMaterial = (id) => {
    dispatch(materialCodeEditId(id));
    onEditMaterial();
  };

  const deleteMaterialData = (id = null) => {
    if (id) {
      setLoading(true);
      MaterialCodeMasterController.deleteMaterialCode({ tran_id: id }).then(
        (data) => {
          if (data.valid) {
            showSuccessToast("Deleted Successfully");
            dispatch(searchMaterialCodeData(user_id, params));
          } else {
            showErrorToast("Something went wrong");
          }
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        }
      );
    }
  };

  const handleUpdateFilterData = () => {
    let body = {
      filterPage: { ...params },
    };
    body.user_id = localStorage.getItem("userId");
    body.browse_id = browse_id;
    dispatch(updateFilterData(body));
    // if (updatefilterjsonData.status == 200) {
    //   // dispatch(getFilterData(1));
    // }
  };

  useEffect(() => {
    getBrowseListData();
    dispatch(getFilterData(browse_id));
  }, []);
  useEffect(() => {
    getBrowseListData();
    if (jsonfilter) {
      handleUpdateFilterData();
    }
  }, [params, jsonfilter]);
  useEffect(() => {
    if (filterjsonData) {
      setParams(filterjsonData.data.filterPage);
      if (filterjsonData?.data?.filterPage?.columns?.length > 0) {
        const data = filterjsonData?.data?.filterPage?.columns?.map(
          (val, index) => {
            const columns = [...gridColumn];
            return (columns[index] = { ...columns[index], hide: val.hide });
          }
        );
        setgridColumn(data);
      }
    }
  }, [filterjsonData]);

  return (
    <div className="inner_wrapper">
      <div className="inner_data_wrapper pt-3">
        <div className="bg-white p-4">
          {loading && <Loader />}
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
                  value={params?.filter_value}
                />
              </div>
              <DateFilter onDateUpdate={() => getBrowseListData()} />
              {/* <div className="col-md-2">
            <DatePicker
              label="From Date"
              // value={filter.fromDate}
              format="dd/MM/yyyy"
              // onChange={(date) => handleDateChange("fromDate", date)}
              animateYearScrolling
              inputVariant="outlined"
              size="small"
              fullWidth
            />
          </div> */}
              {/* <div className="col-md-2">
            <DatePicker
              label="To Date"
              // value={filter.toDate}
              // onChange={(date) => handleDateChange("toDate", date)}
              animateYearScrolling
              inputVariant="outlined"
              size="small"
              fullWidth
            />
          </div> */}
            </div>
          </div>
          <div className="data_table_height">
            <DataGrid
              pagination
              disableColumnFilter
              pageSize={params?.pageSize}
              page={params?.pageNo}
              rowsPerPageOptions={[10, 25, 50, 100]}
              rowCount={totalRecord}
              paginationMode="server"
              onPageSizeChange={handlePageSizeChange}
              getRowClassName={(params) => {
                return params.row.tran_id % 2 === 0 ? "even" : "odd";
              }}
              onPageChange={handlePageChange}
              loading={loading}
              rowHeight={35}
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
              columns={gridColumn}
              getRowId={(productList) => productList.tran_id}
              onColumnVisibilityChange={(e) => handleColumnHide(e)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialCodeBrowse;
