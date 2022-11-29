import {
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { withStyles } from "@material-ui/styles";
import React, { useEffect, useState } from "react";
import { showErrorToast, showSuccessToast } from "../../../components/common";
import { CommonController } from "../../../_redux/controller/common.controller";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const UserRightList = () => {
  const [menuList, setMenuList] = useState([]);
  const [transactionList, setTransactionList] = useState([]);

  const [selectedMenu, setSelectedMenu] = useState(null);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const [userRightList, setUserRightList] = useState([]);
  const [selectedUserRight, setSelectedUserRight] = useState([]);
  const [filteredArray, setFilteredArray] = useState([]);

  const getMenuList = () => {
    CommonController.commonApiCallFilter("UserRight/UserTransactionMenuList")
      .then((data) => setMenuList(data.objList.menuList))
      .catch((err) => {
        showErrorToast(err);
      });
  };

  const getTransactionList = (id) => {
    CommonController.commonApiCallFilter("UserRight/UserTransactionList", {
      menu_id: id,
    })
      .then((data) => setTransactionList(data.objList.transctionList))
      .catch((err) => {
        showErrorToast(err);
      });
  };

  const getUserRightList = (id) => {
    CommonController.commonApiCallFilter(
      "UserRight/UserRightTransactionBrowse",
      {
        transaction_id: id,
      }
    )
      .then((data) => {
        setUserRightList(data);
        setFilteredArray(data);
      })
      .catch((err) => {
        showErrorToast(err);
      });
  };

  const onSearch = (e) => {
    if (e.code === "Enter") {
      const items = userRightList.filter((x) => x.employee == e.target.value);

      if (items.length > 0) {
        setFilteredArray(items);
      }
    }
  };

  useEffect(() => {
    getMenuList();
  }, []);

  const handleMenuChange = (event, value) => {
    setSelectedMenu(value);
    if (value) {
      getTransactionList(value.id);
    }
  };

  const handleTransactionChange = (event, value) => {
    setSelectedTransaction(value);
    if (value) {
      getUserRightList(value.id);
    }
  };

  const onUserRightChange = (obj, key, checked) => {
    let selected = [...selectedUserRight];
    let item = obj;
    item[key] = checked ? "True" : "False";
    let filteredIndex = selectedUserRight.findIndex(
      (x) => x.user_id === obj.user_id
    );
    if (filteredIndex > -1) {
      selected[filteredIndex][key] = checked ? "True" : "False";
      setSelectedUserRight(selected);
    } else {
      setSelectedUserRight([...selectedUserRight, item]);
    }
  };

  const onSave = () => {
    CommonController.commonApiCallFilter("UserRight/UserRightsInsert", {
      userRightDetails: selectedUserRight,
    })
      .then((data) => {
        if (data.valid) {
          showSuccessToast("User updated successfully");
        } else {
          showErrorToast("something went wrong");
        }
      })
      .catch((err) => {
        showErrorToast(err);
      });
  };

  return (
    <div className="card card-custom gutter-b  px-7 py-3">
      <div className="container-fluid p-4">
        <div className="row">
          <div className="col-md-3">
            <Autocomplete
              disablePortal
              id="combo-box-demo1"
              options={menuList}
              getOptionLabel={(option) => option.value}
              fullWidth
              onChange={handleMenuChange}
              value={selectedMenu}
              size="small"
              renderInput={(params) => (
                <TextField {...params} variant="outlined" label="Menu Item" />
              )}
            />
          </div>
          <div className="col-md-3">
            <Autocomplete
              disablePortal
              id="combo-box-demo1"
              options={transactionList}
              getOptionLabel={(option) => option.value}
              fullWidth
              onChange={handleTransactionChange}
              value={selectedTransaction}
              size="small"
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Transaction item"
                />
              )}
            />
          </div>
          <div className="col-md-3">
            <TextField
              variant="outlined"
              fullWidth
              size="small"
              label="Search"
              onKeyDown={onSearch}
            />
          </div>
        </div>
        <Paper style={{ width: "100%", overflow: "hidden" }}>
          <TableContainer className="mt-4" style={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Transaction</StyledTableCell>
                  <StyledTableCell>View</StyledTableCell>
                  <StyledTableCell>New</StyledTableCell>
                  <StyledTableCell>Edit</StyledTableCell>
                  <StyledTableCell>Delete</StyledTableCell>
                  <StyledTableCell>Print</StyledTableCell>
                  <StyledTableCell>Approve</StyledTableCell>
                  <StyledTableCell>Revise</StyledTableCell>
                  <StyledTableCell>Allocation</StyledTableCell>
                  <StyledTableCell>High Priority</StyledTableCell>
                  <StyledTableCell>Special Column</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredArray.map((menu, index) => {
                  return (
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      key={index}
                    >
                      <TableCell>{menu.employee}</TableCell>
                      <TableCell>
                        <Checkbox
                          onChange={(event) =>
                            onUserRightChange(
                              menu,
                              "view_right",
                              event.target.checked
                            )
                          }
                          color="primary"
                          checked={menu.view_right == "True"}
                        />
                      </TableCell>
                      <TableCell>
                        <Checkbox
                          onChange={(event) =>
                            onUserRightChange(
                              menu,
                              "insert_right",
                              event.target.checked
                            )
                          }
                          color="primary"
                          checked={menu.insert_right == "True"}
                        />
                      </TableCell>
                      <TableCell>
                        <Checkbox
                          onChange={(event) =>
                            onUserRightChange(
                              menu,
                              "edit_button",
                              event.target.checked
                            )
                          }
                          color="primary"
                          checked={menu.edit_button == "True"}
                        />
                      </TableCell>
                      <TableCell>
                        <Checkbox
                          onChange={(event) =>
                            onUserRightChange(
                              menu,
                              "delete_right",
                              event.target.checked
                            )
                          }
                          color="primary"
                          checked={menu.delete_right == "True"}
                        />
                      </TableCell>
                      <TableCell>
                        <Checkbox
                          onChange={(event) =>
                            onUserRightChange(
                              menu,
                              "print_right",
                              event.target.checked
                            )
                          }
                          color="primary"
                          checked={menu.print_right == "True"}
                        />
                      </TableCell>
                      <TableCell>
                        <Checkbox
                          onChange={(event) =>
                            onUserRightChange(
                              menu,
                              "approve_right",
                              event.target.checked
                            )
                          }
                          color="primary"
                          checked={menu.approve_right == "True"}
                        />
                      </TableCell>
                      <TableCell>
                        <Checkbox
                          onChange={(event) =>
                            onUserRightChange(
                              menu,
                              "revise_right",
                              event.target.checked
                            )
                          }
                          color="primary"
                          checked={menu.revise_right == "True"}
                        />
                      </TableCell>
                      <TableCell>
                        <Checkbox
                          onChange={(event) =>
                            onUserRightChange(
                              menu,
                              "allocation_right",
                              event.target.checked
                            )
                          }
                          color="primary"
                          checked={menu.allocation_right == "True"}
                        />
                      </TableCell>
                      <TableCell>
                        <Checkbox
                          onChange={(event) =>
                            onUserRightChange(
                              menu,
                              "high_priority_right",
                              event.target.checked
                            )
                          }
                          color="primary"
                          checked={menu.high_priority_right == "True"}
                        />
                      </TableCell>
                      <TableCell>
                        <Checkbox
                          onChange={(event) =>
                            onUserRightChange(
                              menu,
                              "special_column",
                              event.target.checked
                            )
                          }
                          color="primary"
                          checked={menu.special_column == "True"}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <div className="w-100 mt-3 text-right">
          <Button
            variant="contained"
            color="primary"
            onClick={onSave}
            disableElevation
          >
            Update
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserRightList;
