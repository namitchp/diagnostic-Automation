import { Tab, Tabs } from "@material-ui/core";
import React, { useState } from "react";

import BrowsePincode from "./browse";
import AddOrEditPincode from "./form";

const PincodeIndex = () => {

  const [selectedIndex, setSeletedIndex] = useState(0);
  const [editdata, seteditdata] = useState("");
  const handleIndex = (event, newValue) => {
    setSeletedIndex(newValue);
   seteditdata("")
  };
  const handelEdit=(edit)=>{
    let editData={...edit}
    editData.type="edit";
    setSeletedIndex(1)
    seteditdata(editData)
}
const handelPreview=(preview)=>{
    let previewData={...preview}
    previewData.type="preview";
    setSeletedIndex(1)
    seteditdata(previewData)
    console.log(previewData)
}
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
          <BrowsePincode onEdit={handelEdit} onPreviewData={handelPreview}  />
        ) : (
          <AddOrEditPincode onClose={(index) => handleIndex({}, index)} editData={editdata} />
        )}
      </div>
    </div>
  );
};

export default PincodeIndex;
