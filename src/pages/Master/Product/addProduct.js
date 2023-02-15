import React, { useEffect, useState } from "react";
import GeneralProduct from "./general";
import { Button } from "@material-ui/core";
import OtherInformation from "./other";
import { useSelector } from "react-redux";
import { CommonController } from "../../../_redux/controller/common.controller";
import { showErrorToast, showSuccessToast } from "../../../components/common";
import { Container } from "react-bootstrap";
import KeyboardArrowRightSharpIcon from '@mui/icons-material/KeyboardArrowRightSharp';
import KeyboardArrowLeftSharpIcon from '@mui/icons-material/KeyboardArrowLeftSharp';

const AddNewProduct = ({ goBrowse }) => {
  const selectedIdResponse = useSelector(
    (state) => state.AllReducersMaster.productId
  );
  const [selectedTab, setSelectedTab] = useState(0);
  const [formData, setFormData] = useState({
    product_id: 0,
    product_code: "",
    category_id: null,
    category_name: "",
    p_group_name: "",
    p_group_id: null,
    item_id: null,
    item_name: "",
    gg_id: null,
    description: "",
    mlfb_no: "",
    grade: "",
    tax_rate: null,
    uom_id: null,
    uom: "",
    package: "",
    qty: null,
    list_price: null,
    margin: null,
    pur_rate: null,
    reorder_level: null,
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
    user_name: localStorage.getItem("userName"),
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleCheckChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };
  const handleAutoChange = (key1, key2, value) => {
    console.log(key1, key2, value);
    setFormData({ ...formData, [key1]: value[key1], [key2]: value[key2] });
  };
  const onNext = () => {
    if (formData?.mlfb_no == "") {
      showErrorToast("Please Enter Unice Mlfb No");
    } else {
      setSelectedTab(1);
    }
  };
  const onSubmit = () => {
    CommonController.commonApiCallFilter(
      "master/insert_product_master",
      formData,
      "post",
      "node"
    )
      .then((data) => {
        if (data.status === 200) {
          goBrowse();
          showSuccessToast(
            selectedIdResponse.id
              ? "Product updated successfully"
              : "Product inserted successfully"
          );
        } else {
          showErrorToast(data.message.originalError.info.message);
        }
      })
      .catch((err) => showErrorToast("something went wrong"));
  };
  console.log(formData);
  const onBack = () => {
    setSelectedTab(0);
  };
  useEffect(() => {
    if (selectedIdResponse) {
      CommonController.commonApiCallFilter(
        "master/preview_product_master",
        {
          product_id: selectedIdResponse?.id,
        },
        "post",
        "node"
      )
        .then((data) => {
          const value = data.data;
          let tempData = { ...formData };
          for (let key in formData) {
            if (value.hasOwnProperty(key)) {
              tempData[key] = value[key];
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
    <Container fluid>
      <div className="inner_data_wrapper">
        {/* {loading && <Loader />} */}
        <ul className="nav nav-tabs nav-tabs-line">
          <li
            className={
              "menu-item " + (selectedTab === 0 ? "menu-level2-color" : "")
            }
          >
            <a
              className={
                `menu-link ` + (selectedTab === 0 ? "submenu-link-color" : "")
              }
              onClick={() => setSelectedTab(0)}
            >
              General Information
            </a>
          </li>
          <li
            className={
              "menu-item " + (selectedTab === 1 ? "menu-level2-color" : "")
            }
          >
            <a
              className={
                `menu-link ` + (selectedTab === 1 ? "submenu-link-color" : "")
              }
              onClick={() => setSelectedTab(1)}
            >
              Technical Information
            </a>
          </li>
        </ul>
        <div className="tab-content inner_third_level">
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
                className="bg-primary text-white me-3"
                color="primary"
                disableElevation
              >
                <KeyboardArrowLeftSharpIcon /> Back
              </Button>
            )}
            {selectedTab === 0 && (
              <Button
                variant="contained"
                onClick={onNext}
                color="primary"
                disableElevation
                className="bg-primary text-white"
              >
                Next <KeyboardArrowRightSharpIcon />
              </Button>
            )}
            {selectedIdResponse?.type == "preview"
              ? ""
              : selectedTab === 1 && (
                  <Button
                    variant="contained"
                    onClick={onSubmit}
                    color="primary"
                    disableElevation
                    className="bg-success text-white"
                  >
                    Submit
                  </Button>
                )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AddNewProduct;
