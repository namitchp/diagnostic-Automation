import { Tab, Tabs } from "@material-ui/core";
import React, { useState } from "react";

import BrowsePincode from "./browse";
import AddOrEditPincode from "./form";
import { useSelector } from "react-redux";
const PincodeIndex = () => {
  const userRight = useSelector((state) => state.common.userRightResponse);
  const [selectedIndex, setSeletedIndex] = useState(0);
  const [editdata, seteditdata] = useState("");
  const handleIndex = (event, newValue) => {
    setSeletedIndex(newValue);
    seteditdata("");
  };
  const handelEdit = (edit) => {
    let editData = { ...edit };
    editData.type = "edit";
    setSeletedIndex(1);
    seteditdata(editData);
  };
  const handelPreview = (preview) => {
    let previewData = { ...preview };
    previewData.type = "preview";
    setSeletedIndex(1);
    seteditdata(previewData);
    console.log(previewData);
  };
  return (
    <div className="bg-white p-3">
      <div className="inner_tabs">
        <Tabs
          className="w-100"
          value={selectedIndex}
          onChange={handleIndex}
          indicatorColor="primary"
          aria-label="scrollable auto tabs example"
        >
          <Tab
            value={0}
            className={selectedIndex === 0 ? "tabstyle" : ""}
            label="Browse"
          />
          {userRight.insert_right && (
            <Tab
              className={selectedIndex === 1 ? "tabstyle" : ""}
              value={1}
              label="New Pincode"
            />
          )}
        </Tabs>
      </div>
      <div className="customtab-container">
        {selectedIndex === 0 ? (
          <BrowsePincode onEdit={handelEdit} onPreviewData={handelPreview} />
        ) : (
          <AddOrEditPincode
            onClose={(index) => handleIndex({}, index)}
            editData={editdata}
          />
        )}
      </div>
    </div>
  );
};

export default PincodeIndex;
