import { DataGrid } from '@material-ui/data-grid';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearPincodeInfoResponse, deleteSelectedPincode, getPincodeBrowseList, selectedPincodeInfo } from '../../../../../_redux/actions/masters/configuration.action';
import CustomPagination from '../../../../../components/CustomPagination';
import CustomNoRowsOverlay from '../../../../../components/customRowComponent';
import { Alert } from '@material-ui/lab';
import { TextField } from '@material-ui/core';

const BrowsePincode = (props) => {
    const dispatch = useDispatch();
    const [isLoading , setIsLoading] = useState(false);

    const configurationLoading = useSelector((state) => state.ConfigurationMaster.isLoading);
    const getPincodeListResponse = useSelector((state) => state.ConfigurationMaster.pincodeList);
    const deletePincodeResponse = useSelector((state) => state.ConfigurationMaster.pincodeResponse);

    const [pincodeList , setPincodeList] = useState(null);
    const [showMessage , setMessage] = useState({
        type:"",
        msg:""
    })

    const [params , setParams] = useState({
        pageNo:1,
        pageSize:10,
        filter_value:'',
        sort_column:'',
        sort_order:''
    });

    const handlePageSizeChange = (param) => {
        setParams({...params,
            pageSize:parseInt(param.pageSize)
        });
    }
    const handlePageChange = (param) => {
        setParams({...params,
            pageNo:param.page
        });
    }

    useEffect(() => {
        dispatch(getPincodeBrowseList(params));
    },[]);

    useEffect(() => {
        dispatch(getPincodeBrowseList(params));
    },[params]);

    useEffect(() => {
        setIsLoading(configurationLoading);
    },[configurationLoading])

    useEffect(() => {
        if(getPincodeListResponse){
            setPincodeList(getPincodeListResponse)
        }
    },[getPincodeListResponse]);

    

    useEffect(() => {
        if(deletePincodeResponse){
            setMessage({...showMessage,
                type:deletePincodeResponse.valid ? "success" : "error",
                msg:deletePincodeResponse.valid ? "Pincode deleted successfully" : "Something went wrong"
            });
            setTimeout(() => {
                setMessage({
                    type:"",
                    msg:""
                });
            }, 2000);
            dispatch(clearPincodeInfoResponse());
            dispatch(getPincodeBrowseList(params));
        }
    },[deletePincodeResponse]);

    const onPreviewOrEdit = (row) => {
        dispatch(selectedPincodeInfo(row));
        props.onActionClick(1);
    }

    const deletePincode = (row) => {
        var param = {
            pin_code_id:row.pin_code_id
        }
        dispatch(deleteSelectedPincode(param))
    }

    const handleParams = (event) => {
        setTimeout(() => {
            setParams({...params,
                [event.target.name]:event.target.value
            });
        }, 800);
    }


    return <React.Fragment>
         <div className="filter_box mb-5">
                <div className="row">
                    <div className="col-md-1 d-flex align-items-center"><h4 className="mb-0">Filters</h4></div>
                    <div className="col-md-2">
                        <TextField fullWidth id="outlined-basic" size="small" onKeyUp={handleParams} name="filter_value" label="Search" variant="outlined" />
                    </div>
                     
                </div>
            </div>
    <div style={{ height: 350, width: '100%' }}>
            <DataGrid
               pagination
               disableColumnFilter
               pageSize={params.pageSize}   
               page={1}
               rowsPerPageOptions={[10,20,50,100]}
               rowCount={pincodeList ? pincodeList.recordsFiltered : 0}
               paginationMode="server"
               onPageSizeChange={handlePageSizeChange}
               onPageChange={handlePageChange}
               loading={isLoading}                   
               rowHeight={30}
               components={{
                   Pagination:CustomPagination,
                   NoRowsOverlay: CustomNoRowsOverlay,
               }}
                columns={[
                    {
                        field: 'id',
                        headerName:"Sr No.",
                        width:120
                    },
                    {
                        field: 'pin_code_id',
                        headerName:"Pincode ID",
                        width:120
                    },
                    {
                        field: 'pin_code_no',
                        headerName:"Pincode",
                        width:200
                    },
                    {
                        field: 'city',
                        headerName:"City",
                        width:200
                    },
                    {
                        field: 'state',
                        headerName:"State",
                        width:200
                    },
                    {
                        field: 'district',
                        headerName:"District",
                        width:200
                    },
                    {
                        field: '',
                        headerName:"Actions",
                        renderCell:(params) => (
                            <div className="action_btns">
                                <i class="fas fa-search mr-2" onClick={() => onPreviewOrEdit(params.row)}></i>
                                <i class="far fa-edit mr-2" onClick={() => onPreviewOrEdit(params.row)}></i>
                                <i class="far fa-trash-alt mr-2" onClick={() => deletePincode(params.row)}></i>
                            </div>
                        ),
                        width:150
                    } 
                    
                ]}
                rows={pincodeList ? pincodeList.data : []}
            />
            {showMessage.type != "" ? <Alert severity={showMessage.type}>{showMessage.msg}</Alert> : null}
        </div>
</React.Fragment>
}

export default BrowsePincode;