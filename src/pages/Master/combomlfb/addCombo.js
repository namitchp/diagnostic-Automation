import { TextField, Button } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { DatePicker } from "@material-ui/pickers";
import React, { useEffect, useState } from "react";
import SimpleReactValidator from "simple-react-validator";
import { showErrorToast, showSuccessToast } from "../../../components/common";
import { CommonController } from "../../../_redux/controller/common.controller";
import { SimpleTable } from "../../../components/basic-table";
import useForceUpdate from "use-force-update";
import moment from "moment";
import { useSelector } from "react-redux";
import { Loader } from "../../../components/loader";

const AddComboMLFB = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [validator, setValidator] = useState(new SimpleReactValidator());
  const selectedComboMLFBIdResponse = useSelector(
    (state) => state.AllReducersMaster.comboMLFBId
  );

  const forceUpdate = useForceUpdate();
  const [mlfbProductList, setProductList] = useState([]);
  const [insertParams, setInsertParams] = useState({
    tran_id: "0",
    date: null,
    product_id: "",
    remarks: "",
    user_id: localStorage.getItem("userId"),
    user_name: localStorage.getItem("userName"),
    mlfbItems: [],
  });

  const [selectedParams, setSelectedParams] = useState({
    date: null,
    selectedProduct: "",
    selectedMlfb: "",
  });
  useEffect(async () => {
    if (selectedComboMLFBIdResponse && mlfbProductList.length > 0) {
      setDataLoading(true);
      await CommonController.commonApiCallFilter("ComboMlfb/ComboMlfbPreview", {
        tran_id: selectedComboMLFBIdResponse,
      }).then((data) => {
        setSelectedParams({
          ...selectedParams,
          date: new Date(
            data.date.split("/")[1] +
              "/" +
              data.date.split("/")[0] +
              "/" +
              data.date.split("/")[2]
          ),
          selectedMlfb: mlfbProductList.filter(
            (x) => x.value === data.mlfb_no
          )[0],
        });
        setInsertParams({
          ...insertParams,
          remarks: data.remarks,
          product_id: data.product_id,
          mlfbItems: data.mlfbItems,
          date: data.date,
          tran_id: data.tran_id,
        });
      });
      setDataLoading(false);
    }
  }, [selectedComboMLFBIdResponse, mlfbProductList]);
  const onProductChoose = async () => {
    const tempList = [...insertParams.mlfbItems];
    const indx = tempList.findIndex(
      (x) => x.product_id === selectedParams.selectedProduct?.id
    );
    if (indx > -1) {
      showErrorToast("Already selected");
    } else {
      setLoading(true);
      await CommonController.commonApiCallFilter(
        "ComboMlfb/ComboMlfbPreviewDetails",
        {
          product_id: selectedParams.selectedProduct?.id,
        }
      ).then((data) => {
        tempList.push(data);
      });
      setInsertParams({ ...insertParams, mlfbItems: tempList });
      setLoading(false);
      setSelectedParams({ ...selectedParams, selectedProduct: "" });
    }
  };
  const insertCombo = async () => {
    if (validator.allValid()) {
      if (insertParams.mlfbItems.length > 0) {
        CommonController.commonApiCallFilter(
          "ComboMlfb/ComboMlfbInsert",
          insertParams
        ).then((data) => {
          if (data.valid) {
            showSuccessToast("Successfully Saved");
          } else {
            showErrorToast("Something went wrong");
          }
        });
      } else {
        showErrorToast("Please select MLFB Products");
      }
    } else {
      validator.showMessages();
      // rerender to show messages for the first time
      // you can use the autoForceUpdate option to do this automatically`
      forceUpdate();
    }
  };
  const getProductList = async () => {
    await CommonController.commonApiCallFilter(
      "Dropdown/GetProductMlfb",
      {}
    ).then((data) => setProductList(data));
  };
  useEffect(() => {
    getProductList();
  }, []);
  //   const handleDataChange = () => {};
  const handleDateChange = (key, date) => {
    setInsertParams({
      ...insertParams,
      [key]: moment(date).format("DD-MM-YYYY"),
    });
    setSelectedParams({ ...selectedParams, date: date });
  };
  const mlfbColumns = [
    {
      id: "mlfb_no",
      label: "MLFB No",
    },
    {
      id: "product_code",
      label: "Product Code",
    },
    {
      id: "category_name",
      label: "Category Name",
    },
    {
      id: "p_group_name",
      label: "Group Name",
    },
  ];
  const handleDelete = (row) => {
    const tempList = [...insertParams.mlfbItems];
    const indx = tempList.findIndex((x) => x.product_id === row.product_id);
    if (indx > -1) {
      tempList.splice(indx, 1);
    }
    setInsertParams({ ...insertParams, mlfbItems: tempList });
  };
  return (
    <div className="container-fluid mt-5 pt-5">
      {dataLoading && <Loader />}
      <div className="row">
        <div className="col-md-3">
          <DatePicker
            label="Date*"
            value={selectedParams.date}
            format="dd-MM-yyyy"
            onChange={(date) => {
              handleDateChange("date", date);
              setSelectedParams({ ...selectedParams, date: date });
            }}
            animateYearScrolling
            inputVariant="outlined"
            size="small"
            fullWidth
          />
          <p className="text-danger">
            {validator.message("Date", selectedParams.date, "required")}
          </p>
        </div>
        <div className="col-md-3">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={mlfbProductList}
            getOptionLabel={(options) => options.value}
            fullWidth
            value={selectedParams.selectedMlfb}
            onChange={(event, newValue) => {
              setInsertParams({ ...insertParams, product_id: newValue?.id });
              setSelectedParams({ ...selectedParams, selectedMlfb: newValue });
            }}
            size="small"
            renderInput={(params) => (
              <TextField
                variant="outlined"
                size="small"
                {...params}
                label="MLFB No.*"
              />
            )}
          />
          <p className="text-danger">
            {validator.message("MLFB", insertParams.product_id, "required")}
          </p>
        </div>
        <div className="col-md-6">
          <TextField
            variant="outlined"
            fullWidth
            size="small"
            multiline
            label="Remarks"
            value={insertParams.remarks}
            onChange={(event) => {
              setInsertParams({ ...insertParams, remarks: event.target.value });
            }}
          />
          <p className="text-danger">
            {validator.message("Remarks", insertParams.remarks, "required")}
          </p>
        </div>
        <div className="col-md-4 d-flex">
          <Autocomplete
            disablePortal
            id="combo-box-demo2"
            options={mlfbProductList}
            getOptionLabel={(options) => options.value}
            fullWidth
            value={selectedParams.selectedProduct}
            onChange={(event, newValue) => {
              setSelectedParams({
                ...selectedParams,
                selectedProduct: newValue,
              });
            }}
            size="small"
            className="mr-3"
            renderInput={(params) => (
              <TextField
                variant="outlined"
                size="small"
                {...params}
                label="MLFB Product"
              />
            )}
          />

          <Button
            color="primary"
            disabled={loading}
            onClick={onProductChoose}
            disableElevation
            variant="contained"
          >
            {loading ? (
              <i class="fas fa-circle-notch fa-spin text-white"></i>
            ) : (
              "Add"
            )}
          </Button>
        </div>
      </div>
      <SimpleTable
        columns={mlfbColumns}
        rows={insertParams.mlfbItems}
        onDelete={handleDelete}
      />
      <div className="w-100 text-right mt-4">
        <Button
          variant="contained"
          className="mr-2"
          color="primary"
          disableElevation
          onClick={insertCombo}
        >
          Save
        </Button>
        <Button
          onClick={() => onClose()}
          variant="contained"
          color="primary"
          disableElevation
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default AddComboMLFB;
