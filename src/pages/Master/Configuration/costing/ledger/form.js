import React, { useEffect, useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { DatePicker } from "@material-ui/pickers";
import SimpleReactValidator from "simple-react-validator";

import {
  buttonLoader,
  showErrorToast,
  showSuccessToast,
} from "../../../../../components/common";
import { CommonController } from "../../../../../_redux/controller/common.controller";
import { SimpleTable } from "../../../../../components/basic-table";
import useForceUpdate from "use-force-update";
import moment from "moment";
import { useSelector } from "react-redux";
import { Loader } from "../../../../../components/loader";
import { selectedLedgerId } from "../../../../../_redux/actions/masters/all.action";

const AddOrEditLedger = ({ onClose }) => {
  const [loading, setLoading] = useState(false);

  const selectedIdResponse = useSelector(
    (state) => state.AllReducersMaster.ledgerId
  );

  const [validator, setValidator] = useState(new SimpleReactValidator());

  const forceUpdate = useForceUpdate();

  const [insertParams, setInsertParams] = useState({
    ledger_id: "0",
    ledger_name: "",
    description: "",
    user_id: localStorage.getItem("userId"),
    user_name: localStorage.getItem("userName"),
  });

  useEffect(() => {
    if (selectedIdResponse) {
      CommonController.commonApiCallFilter(
        "Configuration/ConfigurationCostingLedgerPreview",
        {
          ledger_id: selectedIdResponse,
        }
      ).then((data) => {
        if (data.ledger_id) {
          setInsertParams({
            ...insertParams,
            ledger_id: data.ledger_id,
            ledger_name: data.ledger_name,
            description: data.description,
          });
        } else {
          showErrorToast("Something went wrong");
        }
      });
    }
  }, [selectedIdResponse]);

  const insertCombo = async () => {
    if (validator.allValid()) {
      setLoading(true);
      CommonController.commonApiCallFilter(
        "Configuration/ConfigurationCostingLedgerInsert",
        insertParams
      ).then((data) => {
        if (data.valid) {
          showSuccessToast("Successfully Saved");
          setLoading(false);
          onClose();
        } else {
          showErrorToast("Something went wrong");
        }
      });
    } else {
      validator.showMessages();
      // rerender to show messages for the first time
      // you can use the autoForceUpdate option to do this automatically`
      forceUpdate();
    }
  };

  return (
    <React.Fragment>
      <div className="container-fluid mt-5 pt-5">
        {/* {loading && <Loader />} */}
        <div className="row">
          <div className="col-md-6">
            <TextField
              variant="outlined"
              fullWidth
              size="small"
              label="Ledger Name*"
              value={insertParams.ledger_name}
              onChange={(event) => {
                setInsertParams({
                  ...insertParams,
                  ledger_name: event.target.value,
                });
              }}
            />
            <p className="text-danger">
              {validator.message(
                "Ledger Name",
                insertParams.ledger_name,
                "required"
              )}
            </p>
          </div>
          <div className="col-md-6">
            <TextField
              variant="outlined"
              fullWidth
              size="small"
              multiline
              label="Description"
              value={insertParams.description}
              onChange={(event) => {
                setInsertParams({
                  ...insertParams,
                  description: event.target.value,
                });
              }}
            />
          </div>
        </div>
        <div className="w-100 text-right mt-4">
          <Button
            onClick={() => onClose()}
            variant="contained"
            className="mr-2"
            color="primary"
            disableElevation
          >
            Cancel
          </Button>
          {buttonLoader(loading, "Save", insertCombo, "primary")}
        </div>
      </div>
    </React.Fragment>
  );
};

export default AddOrEditLedger;
