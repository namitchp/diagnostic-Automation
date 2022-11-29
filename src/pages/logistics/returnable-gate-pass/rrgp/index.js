import React, { useState } from "react";
import RgpAdd from "./add";
import RrgpAdd from "./add";
import MrnAddDc from "./add";
import RrgpBrowse from "./browse";
import RgpBrowseDc from "./browse";
import MrnBrowseDc from "./browse";

export default function RrgpIndex() {
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
            Return Of Returnable Gate Pass{" "}
          </a>
        </li>
      </ul>
      <div className="tab-content">
        {selectedIndex === 0 ? <RrgpBrowse /> : <RrgpAdd/>}
      </div>
    </div>
  );
}
