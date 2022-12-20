import React, { useState } from "react";
import { useDispatch } from "react-redux";
import AddItemGroupMaster from "./addItem";
import ItemGroupBrowse from "./browse";
// import AddMaterialCode from "./addMaterialCode";
// import MaterialCodeBrowse from "./browse";
const ItemGroupIndex = () => {
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
              //   dispatch(clearSelectedComboId());
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
              //   dispatch(clearSelectedComboId());
              handleIndex(1);
            }}
          >
            New Item Group
          </a>
        </li>
      </ul>
      <div className="tab-content">
        {
          selectedIndex === 0 ? (
            <ItemGroupBrowse onEdit={() => handleIndex(1)} />
          ) : (
            <AddItemGroupMaster />
          )
          //   <AddComboMLFB onClose={() => handleIndex(0)} />
        }
      </div>
    </div>
  );
};

export default ItemGroupIndex;
