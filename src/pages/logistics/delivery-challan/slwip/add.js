import { Button, formatMs, MenuItem, TextField, Fab } from "@material-ui/core";
import { Autocomplete } from "@mui/material";
import { DatePicker } from "@material-ui/pickers";

import moment from "moment";
import React, { useEffect, useState } from "react";
import { SimpleTable } from "../../../../components/basic-table";
import {
    debounce,
    showErrorToast,
    showSuccessToast,
} from "../../../../components/common";
import { CommonController } from "../../../../_redux/controller/common.controller";

const SlWipAdd = () => {
    const [tableList, settableList] = useState([]);
    const [formData, setFormData] = useState({
        date: "",
        dc_no: "",
        po_no: "",
        po_date: "",
        courier: "",
        vehicle_no: "",
        contact_person: "",
        cperson_id: "",
        remarks: "",
        no_of_box: "",
        value: "",
        box_no: "",
        description: "",
        qty: "",
    });
    const [contactlist, setcontactlist] = useState(null);
    const [saleslist, setsaleslist] = useState(null);
    const [showDIList, setShowDIList] = useState(false);
    const [accountList, setaccountList] = useState([]);
    const [salesOrderList, setsalesOrderList] = useState([]);
    const toggleDIList = () => setShowDIList(!showDIList);
    const submitAddBox = () => {
        if (formData.box_no === "") {
            showErrorToast("Please Enter Box No");
        } else if (formData.description === "") {
            showErrorToast("Please Enter description");
        } else if (formData.qty === "") {
            showErrorToast("Please Enter Quality");
        } else {
            settableList([
                ...tableList,
                {
                    box_no: formData.box_no,
                    description: formData.description,
                    qty: formData.qty,
                },
            ]);
            setFormData({ ...formData, box_no: "", description: "", qty: "" });
        }
    };

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };
    const handleDateChange = (name, date) => {
        setFormData({ ...formData, [name]: date });
    };

    const handleDeleteTable = (e) => {
        tableList.splice(tableList.indexOf(e), 1);
        settableList([...tableList]);
    };

    const diListColumn = [
        {
            id: "box_no",
            numeric: false,
            disablePadding: false,
            label: "Box No",
        },
        {
            id: "description",
            numeric: false,
            disablePadding: false,
            label: "Description",
        },
        {
            id: "qty",
            numeric: false,
            disablePadding: false,
            label: "Qty",
        },
    ];

    const getDCNo = async () => {
        try {
            await CommonController.commonApiCallFilter(
                "logistics/dc/generateDc",
                {},
                "get",
                "node"
            ).then((data) => {
                if (data.status === 200) {
                    setFormData({ ...formData, dc_no: data.data.dc_no });
                }
            });
        } catch (err) {
            showErrorToast(err);
        }
    };
    //Party name
    const getCompanyList = async (search) => {
        // setLoading(true);
        try {
            await CommonController.commonApiCallFilter(
                "logistic/mdc/accountlist",
                { search: search },
                "get",
                "node"
            ).then((data) => {
                console.log(data);
                if (data.status === 200) {
                    setaccountList(data.result);
                    console.log(accountList);
                }
            });
        } catch (err) {
            showErrorToast(err);
        }
    };
    const getSalesOrder = async (search) => {
        try {
            await CommonController.commonApiCallFilter(
                "logistic/mdc/picksomdc?search=" + search,
                "",
                "post",
                "node"
            )
                .then((data) => {
                    if (data.status === 200) {
                        setsalesOrderList(data.result);
                    }
                })
                .catch((err) => {
                    showErrorToast(err.message);
                });
        } catch (err) {
            showErrorToast(err);
        }
    };
    //contact list
    const getAccountContactList = async () => {
        try {
            let search = contactlist.company_id;
            await CommonController.commonApiCallFilter(
                "logistic/mdc/accountcontactlist",
                { search: search },
                "post",
                "node"
            )
                .then((data) => {
                    if (data.status === 200) {
                        setFormData({
                            ...formData,
                            cperson_id: data.result.cperson_id,
                            contact_person: data.result.cperson_name,
                        });
                    } else {
                        showErrorToast(data.message);
                    }
                })
                .catch((err) => {
                    showErrorToast(err);
                });
        } catch (err) {
            showErrorToast(err);
        }
    };
    const submitMdc = async () => {
        try {
            if (formData.po_no === "") {
                showErrorToast("Please Enter Po No");
            } else if (formData.po_date === "") {
                showErrorToast("Please Enter Po Date");
            } else if (tableList.length < 0) {
                showErrorToast("Please add box");
            } else if (formData.remarks === "") {
                showErrorToast("Please enter remarks");
            } else if (contactlist.company_name === "") {
                showErrorToast("Please Select Party Name");
            } else if (formData.courier === "") {
                showErrorToast("Please Enter Courier");
            } else if (formData.vehicle_no === "") {
                showErrorToast("Please Enter Vehicle NO");
            } else if (formData.contact_person === "") {
                showErrorToast("Please Enter Contact Person");
            } else if (formData.no_of_box === "") {
                showErrorToast("Please Enter No Of Box");
            } else if (formData.value === "") {
                showErrorToast("Please Enter Value");
            } else {
                const body = {
                    tran_id: "0",
                    date: moment().format("MM/DD/YYYY"),
                    dc_no: formData.dc_no,
                    so_id: saleslist.tran_id,
                    company_id: contactlist.company_id,
                    company_name: contactlist.company_name,
                    cperson_id: formData.cperson_id,
                    cperson_name: formData.contact_person,
                    po_no: formData.po_no,
                    po_date: formData.po_date,
                    carrier: formData.courier,
                    vehicle: formData.vehicle_no,
                    remarks: formData.remarks,
                    noofbox: formData.no_of_box,
                    value: formData.value,
                    user_name: localStorage.getItem("userName"),
                    manuDcDetail: tableList,
                    user_id: localStorage.getItem("userId"),
                };
                await CommonController.commonApiCallFilter(
                    "logistic/mdc/insertmdc",
                    body,
                    "post",
                    "node"
                )
                    .then((result) => {
                        if (result.status === 200) {
                            showSuccessToast(`${result.message} Entry No ${result.id_no}`);
                            // window.location.reload();
                            settableList([]);
                            setFormData({
                                ...formData,
                                date: "",
                                po_no: "",
                                po_date: "",
                                courier: "",
                                vehicle_no: "",
                                contact_person: "",
                                cperson_id: "",
                                remarks: "",
                                no_of_box: "",

                                value: "",
                            });
                            setsaleslist(null);
                            setcontactlist(null);
                        } else {
                            showErrorToast(result.message.code);
                        }
                    })
                    .catch((err) => {
                        showErrorToast(err);
                    });
            }
        } catch (err) {
            showErrorToast(err);
        }
    };
    useEffect(() => {
        getAccountContactList();
    }, [contactlist]);

    useEffect(() => {
        getDCNo();
    }, []);

    const {
        dc_no,
        po_no,
        courier,
        po_date,
        vehicle_no,
        contact_person,
        remarks,
        no_of_box,
        value,
        box_no,
        description,
        qty,
    } = formData;
    return (
        <div className="container-fluid">
            <div className="row mt-5">
                <div className="col-md-3 mb-3">
                    <TextField
                        label="MRN No"
                        disabled
                        fullWidth
                        variant="outlined"
                        //   value={mrn_no}
                        size="small"
                        name="mrn_no"
                    />
                </div>
                <div className="col-md-3 mb-3">
                    <TextField
                        label="MRN Date"
                        disabled
                        fullWidth
                        variant="outlined"
                        value={moment().format("MM/DD/YYYY")}
                        size="small"
                        name="date"
                    />
                </div>
                <div className="col-md-3 mb-3">
                    <TextField
                        label="PO/DC No."
                        disabled
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={dc_no}
                        name={"dc_no"}
                    />
                </div>

                {/* <div className="col-md-3 mb-3">
            <TextField
              label="PO No."
              fullWidth
              variant="outlined"
              value={po_no}
              name="po_no"
              size="small"
              onChange={handleChange}
            />
          </div> */}
                <div className="col-md-3 mb-3">
                    <DatePicker
                        label="PO/DC Date"
                        // value={po_date}
                        format="dd/MM/yyyy"
                        onChange={(date) => handleDateChange("po_date", date)}
                        animateYearScrolling
                        inputVariant="outlined"
                        size="small"
                        autoOk
                        fullWidth
                    />
                </div>
                <div className="col-md-6 mb-3">
                    <TextField
                        label="Party Name"
                        fullWidth
                        variant="outlined"
                        value={po_no}
                        name="po_no"
                        size="small"
                        onChange={handleChange}
                    />
                </div>
                <div className="col-md-6 mb-3">
                    <Autocomplete
                        id="combo-box-demo"
                        options={accountList}
                        fullWidth
                        size="small"
                        getOptionLabel={(option) => option.company_name}
                        value={contactlist}
                        onChange={(e, value) => setcontactlist(value)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                onInput={(e) => {
                                    debounce(getCompanyList(e.target.value, 200));
                                }}
                                label="Employee Name"
                                variant="outlined"
                            />
                        )}
                    />
                </div>
                <div className="col-md-6 mb-3">
                    <TextField
                        label="Contact Person"
                        fullWidth
                        variant="outlined"
                        value={contact_person}
                        name={"contact_person"}
                        size="small"
                        onChange={handleChange}
                    ></TextField>
                </div>
                <div className="col-md-3 mb-3">
                    <TextField
                        label="Department"
                        fullWidth
                        onChange={handleChange}
                        value={courier}
                        variant="outlined"
                        name="courier"
                        size="small"
                    />
                </div>
                <div className="col-md-3 mb-3">
                    <TextField
                        label="Courier Name"
                        fullWidth
                        onChange={handleChange}
                        value={courier}
                        variant="outlined"
                        name="courier"
                        size="small"
                    />
                </div>

                <div className="col-md-6 mb-3">
                    <TextField
                        label="Order for(PO)"
                        fullWidth
                        value={vehicle_no}
                        onChange={handleChange}
                        name={"vehicle_no"}
                        variant="outlined"
                        size="small"
                    />
                </div>
                <div className="col-md-3 mb-3">
                    <Autocomplete
                        id="combo-box-demo"
                        options={salesOrderList}
                        fullWidth
                        getOptionLabel={(option) => option.so_no}
                        value={saleslist}
                        onChange={(e, value) => setsaleslist(value)}
                        sx={{ height: 20 }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                onChange={(e) => {
                                    debounce(getSalesOrder(e.target.value));
                                }}
                                label="Status"
                                variant="outlined"
                            />
                        )}
                    />
                </div>
                <div className="col-md-3 mb-3">
                    <Autocomplete
                        id="combo-box-demo"
                        options={salesOrderList}
                        fullWidth
                        getOptionLabel={(option) => option.so_no}
                        value={saleslist}
                        onChange={(e, value) => setsaleslist(value)}
                        sx={{ height: 20 }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                onChange={(e) => {
                                    debounce(getSalesOrder(e.target.value));
                                }}
                                label="Godown"
                                variant="outlined"
                            />
                        )}
                    />
                </div>
                <div className="col-md-3 mb-3">
                    <TextField
                        label="Docket No"
                        value={remarks}
                        fullWidth
                        variant="outlined"
                        size="small"
                        name="remarks"
                        onChange={handleChange}
                    />
                </div>
                <div className="col-md-3 mb-3">
                    <TextField
                        label="Docket Date"
                        value={no_of_box}
                        name="no_of_box"
                        fullWidth
                        variant="outlined"
                        size="small"
                        onChange={handleChange}
                    />
                </div>

                <div className="col-md-6 mb-3">
                    <TextField
                        label="Remarks"
                        fullWidth
                        value={value}
                        name="value"
                        variant="outlined"
                        onChange={handleChange}
                        size="small"
                        multiline
                    />
                </div>
                <div className="col-md-3 mb-3">
                    <TextField
                        label="Invoice No"
                        fullWidth
                        value={value}
                        name="value"
                        variant="outlined"
                        onChange={handleChange}
                        size="small"
                        multiline
                    />
                </div>
                <div className="col-md-3 mb-3">
                    <TextField
                        label="Invoice Date"
                        fullWidth
                        value={value}
                        name="value"
                        variant="outlined"
                        onChange={handleChange}
                        size="small"
                        multiline
                    />
                </div>
            </div>

            {/* {tableList.length > 0 ? (
          <SimpleTable
            columns={diListColumn}
            rows={tableList}
            onDelete={handleDeleteTable}
          />
        ) : null} */}
            <hr />
            {/* <div className="container-fluid">
                <h1>Add Box:</h1>
                <div className="row mt-5">
                    <div className="col-md-3 mb-3">
                        <TextField
                            label="Box No"
                            fullWidth
                            onChange={handleChange}
                            value={box_no}
                            variant="outlined"
                            name="box_no"
                            size="small"
                        />
                    </div>
                    <div className="col-md-4 mb-3">
                        <TextField
                            label="Description"
                            fullWidth
                            onChange={handleChange}
                            value={description}
                            variant="outlined"
                            name="description"
                            size="small"
                        />
                    </div>
                    <div className="col-md-3 mb-3">
                        <TextField
                            label="Qty"
                            fullWidth
                            onChange={handleChange}
                            value={qty}
                            variant="outlined"
                            name="qty"
                            type="number"
                            size="small"
                        />
                    </div>
                    <div className="col-md-2 mb-3 pl-5">
                        <Button
                            color="primary"
                            // className="mr-2"
                            // disableElevation
                            variant="contained"
                            onClick={submitAddBox}
                        >
                            Add New
                        </Button>
                    </div>
                </div>
            </div> */}

            {/* <div className="float-action-btn">
            <Fab
              variant="extended"
              onClick={addBox}
              size="medium"
              color="primary"
              aria-label="add"
            >
              <AddIcon />
              Add Box
            </Fab>
          </div> */}

            <hr />
            <div className="w-100 mt-3 text-right">
                <Button
                    color="primary"
                    className="mr-2"
                    disableElevation
                    variant="contained"
                    onClick={submitMdc}
                >
                    Save
                </Button>
                <Button color="primary" disableElevation variant="contained">
                    Cancel
                </Button>
            </div>
        </div>
    );
};

export default SlWipAdd;
