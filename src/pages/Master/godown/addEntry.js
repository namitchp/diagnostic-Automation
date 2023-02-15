import { TextField, Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import SimpleReactValidator from "simple-react-validator";
import {
  buttonLoader,
  showErrorToast,
  showSuccessToast,
} from "../../../components/common";
import { CommonController } from "../../../_redux/controller/common.controller";
import useForceUpdate from "use-force-update";
import { useSelector } from "react-redux";
const AddGodown = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const selectedIdResponse = useSelector(
    (state) => state.AllReducersMaster.godownId
  );
  const [validator, setValidator] = useState(new SimpleReactValidator());

  const forceUpdate = useForceUpdate();

  const [insertParams, setInsertParams] = useState({
    godown_id: "0",
    godown_name: "",
    address: "",
    user_id: "",
  });

  useEffect(() => {
    if (selectedIdResponse) {
      CommonController.commonApiCallFilter("Godown/GodownMasterPreview", {
        godown_id: selectedIdResponse,
      }).then((data) => {
        if (data.godown_id) {
          setInsertParams({
            ...insertParams,
            godown_id: data.godown_id,
            godown_name: data.godown_name,
            address: data.address,
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
        "Godown/GodownMasterInsert",
        insertParams
      ).then((data) => {
        if (data.valid) {
          showSuccessToast("Successfully Saved");
          setLoading(false);
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
    <div className="container-fluid mt-5 pt-5">
      {/* {loading && <Loader />} */}
      <div className="row">
        <div className="col-md-6">
          <TextField
            variant="outlined"
            fullWidth
            size="small"
            label="Godown Name*"
            value={insertParams.godown_name}
            onChange={(event) => {
              setInsertParams({
                ...insertParams,
                godown_name: event.target.value,
              });
            }}
          />
          <p className="text-danger">
            {validator.message(
              "Godown Name",
              insertParams.godown_name,
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
            label="Address"
            value={insertParams.address}
            onChange={(event) => {
              setInsertParams({ ...insertParams, address: event.target.value });
            }}
          />
        </div>
      </div>
      <div className="w-100 text-right mt-4">
        <Button
          onClick={() => onClose()}
          variant="contained"
          className="mr-2 bg-danger text-white"
          color="primary"
          disableElevation
        >
          Cancel
        </Button>
        {buttonLoader(loading, "Save", insertCombo, "primary")}
      </div>
    </div>
  );
};

export default AddGodown;
