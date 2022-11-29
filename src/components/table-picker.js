import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";

import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";

import { makeStyles, Button, withStyles, Radio } from "@material-ui/core";
import { useEffect } from "react";
import { CommonController } from "../_redux/controller/common.controller";
import { useState } from "react";
import moment from "moment";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#1280cf",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

function EnhancedTableHead(props) {
  const {
    column,
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected = 0,
    rowCount,
    onRequestSort,
  } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox" style={{ width: 100 }}></TableCell>

        {column.map((headCell, j) => {
          if (j < column.length && column[j + 1]) {
            return (
              <TableCell
                key={column[j + 1].id}
                align={column[j + 1].numeric ? "right" : "left"}
                //    padding={column[j + 1].disablePadding ? "none" : "normal"}
                sortDirection={orderBy === column[j + 1].id ? order : false}
              >
                <TableSortLabel
                  active={orderBy === column[j + 1].id}
                  direction={orderBy === column[j + 1].id ? order : "asc"}
                  onClick={createSortHandler(column[j + 1].id)}
                >
                  {column[j + 1].label}
                  {orderBy === column[j + 1].id ? (
                    <span className={classes.visuallyHidden}>
                      {order === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </span>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            );
          }
        })}
      </TableRow>
    </TableHead>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: 30,
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

export const TablePicker = ({
  columns,
  url,
  onSubmit,
  onPickerClose,
  selectedItems,
  type,
  isNode = "",
  apiType = "",
  apiBody = null,
}) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = React.useState(
    selectedItems && Array.isArray(selectedItems)
      ? selectedItems.length > 0
        ? []
        : selectedItems
      : selectedItems
  );
  const [records, setRecords] = useState([]);
  const [rowCount, setRowCount] = useState(0);

  const [params, setParams] = useState({
    pageNo: 1,
    pageSize: 10,
    filter_value: "",
    sort_column: "",
    sort_order: "",
  });

  useEffect(() => {
    setSelected(selectedItems);
  }, [selectedItems]);

  useEffect(async () => {
    setLoading(true);

    if (apiBody) {
      await CommonController.commonApiCall(url, params, apiBody, isNode).then(
        (data) => {
          setRecords(data.data);
          setRowCount(data.recordsFiltered);
        }
      );
    } else {
      await CommonController.tablePickerController(url, params, isNode).then(
        (data) => {
          setRecords(data.data);
          setRowCount(data.recordsFiltered);
        }
      );
    }
    setLoading(false);
  }, []);

  useEffect(async () => {
    setLoading(true);
    if (apiBody) {
      await CommonController.commonApiCall(url, params, apiBody, isNode).then(
        (data) => {
          setRecords(data.data);
          setRowCount(data.recordsFiltered);
        }
      );
    } else {
      await CommonController.tablePickerController(url, params, isNode).then(
        (data) => {
          setRecords(data.data);
          setRowCount(data.recordsFiltered);
        }
      );
    }
    setLoading(false);
  }, [params]);

  const handleRequestSort = (event, property) => {
    const isAsc =
      params.sort_order !== "" && params.sort_order === "asc" ? "desc" : "asc";
    setParams({ ...params, sort_order: isAsc, sort_column: property });
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = records.map((n) => n);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, row) => {
    if (Array.isArray(selected)) {
      var tempselected = [...selected];
      const selectedIndex = tempselected.findIndex(
        (x) => x[columns[0].id] === row[columns[0].id]
      );
      
      if (selectedIndex === -1) {
        tempselected.push(row);
      } else {
        tempselected.splice(selectedIndex, 1);
      }

      setSelected(tempselected);
    }
  };

  const handleRadioClick = (event, row) => {
    if (!Array.isArray(selected)) {
      setSelected(row);
    }
  };

  const handleChangePage = (event, newPage) => {
    setParams({ ...params, pageNo: newPage });
  };

  const handleChangeRowsPerPage = (event) => {
    setParams({ ...params, pageSize: parseInt(event.target.value, 10) });
  };

  const isSelected = (id) => {
    if (Array.isArray(selected)) {
      return selected.findIndex((x) => x[columns[0].id] === id) !== -1;
    } else {
      return selected && selected[columns[0].id] === id;
    }
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={"small"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              column={columns}
              numSelected={
                selected ? (Array.isArray(selected) ? selected.length : 1) : 0
              }
              order={params.sort_order}
              orderBy={params.sort_column}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={params.pageSize}
            />
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={12} className="text-center">
                    Please wait
                  </TableCell>
                </TableRow>
              ) : records.length > 0 ? (
                records.map((row, index) => {
                  if (index <= records.length) {
                    const isItemSelected = isSelected(row[columns[0].id]);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow key={row[columns[0].id]}>
                        <TableCell padding="checkbox">
                          {type && type == "single" ? (
                            <Radio
                              color="primary"
                              checked={isItemSelected}
                              inputProps={{ "aria-labelledby": labelId }}
                              onChange={(event) => handleRadioClick(event, row)}
                            />
                          ) : (
                            <Checkbox
                              color="primary"
                              checked={isItemSelected}
                              inputProps={{ "aria-labelledby": labelId }}
                              onChange={(event) => handleClick(event, row)}
                            />
                          )}
                        </TableCell>
                        {columns.map((col, colIndex) => {
                          if (columns[colIndex + 1]) {
                            return (
                              <TableCell
                                style={{ whiteSpace: "nowrap" }}
                                key={colIndex + 2}
                                align="left"
                              >
                                {columns[colIndex + 1].dateFormat
                                  ? moment(
                                      row[columns[colIndex + 1].id]
                                    ).format("DD/MM/YYYY")
                                  : row[columns[colIndex + 1].id]}
                              </TableCell>
                            );
                          }
                        })}
                      </TableRow>
                    );
                  }
                })
              ) : (
                <TableRow>
                  <TableCell>No Data</TableCell>
                </TableRow>
              )}
              {/* {records.length > 0 && (
                <TableRow
                  style={{ height: (false ? 33 : 53) * records.length }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )} */}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 15, 25]}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          component="div"
          count={rowCount}
          rowsPerPage={params.pageSize}
          page={params.pageNo}
          // onPageChange={}
          // onRowsPerPageChange={}
        />
      </Paper>
      <div className="container-fluid text-right">
        <Button
          color="primary"
          className="mr-2"
          disableElevation
          variant="contained"
          onClick={() => onSubmit(selected)}
        >
          Submit
        </Button>
        <Button
          onClick={onPickerClose}
          color="primary"
          disableElevation
          variant="contained"
        >
          Close
        </Button>
      </div>
    </div>
  );
};
