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
import { selectedSiemensId } from "../../../../../_redux/actions/masters/all.action";

const AddOrEditSiemens = ({ onClose }) => {
  const [loading, setLoading] = useState(false);

  const selectedIdResponse = useSelector(
    (state) => state.AllReducersMaster.siemensId
  );

  const [validator, setValidator] = useState(new SimpleReactValidator());

  const forceUpdate = useForceUpdate();

  const [insertParams, setInsertParams] = useState({
    se_id: "0",
    engg_name: "",
    roll_no: "",
    user_id: localStorage.getItem("userId"),
    user_name: localStorage.getItem("userName"),
  });

  useEffect(() => {
    if (selectedIdResponse) {
      CommonController.commonApiCallFilter(
        "Configuration/ConfigurationSiemensPreview",
        {
          se_id: selectedIdResponse,
        }
      ).then((data) => {
        if (data.se_id) {
          setInsertParams({
            ...insertParams,
            se_id: data.se_id,
            engg_name: data.engg_name,
            roll_no: data.roll_no,
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
        "Configuration/ConfigurationSiemensInsert",
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
              label="Roll No."
              value={insertParams.roll_no}
              onChange={(event) => {
                setInsertParams({
                  ...insertParams,
                  roll_no: event.target.value,
                });
              }}
            />
            <p className="text-danger">
              {validator.message("Roll No.", insertParams.roll_no, "required")}
            </p>
          </div>
          <div className="col-md-6">
            <TextField
              variant="outlined"
              fullWidth
              size="small"
              label="Engg Name*"
              value={insertParams.engg_name}
              onChange={(event) => {
                setInsertParams({
                  ...insertParams,
                  engg_name: event.target.value,
                });
              }}
            />
            <p className="text-danger">
              {validator.message(
                "Engg Name",
                insertParams.engg_name,
                "required"
              )}
            </p>
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

export default AddOrEditSiemens;
