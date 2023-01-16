import React, { useEffect, useState } from "react";
import GeneralProduct from "./general";
import { Button } from "@material-ui/core";
import OtherInformation from "./other";
import { useSelector } from "react-redux";
import { CommonController } from "../../../_redux/controller/common.controller";
import { showErrorToast, showSuccessToast } from "../../../components/common";
const AddNewProduct = () => {
  const selectedIdResponse = useSelector(
    (state) => state.AllReducersMaster.productId
  );
  const [selectedTab, setSelectedTab] = useState(0);
  const [formData, setFormData] = useState({
    product_id: "",
    product_code: "",
    category_id: "",
    category_name: " ",
    p_group_name: "",
    p_group_id: "",
    item_id: "",
    item_name: "",
    gg_id: "",
    description: " ",
    mlfb_no: "",
    grade: "",
    tax_rate: "",
    uom_id: "",
    uom: "",
    package: "",
    qty: "",
    list_price: "",
    margin: "",
    pur_rate: "",
    reorder_level: "",
    lp_ref: "",
    di: "",
    di_value: "",
    ai: "",
    ai_value: "",
    fc: "",
    fc_value: "",
    do: "",
    do_value: "",
    ao: "",
    ao_value: "",
    fm: "",
    fm_value: "",
    edit: "0",
    deactivate: "0",
    serial: "1",
    siemens_product: "0",
    user_id: localStorage.getItem("userId"),
    user_name: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleCheckChange = (key, value) => {
    setFormData({ ...formData, [key]: value ? "True" : "False" });
  };
  const handleAutoChange = (key1, key2, value) => {
    console.log(key1, key2, value);
    setFormData({ ...formData, [key1]: value.id, [key2]: value.value });
  };
  const onNext = () => {
    if (selectedTab === 0) {
      setSelectedTab(1);
    } else {
      onSubmit();
    }
  };
  const onSubmit = () => {
    CommonController.commonApiCallFilter(
      "Product/ProductMasterInsert",
      formData
    )
      .then((data) => {
        if (data.valid) {
          showSuccessToast(
            selectedIdResponse
              ? "Product updated successfully"
              : "Product inserted successfully"
          );
        } else {
          showErrorToast("something went wrong");
        }
      })
      .catch((err) => showErrorToast("something went wrong"));
  };

  const onBack = () => {
    setSelectedTab(0);
  };
  useEffect(() => {
    if (selectedIdResponse) {
      CommonController.commonApiCallFilter("Product/PreviewProductMaster", {
        product_id: selectedIdResponse,
      })
        .then((data) => {
          // setFormData(data);
          let tempData = { ...formData };
          for (let key in formData) {
            if (data.hasOwnProperty(key)) {
              tempData[key] = data[key];
            }
          }
          setFormData(tempData);
        })
        .catch((err) => {
          showErrorToast(err);
        });
    }
  }, [selectedIdResponse]);
  return (
    <div className="container-fluid mt-5">
      {/* {loading && <Loader />} */}
      <ul className="nav nav-tabs nav-tabs-line">
        <li className="nav-item">
          <a
            className={`nav-link ` + (selectedTab === 0 ? "active" : "")}
            onClick={() => setSelectedTab(0)}
          >
            General Information
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ` + (selectedTab === 1 ? "active" : "")}
            onClick={() => setSelectedTab(1)}
          >
            Technical Information
          </a>
        </li>
      </ul>
      <div className="tab-content mt-10">
        {selectedTab === 0 && (
          <GeneralProduct
            formData={formData}
            handleChange={handleChange}
            handleAutoChange={handleAutoChange}
            handleCheckChange={handleCheckChange}
          />
        )}
        {selectedTab === 1 && (
          <OtherInformation formData={formData} handleChange={handleChange} />
        )}
        <div className="w-100 text-right">
          {selectedTab === 1 && (
            <Button
              variant="contained"
              onClick={onBack}
              className="mr-3"
              color="primary"
              disableElevation
            >
              Back
            </Button>
          )}
          <Button
            variant="contained"
            onClick={onNext}
            color="primary"
            disableElevation
          >
            {selectedTab === 1 ? "Submit" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddNewProduct;
