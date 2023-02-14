import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { clearSelectedEmployeeId } from "../../../_redux/actions/masters/all.action";
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
    <div className="main_wrapper">
      <div className="inner_main_first">
        <div className="inner_main_second">
          <div className="inner_main_third">
            <ul className="nav nav-tabs nav-tabs-line">
              <li
                className={
                  "menu-item  " +
                  (selectedIndex === 0 ? "menu-level2-color" : "")
                }
              >
                <a
                  className={`menu-link `}
                  onClick={() => {
                    // dispatch(clearSelectedGodownId());
                    handleIndex(0);
                  }}
                >
                  Browse
                </a>
              </li>
              <li
                className={
                  "menu-item   " +
                  (selectedIndex === 1 ? "menu-level2-color" : "")
                }
              >
                <a
                  className={`menu-link  `}
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
        </div>
      </div>
    </div>
  );
};

export default EmployeeIndex;
