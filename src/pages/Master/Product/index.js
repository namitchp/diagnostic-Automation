import React, { useState } from "react";
import AddNewProduct from "./addProduct";
import BrowseProductMaster from "./browse";

const ProductMasterIndex = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleIndex = (index) => {
    setSelectedIndex(index);
  };

  return (
    <React.Fragment>
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
              New Product
            </a>
          </li>
        </ul>
        <div className="tab-content">
          {selectedIndex === 0 ? (
            <BrowseProductMaster onEdit={() => handleIndex(1)} />
          ) : (
            <AddNewProduct />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductMasterIndex;
