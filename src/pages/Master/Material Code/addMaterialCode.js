import {
  TextField,
  Button,
  Divider,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Paper,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { withStyles } from "@material-ui/styles";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ActionButtons from "../../../components/action-buttons";
import { SimpleTable } from "../../../components/basic-table";
import { showErrorToast, showSuccessToast } from "../../../components/common";
import { Loader } from "../../../components/loader";
import { TablePicker } from "../../../components/table-picker";
import { searchPartyName } from "../../../_redux/actions/masters/materialcode.action";
import { MaterialCodeMasterController } from "../../../_redux/controller/Masters/materialcode.controller";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#1280cf",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const userId = localStorage.getItem("userId");

const AddMaterialCode = ({ onCancel,type }) => {
  const dispatch = useDispatch();
  const partyNameListResponse = useSelector(
    (state) => state.MaterialCodeMaster.partyNameList
  );
  console.log(partyNameListResponse)
  const selectedMaterialCodeId = useSelector(
    (state) => state.MaterialCodeMaster.selectedMaterialId
  );
  const [loading, setLoading] = useState(false);
  const [partyNameList, setPartyNameList] = useState([]);
  const [selectedParty, setSelectedParty] = useState(null);
  const [selectedCustomerList, setSelectedCustomerList] = useState([]);
  const [showPickCustomer, setPickCustomer] = useState(false);
  const [showPickItems, setPickItems] = useState(false);
  const [selectedItemsList, setSelectedItemsList] = useState([]);

  useEffect(() => {
    if (partyNameListResponse) {
      setPartyNameList(partyNameListResponse.data);
    }
  }, [partyNameListResponse]);

  useEffect(() => {
    if (selectedMaterialCodeId && selectedMaterialCodeId.tran_id) {
      setLoading(true);
      MaterialCodeMasterController.getMaterialDetailById(
        selectedMaterialCodeId
      ).then((data) => {
        if (data.tran_id) {
          if (partyNameList.length > 0) {
            var indx = partyNameList.findIndex(
              (x) => x.id === data.customer_id
            );

            if (indx > -1) {
              setSelectedParty(partyNameList[indx]);
            }
            setSelectedCustomerList(
              renameKeyObj("customer_id", "company_id", data.codeCustomerItem)
            );
            setSelectedItemsList(data.codeProductItem);
          }
        }
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      });
    }
  }, [selectedMaterialCodeId, partyNameList]);

  console.log(selectedParty)
  const renameKeyObj = (from, to, arr) => {
    var temp = arr;
    var newArr = [];
    for (const item of temp) {
      item[to] = item[from];
      delete item[from];
      newArr.push(item);
    }
    return newArr;
  };

  // const newArrayOfObj = selectedCustomerList.map(
  //   ({ company_id: customer_id, ...rest }) => ({
  //     customer_id,
  //     ...rest,
  //   })
  // );

  // useEffect(() => {
  //   setNewCustomerList(newArrayOfObj);
  // }, [newArrayOfObj]);

  const validateMaterialCode = () => {
    var validateObj = selectedItemsList.filter((x) => {
      if (!x.hasOwnProperty("material_code") || x.material_code === "") {
        return x;
      } else if (!x.hasOwnProperty("unit_price") || isNaN(x.unit_price)) {
        return x;
      }
    });

    return validateObj;
  };
  const filterProductList = () => {
    var newList = [];
    for (const item of selectedItemsList) {
      var list = {
        product_id: item.product_id,
        material_code: item.material_code,
        lp_ref: item.lp_ref,
        list_price: item.list_price,
        dis_per: item.dis_per,
        unit_price: item.unit_price,
      };
      newList.push(list);
    }

    return newList;
  };

  const insertMaterialCode = () => {
    const validateList = validateMaterialCode();
    if (selectedCustomerList.length < 1) {
      showErrorToast("Pick Customer");
    } else if (selectedItemsList.length < 1) {
      showErrorToast("Pick Item");
    } else if (validateList.length > 0) {
      showErrorToast("Fill the required fields");
    } else {
      setLoading(true);
      var param = {
        tran_id: selectedMaterialCodeId ? selectedMaterialCodeId.tran_id :0,
        customer_id: selectedParty.company_id,
        user_id: userId,
        customer: filterCustomerList(),
        product: filterProductList(),
      };

      MaterialCodeMasterController.insertMaterialCode(param).then((data) => {
        if (data.status===200) {
          showSuccessToast(data.message);
          onCancel();
        } else {
          showErrorToast(data.type);
        }
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      });
    }
  };


  const filterCustomerList = () => {
    var newList = [];
    for (const customer of selectedCustomerList) {
      var list = {
        customer_id: customer.company_id,
      };
      newList.push(list);
    }

    return newList;
  };
  useEffect(() => {
    dispatch(searchPartyName(type));
  }, []);
  const customerListColumn = [
    {
      id: "company_id",
      numeric: false,
      disablePadding: true,
      label: "",
    },
    {
      id: "company_name",
      numeric: false,
      disablePadding: true,
      label: "Company Name",
    },
    {
      id: "short_name",
      numeric: false,
      disablePadding: false,
      label: "Short Name",
    },
    {
      id: "group_name",
      numeric: false,
      disablePadding: false,
      label: "Group Name",
    },
    { id: "address", numeric: false, disablePadding: false, label: "Address" },
    { id: "city", numeric: false, disablePadding: false, label: "City" },
    {
      id: "district",
      numeric: false,
      disablePadding: false,
      label: "District",
    },
    { id: "state", numeric: false, disablePadding: false, label: "State" },
    { id: "pin_code", numeric: false, disablePadding: false, label: "Pincode" },
  ];
  const supplyItemsColumn = [
    {
      id: "product_id",
      numeric: false,
      disablePadding: true,
      label: "",
    },
    {
      id: "category_name",
      numeric: false,
      disablePadding: true,
      label: "Category Name",
    },
    {
      id: "p_group_name",
      numeric: false,
      disablePadding: false,
      label: "Group Name",
    },
    {
      id: "item_name",
      numeric: false,
      disablePadding: false,
      label: "Item Name",
    },
    {
      id: "description",
      numeric: false,
      disablePadding: false,
      label: "Description",
    },
    { id: "mlfb_no", numeric: false, disablePadding: false, label: "MLFB" },
    {
      id: "grade",
      numeric: false,
      disablePadding: false,
      label: "Grade",
    },
    { id: "lp_ref", numeric: false, disablePadding: false, label: "LP Ref" },
    {
      id: "list_price",
      numeric: false,
      disablePadding: false,
      label: "List Price",
    },
  ];
  const selectedCustomerColumns = [
    {
      id: "company_name",
      numeric: false,
      disablePadding: true,
      label: "Company Name",
    },
    {
      id: "city",
      numeric: false,
      disablePadding: false,
      label: "City",
    },
  ];
  const togglePickCustomer = () => setPickCustomer(!showPickCustomer);
  const togglePickItems = () => setPickItems(!showPickItems);

  const handleAddedCustomer = (row) => {
    var tempselected = [...selectedCustomerList];
    var tempIndex = tempselected.findIndex(
      (x) => x.company_id === row.company_id
    );
    if (tempIndex > -1) {
      tempselected.splice(tempIndex, 1);
      setSelectedCustomerList(tempselected);
    }
  };

  const handleAddedItems = (row) => {
    var tempselected = [...selectedItemsList];
    var tempIndex = tempselected.findIndex(
      (x) => x.product_id === row.product_id
    );
    if (tempIndex > -1) {
      tempselected.splice(tempIndex, 1);
      setSelectedItemsList(tempselected);
    }
  };

  const handlePickCustomer = (data) => {
    setSelectedCustomerList(data);
    setPickCustomer(false);
  };

  const handlePickItems = (data) => {
    setSelectedItemsList(data);
    setPickItems(false);
  };

  const handleProductChange = (event, id) => {
    console.log(id);
    var tempNewList = [...selectedItemsList];
    var tempIndx = tempNewList.findIndex((x) => x.product_id === id);
    if (tempIndx > -1) {
      var element = tempNewList[tempIndx];
      element[event.target.name] = event.target.value;
      tempNewList[tempIndx] = element;
    } else {
      var element = {
        product_id: id,
      };
      element[event.target.name] = event.target.value;
      tempNewList.push(element);
    }
    setSelectedItemsList(tempNewList);
  };
  const calculateDisPer = (event, item) => {
    var tempNewList = [...selectedItemsList];
    var tempIndx = tempNewList.findIndex(
      (x) => x.product_id === item.product_id
    );
    if (tempIndx > -1) {
      var element = tempNewList[tempIndx];
      element.unit_price = parseInt(event.target.value);
      element.dis_per =
        ((parseInt(item.list_price) - element.unit_price) /
          parseInt(item.list_price)) *
        100;
    } else {
      var element = {
        product_id: item.product_id,
      };
      element.unit_price = parseInt(event.target.value);
      element.dis_per =
        ((parseInt(item.list_price) - element.unit_price) /
          parseInt(item.list_price)) *
        100;
      tempNewList.push(element);
    }
    setSelectedItemsList(tempNewList);
  };

  return (
    <>
      {loading && <Loader />}
      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col-md-4">
            <Autocomplete
              id="combo-box-demo"
              options={partyNameList}
              onChange={(event, newValue) => setSelectedParty(newValue)}
              getOptionLabel={(option) => option.company_name}
              value={selectedParty}
              fullWidth
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Party Name"
                  size="small"
                  variant="outlined"
                />
              )}
            />
          </div>
          {!showPickCustomer && (
            <div className="col-md-3 ml-auto text-right">
              <Button
                color="primary"
                className="mr-2"
                disableElevation
                variant="contained"
                onClick={togglePickCustomer}
              >
                Pick Customer
              </Button>
              <Button
                color="primary"
                onClick={togglePickItems}
                disableElevation
                variant="contained"
              >
                Pick Item
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="container-fluid">
        {showPickCustomer && (
          <TablePicker
            selectedItems={selectedCustomerList}
            columns={customerListColumn}
            url={"master/pick_customer"}
            isNode={"node"}
            apiBody={{customer_type:type}}

            onSubmit={handlePickCustomer}
            onPickerClose={togglePickCustomer}
          />
        )}

        {showPickItems && (
          <TablePicker
            selectedItems={selectedItemsList}
            columns={supplyItemsColumn}
            url={"master/pick_item"}
            isNode={"node"}
            onSubmit={handlePickItems}
            onPickerClose={togglePickItems}
          />
        )}
      </div>
      <div className="container-fluid mt-5 pt-5">
        <h4>Selected Customer List</h4>
        <Divider />
        <SimpleTable
          columns={selectedCustomerColumns}
          rows={selectedCustomerList}
          onDelete={handleAddedCustomer}
        />
      </div>
      <div className="container-fluid mt-5 pt-5">
        <h4>Selected Items List</h4>
        <Divider />
        <TableContainer className="mt-4" component={Paper}>
          <Table size="small" sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell>MLFB</StyledTableCell>
                <StyledTableCell>Item Name</StyledTableCell>
                <StyledTableCell>Material Code</StyledTableCell>
                <StyledTableCell>Lp Ref.</StyledTableCell>
                <StyledTableCell>List Price</StyledTableCell>
                <StyledTableCell>Dis. %</StyledTableCell>
                <StyledTableCell>Unit Price</StyledTableCell>
                <StyledTableCell>Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {rows.lenght > 0 ? (
                rows.map((row) => (
                  <TableRow
                    key={rows[columns[0].id]}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    {columns.map((col, index) => {
                      if (columns[index + 1]) {
                        return (
                          <TableCell key={"row_id" + index} scope="row">
                            {row[columns[index + 1].id]}
                          </TableCell>
                        );
                      }
                    })}

                    <TableCell scope="row">
                      <ActionButtons
                        onPreview={onPreview}
                        onEdit={onEdit}
                        onDelete={onDelete}
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableCell className="text-center" colSpan={12}>
                  No Records Found
                </TableCell>
              )} */}

              {selectedItemsList.length > 0 ? (
                selectedItemsList.map((item, index) => {
                  return (
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      key={index}
                    >
                      <TableCell scope="row">{item.mlfb_no}</TableCell>
                      <TableCell scope="row" style={{ width: 150 }}>
                        {item.item_name}
                      </TableCell>
                      <TableCell scope="row">
                        <input
                          className="form-control"
                          name="material_code"
                          value={item.material_code}
                          onChange={(event) =>
                            handleProductChange(event, item.product_id)
                          }
                        />
                      </TableCell>
                      <TableCell scope="row">
                        <input
                          className="form-control"
                          name="lp_ref"
                          value={item.lp_ref}
                          disabled={true}
                        />
                      </TableCell>
                      <TableCell scope="row">
                        <input
                          className="form-control"
                          name="list_price"
                          value={item.list_price}
                          disabled={true}
                        />
                      </TableCell>
                      <TableCell scope="row">
                        <input
                          className="form-control"
                          name="dis_per"
                          value={
                            isNaN(item.dis_per)
                              ? ""
                              : parseFloat(item.dis_per).toFixed(2)
                          }
                          disabled={true}
                        />
                      </TableCell>
                      <TableCell scope="row">
                        <input
                          className="form-control"
                          name="unit_price"
                          value={isNaN(item.unit_price) ? "" : item.unit_price}
                          onChange={(event) => calculateDisPer(event, item)}
                        />
                      </TableCell>
                      <TableCell scope="row">
                        <ActionButtons
                          onDelete={() => handleAddedItems(item)}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={12} className="text-center">
                    No Records
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="w-100 mt-3 text-right">
          <Button
            color="primary"
            className="mr-2"
            onClick={insertMaterialCode}
            disableElevation
            variant="contained"
          >
            Save
          </Button>
          <Button
            color="primary"
            onClick={() => onCancel()}
            disableElevation
            variant="contained"
          >
            Cancel
          </Button>
        </div>
      </div>
    </>
  );
};

export default AddMaterialCode;
