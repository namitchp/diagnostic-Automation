import {
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { FormControl, InputLabel } from "@material-ui/core";
import { DataGrid } from "@mui/x-data-grid";
import { Autocomplete } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ActionButtons from "../../../components/action-buttons";
import { showErrorToast, showSuccessToast } from "../../../components/common";
import CustomPagination from "../../../components/CustomPagination";
import CustomNoRowsOverlay from "../../../components/customRowComponent";
import { selectedProductId } from "../../../_redux/actions/masters/all.action";

import {
  getCategoryList,
  getGGNameList,
  getLPRefList,
  getProductListBrowse,
  updateProductListPrice,
  updateProductLPRef,
  updateProductMovingNonMoving,
  updateProductVerifiedStatus,
} from "../../../_redux/actions/masters/product.action";
import { CommonController } from "../../../_redux/controller/common.controller";

const BrowseProductMaster = ({ onEdit }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsloading] = useState(false);
  const stateLoading = useSelector((state) => state.ProductMaster.isLoading);
  const getProductListResponse = useSelector(
    (state) => state.ProductMaster.productList
  );
  const getCategoryListResponse = useSelector(
    (state) => state.ProductMaster.categoryList
  );
  const getLpRefListResponse = useSelector(
    (state) => state.ProductMaster.lpRefList
  );
  const getGGNameListResponse = useSelector(
    (state) => state.ProductMaster.ggNameList
  );
  const [categoryList, setCategoryList] = useState([]);
  const [lpRefList, setLpRefList] = useState([]);
  const [ggNameList, setGGNameList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [productList, setProductList] = useState([]);
  const [tempVerifed, setTempVerified] = useState([]);

  const [productMasterFilter, setProductMasterFilter] = useState({
    user_id: localStorage.getItem("userId"),
    moving_non_moving: "all",
    category: selectedCategory ? selectedCategory.value : "",
    group: "",
    gg_name: "",
    item_name: "",
    lp_ref: "",
    status: "",
    siemens_product: "",
  });

  const [params, setParams] = useState({
    pageNo: 1,
    pageSize: 10,
    filter_value: "",
    sort_column: "",
    sort_order: "",
  });

  const handleFilters = (event) => {
    setProductMasterFilter({
      ...productMasterFilter,
      [event.target.name]: event.target.value,
    });
  };

  const handleCategory = (event, value) => {
    setSelectedCategory(value);
    setProductMasterFilter({
      ...productMasterFilter,
      category: value ? value.value : "",
    });
  };

  const handleParams = (event) => {
    setTimeout(() => {
      setParams({ ...params, [event.target.name]: event.target.value });
    }, 800);
  };

  const handlePageSizeChange = (param) => {
    setParams({ ...params, pageSize: param.pageSize });
  };
  const handlePageChange = (param) => {
    console.log(param);
    setParams({ ...params, pageNo: param.page });
  };

  useEffect(() => {
    dispatch(getProductListBrowse(params, productMasterFilter));
    dispatch(getCategoryList());
    dispatch(getLPRefList());
    dispatch(getGGNameList());
  }, []);

  useEffect(() => {
    dispatch(getProductListBrowse(params, productMasterFilter));
  }, [productMasterFilter, params]);

  useEffect(() => {
    setIsloading(stateLoading);
    if (getProductListResponse) {
      setProductList(getProductListResponse.data);
    }
  }, [getProductListResponse, stateLoading]);

  useEffect(() => {
    setIsloading(stateLoading);
    if (getCategoryListResponse) {
      setCategoryList(getCategoryListResponse);
    }
  }, [getCategoryListResponse, stateLoading]);

  useEffect(() => {
    setIsloading(stateLoading);
    if (getLpRefListResponse) {
      setLpRefList(getLpRefListResponse);
    }
  }, [getLpRefListResponse, stateLoading]);

  useEffect(() => {
    setIsloading(stateLoading);
    if (getGGNameListResponse) {
      setGGNameList(getGGNameListResponse);
    }
  }, [getGGNameListResponse, stateLoading]);

  const updateVerifiedStatus = (value, id) => {
    var temp = [...tempVerifed];
    var tempIndex = temp.indexOf(id);
    const param = {
      product_id: id,
      edit: value ? "1" : "0",
      user_id: localStorage.getItem("userId"),
    };

    if (tempIndex > -1) {
      temp.splice(tempIndex, 1);
    } else {
      if (value) {
        temp.push(id);
      }
    }
    dispatch(updateProductVerifiedStatus(param));
    setTimeout(() => {
      dispatch(getProductListBrowse(params, productMasterFilter));
    }, 3000);
  };

  const updateListPriceValue = (param, event) => {
    const params = {
      product_id: param.row.product_id,
      list_price: parseFloat(event.target.value.replace(",", "")).toFixed(2),
      user_id: localStorage.getItem("userId"),
    };
    dispatch(updateProductListPrice(params));
  };

  const updateProductLPRefValue = (param, event) => {
    const params = {
      product_id: param.row.product_id,
      lp_ref: event.target.value,
      user_id: localStorage.getItem("userId"),
    };
    dispatch(updateProductLPRef(params));
  };

  const updateProductMovingNonValue = (param, event) => {
    const params = {
      product_id: param.row.product_id,
      moving_non_moving: event.target.value,
      user_id: localStorage.getItem("userId"),
    };
    dispatch(updateProductMovingNonMoving(params));
  };

  const handleEdit = (id) => {
    dispatch(selectedProductId(id));
    onEdit();
  };

  const handleDeleteRow = (id) => {
    CommonController.commonApiCallFilter("Employee/EmployeeMasterDelete", {
      product_id: id,
    }).then((data) => {
      if (data.valid) {
        showSuccessToast("Record Deleted Successfully");
        dispatch(getProductListBrowse(params, productMasterFilter));
      } else {
        showErrorToast("Something went wrong");
      }
    });
  };

  return (
    <React.Fragment>
      <div className="filter_box mb-5">
        <div className="d-flex align-items-center">
          <div className="d-flex align-items-center mr-5">
            <h4 className="mb-0">Filters</h4>
          </div>
          <div className="row w-100">
            <div className="col-md-2">
              <Autocomplete
                id="combo-box-demo"
                className="mb-3"
                options={categoryList}
                getOptionLabel={(option) => option.value}
                fullWidth
                onChange={handleCategory}
                value={selectedCategory || null}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    label="Category"
                    variant="outlined"
                  />
                )}
              />
            </div>
            <div className="col-md-1">
              <FormControl fullWidth size="small" variant="outlined">
                <InputLabel id="demo-simple-select-outlined-label">
                  Group
                </InputLabel>
                <Select
                  name="group_name"
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={""}
                  onChange={handleFilters}
                  label="Group"
                >
                  <MenuItem value="">All</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="col-md-2">
              <FormControl fullWidth size="small" variant="outlined">
                <InputLabel id="demo-simple-select-outlined-label">
                  Item Name
                </InputLabel>
                <Select
                  name="item_name"
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={""}
                  label="Item Name"
                >
                  <MenuItem value="">All</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="col-md-2">
              <FormControl fullWidth size="small" variant="outlined">
                <InputLabel id="demo-simple-select-outlined-label">
                  Lp. Ref.
                </InputLabel>
                <Select
                  name="lp_ref"
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={productMasterFilter.lp_ref}
                  onChange={handleFilters}
                  label="Lp. Ref."
                >
                  <MenuItem value={""}>None</MenuItem>
                  {lpRefList.length > 0
                    ? lpRefList.map((ref, index) => {
                        return (
                          <MenuItem key={"ref" + index} value={ref.value}>
                            {ref.value}
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
                  GG Name
                </InputLabel>
                <Select
                  name="gg_name"
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={productMasterFilter.gg_name}
                  onChange={handleFilters}
                  label="GG Name"
                >
                  <MenuItem value={""}>None</MenuItem>
                  {ggNameList.length > 0
                    ? ggNameList.map((gg, index) => {
                        return (
                          <MenuItem key={"ggName" + index} value={gg.id}>
                            {gg.value}
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
                  Siemens Product
                </InputLabel>
                <Select
                  name="siemens_product"
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={productMasterFilter.siemens_product}
                  onChange={handleFilters}
                  label="Siemens Product"
                >
                  <MenuItem value={""}>All</MenuItem>
                  <MenuItem value={"Siemens"}>Siemens </MenuItem>
                  <MenuItem value={"Non-Siemens"}>Non-Siemens</MenuItem>
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
                  value={productMasterFilter.verified}
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
            <div className="col-md-2 text-right">
              <Button color="primary" disableElevation variant="contained">
                Export Excel
              </Button>
            </div>
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
          rowCount={getProductListResponse?.recordsFiltered}
          paginationMode="server"
          onPageSizeChange={handlePageSizeChange}
          onPageChange={handlePageChange}
          loading={isLoading}
          rowHeight={30}
          initialState={{}}
          components={{}}
          onSortModelChange={(sort) => {
            if (sort.length > 0) {
              setParams({
                ...params,
                sort_column: sort[0].field,
                sort_order: sort[0].sort,
              });
            }
          }}
          columns={[
            {
              field: "id",
              headerName: "ID",
              width: 70,
            },
            {
              field: "product_code",
              headerName: "ERP Code",
              width: 180,
            },
            {
              field: "category_name",
              headerName: "Category",
              width: 200,
            },
            {
              field: "group",
              headerName: "Group",
              width: 200,
            },
            {
              field: "item_name",
              headerName: "Item Name",
              width: 200,
            },
            {
              field: "description",
              headerName: "Description",
              width: 200,
            },
            {
              field: "mlfb_no",
              headerName: "MLFB No.",
              width: 200,
            },
            {
              field: "list_price",
              headerName: "List Price",
              width: 200,
              renderCell: (params) => (
                <input
                  type="text"
                  className="form-control"
                  defaultValue={params.row.list_price}
                  onBlur={(event) => updateListPriceValue(params, event)}
                />
              ),
            },
            {
              field: "grade",
              headerName: "HSN",
              width: 200,
            },
            {
              field: "tax_rate",
              headerName: "Tax Rate",
              width: 200,
            },
            {
              field: "lp_ref",
              headerName: "L.P. Ref.",
              width: 200,
              renderCell: (params) => (
                <input
                  type="text"
                  className="form-control"
                  defaultValue={params.row.lp_ref}
                  onBlur={(event) => updateProductLPRefValue(params, event)}
                />
              ),
            },
            {
              field: "gg_name",
              headerName: "GG Name",
              width: 200,
            },
            {
              field: "siemens_product",
              headerName: "Siemens Product",
              width: 200,
            },
            {
              field: "moving_non_moving",
              headerName: "Moving",
              width: 200,
              renderCell: (params) => (
                <select
                  className="form-control"
                  onChange={(event) =>
                    updateProductMovingNonValue(params, event)
                  }
                  defaultValue={params.row.moving_non_moving}
                >
                  <option value="Old">Old</option>
                  <option value="New">New</option>
                  <option value="Panel">Panel</option>
                  <option value="Asset">Asset</option>
                </select>
              ),
            },
            {
              field: "edit",
              headerName: "Verified",
              width: 200,
              renderCell: (params) => (
                <FormControlLabel
                  className={"formControlLabel"}
                  control={
                    <Checkbox
                      defaultChecked={params.row.edit === "True"}
                      size="small"
                      color="primary"
                      onChange={(event) =>
                        updateVerifiedStatus(
                          event.target.checked,
                          params.row.product_id
                        )
                      }
                      inputProps={{
                        "aria-label": "checkbox with small size",
                      }}
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
                      {isLoading
                        ? "Updating"
                        : params.row.edit === "True" ||
                          tempVerifed.indexOf(params.row.id) > -1
                        ? "Verified"
                        : "Not Verified"}
                    </span>
                  }
                />
              ),
            },
            {
              field: "",
              headerName: "Actions",
              renderCell: (params) => (
                <ActionButtons
                  onEdit={() => handleEdit(params.row.product_id)}
                  onDelete={() => handleDeleteRow(params.row.product_id)}
                />
              ),
              flex: 0.1,
            },
          ]}
          rows={productList}
        />
      </div>
    </React.Fragment>
  );
};

export default BrowseProductMaster;
