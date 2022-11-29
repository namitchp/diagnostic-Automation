import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBrowseUserRight } from "../../../components/common";
import SupportTicketApprovalBrowse from "./browse";

const SupportTicketApprovalIndex = () => {
  const dispatch = useDispatch();
  const userRight = useSelector((state) => state.common.userRightList);

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
        {getBrowseUserRight(userRight)?.insert_right == "True" && (
          <li className="nav-item">
            <a
              className={`nav-link ` + (selectedIndex === 1 ? "active" : "")}
              onClick={() => {
                // dispatch(clearSelectedGodownId());
                handleIndex(1);
              }}
            >
              New Ticket Approval
            </a>
          </li>
        )}
      </ul>
      <div className="tab-content">
        {selectedIndex === 0 ? <SupportTicketApprovalBrowse /> : ""}
      </div>
    </div>
  );
};

export default SupportTicketApprovalIndex;
