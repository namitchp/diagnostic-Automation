import { Tab, Tabs } from "@material-ui/core";
import React, { useState } from "react";
import ConfigGroupBrowse from "./browse";
import AddOrEditGroup from "./form";
const MenuStructureIndex = () => {
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
  };
  return (
    <div className="px-3">
      <Tabs
        className="w-100"
        // value={selectedIndex}
        onChange={handleIndex}
        
        aria-label="scrollable auto tabs example"
      >
        <Tab value={0} className={selectedIndex ===0 ? "tabstyle" : ""} label="Browse" />
       {selectedIndex===1&& <Tab className={selectedIndex ===1 ? "tabstyle" : ""} value={1} label="Update Menu Structure" />}
      </Tabs>
      <div className="customtab-container w-100 py-3">
        {/* {selectedIndex === 0 ? <ConfigGroupBrowse onActionClick={(index) => handleIndex({} , index)}/>:<AddOrEditGroup onClose={(index) => handleIndex({} , index)} />} */}
        {selectedIndex === 0 ? (
          <ConfigGroupBrowse
            onEdit={handelEdit}
            onPreviewData={handelPreview}
          />
        ) : (
          <AddOrEditGroup
            onClose={(index) => handleIndex({}, index)}
            editData={editdata}
          />
        )}
      </div>
    </div>
  );
};
export default MenuStructureIndex;
