import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CommonController } from "../../../_redux/controller/common.controller";
import ContactPerson from "./contact_person";
import GeneralInfo from "./generalInfo";
import AccountTNC from "./tnc";
import { Button } from "@material-ui/core";
import { showErrorToast, showSuccessToast } from "../../../components/common";
import KeyboardArrowLeftSharpIcon from '@mui/icons-material/KeyboardArrowLeftSharp';
import KeyboardArrowRightSharpIcon from '@mui/icons-material/KeyboardArrowRightSharp';
const AddAccountMaster = ({ handleAddAccount }) => {
  const selectedIdResponse = useSelector(
    (state) => state.AllReducersMaster.accountId
  );
  console.log(selectedIdResponse);
  const [selectedIndex, setSeletedIndex] = useState(0);
  const [dropdownList, setdropdownList] = useState(null);
  const [formData, setFormData] = useState({
    company_id: 0,
    company_name: "",
    short_name: "",
    group_id: null,
    group_name: "",
    address1: "",
    address2: "",
    pin_id: null,
    pin_code: "",
    region_id: null,
    region_name: "",
    phone1: "",
    phone2: "",
    mobile: "",
    fax: "",
    email: "",
    website: "",
    rating_id: null,
    rating_name: "",
    // mark_engg :"",
    name: "",
    se_id: null,
    Engg_name: "",
    // sim_enng
    remarks: "",
    distance: "",
    credit_limit: null,
    credit_period: "",
    range: "",
    division: "",
    comm: "",
    ecc_no: "",
    ser_tax_no: "",
    pan_no: "",
    tin_no: "",
    cst_no: "",
    lst_no: "",
    pla_no: "",
    edit: "",
    hide: "",
    boarding_id: null,
    delivery_id: null,
    exciseduty_id: null,
    finance_id: null,
    freight_id: null,
    insurance_id: null,
    inspection_id: null,
    ld_id: null,
    loading_id: null,
    mode_of_dispatch_id: null,
    octroi_id: null,
    payment_id: null,
    pf_id: null,
    salestax_id: null,
    servicetax_id: null,
    validity_id: null,
    conveyance_id: null,
    travel_id: null,
    user_name: localStorage.getItem("userName"),
    user_id: localStorage.getItem("userId"),
    account_type: "",
    cpersonList: [],
    partyList: [],
  });
  useEffect(() => {
    CommonController.commonApiCallFilter(
      "master/dropdown_term_and_condition",
      {},
      "post",
      "node"
    ).then((data) => {
      console.log(data);
      const list = {
        pfList: data.pf,
        exciseDutyList: data.exciseDuty,
        salesTaxList: data.saleTax,
        freightList: data.freight,
        insuranceList: data.insurance,
        inspectionList: data.inspection,
        modList: data.modeOfDispatch,
        deliveryList: data.delivery,
        octroiList: data.octroi,
        servicetaxList: data.serviceTax,
        travelChgrList: data.travel,
        conveyanceList: data.conveyance,
        loadingList: data.loading,
        boardingList: data.boarding,
        validityList: data.validity,
        paymentList: data.payment,
        financeList: data.finance,
        ldList: data.ld,
      };
      setdropdownList(list);
    });
  }, []);
  useEffect(() => {
    if (selectedIdResponse) {
      CommonController.commonApiCallFilter(
        "master/preview_account_master",
        {
          company_id: selectedIdResponse?.id,
        },
        "post",
        "node"
      ).then((data) => {
        let value = data.data;
        let tempData = { ...formData };
        for (let key in formData) {
          console.log(value);
          if (value.hasOwnProperty(key)) {
            console.log(value.hasOwnProperty(key));
            tempData[key] = value[key];
          }
        }
        setFormData(tempData);
      });
    }
  }, [selectedIdResponse]);
  console.log(formData);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleAutoChange = (key1, key2, value) => {
    let tempFormData = { ...formData };

    if (key1.trim() != "") {
      tempFormData[key1] = value[key1];
    }

    if (key2.trim() != "") {
      tempFormData[key2] = value[key2];
    }
    setFormData(tempFormData);
  };
  const saveForm = () => {
    let _formData = { ...formData };

    if (selectedIdResponse) {
      _formData.user_id = localStorage.getItem("userId");
      _formData.user_name = localStorage.getItem("userName");
    }
    CommonController.commonApiCallFilter(
      "master/insert_account_master",
      _formData,
      "post",
      "node"
    ).then((data) => {
      if (data.status === 200) {
        handleAddAccount();
        showSuccessToast(
          `Account Details ${
            selectedIdResponse ? "updated" : "saved"
          } successfully`
        );
      } else {
        showErrorToast("something went wrong");
      }
    });
  };

  return (
    <div className="inner_data_wrapper pt-3">
      <ul className="nav border-0 nav-tabs nav-tabs-line">
        <li
          className={
            " menu-item border-bottom-0 rounded mr-2 " +
            (selectedIndex === 0 ? "menu-level2-color" : "")
          }
        >
          <a className={`menu-link`} onClick={() => setSeletedIndex(0)}>
            General Infomation
          </a>
        </li>
        <li
          className={
            " menu-item  border-bottom-0 rounded mr-2 " +
            (selectedIndex === 1 ? "menu-level2-color" : "")
          }
        >
          <a className={`menu-link`} onClick={() => setSeletedIndex(1)}>
            Contact Person
          </a>
        </li>
        <li
          className={
            " menu-item border-bottom-0 rounded mr-2 " +
            (selectedIndex === 2 ? "menu-level2-color" : "")
          }
        >
          <a className={`menu-link`} onClick={() => setSeletedIndex(2)}>
            Terms & Conditions
          </a>
        </li>
      </ul>
      <div className="tab-content inner_third_level">
        {selectedIndex === 0 && (
          <GeneralInfo
            formData={formData}
            handleChange={handleChange}
            handleAutoChange={handleAutoChange}
          />
        )}
        {selectedIndex === 1 && (
          <ContactPerson
            formData={formData}
            handleChange={handleChange}
            handleAutoChange={handleAutoChange}
            removeIndex={(data) =>
              setFormData({ ...formData, cpersonList: data })
            }
            handleCPersonList={(arr) => {
              let cperson = { ...formData };
              cperson.cpersonList.push(arr);
              console.log(cperson);
              setFormData(cperson);
            }}
          />
        )}

        {selectedIndex === 2 && (
          <AccountTNC
            formData={formData}
            handleChange={handleChange}
            list={dropdownList}
          />
        )}
      </div>
      <div className="col-md-12 text-right p-0">
        {selectedIndex !== 0 && (
          <Button
            variant="contained"
            className="mt-4 bg-primary text-white me-3"
            onClick={() => setSeletedIndex(selectedIndex - 1)}
            disableElevation
          >
            <KeyboardArrowLeftSharpIcon  /> 
            Back
          </Button>
        )}
        {selectedIndex !== 2 && (
          <Button
            variant="contained"
            onClick={() => setSeletedIndex(selectedIndex + 1)}
            color="primary"
            className="mt-4 bg-primary text-white"
            disableElevation
          >
            Next <KeyboardArrowRightSharpIcon />
          </Button>
        )}
        {selectedIdResponse?.type === "preview"
          ? ""
          : selectedIndex === 2 && (
              <Button
                variant="contained"
                onClick={saveForm}
                color="primary"
                disableElevation
                className="bg-success text-white mt-4"
              >
                Submit
              </Button>
            )}
      </div>
    </div>
  );
};
export default AddAccountMaster;
