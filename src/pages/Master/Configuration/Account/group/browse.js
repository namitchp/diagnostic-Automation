import React, { useEffect, useState } from 'react';
import CustomPagination from '../../../../../components/CustomPagination';
import CustomNoRowsOverlay from '../../../../../components/customRowComponent';
import { DataGrid } from '@material-ui/data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { getAccountGroupBrowse, selectedConfigGroup } from '../../../../../_redux/actions/masters/configuration.action';

const ConfigGroupBrowse = (props) => {
    const dispatch = useDispatch();
    const [isLoading , setIsLoading] = useState(false);
    const configurationLoading = useSelector((state) => state.ConfigurationMaster.isLoading);
    const getGroupListResponse = useSelector((state) => state.ConfigurationMaster.groupList);

    const [groupList , setGroupList] = useState([]);

    const [params , setParams] = useState({
        pageNo:1,
        pageSize:10,
        filter_value:'',
        sort_column:'',
        sort_order:''
    });

    const handlePageSizeChange = (param) => {
        setParams({...params,
            pageSize:param.pageSize
        });
    }
    const handlePageChange = (param) => {
        setParams({...params,
            pageNo:param.page + 1
        });
    }

    useEffect(() => {
        dispatch(getAccountGroupBrowse(params));
    },[]);

    useEffect(() => {
        dispatch(getAccountGroupBrowse(params));
    },[params]);

    useEffect(() => {
        setIsLoading(configurationLoading);
        if(getGroupListResponse){
            setGroupList(getGroupListResponse.data  || [])
         }
    },[getGroupListResponse , configurationLoading]);

    const onPreviewOrEdit = (row) => {
        dispatch(selectedConfigGroup(row));
        props.onActionClick(1);
    }

    return <React.Fragment>
        <div style={{ height: 350, width: '100%' }}>
                <DataGrid
                   pagination
                   disableColumnFilter
                   pageSize={params.pageSize}
                  
                   rowsPerPageOptions={[10,20,50,100]}
                   rowCount={getGroupListResponse?.recordsFiltered}
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
                            field: 'group_id',
                            headerName:"Group ID",
                            width:120
                        },
                        {
                            field: 'group_name',
                            headerName:"Group Name",
                            width:200
                        },
                        {
                            field: 'description',
                            headerName:"Description",
                            width:200
                        },
                        {
                            field: '',
                            headerName:"Actions",
                            renderCell:(params) => (
                                <div className="action_btns">
                                    {/* <i className="fas fa-search mr-2" onClick={() => onPreviewOrEdit(params.row)}></i> */}
                                    <i className="far fa-edit mr-2" onClick={() => onPreviewOrEdit(params.row)}></i>
                                    <i className="far fa-trash-alt mr-2"></i>
                                </div>
                            ),
                            width:150
                        } 
                        
                    ]}
                    rows={getGroupListResponse ? getGroupListResponse.data : []}
                />
            </div>
    </React.Fragment>
}

export default ConfigGroupBrowse;
