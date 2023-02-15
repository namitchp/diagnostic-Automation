import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
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
    <div className="main_wrapper">
      <div className="inner_main_first">
        <div className="inner_main_second">
          <div className="inner_main_third">
            <ul className="nav nav-tabs nav-tabs-line">
              <li
                className={
                  "menu-item border-bottom-0 rounded mr-2 " +
                  (selectedIndex === 0 ? "menu-level2-color" : "")
                }
              >
                <a className="menu-link" onClick={() => handleIndex(0)}>
                  Browse
                </a>
              </li>
              {userRight?.insert_right && (
                <li
                  className={
                    "menu-item  border-bottom-0 rounded mr-2 " +
                    (selectedIndex === 1 ? "menu-level2-color" : "")
                  }
                >
                  <a className="menu-link" onClick={() => handleIndex(1)}>
                    New Product
                  </a>
                </li>
              )}
            </ul>
            <Container className="p-0" fluid>
              <div className="inner_wrapper">
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
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductMasterIndex;
