import { Pagination } from "@mui/material";
import {
  useGridApiContext,
  useGridSelector,
  gridPageCountSelector,
  gridPageSelector,
} from "@mui/x-data-grid";
import React from "react";

export default function CustomPagination() {
  const apiRef = useGridApiContext();

  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <React.Fragment>
      {/* <div className="input_frame mr-3">
        <label className="mr-2">Row Per Page:</label>
        <select
          onChange={(event) => apiRef.current.setPageSize(event.target.value)}
        >
          {state.options.rowsPerPageOptions.map((row, index) => {
            return (
              <option key={"page" + index} value={row}>
                {row}
              </option>
            );
          })}
        </select>
      </div> */}
      <div className="input_frame">
        <label className="mr-2">Go to Page:</label>
        <input
          type="number"
          defaultValue={page}
          onChange={(event) => {
            if (parseInt(event.target.value) > 0) {
              apiRef?.current.setPage(parseInt(event.target.value));
            }
          }}
          style={{ width: 50 }}
        />
      </div>

      <Pagination
        color="primary"
        className="justify-content-end"
        count={pageCount}
        page={page}
        onChange={(event, value) => {
          apiRef?.current.setPage(value);
        }}
      />
    </React.Fragment>
  );
}
