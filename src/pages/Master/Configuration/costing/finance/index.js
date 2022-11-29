import { Tab, Tabs } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { clearSelectedFinanceId } from "../../../../../_redux/actions/masters/all.action";
import BrowseFinance from "./browse";
import AddOrEditFinance from "./form";

const FinanceIndex = () => {
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
              dispatch(clearSelectedFinanceId());
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
              dispatch(clearSelectedFinanceId());
              handleIndex({}, 1);
            }}
          >
            New Finance
          </a>
        </li>
      </ul>
      <div className="tab-content">
        {selectedIndex === 0 ? (
          <BrowseFinance onEdit={() => handleIndex({}, 1)} />
        ) : (
          <AddOrEditFinance onClose={() => handleIndex({}, 0)} />
        )}
      </div>
    </div>
  );
};

export default FinanceIndex;
