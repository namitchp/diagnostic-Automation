import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import SalesOrderBrowse from "./browse";
const SalesSiDiIndex = () => {
  const dispatch = useDispatch();
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
                  " menu-item " +
                  (selectedIndex === 0 ? "menu-level2-color" : "")
                }
              >
                <a
                  className={
                    `menu-link ` +
                    (selectedIndex === 0 ? "submenu-link-color" : "")
                  }
                  onClick={() => handleIndex(0)}
                >
                  Browse
                </a>
              </li>
              <li
                className={
                  " menu-item " +
                  (selectedIndex === 1 ? "menu-level2-color" : "")
                }
              >
                <a
                  className={
                    `menu-link ` +
                    (selectedIndex === 1 ? "submenu-link-color" : "")
                  }
                  onClick={() => handleIndex(1)}
                >
                  New Sales Order
                </a>
              </li>
            </ul>
            <Container fluid className="p-0">
              <div className="inner_wrapper">
                {selectedIndex === 0 ? <SalesOrderBrowse /> : <h2>SL DI Form</h2>}
              </div>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesSiDiIndex;
