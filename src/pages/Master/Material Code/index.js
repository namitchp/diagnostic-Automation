import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { clearMaterialCodeEditId } from "../../../_redux/actions/masters/materialcode.action";
import AddMaterialCode from "./addMaterialCode";
import MaterialCodeBrowse from "./browse";

const MaterialCodeIndex = () => {
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
            onClick={() => handleIndex(0)}
          >
            Browse
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ` + (selectedIndex === 1 ? "active" : "")}
            onClick={() => handleIndex(1)}
          >
            Add Material Code
          </a>
        </li>
      </ul>
      <div className="tab-content">
        {selectedIndex === 0 ? (
          <MaterialCodeBrowse onEditMaterial={() => handleIndex(1)} />
        ) : (
          <AddMaterialCode
            onCancel={() => {
              handleIndex(0);
              dispatch(clearMaterialCodeEditId());
            }}
          />
        )}
      </div>
    </div>
  );
};

export default MaterialCodeIndex;
