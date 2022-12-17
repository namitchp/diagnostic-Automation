import React, { useEffect, useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { CommonController } from '../../../../../_redux/controller/common.controller';
import { showErrorToast, showSuccessToast } from '../../../../../components/common';
const AddOrEditGroup = (props) => {
    const [groupValues, setGroupValues] = useState({
        enq_priority_id: "",
        enq_priority: "",
        description: ""
    });
    const [showMessage, setMessage] = useState({
        type: "",
        msg: ""
    })
    const insertForm = async () => {
        try {
            let body = {
                // user_name: localStorage.getItem("userName"),
                user_id: localStorage.getItem("userId"),
                description: groupValues.description,
                enq_priority: groupValues.enq_priority,
                enq_priority_id: groupValues.enq_priority_id
            }
            await CommonController.commonApiCallFilter(
                "master/insert_enq_priority",
                body,
                "post",
                "node"
            ).then(result => {
                if (result.status == 200) {
                    showSuccessToast(result.message)
                    setGroupValues({
                        enq_priority_id: "",
                        enq_priority: "",
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
                    <TextField label="Priority ID" name="enq_priority_id" value={groupValues.enq_priority_id} onChange={handleOnChange} fullWidth variant="outlined" size="small" />
                </div>
                <div className="col-md-4">
                    <TextField label="Priority Name" name="enq_priority" value={groupValues.enq_priority} onChange={handleOnChange} fullWidth variant="outlined" size="small" />
                </div>
                <div className="col-md-4">
                    <TextField multiline label="Description" value={groupValues.description} onChange={handleOnChange} name="description" fullWidth variant="outlined" size="small" />
                </div>
                <div className="col-md-12 mt-3 text-right">
                    <Button variant="contained" className="mr-2" onClick={onCancelClick} disableElevation>Cancel</Button>
                    {groupValues.type == "preview" ? "" : <Button variant="contained" onClick={onSave} color="primary" disableElevation>Save</Button>}
                </div>
                {showMessage.type != "" ? <Alert severity={showMessage.type}>{showMessage.msg}</Alert> : null}
            </div>
        </div>
    </React.Fragment>
}
export default AddOrEditGroup;