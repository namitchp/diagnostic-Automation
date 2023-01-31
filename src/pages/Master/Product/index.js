import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryList } from "../../../_redux/actions/masters/product.action";
import AddNewProduct from "./addProduct";
import BrowseProductMaster from "./browse";
const ProductMasterIndex = ({ siemens, browse_id }) => {
  const selectedIdResponse = useSelector(
    (state) => state.AllReducersMaster.productId
  );
  const userRight = useSelector((state) => state.common.userRightResponse);
  const dispatch = useDispatch();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleIndex = (index) => {
    setSelectedIndex(index);
  };
console.log(selectedIdResponse);
  useEffect(() => {
    // dispatch(getProductListBrowse(params, productMasterFilter));
    dispatch(getCategoryList());
    // dispatch(getLPRefList());
    // dispatch(getGGNameList());
  }, []);
  return (
    <React.Fragment>
      <div className="card card-custom gutter-b  px-7 py-3">
        <ul className="nav nav-tabs nav-tabs-line">
          <li
            className={
              "menu-item mb-2  border-bottom-0 rounded mr-2 " +
              (selectedIndex === 0 ? "menu-level2-color" : "")
            }
          >
            <a
              className={`menu-link py-2 px-4 rounded d-inline-block  fw-bold `}
              onClick={() => handleIndex(0)}
            >
              Browse
            </a>
          </li>
        {userRight?.insert_right&&  <li
            className={
              "menu-item mb-2  border-bottom-0 rounded mr-2 " +
              (selectedIndex === 1 ? "menu-level2-color" : "")
            }
          >
            <a
              className={`menu-link py-2 px-4 rounded d-inline-block  fw-bold `}
              onClick={() => handleIndex(1)}
            >
              New Product
            </a>
          </li>}
        </ul>
        <div className="tab-content">
          {selectedIndex === 0 ? (
            <BrowseProductMaster
              onEdit={() => handleIndex(1)}
              browse_id={browse_id}
              siemens={siemens}
            />
          ) : (
            <AddNewProduct goBrowse={() => setSelectedIndex(0)} />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductMasterIndex;
