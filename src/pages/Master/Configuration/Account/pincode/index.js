import { Tab, Tabs } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { clearSelectedPincode } from "../../../../../_redux/actions/masters/configuration.action";

import BrowsePincode from "./browse";
import AddOrEditPincode from "./form";

const PincodeIndex = () => {
  const dispatch = useDispatch();
  const [selectedIndex, setSeletedIndex] = useState(0);

  const handleIndex = (event, newValue) => {
    setSeletedIndex(newValue);
    if (newValue === 0) {
      dispatch(clearSelectedPincode());
    }
  };

  return (
    <div className="px-3">
      <Tabs
        className="w-100"
        value={selectedIndex}
        onChange={handleIndex}
        indicatorColor="primary"
        aria-label="scrollable auto tabs example"
      >
        <Tab value={0} label="Browse" />
        <Tab value={1} label="New Pincode" />
      </Tabs>
      <div className="customtab-container w-100 py-3">
        {selectedIndex === 0 ? (
          <BrowsePincode onActionClick={(index) => handleIndex({}, index)} />
        ) : (
          <AddOrEditPincode onClose={(index) => handleIndex({}, index)} />
        )}
      </div>
    </div>
  );
};

export default PincodeIndex;
