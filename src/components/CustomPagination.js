import { Pagination } from "@mui/material";
import {
  useGridApiContext,
  useGridSelector,
  gridPageCountSelector,
  gridPageSelector,
  gridPageSizeSelector,
} from "@mui/x-data-grid";
import React from "react";


export default function CustomPagination() {  
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);
  const rowSize = useGridSelector(apiRef, gridPageSizeSelector);
  return (
    <div className="pagination_wrap">
      <div className="input_frame mr-3">
        <label className="mr-2">Row Per Page:</label>
        <select
          value={rowSize + 1}
          onChange={(event) =>
            apiRef.current.setPageSize(event.target.value - 1)
          }
        >
          {/* {state.options.rowsPerPageOptions.map((row, index) => { */}
          {/* return ( */}
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
          {/* ); */}
          {/* })} */}
        </select>
      </div>
      <div className="input_frame">
        <label className="mr-2">Go to Page:</label>
        <input
          type="number"
          defaultValue={page + 1}
          onChange={(event) => {
            if (parseInt(event.target.value) > 0) {
              apiRef?.current?.setPage(parseInt(event.target.value - 1));
            }
          }}
          style={{ width: 50 }}
        />
      </div>
      <Pagination
        color="primary"
        // className="justify-content-end"
        count={pageCount}
        page={page + 1}
        onChange={(event, value) => {
          console.log(value);
          apiRef?.current?.setPage(value - 1);
        }}     
        nextIconButtonProps={{ children: 'Next' }}
        prevIconButtonProps={{ children: 'Prev' }}
      />
    </div>
  );
}
