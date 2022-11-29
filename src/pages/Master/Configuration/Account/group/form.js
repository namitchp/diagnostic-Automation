import React, { useEffect, useState } from 'react';
import { TextField,Button } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { clearAccountGroupInfoResponse, clearSelectedConfigGroup , updateAccountGroupInfo } from '../../../../../_redux/actions/masters/configuration.action';


const AddOrEditGroup = (props) => {
    const dispatch = useDispatch();
    const getGroupInfo = useSelector((state) => state.ConfigurationMaster.groupInfo);
    const updateGroupInfoResponse = useSelector((state) => state.ConfigurationMaster.groupResponse);
    const [groupValues , setGroupValues] = useState({});
    const [showMessage , setMessage] = useState({
        type:"",
        msg:""
    })

    useEffect(() => {
        if(getGroupInfo){
            setGroupValues(getGroupInfo);
        }
    },[getGroupInfo]);

     const onSave = () => {
        var temp = {...groupValues};
        temp.user_id = localStorage.getItem("userId");
        temp.user_name = localStorage.getItem("userName");
        dispatch(updateAccountGroupInfo(temp));
    }


    const handleOnChange = (event) => {
        setGroupValues({...groupValues,
            [event.target.name]:event.target.value
        });
    }

    const onCancelClick = () => {
        dispatch(clearSelectedConfigGroup());
        props.onClose(0);
    }

   
    useEffect(() => {
        if(updateGroupInfoResponse){
             setMessage({...showMessage,
                type:updateGroupInfoResponse.valid ? "success" : "danger",
                msg:getGroupInfo ? "Group updated successfully" : "Group Saved successfully"
            });
            setTimeout(() => {
                setMessage({
                    type:"",
                    msg:""
                });
                props.onClose(0);
            }, 2000);
            dispatch(clearAccountGroupInfoResponse());
        }
    },[updateGroupInfoResponse]);
// 

    return <React.Fragment>
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-4">
                    <TextField label="Group ID" name="group_id" value={groupValues.group_id} onChange={handleOnChange} fullWidth variant="outlined" size="small"/>
                </div>
                <div className="col-md-4">
                    <TextField label="Group Name" name="group_name" value={groupValues.group_name} onChange={handleOnChange} fullWidth variant="outlined" size="small"/>
                </div>
                <div className="col-md-4">
                    <TextField multiline label="Description" value={groupValues.description} onChange={handleOnChange} name="description" fullWidth variant="outlined" size="small"/>
                </div>
                <div className="col-md-12 mt-3 text-right">
                    <Button variant="contained" className="mr-2" onClick={onCancelClick} disableElevation>Cancel</Button>
                    <Button variant="contained" onClick={onSave} color="primary" disableElevation>Save</Button>
                </div>
                {showMessage.type != "" ? <Alert severity={showMessage.type}>{showMessage.msg}</Alert> : null}
            </div>
        </div>
    </React.Fragment>
}

export default AddOrEditGroup;