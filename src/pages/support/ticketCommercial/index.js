import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBrowseUserRight } from "../../../components/common";
import AddTicketCommercial from "./addCommericial";

import SupportTicketCommericialBrowse from "./tcBrowse";

const SupportTicketCommercialIndex = (props) => {
  const dispatch = useDispatch();
  const approvalObj = props.location.state;
  const userRight = useSelector((state) => state.common.userRightList);

  const [selectedIndex, setSeletedIndex] = useState(
    approvalObj ? approvalObj.index : 0
  );
  const [selectedId, setSelectedId] = useState(null);

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
            New Commercial
          </a>
        </li>
      </ul>
      <div className="tab-content">
        {selectedIndex === 0 ? (
          <SupportTicketCommericialBrowse
            selectedPreviewId={(id) => {
              setSelectedId(id);
              handleIndex(1);
            }}
          />
        ) : (
          <AddTicketCommercial
            previewId={approvalObj ? approvalObj.id : selectedId}
            changeTab={handleIndex}
          />
        )}
      </div>
    </div>
  );
};

export default SupportTicketCommercialIndex;
