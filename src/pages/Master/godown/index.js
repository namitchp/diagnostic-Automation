import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { clearSelectedGodownId } from "../../../_redux/actions/masters/all.action";
import AddGodown from "./addEntry";

import GodownBrowse from "./browse";
// import AddMaterialCode from "./addMaterialCode";

// import MaterialCodeBrowse from "./browse";

const GodownIndex = () => {
  const dispatch = useDispatch();
  const [selectedIndex, setSeletedIndex] = useState(0);

  const handleIndex = (index) => {
    setSeletedIndex(index);
  };

  return (
    <div className="card card-custom gutter-b  px-7 py-3">
      <ul className="nav nav-tabs nav-tabs-line">
        <li className="nav-item">
          <a
            className={`nav-link ` + (selectedIndex === 0 ? "active" : "")}
            onClick={() => {
              dispatch(clearSelectedGodownId());
              handleIndex(0);
            }}
          >
            Browse
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ` + (selectedIndex === 1 ? "active" : "")}
            onClick={() => {
              dispatch(clearSelectedGodownId());
              handleIndex(1);
            }}
          >
            New Godown
          </a>
        </li>
      </ul>
      <div className="tab-content">
        {selectedIndex === 0 ? (
          <GodownBrowse onEdit={() => handleIndex(1)} />
        ) : (
          <AddGodown onClose={() => handleIndex(0)} />
        )}
      </div>
    </div>
  );
};

export default GodownIndex;
