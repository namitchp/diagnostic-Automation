import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearMaterialCodeEditId } from "../../../_redux/actions/masters/materialcode.action";
import AddMaterialCode from "./addMaterialCode";
import MaterialCodeBrowse from "./browse";

const MaterialCodeIndex = ({ type, browse_id }) => {
  const dispatch = useDispatch();
  const userRight = useSelector((state) => state.common.userRightResponse);
  const [selectedIndex, setSeletedIndex] = useState(0);

  const handleIndex = (index) => {
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
                <a className={`menu-link  `} onClick={() => handleIndex(0)}>
                  Browse
                </a>
              </li>
              {userRight?.insert_right && (
                <li
                  className={
                    "menu-item  " +
                    (selectedIndex === 1 ? "menu-level2-color" : "")
                  }
                >
                  <a className={`menu-link  `} onClick={() => handleIndex(1)}>
                    Add Material Code
                  </a>
                </li>
              )}
            </ul>
            <div className="tab-content">
              {selectedIndex === 0 ? (
                <MaterialCodeBrowse
                  onEditMaterial={() => handleIndex(1)}
                  browse_id={browse_id}
                  type={type}
                />
              ) : (
                <AddMaterialCode
                  type={type}
                  onCancel={() => {
                    handleIndex(0);
                    dispatch(clearMaterialCodeEditId());
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialCodeIndex;
