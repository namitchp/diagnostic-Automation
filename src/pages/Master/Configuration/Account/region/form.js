import React, { useEffect, useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { CommonController } from '../../../../../_redux/controller/common.controller';
import { showErrorToast, showSuccessToast } from '../../../../../components/common';
const AddOrEditGroup = (props) => {
    const [groupValues, setGroupValues] = useState({
        region_id: "",
        region_name: "",
        description: ""
    });
    const [showMessage, setMessage] = useState({
        type: "",
        msg: ""
    })
    const insertForm = async () => {
        try {
            let body = {
                user_name: localStorage.getItem("userName"),
                user_id: localStorage.getItem("userId"),
                description: groupValues.description,
                region_name: groupValues.region_name,
                region_id: groupValues.region_id
            }
            await CommonController.commonApiCallFilter(
                "master/insert_region",
                body,
                "post",
                "node"
            ).then(result => {
                if (result.status == 200) {
                    showSuccessToast(result.message)
                    setGroupValues({
                        region_id: "",
                        region_name: "",
                        description: ""
                    })
                }
            })
        } catch (err) {
            showErrorToast(err)
        }
    }
    useEffect(() => {
        setGroupValues(props.editData)
    }, [props.editData]);
    const onSave = () => {
        insertForm()
    }
    const handleOnChange = (event) => {
        setGroupValues({
            ...groupValues,
            [event.target.name]: event.target.value
        });
    }
    const onCancelClick = () => {
        props.onClose(0);
    }
    return <React.Fragment>
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-4">
                    <TextField label="Region ID" name="region_id" value={groupValues.region_id} onChange={handleOnChange} fullWidth variant="outlined" size="small" />
                </div>
                <div className="col-md-4">
                    <TextField label="Region Name" name="region_name" value={groupValues.region_name} onChange={handleOnChange} fullWidth variant="outlined" size="small" />
                </div>
                <div className="col-md-4">
                    <TextField multiline label="Description" value={groupValues.description} onChange={handleOnChange} name="description" fullWidth variant="outlined" size="small" />
                </div>
                <div className="col-md-12 mt-3 text-right">
                    <Button variant="contained" className="mr-2" onClick={onCancelClick} disableElevation>Cancel</Button>
                    {groupValues.type === "preview" ? "" : <Button variant="contained" onClick={onSave} color="primary" disableElevation>Save</Button>}
                </div>
                {showMessage.type != "" ? <Alert severity={showMessage.type}>{showMessage.msg}</Alert> : null}
            </div>
        </div>
    </React.Fragment>
}
export default AddOrEditGroup;