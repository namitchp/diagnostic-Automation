import { Button, Fab } from "@material-ui/core";
import { Autocomplete, TextField } from "@mui/material";

import moment from "moment";
import React, { useEffect, useState } from "react";
import { SimpleTable } from "../../components/basic-table";
import {
  debounce,
  showErrorToast,
  showSuccessToast,
} from "../../components/common";
import { TablePicker } from "../../components/table-picker";
import AddIcon from "@material-ui/icons/Add";
import { CommonController } from "../../_redux/controller/common.controller";

const NewDCPackaging = () => {
  const [selectedPackingList, setSelectedPackingList] = useState([]);
  const [showPackagingList, setShowPackagingList] = useState(false);
  const [itemListBody, setItemListBody] = useState(null);
  const [showItemList, setShowItemList] = useState(null);
  const [companyList, setCompanyList] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const [initialValues, setInitialValues] = useState({
    date: moment().format("DD/MM/YYYY"),
    entry_no: "",
    remarks: "",
  });
  const [boxList, setBoxList] = useState([
    {
      items: [],
    },
  ]);

  useEffect(() => {
    getEntryNo();
  }, []);
  useEffect(() => {
    setItemListBody({
      dcList: selectedPackingList.map((item) => ({ id: item.tran_id })),
      itemList: [],
    });
  }, [selectedPackingList]);

  useEffect(() => {
    if (boxList.length > 1) {
      let iList = [];
      boxList.forEach((x) => {
        iList.push.apply(iList, x.items);
      });

      setItemListBody({
        dcList: selectedPackingList.map((item) => ({ id: item.tran_id })),
        itemList: iList,
      });
    }
  }, [boxList]);

  const togglePackagingList = () => setShowPackagingList(!showPackagingList);
  const toggleItemList = (index) => setShowItemList(index);

  const handlePackagingList = (data) => {
    setSelectedPackingList(data);
    togglePackagingList();
  };

  const handleIemList = (data, index) => {
    let tempBox = [...boxList];
    tempBox[index].items = data;
    setBoxList(tempBox);
    toggleItemList(null);
  };

  const removeBox = (index) => {
    setBoxList(boxList.filter((item, _) => _ !== index));
  };

  const addBox = () => {
    setBoxList([
      ...boxList,
      {
        items: [],
      },
    ]);
  };

  const itemListColumn = [
    {
      id: "tran_id",
      numeric: false,
      disablePadding: true,
      label: "ID",
    },
    {
      id: "mlfb_no",
      numeric: false,
      disablePadding: true,
      label: "MLFB No.",
    },
    {
      id: "dc_no",
      numeric: false,
      disablePadding: true,
      label: "DC No.",
    },
    {
      id: "item_name",
      numeric: false,
      disablePadding: true,
      label: "Item Name",
    },
    {
      id: "description",
      numeric: false,
      disablePadding: true,
      label: "Description",
    },

    {
      id: "qty",
      numeric: false,
      disablePadding: true,
      label: "Quantity",
    },
    {
      id: "serial_no",
      numeric: false,
      disablePadding: true,
      label: "Serial No.",
    },
  ];

  const packagingListColumn = [
    {
      id: "tran_id",
      numeric: false,
      disablePadding: true,
      label: "ID",
    },
    {
      id: "date",
      numeric: false,
      disablePadding: true,
      label: "Date",
      dateFormat: true,
    },
    {
      id: "dc_no",
      numeric: false,
      disablePadding: true,
      label: "DC No.",
    },
    {
      id: "Company",
      numeric: false,
      disablePadding: true,
      label: "Company",
    },
    {
      id: "Contact",
      numeric: false,
      disablePadding: true,
      label: "Contact",
    },
    {
      id: "so_no",
      numeric: false,
      disablePadding: true,
      label: "SO No.",
    },
    {
      id: "dispatch_through",
      numeric: false,
      disablePadding: true,
      label: "Dispatch Through",
    },
    {
      id: "Destination",
      numeric: false,
      disablePadding: true,
      label: "Destination",
    },
    {
      id: "datetime",
      numeric: false,
      disablePadding: true,
      label: "Datetime",
      dateFormat: true,
    },
    {
      id: "status",
      numeric: false,
      disablePadding: true,
      label: "Status",
    },
    {
      id: "comments",
      numeric: false,
      disablePadding: true,
      label: "Comments",
    },
    {
      id: "remarks",
      numeric: false,
      disablePadding: true,
      label: "Remarks",
      flex: 1,
    },
    {
      id: "di_no",
      numeric: false,
      disablePadding: true,
      label: "DI No.",
    },
  ];

  const getCompanyList = async (search) => {
    try {
      let response = await CommonController.commonApiCallFilter(
        "dc/pickCompany",
        { search: search },
        "get",
        "node"
      );

      if (response.status === 200) {
        setCompanyList(response.result);
      } else {
        showErrorToast(response.message);
      }
    } catch (err) {
      showErrorToast(err);
    }
  };

  const deletePickItem = (item, index) => {
    let tempBoxList = [...boxList];
    tempBoxList[index].items = tempBoxList[index].items.filter(
      (x) => x.tran_id !== item.tran_id
    );

    setBoxList(tempBoxList);
  };

  const getEntryNo = async () => {
    try {
      let response = await CommonController.commonApiCallFilter(
        "dc/generateDCNo",
        {},
        "get",
        "node"
      );

      if (response.status === 200) {
        setInitialValues({ ...initialValues, entry_no: response.data });
      } else {
        showErrorToast(response.message);
      }
    } catch (err) {
      showErrorToast(err);
    }
  };

  const submitDC = async () => {
    try {
      if (initialValues.remarks === "") {
        showErrorToast("Please enter remarks");
      } else if (boxList.filter((x) => x.items.length < 1).length > 0) {
        showErrorToast("Please choose items for box");
      } else if (selectedPackingList.length < 1) {
        showErrorToast("Please choose dc packaging");
      } else {
        const body = {
          tran_id: "0",
          date: initialValues.date,
          entry_no: initialValues.entry_no,
          company_id: selectedCompany.company_id,
          remarks: initialValues.remarks,
          boxList: boxList,
          user_id: localStorage.getItem("userId"),
        };
        let response = await CommonController.commonApiCallFilter(
          "dc/insertDc",
          body,
          "post",
          "node"
        );

        if (response.status === 200) {
          showSuccessToast(response.message);
          window.location.reload();
        } else {
          showErrorToast(response.message);
        }
      }
    } catch (err) {
      showErrorToast(err);
    }
  };
  return (
    <div className="container-fluid mt-5 pt-5">
      <div className="row">
        <div className="entry-details d-flex col-md-6">
          <div className="mr-3">
            <h5>Date</h5>
            <TextField
              value={initialValues.date}
              fullWidth
              label=""
              variant="outlined"
              size="small"
              disabled
            />
          </div>
          <div className="mr-3">
            <h5>Entry No.</h5>{" "}
            <TextField
              value={initialValues.entry_no}
              fullWidth
              label=""
              variant="outlined"
              size="small"
              disabled
            />
          </div>
          <div>
            <h5>Remarks</h5>
            <TextField
              label="Remarks"
              fullWidth
              value={initialValues.remarks}
              variant="outlined"
              size="small"
              name="remarks"
              onChange={(e) =>
                setInitialValues({ ...initialValues, remarks: e.target.value })
              }
            />
          </div>
        </div>
        <div className="col-md-4  ml-auto ">
          <h5>Pick Company</h5>
          <div className="d-flex align-items-center">
            <Autocomplete
              id="combo-box-demo"
              options={companyList}
              fullWidth
              size="small"
              getOptionLabel={(option) => option.company_name}
              value={selectedCompany}
              onChange={(e, value) => setSelectedCompany(value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  onInput={(e) => {
                    debounce(getCompanyList(e.target.value, 200));
                  }}
                  label=""
                  variant="outlined"
                />
              )}
            />
            {!showPackagingList && selectedCompany && (
              <Button
                color="primary"
                className="mx-3 w-25"
                disableElevation
                variant="contained"
                onClick={togglePackagingList}
              >
                Pick DC
              </Button>
            )}
          </div>
        </div>
      </div>
      <hr />
      {showPackagingList && (
        <TablePicker
          selectedItems={selectedPackingList}
          columns={packagingListColumn}
          url={"dc/pickDC"}
          isNode="node"
          apiBody={{ company_id: selectedCompany?.company_id }}
          apiType="post"
          onPickerClose={togglePackagingList}
          onSubmit={handlePackagingList}
        />
      )}

      {selectedPackingList.length > 0 && (
        <SimpleTable
          columns={packagingListColumn}
          rows={selectedPackingList}
          // onDelete={handleAddedCustomer}
        />
      )}

      {itemListBody &&
        itemListBody.dcList.length > 0 &&
        boxList.map((box, index) => {
          return (
            <div className="box-list mt-5 pt-5" key={index}>
              <div className="d-flex">
                <h2 className="box-header">Box no. {index + 1}</h2>
                <div className=" ml-auto">
                  {showItemList !== index && (
                    <Button
                      color="primary"
                      className="mr-2"
                      disableElevation
                      variant="contained"
                      onClick={() => toggleItemList(index)}
                    >
                      Pick Item
                    </Button>
                  )}

                  <Button
                    color="primary"
                    className="mr-2 ml-auto"
                    disableElevation
                    variant="contained"
                    onClick={() => removeBox(index)}
                  >
                    Remove Box
                  </Button>
                </div>
              </div>
              <hr />
              {showItemList === index && (
                <TablePicker
                  selectedItems={box.items}
                  columns={itemListColumn}
                  url={"dc/pickDCItem"}
                  isNode="node"
                  apiBody={itemListBody}
                  apiType="post"
                  onPickerClose={() => toggleItemList(null)}
                  onSubmit={(data) => handleIemList(data, index)}
                />
              )}
              {box.items.length > 0 && showItemList !== index && (
                <SimpleTable
                  columns={itemListColumn}
                  rows={box.items}
                  onDelete={(item) => deletePickItem(item, index)}
                />
              )}
            </div>
          );
        })}

      {selectedPackingList.length > 0 && (
        <div className="float-action-btn">
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
        </div>
      )}
      <hr />
      <div className="w-100 mt-3 text-right">
        <Button
          color="primary"
          className="mr-2"
          disableElevation
          variant="contained"
          onClick={submitDC}
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

export default NewDCPackaging;
