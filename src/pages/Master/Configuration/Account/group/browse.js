
import { TextField, Button, MenuItem } from "@material-ui/core";
import { DataGrid } from "@mui/x-data-grid";

import React, { useEffect, useState } from "react";
import {
  CommonController,
  currenyMasking,
} from "../../../../../_redux/controller/common.controller";
import CustomPagination from "../../../../../components/CustomPagination";
import CustomNoRowsOverlay from "../../../../../components/customRowComponent"; 
import { debounce, showErrorToast, showSuccessToast } from "../../../../../components/common";
import DateFilter from "../../../../../components/dateFilter";
import moment from "moment";
import ActionButtons from "../../../../../components/action-buttons";

const ConfigGroupBrowse = ({ type,onEdit,onPreview }) => {
  const [browseListData, setBrowseListData] = useState([]);
  
  const [totalRecord, setTotalRecords] = useState(0);
  const [amountFigures, setAmountFigures] = useState({
    amount: 0,
    mdc_amount: 0,
    actual_amount: 0,
  });

  const [loading, setLoading] = useState(false);

  const [params, setParams] = useState({
    pageNo: 1,
    pageSize: 10,
    filter_value: "",
    sort_column: "",
    sort_order: "",
  });
  const handleParams = (event) => {
    debounce(     
      setParams({...params, [event.target.name]: event.target.value }),
      1000
    );
  };

  const handleBodyParam = (event) => {
    setTimeout(() => {
    //   setBodyParam({ ...bodyParam, [event.target.name]: event.target.value });
    }, 800);
  };

  const getBrowseListData = async () => {
    setLoading(true);
    try {
      await CommonController.commonApiCall(
        "master/browse_group",
        params,
       "",
        "node"
      ).then((data) => {
        if (data.status === 200) {
          setBrowseListData(data.data);
          setTotalRecords(data.totalRecords);
        
        } 
      }).catch(err=>{
        showErrorToast(err);
      })
    } catch (err) {
      showErrorToast(err);
    }
    setLoading(false);
  };
  const deleteData=async(id)=>{
    try{
    

await CommonController.commonApiCallFilter(
    "master/delete_group",
    {group_id:id},
    "post",
    "node"

).then(result=>{
    if(result.status==200){
      getBrowseListData();
        showSuccessToast("Success Delete")
  
    }}).catch(err=>{
      showErrorToast(err)
  })

    }catch(err){
        showErrorToast(err)
    }
}
  const handlePageSizeChange = (param) => {
    setParams({ ...params, pageSize: param });
  };
  const handleRowId=(e)=>{
    console.log(e)
  }
  const handlePageChange = (param) => {
    console.log(param)
    if (param !== 0) {
      setParams({ ...params, pageNo: param });
    }
  };
  const onDelete=(id)=>{
    console.log(id)
deleteData(id.group_id)
  }
  useEffect(() => {
    getBrowseListData();
  }, [params]);

  return (
    <>
     
      <div className="filter_box mb-5">
        <div className="row">
          <div className="col-md-1 d-flex align-items-center">
            <h4 className="mb-0">Filters</h4>
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
          {/* <DateFilter onDateUpdate={() => getBrowseListData()} /> */}
        </div>
      </div>

      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          columns={[
            {
              field: "group_id",
              headerName: "ID",
              flex: 10,
            },
         

            {
              field: "group_name",
              headerName: "Name",
              width: 450,
            },
            {
              field: "description",
              headerName: "Description",
              width: 450,
            },
            {
                field: '',
                headerName:"Actions",
                renderCell:(params) => (
                    <div className="action_btns">
                        <i className="fas fa-search mr-2" onClick={() => onPreview(params.row)}></i>
                        <i className="far fa-edit mr-2" onClick={() => onEdit(params.row)}></i>
                        <i className="far fa-trash-alt mr-2" onClick={()=>onDelete(params.row)}></i>
                    </div>
                ),
                width:150
            } 
          ]}
          
          pagination
      
          disableColumnFilter
          pageSize={params.pageSize}
          page={params.pageNo}
          rowsPerPageOptions={[10, 15, 25, 100]}
          rowCount={totalRecord>20||22}
          paginationMode="server"
          onPageSizeChange={handlePageSizeChange}
          onPageChange={handlePageChange}
          loading={loading}
          rowHeight={30}
          components={
            browseListData.length > 0
              ? {
                  Pagination: CustomPagination,
                  NoRowsOverlay: CustomNoRowsOverlay,
                }
              : {}
          }
          onSortModelChange={(sort) => {
            if (sort.length > 0) {
              setParams({
                ...params,
                sort_column: sort[0].field,
                sort_order: sort[0].sort,
              });
            }
          }}
          rows={browseListData}
          getRowId={(browseListData) =>  browseListData.group_id}
        />
      </div>
  
    </>
  );
};

export default ConfigGroupBrowse;
