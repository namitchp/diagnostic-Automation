import { Tab, Tabs } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { clearSelectedReferenceId } from "../../../../../_redux/actions/masters/all.action";
import BrowseReference from "./browse";
import AddOrEditReference from "./form";

const ReferenceIndex = () => {
  const dispatch = useDispatch();
  const [selectedIndex, setSeletedIndex] = useState(0);

  const handleIndex = (event, newValue) => {
    setSeletedIndex(newValue);
  };

  return (
    <div className="card card-custom gutter-b  px-7 py-3">
      <ul className="nav nav-tabs nav-tabs-line">
        <li className="nav-item">
          <a
            className={`nav-link ` + (selectedIndex === 0 ? "active" : "")}
            onClick={() => {
              dispatch(clearSelectedReferenceId());
              handleIndex({}, 0);
            }}
          >
            Browse
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ` + (selectedIndex === 1 ? "active" : "")}
            onClick={() => {
              dispatch(clearSelectedReferenceId());
              handleIndex({}, 1);
            }}
          >
            New Reference
          </a>
        </li>
      </ul>
      <div className="tab-content">
        {selectedIndex === 0 ? (
          <BrowseReference onEdit={() => handleIndex({}, 1)} />
        ) : (
          <AddOrEditReference onClose={() => handleIndex({}, 0)} />
        )}
      </div>
    </div>
  );
};

export default ReferenceIndex;
