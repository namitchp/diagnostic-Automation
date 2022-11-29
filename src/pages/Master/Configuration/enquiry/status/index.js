import { Tab, Tabs } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { clearSelectedEnqStatusId } from "../../../../../_redux/actions/masters/all.action";
import BrowseEnqStatus from "./browse";
import AddOrEditEnqStatus from "./form";

const EnqStatusIndex = () => {
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
              dispatch(clearSelectedEnqStatusId());
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
              dispatch(clearSelectedEnqStatusId());
              handleIndex({}, 1);
            }}
          >
            New Status
          </a>
        </li>
      </ul>
      <div className="tab-content">
        {selectedIndex === 0 ? (
          <BrowseEnqStatus onEdit={() => handleIndex({}, 1)} />
        ) : (
          <AddOrEditEnqStatus onClose={() => handleIndex({}, 0)} />
        )}
      </div>
    </div>
  );
};

export default EnqStatusIndex;
