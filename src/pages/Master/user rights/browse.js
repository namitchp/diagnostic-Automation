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
  MenuItem,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { withStyles } from "@material-ui/styles";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
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
  const [menuList, setMenuList] = useState({
    first_menu: [],
    second_menu: [],
    third_menu: [],
  });
  const [selectedMenu, setSelectedMenu] = useState({
    first_menu: "",
    second_menu: "",
    third_menu: "",
  });
  const [listDepartment, setlistDepartment] = useState([]);
  const [mainMenu, setmainMenu] = useState({
    second_menu: false,
    third_menu: false,
  });
  const [department, setdepartment] = useState(null);
  const [userRightList, setUserRightList] = useState([]);
  const [selectedUserRight, setSelectedUserRight] = useState([]);
  const [filteredArray, setFilteredArray] = useState([]);
  const getMenuList = (id, menu) => {
    CommonController.commonApiCallFilter(
      "user/transaction_menu_list",
      { parent_id: id },
      "post",
      "node"
    )
      .then((data) => setMenuList({ ...menuList, [menu]: data.data }))
      .catch((err) => {
        showErrorToast(err);
      });
  };
  const getUserRightList = (id) => {
    CommonController.commonApiCallFilter(
      "user/get_transaction_right",
      { transaction_id: id },
      "post",
      "node"
    )
      .then((data) => {
        setUserRightList(data.data);
        setFilteredArray(data.data);
      })
      .catch((err) => {
        showErrorToast(err);
      });
  };
  const handelDepartment = (e, value) => {
    // setdepartment(e.target.value);
    const items = userRightList.filter(
      (x) => x.department_name === value.department_name
    );
    if (items.length > 0) {
      setFilteredArray(items);
    }
  };
  const onSearch = (e) => {
    if (e.code === "Enter") {
      const items = filteredArray.filter(
        (x) => x.employee?.split(" ")[0].toLowerCase() === e.target.value
      );
      if (items.length > 0) {
        setFilteredArray(items);
      }
    }
  };
  useEffect(() => {
    getMenuList(0, "first_menu");
    CommonController.commonApiCallFilter(
      "user/department_list",
      "",
      "post",
      "node"
    )
      .then((data) => setlistDepartment(data.data))
      .catch((err) => {
        showErrorToast(err);
      });
  }, []);
  //first level
  const handleFirstMenu = (event, value) => {
    setSelectedMenu({
      ...selectedMenu,
      [event.target.id.split("-")[0]]: value,
      third_menu: "",
      second_menu: "",
    });
    if (value.main_form === false) {
      setmainMenu({ ...mainMenu, second_menu: true, third_menu: false });
      getMenuList(value.transaction_id, "second_menu");
    } else {
      getUserRightList(value.transaction_id);
    }
  };
  //second level
  const handleSecondMenu = (event, value) => {
    setmainMenu({ ...mainMenu, third_menu: false });
    setSelectedMenu({
      ...selectedMenu,
      [event.target.id.split("-")[0]]: value,
      third_menu: "",
    });
    if (value.main_form === false) {
      setmainMenu({ ...mainMenu, third_menu: true });
      getMenuList(value.transaction_id, "third_menu");
    } else {
      getUserRightList(value.transaction_id);
    }
  };

  //third level
  const handleThirdMenu = (event, value) => {
    setSelectedMenu({
      ...selectedMenu,
      [event.target.id.split("-")[0]]: value,
    });
    if (value.transaction_id) {
      getUserRightList(value.transaction_id);
    }
  };
  const onUserRightChange = (obj, key, checked) => {
    let selected = [...selectedUserRight];
    let item = obj;
    item[key] = checked ? true : false;
    let filteredIndex = selectedUserRight.findIndex(
      (x) => x.user_id === obj.user_id
    );
    if (filteredIndex > -1) {
      selected[filteredIndex][key] = checked ? true : false;
      setSelectedUserRight(selected);
    } else {
      setSelectedUserRight([...selectedUserRight, item]);
    }
  };
  // /update
  const onSave = () => {
    const body = {
      user_id: localStorage.getItem("userId"),
      transaction_id:
        selectedMenu.third_menu === ""
          ? selectedMenu.second_menu.transaction_id
          : selectedMenu.third_menu.transaction_id,
      transaction_name:
        selectedMenu.third_menu === ""
          ? selectedMenu.second_menu.transaction_name
          : selectedMenu.third_menu.transaction_name,
      userRight: selectedUserRight,
    };
    CommonController.commonApiCallFilter(
      "user/update_user_right",
      body,
      "post",
      "node"
    )
      .then((data) => {
        if (data.status === 200) {
          showSuccessToast("User updated successfully");
          setUserRightList([]);
          setFilteredArray([]);
          setSelectedUserRight([]);
          setSelectedMenu({
            first_menu: "",
            second_menu: "",
            third_menu: "",
          });
          setmainMenu({ second_menu: false, third_menu: false });
        } else {
          showErrorToast("something went wrong");
        }
      })
      .catch((err) => {
        showErrorToast(err);
      });
  };

  return (
    <div className="main_wrapper">
      <div className="inner_main_first">
        <div className="inner_main_second">
          <div className="inner_main_third">
            <Container fluid>
              <div className="row">
                <div className="col-md-2">
                  <Autocomplete
                    disablePortal
                    id="first_menu"
                    options={menuList.first_menu}
                    getOptionLabel={(option) => option.transaction_name}
                    fullWidth
                    onChange={handleFirstMenu}
                    value={selectedMenu.first_menu}
                    size="small"
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="First Menu"
                      />
                    )}
                  />
                </div>
                {mainMenu.second_menu && (
                  <div className="col-md-2">
                    <Autocomplete
                      disablePortal
                      id="second_menu"
                      options={menuList.second_menu}
                      getOptionLabel={(option) => option.transaction_name}
                      fullWidth
                      onChange={handleSecondMenu}
                      value={selectedMenu.second_menu}
                      size="small"
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          label="Second Menu"
                        />
                      )}
                    />
                  </div>
                )}
                {mainMenu.third_menu && (
                  <div className="col-md-2">
                    <Autocomplete
                      disablePortal
                      id="third_menu"
                      options={menuList.third_menu}
                      getOptionLabel={(option) => option.transaction_name}
                      fullWidth
                      onChange={handleThirdMenu}
                      value={selectedMenu.third_menu}
                      size="small"
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          label="Third Menu"
                        />
                      )}
                    />
                  </div>
                )}
                <div className="col-md-2">
                  <Autocomplete
                    size="small"
                    options={listDepartment}
                    getOptionLabel={(option) => option.department_name}
                    onChange={handelDepartment}
                    fullWidth
                    variant="outlined"
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Department"
                        variant="outlined"
                      />
                    )}
                  />
                </div>
                <div className="col-md-2">
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
                        <StyledTableCell>Employee</StyledTableCell>
                        <StyledTableCell>Department</StyledTableCell>
                        <StyledTableCell>View</StyledTableCell>
                        <StyledTableCell>New</StyledTableCell>
                        <StyledTableCell>Edit</StyledTableCell>
                        <StyledTableCell>Delete</StyledTableCell>
                        <StyledTableCell>Print</StyledTableCell>
                        <StyledTableCell>Approve</StyledTableCell>
                        {/* <StyledTableCell>Revise</StyledTableCell>
                  <StyledTableCell>Allocation</StyledTableCell>
                  <StyledTableCell>High Priority</StyledTableCell> */}
                        <StyledTableCell>Special Column</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredArray.map((menu, index) => {
                        return (
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                            key={index}
                          >
                            <TableCell>{menu.employee}</TableCell>
                            <TableCell>{menu.department_name}</TableCell>
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
                                checked={menu.view_right === true}
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
                                checked={menu.insert_right === true}
                              />
                            </TableCell>
                            <TableCell>
                              <Checkbox
                                onChange={(event) =>
                                  onUserRightChange(
                                    menu,
                                    "update_right",
                                    event.target.checked
                                  )
                                }
                                color="primary"
                                checked={menu.update_right === true}
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
                                checked={menu.delete_right === true}
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
                                checked={menu.print_right === true}
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
                                checked={menu.approve_right === true}
                              />
                            </TableCell>
                            {/* <TableCell>
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
                      </TableCell> */}
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
                                checked={menu.special_column === true}
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
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRightList;
