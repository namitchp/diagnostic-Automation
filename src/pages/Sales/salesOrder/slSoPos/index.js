import React, { useState } from "react";
import { useDispatch } from "react-redux";
import SalesSlSoPosBrowse from "./browse";

import SalesEnquiryBrowse from "./browse";

const SalesSlSoPosIndex = () => {
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
              // dispatch(clearSelectedGodownId());
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
              // dispatch(clearSelectedGodownId());
              handleIndex(1);
            }}
          >
            New SO POS
          </a>
        </li>
      </ul>
      <div className="tab-content">
        {selectedIndex === 0 ? (
          <SalesSlSoPosBrowse />
        ) : (
          <h2>Sales Enquiry Form</h2>
        )}
      </div>
    </div>
  );
};

export default SalesSlSoPosIndex;
