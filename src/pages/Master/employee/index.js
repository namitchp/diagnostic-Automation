import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  clearSelectedEmployeeId,
} from "../../../_redux/actions/masters/all.action";
import AddGodown from "./addEntry";
import EmployeeBrowse from "./browse";
// import AddMaterialCode from "./addMaterialCode";

// import MaterialCodeBrowse from "./browse";

const EmployeeIndex = () => {
  const dispatch = useDispatch();
  const [selectedIndex, setSeletedIndex] = useState(0);

  const handleIndex = (index) => {
    dispatch(clearSelectedEmployeeId());
    setSeletedIndex(index);
  };
  return (
    <div className="card card-custom gutter-b  px-7 py-3">
      <ul className="nav nav-tabs nav-tabs-line">
        <li  className={
              "menu-item mb-2  border-bottom-0 rounded mr-2 " +
              (selectedIndex === 0 ? "menu-level2-color" : "")
            }>
          <a
          className={`menu-link py-2 px-4 rounded d-inline-block  fw-bold `}
            onClick={() => {
              // dispatch(clearSelectedGodownId());
              handleIndex(0);
            }}
          >
            Browse
          </a>
        </li>
        <li  className={
              "menu-item mb-2  border-bottom-0 rounded mr-2 " +
              (selectedIndex === 1 ? "menu-level2-color" : "")
            }>
          <a
            className={`menu-link py-2 px-4  d-inline-block `}
            onClick={() => {
              // dispatch(clearSelectedGodownId());
              handleIndex(1);
            }}
          >
            New Employee
          </a>
        </li>
      </ul>
      <div className="tab-content">
        {selectedIndex === 0 ? (
          <EmployeeBrowse onEdit={() => handleIndex(1)} />
        ) : (
          <AddGodown onClose={() => handleIndex(0)} />
        )}
      </div>
    </div>
  );
};

export default EmployeeIndex;
