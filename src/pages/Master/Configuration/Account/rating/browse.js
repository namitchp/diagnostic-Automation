import { DataGrid } from "@material-ui/data-grid";
import { TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../../../components/common";

import CustomPagination from "../../../../../components/CustomPagination";
import CustomNoRowsOverlay from "../../../../../components/customRowComponent";

import { Loader } from "../../../../../components/loader";
import { CommonController } from "../../../../../_redux/controller/common.controller";
import ActionButtons from "../../../../../components/action-buttons";
import { useDispatch } from "react-redux";
import { Alert } from "@material-ui/lab";
import { selectedRatingId } from "../../../../../_redux/actions/masters/all.action";
const user_id = {
  user_id: localStorage.getItem("userId"),
};

const BrowseRating = ({ onEdit }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [ratingList, setRatingList] = useState([]);
  const [totalRecord, setTotalRecords] = useState(0);

  const [params, setParams] = useState({
    pageNo: 1,
    pageSize: 10,
    filter_value: "",
    sort_column: "",
    sort_order: "",
  });

  const handleParams = (event) => {
    setTimeout(() => {
      setParams({ ...params, [event.target.name]: event.target.value });
    }, 800);
  };

  const getBrowseListData = async () => {
    setIsLoading(true);
    await CommonController.commonApiCall(
      "Configuration/ConfigurationRatingBrowse",
      params,
      user_id
    )
      .then((data) => {
        setRatingList(data.data);
        setTotalRecords(data.recordsFiltered);
      })
      .catch((err) => {
        showErrorToast(err);
      });
    setIsLoading(false);
  };

  const handlePageSizeChange = (param) => {
    setParams({ ...params, pageSize: param.pageSize });
  };
  const handlePageChange = (param) => {
    setParams({ ...params, pageNo: param.page });
  };

  useEffect(() => {
    getBrowseListData();
  }, []);

  useEffect(() => {
    getBrowseListData();
  }, [params]);

  const handleEdit = (id) => {
    console.log("id : " + id);
    dispatch(selectedRatingId(id));
    onEdit();
  };

  const handleDeleteRow = (id) => {
    CommonController.commonApiCallFilter(
      "Configuration/ConfigurationRatingDelete",
      {
        rating_id: id,
      }
    ).then((data) => {
      if (data.valid) {
        showSuccessToast("Record Deleted Successfully");
        getBrowseListData();
      } else {
        showErrorToast("Something went wrong");
      }
    });
  };

  return (
    <React.Fragment>
      {isLoading && <Loader />}
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
              field: "rating_name",
              headerName: "Rating Name",
              flex: 0.1,
            },
            {
              field: "description",
              headerName: "Description",
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
                  onEdit={() => handleEdit(params.row.rating_id)}
                  onDelete={() => handleDeleteRow(params.row.rating_id)}
                />
              ),
              flex: 0.1,
            },
          ]}
          pagination
          disableColumnFilter
          pageSize={params.pageSize}
          // page={params.pageNo}
          rowsPerPageOptions={[10, 15, 25, 100]}
          rowCount={totalRecord}
          paginationMode="server"
          onPageSizeChange={handlePageSizeChange}
          onPageChange={handlePageChange}
          loading={isLoading}
          rowHeight={30}
          components={{
            Pagination: CustomPagination,
            NoRowsOverlay: CustomNoRowsOverlay,
          }}
          onSortModelChange={(sort) => {
            if (sort.sortModel.length > 0) {
              setParams({
                ...params,
                sort_column: sort.sortModel[0].field,
                sort_order: sort.sortModel[0].sort,
              });
            }
          }}
          rows={ratingList}
        />
      </div>
    </React.Fragment>
  );
};

export default BrowseRating;
