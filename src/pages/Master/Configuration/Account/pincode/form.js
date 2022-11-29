import React, { useEffect, useState } from 'react';
import { TextField,Button } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useDispatch, useSelector } from 'react-redux';
import {  clearPincodeInfoResponse,  clearSelectedPincode, updatePincodeInfo } from '../../../../../_redux/actions/masters/configuration.action';


const AddOrEditPincode = (props) => {
    const dispatch = useDispatch();
    const getPincodeInfo = useSelector((state) => state.ConfigurationMaster.pincodeInfo);
    const updatePincodeInfoResponse = useSelector((state) => state.ConfigurationMaster.pincodeResponse);
    const [formValues , setFormValues] = useState({});
    const [showMessage , setMessage] = useState({
        type:"",
        msg:""
    })

    useEffect(() => {
         
        if(getPincodeInfo){
            setFormValues(getPincodeInfo);
        }
    },[getPincodeInfo]);

     const onSave = () => {
        var temp = {...formValues};
        temp.user_id = localStorage.getItem("userId");
        temp.user_name = localStorage.getItem("userName");
        dispatch(updatePincodeInfo(temp));
    }


    const handleOnChange = (event) => {
        setFormValues({...formValues,
            [event.target.name]:event.target.value
        });
    }

    const onCancelClick = () => {
        dispatch(clearSelectedPincode());
        props.onClose(0);
    }

   
    useEffect(() => {
        console.log(updatePincodeInfoResponse)
        if(updatePincodeInfoResponse){
             setMessage({...showMessage,
                type:updatePincodeInfoResponse.valid ? "success" : "error",
                msg:updatePincodeInfoResponse.valid ? getPincodeInfo ? "Pincode updated successfully" : "Pincode Saved successfully" : "Something went wrong"
            });
            setTimeout(() => {
                setMessage({
                    type:"",
                    msg:""
                });
                props.onClose(0);
            }, 2000);
            dispatch(clearPincodeInfoResponse());
        }
    },[updatePincodeInfoResponse]);
// 

    return <React.Fragment>
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-4 mb-3">
                    <TextField label="Pincode" type="number" name="pin_code_no" value={formValues.pin_code_no} onChange={handleOnChange} fullWidth variant="outlined" size="small"/>
                </div>
                <div className="col-md-4">
                    <TextField label="City" name="city" value={formValues.city} onChange={handleOnChange} fullWidth variant="outlined" size="small"/>
                </div>
                <div className="col-md-4">
                    <TextField label="State" name="state" value={formValues.state} onChange={handleOnChange} fullWidth variant="outlined" size="small"/>
                </div>
                <div className="col-md-4">
                    <TextField label="District" name="district" value={formValues.district} onChange={handleOnChange} fullWidth variant="outlined" size="small"/>
                </div>
                <div className="col-md-4">
                    <TextField multiline label="Description" name="description" value={formValues.description} onChange={handleOnChange} fullWidth variant="outlined" size="small"/>
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

export default AddOrEditPincode;