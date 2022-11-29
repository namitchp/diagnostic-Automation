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

const user_id = {
  user_id: localStorage.getItem("userId"),
};

const MaterialCodeBrowse = ({ onEditMaterial }) => {
  const dispatch = useDispatch();

  const [browseListData, setBrowseListData] = useState([]);
  const [totalRecord, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);

  const user_id = {
    user_id: localStorage.getItem("userId"),
  };

  const [params, setParams] = useState({
    pageNo: 1,
    pageSize: 15,
    filter_value: "",
    sort_column: "",
    sort_order: "",
  });

  const [filter, setFilter] = useState({
    fromDate: null,
    toDate: null,
    user_id: localStorage.getItem("userId"),
  });

  const handleParams = (event) => {
    setTimeout(() => {
      setParams({ ...params, [event.target.name]: event.target.value });
    }, 800);
  };

  const handleDateChange = (type, date) => {
    setFilter({ ...filter, [type]: date });
  };

  useEffect(() => {
    getBrowseListData();
  }, []);

  useEffect(() => {
    getBrowseListData();
  }, [params, filter]);

  const getBrowseListData = async () => {
    setLoading(true);
    await CommonController.commonApiCall(
      "MaterialCode/BrowseMaterialCode",
      params,
      filter
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

  const handlePageSizeChange = (param) => {
    setParams({ ...params, pageSize: param });
  };
  const handlePageChange = (param) => {
    setParams({ ...params, pageNo: param });
  };

  const handleEditMaterial = (id) => {
    dispatch(materialCodeEditId({ tran_id: id }));
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

  return (
    <React.Fragment>
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
            />
          </div>

          <div className="col-md-2">
            <DatePicker
              label="From Date"
              value={filter.fromDate}
              format="dd/MM/yyyy"
              onChange={(date) => handleDateChange("fromDate", date)}
              animateYearScrolling
              inputVariant="outlined"
              size="small"
              fullWidth
            />
          </div>
          <div className="col-md-2">
            <DatePicker
              label="To Date"
              value={filter.toDate}
              onChange={(date) => handleDateChange("toDate", date)}
              animateYearScrolling
              inputVariant="outlined"
              size="small"
              fullWidth
            />
          </div>
        </div>
      </div>
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          columns={[
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
            },
            {
              field: "",
              headerName: "Actions",
              renderCell: (params) => (
                <ActionButtons
                  onEdit={() => handleEditMaterial(params.row.tran_id)}
                  onDelete={() => deleteMaterialData(params.row.tran_id)}
                />
              ),
              flex: 0.1,
            },
          ]}
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
          rows={browseListData}
        />
      </div>
    </React.Fragment>
  );
};

export default MaterialCodeBrowse;
