import { Tab, Tabs } from "@material-ui/core";
import React, { useState } from "react";
import ConfigGroupBrowse from "./browse";
import AddOrEditGroup from "./form";
import { useSelector } from "react-redux";
const OctrolIndex = () => {
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
  };
  return (
    <div className="bg-white p-4">
      <div className="inner_tabs">
        <Tabs
          className="w-100"
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
              value={1}
              className={selectedIndex === 1 ? "tabstyle" : ""}
              label="New Octrol"
            />
          )}{" "}
        </Tabs>
      </div>
      <div className="customtab-container">
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
export default OctrolIndex;
