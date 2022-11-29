import {
  Button,
  formatMs,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";
import { DatePicker } from "@material-ui/pickers";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { getUserId, showErrorToast } from "../../../components/common";
import { TablePicker } from "../../../components/table-picker";
import { CommonController } from "../../../_redux/controller/common.controller";

const AddDeliveryChallan = ({ challanType }) => {
  const [pickItemList, setPickItemList] = useState([]);
  const [showDITable, setDITable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    di_no: "",
    dc_no: "",
    so_no: "",
    company_id: "",
    company_name: "",
    cperson_id: "",
    di_id: "",
    di_date: "",
    so_date: null,
    cperson_name: "",
    ref_no: "",
    ref_date: null,
    dis_doc_no: "",
    dis_doc_date: null,
    dis_through: "",
    destination: "",
    vehicle_no: "",
    type: "",
    status: "open",
    remarks: "",
    noofbox: "",
    scan_using: "",
    dcDetail: [],
  });

  const [showDIList, setShowDIList] = useState(false);
  const [selectedDI, setSelectedDI] = useState(null);

  const toggleDIList = () => setShowDIList(!showDIList);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleDateChange = (name, date) => {
    setFormData({ ...formData, [name]: date });
  };

  const diListColumn = [
    {
      id: "tran_id",
      numeric: false,
      disablePadding: false,
      label: "",
    },
    {
      id: "di_no",
      numeric: false,
      disablePadding: false,
      label: "DI No",
    },
    {
      id: "date",
      numeric: false,
      disablePadding: false,
      label: "DI Date",
    },
    {
      id: "company_name",
      numeric: false,
      disablePadding: false,
      label: "Party",
    },
    {
      id: "cperson_name",
      numeric: false,
      disablePadding: false,
      label: "Contact",
    },
    {
      id: "indent_no",
      numeric: false,
      disablePadding: false,
      label: "Indent No",
    },
    {
      id: "so_no",
      numeric: false,
      disablePadding: false,
      label: "SO No",
    },
    {
      id: "so_date",
      numeric: false,
      disablePadding: false,
      label: "SO Date",
    },
    {
      id: "remarks",
      numeric: false,
      disablePadding: false,
      label: "Remarks",
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

  useEffect(() => {
    getDCNo();
    // getPreviewDC("30490");
  }, []);

  const handleSubmit = (data) => {
    getItemDIList(data.tran_id);
    setSelectedDI(data);
    setFormData({
      ...formData,
      so_no: data.so_no,
      cperson_name: data.cperson_name,
      di_date: moment().format("MM/DD/YYYY"),
      company_name: data.company_name,
      di_no: data.di_no,
      company_id: data.company_id,
      cperson_id: data.cperson_id,
      di_id: data.tran_id,
    });
    toggleDIList();
  };

  const getItemDIList = async (id) => {
    try {
      await CommonController.commonApiCallFilter(
        "logistics/dc/pickDIItem",
        { id: id },
        "post", 
        "node"
      ).then((data) => {
        if (data.status === 200) {
          setPickItemList(data.data);
        } else {
          showErrorToast(data.message);
        }
      });
    } catch (err) {
      showErrorToast(err);
    }
  };

  const submitMain = async () => {
    setLoading(true);
    try {
      let temp = { ...formData };
      temp.dcDetail = pickItemList;
      await CommonController.commonApiCallFilter(
        "logistics/dc/insertmain",
        temp,
        "post",
        "node"
      ).then((data) => {
        if (data.status === 200) {
          getPreviewDC(data.data);
        } else {
          showErrorToast(data.message);
        }
      });
    } catch (err) {
      showErrorToast(err);
    }
    setLoading(false);
  };
  const getPreviewDC = async (id) => {
    try {
      await CommonController.commonApiCallFilter(
        "logistics/dc/previewDC",
        { id: id },
        "post",
        "node"
      ).then((data) => {
        if (data.status === 200) {
          setFormData(data.data.dc_main[0]);
          setPickItemList(data.data.dc_detail);
          setDITable(true);
        } else {
          showErrorToast(data.message);
        }
      });
    } catch (err) {
      showErrorToast(err);
    }
  };

  const updateItemById = async (obj) => {
    try {
      const request = {
        tran_id: obj.tran_id,
        box_no: obj.box_no,
        mlfb_no: obj.mlfb_no,
        material_code: obj.material_code,
        serial_no: obj.serial_no,
        user_id: getUserId(),
      };
      await CommonController.commonApiCallFilter(
        "logistics/dc/updateItemById",
        request,
        "post",
        "node"
      ).then((data) => {
        if (data.status === 200) {
          console.log(data);
        } else {
          showErrorToast(data.message);
        }
      });
    } catch (err) {
      showErrorToast(err);
    }
  };

  const {
    dc_no,
    so_no,
    cperson_name,
    so_date,
    ref_date,
    remarks,
    scan_using,
    noofbox,
    destination,
    dis_doc_date,
    dis_doc_no,
    dis_through,
    vehicle_no,
    ref_no,
    type,
    status,
  } = formData;

  const handleItemChange = (index, event) => {
    let tempList = [...pickItemList];
    tempList[index][event.target.name] = event.target.value;
    setPickItemList(tempList);
  };

  const getNextElem = (row, input) => {
    const nextElem = document.getElementById(
      `row-input-${parseInt(input) == 3 ? parseInt(row) + 1 : row}-${
        parseInt(input) > 2 ? "1" : parseInt(input) + 1
      }`
    );

    return nextElem
      ? nextElem.disabled
        ? document.getElementById(
            `row-input-${parseInt(input) == 3 ? parseInt(row) + 1 : row}-${
              parseInt(input) > 2 ? "1" : parseInt(input) + 2
            }`
          )
        : document.getElementById(
            `row-input-${parseInt(input) == 3 ? parseInt(row) + 1 : row}-${
              parseInt(input) > 2 ? "1" : parseInt(input) + 1
            }`
          )
      : null;
  };

  const switchToInput = (event) => {
    if (event.key === "Enter") {
      const currentElemRow = event.target.id.split("-")[2];
      const currentElemInp = event.target.id.split("-")[3];
      if (currentElemRow) {
        const elem = getNextElem(currentElemRow, currentElemInp);
        if (elem) {
          elem.focus();
        }
      }
    }
  };

  return (
    <div className="container-fluid">
      <div className="row mt-5">
        <div className="col-md-3 mb-3">
          <TextField
            label="D.C. No."
            disabled
            fullWidth
            variant="outlined"
            size="small"
            value={dc_no}
          />
        </div>
        <div className="col-md-3 mb-3">
          <TextField
            label="Date"
            disabled
            fullWidth
            variant="outlined"
            value={moment().format("MM/DD/YYYY")}
            size="small"
          />
        </div>
        <div className="col-md-3 mb-3">
          <TextField
            label="DI No."
            disabled
            fullWidth
            variant="outlined"
            value={formData.di_no}
            size="small"
          />
        </div>
        <div className="col-md-3 mb-3">
          <TextField
            label="Date"
            disabled
            fullWidth
            variant="outlined"
            value={formData?.di_date}
            size="small"
          />
        </div>
        <div className="col-md-6 mb-3">
          <TextField
            label="Party Name"
            fullWidth
            variant="outlined"
            size="small"
            disabled
            value={formData.company_name}
          />
        </div>
        <div className="col-md-3 mb-3">
          <TextField
            label="Sales Order"
            fullWidth
            onChange={handleChange}
            value={so_no}
            variant="outlined"
            name="so_no"
            size="small"
          />
        </div>
        <div className="col-md-3 mb-3">
          <DatePicker
            label="Date"
            value={so_date}
            format="dd/MM/yyyy"
            onChange={(date) => handleDateChange("so_date", date)}
            animateYearScrolling
            inputVariant="outlined"
            size="small"
            autoOk
            fullWidth
          />
        </div>
        <div className="col-md-6 mb-3">
          <TextField
            label="Contact Person"
            fullWidth
            onChange={handleChange}
            value={cperson_name}
            name="cperson_name"
            variant="outlined"
            size="small"
          />
        </div>
        <div className="col-md-3 mb-3">
          <TextField
            label="Ref(PO) No."
            fullWidth
            variant="outlined"
            value={ref_no}
            name={"ref_no"}
            size="small"
            onChange={handleChange}
          />
        </div>
        <div className="col-md-3 mb-3">
          <DatePicker
            label="Date"
            value={ref_date}
            format="dd/MM/yyyy"
            onChange={(date) => handleDateChange("ref_date", date)}
            animateYearScrolling
            inputVariant="outlined"
            size="small"
            autoOk
            fullWidth
          />
        </div>
        <div className="col-md-3 mb-3">
          <TextField
            label="Type"
            value={type}
            fullWidth
            variant="outlined"
            size="small"
            select
            name="type"
            onChange={handleChange}
          >
            {" "}
            <MenuItem value="Project">Project</MenuItem>
            <MenuItem value="Spare">Spare</MenuItem>
          </TextField>
        </div>
        <div className="col-md-3 mb-3">
          <TextField
            label="Status"
            disabled
            fullWidth
            variant="outlined"
            value={status}
            size="small"
          />
        </div>
        <div className="col-md-3 mb-3">
          <TextField
            label="Dispatch Doc. No."
            fullWidth
            variant="outlined"
            value={dis_doc_no}
            onChange={handleChange}
            name="dis_doc_no"
            size="small"
          />
        </div>
        <div className="col-md-3 mb-3">
          <DatePicker
            label="Date"
            value={dis_doc_date}
            format="dd/MM/yyyy"
            onChange={(date) => handleDateChange("dis_doc_date", date)}
            animateYearScrolling
            inputVariant="outlined"
            size="small"
            autoOk
            fullWidth
          />
        </div>
        <div className="col-md-6 mb-3">
          <TextField
            label="Remarks"
            fullWidth
            value={remarks}
            name="remarks"
            variant="outlined"
            onChange={handleChange}
            size="small"
            multiline
          />
        </div>
        <div className="col-md-3 mb-3">
          <TextField
            label="Dispatch Through"
            fullWidth
            value={dis_through}
            variant="outlined"
            size="small"
            name="dis_through"
            onChange={handleChange}
          />
        </div>
        <div className="col-md-3 mb-3">
          <TextField
            label="Destination"
            fullWidth
            name="destination"
            onChange={handleChange}
            value={destination}
            variant="outlined"
            size="small"
          />
        </div>
        <div className="col-md-6 mb-3">
     
        
          <TextField
            label="Scan Using"
            fullWidth
            select
            variant="outlined"
            size="small"
            name="scan_using"
            disabled={selectedDI}
            onChange={handleChange}
            value={scan_using}
          >
            <MenuItem value="MLFB NO">MLFB NO</MenuItem>
            <MenuItem value="MATERIAL CODE">MATERIAL CODE</MenuItem>
          </TextField>
        </div> 
        
        <div className="col-md-3 mb-3">
          <TextField
            label="Vehicle No."
            fullWidth
            name="vehicle_no"
            variant="outlined"
            value={vehicle_no}
            onChange={handleChange}
            size="small"
          />
        </div>
        <div className="col-md-3 mb-3">
          <TextField
            label="No of Box"
            fullWidth
            variant="outlined"
            size="small"
            name="noofbox"
            value={noofbox}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="diList-container">
        {!showDIList && (
          <div className="text-right w-100 mb-5">
            <Button
              color="primary"
              className="mr-2"
              disableElevation
              variant="contained"
              onClick={toggleDIList}
            >
              Pick DI
            </Button>
            <Button
              color="primary"
              className="mr-2"
              disableElevation
              variant="contained"
              disabled={loading}
              onClick={submitMain}
            >
              {loading ? "Processing..." : " Save & Proceed"}
            </Button>
          </div>
        )}
        {showDIList && (
          <TablePicker
            selectedItems={selectedDI}
            columns={diListColumn}
            url={"logistics/dc/pickDI"}
            isNode="node"
            apiBody={{ user_id: getUserId(), sl_type: challanType }}
            apiType="post"
            onPickerClose={toggleDIList}
            type="single"
            onSubmit={handleSubmit}
          />
        )}

        {showDITable && (
          <div className="table-responsive mb-5 pb-5">
            <Paper>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>S.N.</TableCell>
                    <TableCell>Box No</TableCell>
                    <TableCell>MLFB No.</TableCell>
                    <TableCell>Material Code</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Serial No.</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Rate</TableCell>
                    <TableCell align="right">Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pickItemList.length > 0 &&
                    pickItemList.map((item, index) => {
                      return (
                        <React.Fragment>
                          <TableRow
                            key={index}
                            style={{
                              backgroundColor: item.serial
                                ? "rgb(255 238 240)"
                                : "#fff",
                            }}
                          >
                            <TableCell>{index + 1}</TableCell>
                            <TableCell style={{ width: 100 }}>
                              <input
                                type="text"
                                name="box_no"
                                className="form-control"
                                onChange={(e) => handleItemChange(index, e)}
                                // onKeyPress={(e) => {

                                // }}
                              />{" "}
                            </TableCell>
                            <TableCell>
                              {item.serial_no !== null ? (
                                <input
                                  type="type"
                                  disabled={scan_using === "MATERIAL CODE"}
                                  className="form-control switchInput"
                                  name="mlfb_no"
                                  onKeyPress={switchToInput}
                                  id={`row-input-${index + 1}-1`}
                                  onChange={(e) => handleItemChange(index, e)}
                                />
                              ) : (
                                item.mlfb_no
                              )}
                            </TableCell>
                            <TableCell>
                              {" "}
                              {item.serial_no !== null ? (
                                <input
                                  type="type"
                                  disabled={scan_using === "MLFB NO"}
                                  className="form-control switchInput"
                                  id={`row-input-${index + 1}-2`}
                                  name="material_code"
                                  onKeyPress={switchToInput}
                                  onChange={(e) => handleItemChange(index, e)}
                                />
                              ) : (
                                item.material_code
                              )}
                            </TableCell>
                            <TableCell style={{ width: 200 }}>
                              {item.description}
                            </TableCell>
                            <TableCell style={{ width: 200 }}>
                              {" "}
                              {item.serial_no !== null && (
                                <input
                                  type="type"
                                  className="form-control switchInput"
                                  name="serial_no"
                                  id={`row-input-${index + 1}-3`}
                                  onKeyPress={(e) => {
                                    switchToInput(e);
                                    if (e.key === "Enter") {
                                      updateItemById(pickItemList[index]);
                                    }
                                  }}
                                  onChange={(e) => handleItemChange(index, e)}
                                />
                              )}
                            </TableCell>
                            <TableCell align="right">{item.qty}</TableCell>
                            <TableCell align="right">{item.rate}</TableCell>
                            <TableCell align="right">{item.amount}</TableCell>
                          </TableRow>
                        </React.Fragment>
                      );
                    })}
                </TableBody>
              </Table>
            </Paper>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddDeliveryChallan;
