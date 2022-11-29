import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { clearSelectedComboId } from "../../../_redux/actions/masters/all.action";
import AddComboMLFB from "./addCombo";
// import AddMaterialCode from "./addMaterialCode";
import ComboMLFBBrowse from "./browse";
// import MaterialCodeBrowse from "./browse";

const ComboMLFBIndex = () => {
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
              dispatch(clearSelectedComboId());
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
              dispatch(clearSelectedComboId());
              handleIndex(1);
            }}
          >
            New Combo MLFB
          </a>
        </li>
      </ul>
      <div className="tab-content">
        {selectedIndex === 0 ? (
          <ComboMLFBBrowse onEdit={() => handleIndex(1)} />
        ) : (
          <AddComboMLFB onClose={() => handleIndex(0)} />
        )}
      </div>
    </div>
  );
};

export default ComboMLFBIndex;
