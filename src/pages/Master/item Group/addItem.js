import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  CardContent,
  Card,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { withStyles } from "@material-ui/styles";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ActionButtons from "../../../components/action-buttons";
import { buttonLoader, showSuccessToast } from "../../../components/common";
import { Loader } from "../../../components/loader";
import { CommonController } from "../../../_redux/controller/common.controller";

const selectedValues = {
  editIndex: null,
  category_id: null,
  group_id: null,
  item_id: null,
  description: null,
  mlfb_no: "",
  lp_ref: "",
  list_price: "",
  qty: 1,
  amount: "",
};

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const AddItemGroupMaster = () => {
  const selectedIdResponse = useSelector(
    (state) => state.AllReducersMaster.itemGroupId
  );
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [addedItemList, setAddedItemList] = useState([]);
  const [formData, setFormData] = useState({
    product_id: "0",
    category_id: null,
    p_group_id: null,
    item_id: null,
    description: "",
    mlfb_no: "",
    uom_id: null,
    list_price: "",
    lp_ref: "",
    productQtyItem: [],
    user_id: localStorage.getItem("userId"),
  });

  const [dropdownList, setDropDownList] = useState({
    categoryNameList: [],
    uomList: [],
    groupNameList: [],
    itemNameList: [],
    descriptionList: [],
  });

  const [addDropDownList, setAddDropDownList] = useState({
    categoryNameList: [],
    groupNameList: [],
    itemNameList: [],
    descriptionList: [],
  });

  const [selectedDropDown, setSelectedDropDown] = useState(selectedValues);

  const [showItemList, setShowItemList] = useState(false);

  const onItemRemove = (index) => {
    let list = [...addedItemList];
    list.splice(index, 1);
    setAddedItemList(list);
  };

  useEffect(() => {
    CommonController.commonApiCallFilter("ItemGroup/ItemGroupMasterPreview", {
      product_id: selectedIdResponse ? selectedIdResponse : 0,
    }).then((data) => {
      setDropDownList({
        ...dropdownList,
        categoryNameList: data.categoryList,
        groupNameList: data.groupList,
        itemNameList: data.itemList,
        uomList: data.uomList,
      });
      setAddDropDownList({
        ...addDropDownList,
        categoryNameList: data.categoryList,
      });
    });
  }, [selectedIdResponse]);

  const getFilterGroup = (event, newValue) => {
    CommonController.commonApiCallFilter(
      "ItemGroup/GroupItemDescriptionDDLList",
      {
        category_id: newValue.id,
      }
    ).then((data) => {
      setAddDropDownList({
        ...addDropDownList,
        groupNameList: data.objList.groupList,
        descriptionList: data.objList.descList,
      });
      setSelectedDropDown({ ...selectedDropDown, category_id: newValue });
    });
  };

  const getFilterItems = (event, newValue) => {
    CommonController.commonApiCallFilter("ItemGroup/ItemDescriptionDDLList", {
      category_id: selectedDropDown.category_id.id,
      group_id: newValue.id,
    }).then((data) => {
      setAddDropDownList({
        ...addDropDownList,
        itemNameList: data.objList.itemList,
        descriptionList: data.objList.descList,
      });
      setSelectedDropDown({ ...selectedDropDown, group_id: newValue });
    });
  };

  const getFilterDescription = (event, newValue) => {
    CommonController.commonApiCallFilter("ItemGroup/DescriptionDDLList", {
      category_id: selectedDropDown.category_id.id,
      group_id: selectedDropDown.group_id.id,
      item_id: newValue.id,
    }).then((data) => {
      setAddDropDownList({
        ...addDropDownList,
        descriptionList: data.mList.descList,
      });
      setSelectedDropDown({ ...selectedDropDown, item_id: newValue });
    });
  };

  const getFilterValues = (event, newValue) => {
    CommonController.commonApiCallFilter("itemGroup/MlfbLpListPriceObj", {
      category_id: selectedDropDown.category_id.id,
      group_id: selectedDropDown.group_id.id,
      item_id: selectedDropDown.item_id.id,
      description: newValue.hasOwnProperty("description")
        ? newValue.description
        : newValue.value,
    }).then((data) => {
      setSelectedDropDown({
        ...selectedDropDown,
        description: newValue,
        mlfb_no: data.mList.mlfb_no,
        lp_ref: data.mList.lp_ref,
        list_price: data.mList.list_price,
      });
    });
  };

  const onItemAdd = () => {
    let selected = { ...selectedDropDown };
    selected.amount = selected.qty * selected.list_price;
    setAddedItemList([...addedItemList, selected]);
    setShowItemList(false);
    setSelectedDropDown(selectedValues);
  };

  const handleFormData = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleFormDataList = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const getItemById = (id, list, key) => {
    const item = list.filter((x) => x[key] === id);

    return item.length > 0 ? item[0] : null;
  };

  const onAddItemInsert = () => {
    setLoading(true);
    let tempData = { ...formData };
    let arr = [];
    addedItemList.forEach((element) => {
      let obj = {
        category_id: element.category_id.id,
        group_id: element.group_id.id,
        item_id: element.item_id.id,
        description: element.description.value,
        mlfb_no: element.mlfb_no,
        lp_ref: element.lp_ref,
        list_price: element.list_price,
        qty: element.qty,
        amount: element.amount,
      };
      arr.push(obj);
    });
    tempData.productQtyItem = arr;
    CommonController.commonApiCallFilter(
      "ItemGroup/ItemGroupMasterInsert",
      tempData
    ).then((data) => {
      if (data.valid) {
        showSuccessToast(data.msg);
        setLoading(false);
      }
    });
  };

  return (
    <div className="container-fluid mt-5">
      {dataLoading && <Loader />}
      <div className="row mb-5">
        <div className="col-md-4">
          <TextField
            variant="outlined"
            size="small"
            label="Product ID"
            disabled
            fullWidth
          />
        </div>
        <div className="col-md-4">
          <TextField
            variant="outlined"
            size="small"
            fullWidth
            name="mlfb_no"
            onChange={handleFormData}
            value={formData.mlfb_no}
            label="MLFB No."
          />
        </div>
        <div className="col-md-4">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={dropdownList.categoryNameList}
            getOptionLabel={(option) => option.value}
            size="small"
            value={getItemById(
              formData.category_id,
              dropdownList.categoryNameList,
              "id"
            )}
            onChange={(event, value) =>
              handleFormDataList("category_id", value.id)
            }
            fullWidth
            renderInput={(params) => (
              <TextField {...params} variant="outlined" label="Category Name" />
            )}
          />
        </div>
      </div>
      <div className="row mb-5">
        <div className="col-md-4">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={dropdownList.uomList}
            getOptionLabel={(option) => option.value}
            size="small"
            fullWidth
            value={getItemById(formData.uom_id, dropdownList.uomList, "id")}
            onChange={(event, value) => handleFormDataList("uom_id", value.id)}
            renderInput={(params) => (
              <TextField {...params} variant="outlined" label="UOM" />
            )}
          />
        </div>
        <div className="col-md-4">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={dropdownList.groupNameList}
            getOptionLabel={(option) => option.value}
            size="small"
            fullWidth
            value={getItemById(
              formData.p_group_id,
              dropdownList.groupNameList,
              "id"
            )}
            onChange={(event, value) =>
              handleFormDataList("p_group_id", value.id)
            }
            renderInput={(params) => (
              <TextField {...params} variant="outlined" label="Group Name" />
            )}
          />
        </div>
        <div className="col-md-4">
          <TextField
            variant="outlined"
            size="small"
            fullWidth
            name="list_price"
            value={formData.list_price}
            onChange={handleFormData}
            label="List Price"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={dropdownList.itemNameList}
            getOptionLabel={(option) => option.value}
            size="small"
            fullWidth
            value={getItemById(
              formData.item_id,
              dropdownList.itemNameList,
              "id"
            )}
            onChange={(event, value) => handleFormDataList("item_id", value.id)}
            renderInput={(params) => (
              <TextField {...params} variant="outlined" label="Item Name" />
            )}
          />
        </div>
        <div className="col-md-4">
          <TextField
            variant="outlined"
            size="small"
            fullWidth
            value={formData.lp_ref}
            label="LP Reference"
            name="lp_ref"
            onChange={handleFormData}
          />
        </div>
        <div className="col-md-4">
          <TextField
            variant="outlined"
            size="small"
            fullWidth
            multiline
            value={formData.description}
            name="description"
            onChange={handleFormData}
            label="Description"
          />
        </div>
      </div>
      {!showItemList && (
        <div className="my-4 text-right">
          <Button
            variant="contained"
            className="mr-2"
            color="primary"
            disableElevation
            onClick={() => setShowItemList(true)}
          >
            Add New Item
          </Button>
        </div>
      )}
      <TableContainer className="mt-4" component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Category</StyledTableCell>
              <StyledTableCell>Group </StyledTableCell>
              <StyledTableCell>Item</StyledTableCell>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell>MLFB No</StyledTableCell>
              <StyledTableCell>LP Ref.</StyledTableCell>
              <StyledTableCell>Qty</StyledTableCell>
              <StyledTableCell>List Price</StyledTableCell>
              <StyledTableCell>Amount</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {addedItemList.length > 0 ? (
              addedItemList.map((item, index) => {
                return (
                  <TableRow key={item.category_id.id}>
                    {" "}
                    <TableCell>{item.category_id.value}</TableCell>
                    <TableCell>{item.group_id.value}</TableCell>
                    <TableCell>{item.item_id.value}</TableCell>
                    <TableCell>
                      {item.description.hasOwnProperty("description")
                        ? item.description.description
                        : item.description.value}
                    </TableCell>
                    <TableCell>{item.mlfb_no}</TableCell>
                    <TableCell>{item.lp_ref}</TableCell>
                    <TableCell>{item.qty}</TableCell>
                    <TableCell>{item.list_price}</TableCell>
                    <TableCell>{item.amount}</TableCell>
                    <TableCell>
                      {" "}
                      <ActionButtons
                        onEdit={() => {
                          setSelectedDropDown(addedItemList[index]);
                          setShowItemList(true);
                        }}
                        onDelete={() => onItemRemove(index)}
                      />
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={12} className="text-center">
                  No Items
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {showItemList && (
        <Card className="mt-4">
          <CardContent>
            <div className="row">
              <div className="col-md-4 mb-4">
                <Autocomplete
                  disablePortal
                  disableClearable
                  id="combo-box-demo"
                  value={selectedDropDown.category_id}
                  options={addDropDownList.categoryNameList}
                  size="small"
                  getOptionLabel={(option) => option.value}
                  fullWidth
                  onChange={getFilterGroup}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Category"
                    />
                  )}
                />
              </div>
              <div className="col-md-4 mb-4">
                <Autocomplete
                  disablePortal
                  disableClearable
                  id="combo-box-demo"
                  value={selectedDropDown.group_id}
                  getOptionLabel={(option) => option.value}
                  options={addDropDownList.groupNameList}
                  size="small"
                  onChange={getFilterItems}
                  fullWidth
                  renderInput={(params) => (
                    <TextField {...params} variant="outlined" label="Group" />
                  )}
                />
              </div>
              <div className="col-md-4 mb-4">
                <Autocomplete
                  disablePortal
                  disableClearable
                  id="combo-box-demo"
                  value={selectedDropDown.item_id}
                  options={addDropDownList.itemNameList}
                  getOptionLabel={(option) => option.value}
                  onChange={getFilterDescription}
                  size="small"
                  fullWidth
                  renderInput={(params) => (
                    <TextField {...params} variant="outlined" label="Item" />
                  )}
                />
              </div>

              <div className="col-md-4 mb-4">
                <Autocomplete
                  disablePortal
                  disableClearable
                  id="combo-box-demo"
                  value={selectedDropDown.description}
                  options={addDropDownList.descriptionList}
                  getOptionLabel={(option) =>
                    option.hasOwnProperty("description")
                      ? option.description
                      : option.value
                  }
                  size="small"
                  fullWidth
                  onChange={getFilterValues}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Description"
                    />
                  )}
                />
              </div>
              <div className="col-md-4 mb-4">
                <TextField
                  size="small"
                  variant="outlined"
                  disabled
                  label="MLFB"
                  fullWidth
                  value={selectedDropDown?.mlfb_no}
                />
              </div>
              <div className="col-md-4 mb-4">
                <TextField
                  size="small"
                  variant="outlined"
                  disabled
                  label="LP Ref."
                  fullWidth
                  value={selectedDropDown?.lp_ref}
                />
              </div>
              <div className="col-md-4 mb-4">
                <TextField
                  size="small"
                  variant="outlined"
                  label="Qty"
                  value={selectedDropDown.qty}
                  fullWidth
                  onChange={(e) =>
                    setSelectedDropDown({
                      ...selectedDropDown,
                      qty: e.target.value,
                    })
                  }
                />
              </div>
              <div className="col-md-4 mb-4">
                <TextField
                  size="small"
                  variant="outlined"
                  label="List Price"
                  fullWidth
                  value={selectedDropDown?.list_price}
                  onChange={(e) =>
                    setSelectedDropDown({
                      ...selectedDropDown,
                      list_price: e.target.value,
                    })
                  }
                />
              </div>
              <div className="col-md-4 mb-4">
                <TextField
                  size="small"
                  variant="outlined"
                  disabled
                  label="Amount"
                  fullWidth
                  value={
                    selectedDropDown.qty !== ""
                      ? selectedDropDown.qty * selectedDropDown.list_price
                      : ""
                  }
                />
              </div>
              <div className="col-md-12 mb-4 text-right">
                <Button
                  variant="contained"
                  className="mr-2"
                  color="primary"
                  disableElevation
                  onClick={onItemAdd}
                >
                  Submit
                </Button>
                <Button
                  variant="contained"
                  className="mr-2"
                  color="primary"
                  disableElevation
                  onClick={() => {
                    setShowItemList(false);
                    setSelectedDropDown(selectedValues);
                  }}
                >
                  Close
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      {buttonLoader(loading, "Submit", onAddItemInsert, "primary")}
    </div>
  );
};

export default AddItemGroupMaster;
