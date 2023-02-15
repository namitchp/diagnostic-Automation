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
import { selectedProductId } from "../../../_redux/actions/masters/all.action";
import {
  getProductListBrowse,
  updateProductListPrice,
  updateProductLPRef,
  updateProductMovingNonMoving,
  updateProductVerifiedStatus,
} from "../../../_redux/actions/masters/product.action";
import { CommonController } from "../../../_redux/controller/common.controller";
import CustomPagination from "../../../components/CustomPagination";
import CustomNoRowsOverlay from "../../../components/customRowComponent";
import {
  getFilterData,
  updateFilterData,
} from "../../../_redux/actions/common.action";
const BrowseProductMaster = ({ onEdit, siemens, browse_id }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsloading] = useState(false);
  const stateLoading = useSelector((state) => state.ProductMaster.isLoading);
  const userRight = useSelector((state) => state.common.userRightResponse);
  const [gridColumn, setgridColumn] = useState([
    {
      field: "product_id",
      headerName: "ID",
      width: 70,
      hide: false,
    },
    {
      field: "product_code",
      headerName: "ERP Code",
      width: 180,
      hide: false,
    },
    {
      field: "category_name",
      headerName: "Category",
      width: 200,
      hide: false,
    },
    {
      field: "p_group_name",
      headerName: "Group",
      width: 200,
      hide: false,
    },
    {
      field: "item_name",
      headerName: "Item Name",
      width: 200,
      hide: false,
    },
    {
      field: "description",
      headerName: "Description",
      width: 200,
      hide: false,
    },
    {
      field: "mlfb_no",
      headerName: "MLFB No.",
      width: 200,
      hide: false,
    },
    {
      field: "list_price",
      headerName: "List Price",
      width: 200,
      hide: false,
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
      hide: false,
    },
    {
      field: "tax_rate",
      headerName: "Tax Rate",
      width: 200,
      hide: false,
    },
    {
      field: "lp_ref",
      headerName: "L.P. Ref.",
      width: 200,
      hide: false,
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
      hide: false,
    },
    {
      field: "siemens_product",
      headerName: "Siemens Product",
      width: 200,
      hide: false,
    },
    {
      field: "moving_non_moving",
      headerName: "Moving",
      width: 200,
      hide: false,
      renderCell: (params) => (
        <select
          className="form-control"
          onChange={(event) => updateProductMovingNonValue(params, event)}
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
      hide: false,
      renderCell: (params) => (
        <FormControlLabel
          className={"formControlLabel"}
          control={
            <Checkbox
              defaultChecked={params.row.edit === true}
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
                (params.row.edit === true ||
                tempVerifed.indexOf(params.row.product_id) > -1
                  ? "text-success"
                  : "text-danger")
              }
            >
              {isLoading
                ? "Updating"
                : params.row.edit === true ||
                  tempVerifed.indexOf(params.row.product_id) > -1
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
      width: 100,
      renderCell: (params) => (
        <ActionButtons
          onPreview={() =>
            handleEdit({ id: params.row.product_id, type: "preview" })
          }
          onEdit={
            userRight?.update_right
              ? () => handleEdit({ id: params.row.product_id, type: "edit" })
              : null
          }
          onDelete={
            userRight?.delete_right
              ? () => handleDeleteRow(params.row.product_id)
              : null
          }
        />
      ),
    },
  ]);

  const getProductListResponse = useSelector(
    (state) => state.ProductMaster.productList
  );
  const filterjsonData = useSelector((state) => state.common.getFilterData);
  const getCategoryListResponse = useSelector(
    (state) => state.ProductMaster.categoryList
  );
  const [categoryList, setCategoryList] = useState([]);
  const [lpRefList, setLpRefList] = useState([]);
  const [ggNameList, setGGNameList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [tempVerifed, setTempVerified] = useState([]);
  const [totalRecord, setTotalRecords] = useState(0);
  const [jsonfilter, setjsonfilter] = useState(false);
  const [productMasterFilter, setProductMasterFilter] = useState({
    moving_non_moving: "All",
    category: "",
    group: "",
    gg_name: "",
    item_name: "",
    lp_ref: "",
    status: "",
    verified: "",
    siemens_product: siemens,
  });

  const [params, setParams] = useState({
    pageNo: 0,
    pageSize: 10,
    filter_value: "",
    sort_column: "",
    sort_order: "",
    columns: [],
  });

  const handleUpdateFilterData = () => {
    let body = {
      filterPage: { ...params },
      filterData: { ...productMasterFilter },
    };
    body.user_id = localStorage.getItem("userId");
    body.browse_id = browse_id;
    dispatch(updateFilterData(body));
    // if (updatefilterjsonData.status == 200) {
    //   // dispatch(getFilterData(1));
    // }
  };
  const handleFilters = (event) => {
    setProductMasterFilter({
      ...productMasterFilter,
      [event.target.name]: event.target.value,
    });
    setjsonfilter(true);
  };
  const handleCategory = (event, value) => {
    setProductMasterFilter({
      ...productMasterFilter,
      category: value.category_name,
    });
    setjsonfilter(true);
  };
  const handleParams = (event) => {
    setTimeout(() => {
      setParams({ ...params, [event.target.name]: event.target.value });
    }, 800);
    setjsonfilter(true);
  };

  const handlePageSizeChange = (param) => {
    setParams({ ...params, pageSize: param });
    setjsonfilter(true);
  };
  const handlePageChange = (param) => {
    setParams({ ...params, pageNo: param });
    setjsonfilter(true);
  };
  const handleColumnHide = (e) => {
    const index = gridColumn.findIndex((val) => val.field == e.field);
    let columns = [...gridColumn];
    columns[index] = { ...columns[index], hide: e.colDef.hide };
    setgridColumn(columns);
    setParams({ ...params, columns: columns });
    setjsonfilter(true);
  };
  useEffect(() => {
    if (filterjsonData) {
      setParams(filterjsonData.data?.filterPage);
      setProductMasterFilter(filterjsonData.data?.filterData);
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
  useEffect(() => {
    dispatch(getFilterData(browse_id));
    let productMaster = { ...productMasterFilter };
    productMaster.user_id = localStorage.getItem("userId");
    dispatch(getProductListBrowse(params, productMaster));
    dispatch(selectedProductId());
  }, []);
  useEffect(() => {
    let productMaster = { ...productMasterFilter };
    productMaster.user_id = localStorage.getItem("userId");
    dispatch(getProductListBrowse(params, productMaster));
    if (jsonfilter) {
      handleUpdateFilterData();
    }
  }, [productMasterFilter, params, jsonfilter]);

  useEffect(() => {
    setIsloading(stateLoading);
    if (getProductListResponse) {
      setProductList(getProductListResponse.data);
      setTotalRecords(getProductListResponse.totalRecords);
    }
  }, [getProductListResponse, stateLoading]);

  useEffect(() => {
    setIsloading(stateLoading);
    if (getCategoryListResponse) {
      setCategoryList(getCategoryListResponse.category);
      setLpRefList(getCategoryListResponse.lp);
      setGGNameList(getCategoryListResponse.gg);
    }
  }, [getCategoryListResponse, stateLoading]);
  const updateVerifiedStatus = (value, id) => {
    var temp = [...tempVerifed];
    var tempIndex = temp.indexOf(id);
    const param = {
      product_id: id,
      edit: value,
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
    CommonController.commonApiCallFilter(
      "master/delete_product_master",
      {
        product_id: id,
      },
      "post",
      "node"
    ).then((data) => {
      if (data.status === 200) {
        showSuccessToast("Record Deleted Successfully");
        dispatch(getProductListBrowse(params, productMasterFilter));
      } else {
        showErrorToast("Something went wrong");
      }
    });
  };
  return (
    <div className="inner_data_wrapper">
      <div className="bg-white p-4 rounded">
        <div className="filter_box mb-5">
          <div className="d-flex align-items-center">
            <div className="d-flex align-items-center mr-5">
              <h4 className="mb-0">Filters</h4>
            </div>
            <div className="row w-100">
              <div className="col-md-2 mb-4">
                <FormControl fullWidth size="small" variant="outlined">
                  <InputLabel id="demo-simple-select-outlined-label">
                    Category
                  </InputLabel>
                  <Select
                    name="category"
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={productMasterFilter?.category}
                    onChange={handleFilters}
                    label="Category"
                  >
                    <MenuItem value={""}>All</MenuItem>
                    {categoryList?.length > 0
                      ? categoryList.map((ref, index) => {
                          return (
                            <MenuItem
                              key={"ref" + index}
                              value={ref.category_name}
                            >
                              {ref.category_name}
                            </MenuItem>
                          );
                        })
                      : null}
                  </Select>
                </FormControl>
                {/* <Autocomplete
                id="combo-box-demo"
                className="mb-3"
                options={categoryList}
                getOptionLabel={(option) => option.category_name}
                fullWidth
                onChange={handleCategory}
                value={
                  productMasterFilter?.category != ""
                    ? { category_name: productMasterFilter?.category }
                    : null
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    label="Category"
                    variant="outlined"
                  />
                )}
              /> */}
              </div>
              <div className="col-md-2 mb-4">
                <FormControl fullWidth size="small" variant="outlined">
                  <InputLabel id="demo-simple-select-outlined-label">
                    Group
                  </InputLabel>
                  <Select
                    name="group_name"
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={productMasterFilter?.group}
                    onChange={handleFilters}
                    label="Group"
                  >
                    <MenuItem value="All">All</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="col-md-2 mb-4">
                <FormControl fullWidth size="small" variant="outlined">
                  <InputLabel id="demo-simple-select-outlined-label">
                    Item Name
                  </InputLabel>
                  <Select
                    name="item_name"
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={productMasterFilter?.item_name}
                    label="Item Name"
                  >
                    <MenuItem value="All">All</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div className="col-md-2 mb-4">
                <FormControl fullWidth size="small" variant="outlined">
                  <InputLabel id="demo-simple-select-outlined-label">
                    Lp. Ref.
                  </InputLabel>
                  <Select
                    name="lp_ref"
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={productMasterFilter?.lp_ref}
                    onChange={handleFilters}
                    label="Lp. Ref."
                  >
                    <MenuItem value={""}>None</MenuItem>
                    {lpRefList?.length > 0
                      ? lpRefList.map((ref, index) => {
                          return (
                            <MenuItem key={"ref" + index} value={ref.lp_ref}>
                              {ref.lp_ref}
                            </MenuItem>
                          );
                        })
                      : null}
                  </Select>
                </FormControl>
              </div>

              <div className="col-md-2 mb-4">
                <FormControl fullWidth size="small" variant="outlined">
                  <InputLabel id="demo-simple-select-outlined-label">
                    GG Name
                  </InputLabel>
                  <Select
                    name="gg_name"
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={productMasterFilter?.gg_name}
                    onChange={handleFilters}
                    label="GG Name"
                  >
                    <MenuItem value={""}>None</MenuItem>
                    {ggNameList?.length > 0
                      ? ggNameList.map((gg, index) => {
                          return (
                            <MenuItem key={"ggName" + index} value={gg.gg_name}>
                              {gg.gg_name}
                            </MenuItem>
                          );
                        })
                      : null}
                  </Select>
                </FormControl>
              </div>
              {/* <div className="col-md-2 mb-4">
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
            </div> */}
              <div className="col-md-2 mb-4">
                <FormControl fullWidth size="small" variant="outlined">
                  <InputLabel id="demo-simple-select-outlined-label">
                    Moving
                  </InputLabel>
                  <Select
                    name="moving_non_moving"
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={productMasterFilter?.moving_non_moving}
                    onChange={handleFilters}
                    label="Siemens Product"
                  >
                    <MenuItem value={"All"}>All</MenuItem>
                    <MenuItem value={"Old"}>Old </MenuItem>
                    <MenuItem value={"New"}>New</MenuItem>
                    <MenuItem value={"Panel"}>Panel</MenuItem>
                    <MenuItem value={"Asset"}>Asset</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="col-md-2 mb-4">
                <FormControl fullWidth size="small" variant="outlined">
                  <InputLabel id="demo-simple-select-outlined-label">
                    Verified
                  </InputLabel>
                  <Select
                    name="verified"
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={productMasterFilter?.verified}
                    onChange={handleFilters}
                    label="Verified"
                  >
                    <MenuItem value={""}>All</MenuItem>
                    <MenuItem value={"1"}>Verified</MenuItem>
                    <MenuItem value={"0"}>Not Verified</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="col-md-2 mb-4">
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
              <div className="col-md-2">
                <Button color="primary" className="w-100 bg-success text-white p-2" disableElevation variant="contained">
                  Export Excel
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="data_table_height">
          <DataGrid
            pagination
            disableColumnFilter
            pageSize={params?.pageSize}
            page={params?.pageNo}
            rowsPerPageOptions={[10, 25, 50]}
            rowCount={totalRecord}
            paginationMode="server"
            onPageSizeChange={handlePageSizeChange}
            onPageChange={handlePageChange}
            loading={isLoading}
            rowHeight={36}
            components={
              productList?.length > 0
                ? {
                    Pagination: CustomPagination,
                    // NoRowsOverlay: CustomNoRowsOverlay,
                  }
                : {}
            }
            onSortModelChange={(sort) => {
              if (sort.length > 0) {
                setjsonfilter(true);
                setParams({
                  ...params,
                  sort_column: sort[0].field,
                  sort_order: sort[0].sort,
                });
              }
            }}
            columns={gridColumn}
            rows={productList}
            getRowId={(productList) => productList.product_id}
            getRowClassName={(params) => {
              return params.row.sr_no % 2 === 0 ? "even" : "odd";
            }}
            onColumnVisibilityChange={(e) => handleColumnHide(e)}
          />
        </div>
      </div>
    </div>
  );
};

export default BrowseProductMaster;
