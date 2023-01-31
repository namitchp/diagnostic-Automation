import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import moment from "moment";
import React from "react";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#1280cf",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

export const SimpleTable = ({ columns, rows, onDelete, onPreview, onEdit }) => {
  return (
    <TableContainer className="mt-4" component={Paper}>
      <Table size="small" sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell style={{ whiteSpace: "nowrap" }}>
              {"Sr No."}
            </StyledTableCell>
            {columns.map((col, index) => {
              return (
                <StyledTableCell style={{ whiteSpace: "nowrap" }} key={col.id}>
                  {col.label}
                </StyledTableCell>
              );
            })}
            {(onDelete || onPreview || onEdit) && (
              <StyledTableCell>Actions</StyledTableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.length > 0 ? (
            rows.map((row, index) => (
              <TableRow
                key={rows[columns[0].id]}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell style={{ whiteSpace: "nowrap" }} scope="row">
                  {index + 1}
                </TableCell>
                {columns.map((col, index) => {
                  return (
                    <TableCell
                      style={{ whiteSpace: "nowrap" }}
                      key={"row_id" + index}
                      scope="row"
                    >
                      {col.dateFormat
                        ? moment(row[col.id]).format("DD/MM/YYYY")
                        : row[col.id]}
                    </TableCell>
                  );
                })}
                {(onDelete || onPreview || onEdit) && (
                  <TableCell scope="row">
                    <div className="action_btns">
                      {onPreview && (
                        <i
                          class="fas fa-search mr-2"
                          onClick={() => onPreview(row)}
                        ></i>
                      )}
                      {onEdit && (
                        <i
                          class="far fa-edit mr-2"
                          onClick={() => onEdit(row)}
                        ></i>
                      )}
                      {onDelete && (
                        <i
                          class="far fa-trash-alt mr-2"
                          onClick={() => onDelete(row)}
                        ></i>
                      )}
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))
          ) : (
            <TableCell className="text-center" colSpan={12}>
              No Records Found
            </TableCell>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
