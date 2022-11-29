import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CommonController } from "../../../_redux/controller/common.controller";
import ContactPerson from "./contact_person";
import GeneralInfo from "./generalInfo";
import AccountTNC from "./tnc";
import { Button } from "@material-ui/core";
import { showErrorToast, showSuccessToast } from "../../../components/common";

const AddAccountMaster = () => {
  const selectedIdResponse = useSelector(
    (state) => state.AllReducersMaster.accountId
  );

  const [selectedIndex, setSeletedIndex] = useState(0);
  const [formData, setFormData] = useState({
    datetime: "",
    short_name: "",
    mobile: "",
    mark_engg: "",
    edit: "",
    hide: "",
    district: "",
    state: "",
    city: "",
    region_name: "",
    group_name: "",
    verified: null,
    company_id: "",
    company_name: "",
    group_id: "",
    address1: "",
    address2: "",
    pin_id: "",
    pin_code: "",
    region_id: "",
    phone1: "",
    phone2: "",
    fax: "",
    email: "",
    website: "",
    rating_id: "",
    rating_name: "",
    se_id: "",
    siem_engg: "",
    remarks: "",
    distance: "",
    credit_limit: "",
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
    user_id: localStorage.getItem("userId"),
    user_name: localStorage.getItem("userName"),
    new_identity: null,
    pf_id: "",
    exciseduty_id: "",
    salestax_id: "",
    freight_id: "",
    insurance_id: "",
    inspection_id: "",
    mode_of_dispatch_id: "",
    delivery_id: "",
    octroi_id: "",
    servicetax_id: "",
    travel_id: "",
    conveyance_id: "",
    loading_id: "",
    boarding_id: "",
    ld_id: "",
    validity_id: "",
    payment_id: "",
    finance_id: "",
    tcs_per: "",
    add_user_id: "",
    edit_user_id: "",
    edit_user_name: "",
    add_user_name: "",
    edatetime: "",
    cpersonList: [],
    partyList: [],
  });

  useEffect(() => {
    if (selectedIdResponse) {
      CommonController.commonApiCallFilter("Account/AccountMasterPreview", {
        company_id: selectedIdResponse,
      }).then((data) => {
        setFormData(data);
      });
    }
  }, [selectedIdResponse]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAutoChange = (key1, key2, value) => {
    let tempFormData = { ...formData };

    if (key1.trim() != "") {
      tempFormData[key1] = value?.id;
    }

    if (key2.trim() != "") {
      tempFormData[key2] = value?.value;
    }
    setFormData(tempFormData);
  };

  console.log(formData);

  const saveForm = () => {
    let _formData = { ...formData };

    if (selectedIdResponse) {
      _formData.user_id = localStorage.getItem("userId");
      _formData.user_name = localStorage.getItem("userName");
    }

    CommonController.commonApiCallFilter(
      "Account/AccountMasterInsert",
      _formData
    ).then((data) => {
      if (data.valid) {
        showSuccessToast(
          `Account Details ${
            selectedIdResponse ? "updated" : "saved"
          } successfully`
        );
      }
    });
  };

  return (
    <React.Fragment>
      <ul className="nav nav-tabs nav-tabs-line">
        <li className="nav-item">
          <a
            className={`nav-link ` + (selectedIndex === 0 ? "active" : "")}
            onClick={() => setSeletedIndex(0)}
          >
            General Infomation
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ` + (selectedIndex === 1 ? "active" : "")}
            onClick={() => setSeletedIndex(1)}
          >
            Contact Person
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ` + (selectedIndex === 2 ? "active" : "")}
            onClick={() => setSeletedIndex(2)}
          >
            Terms & Conditions
          </a>
        </li>
      </ul>
      <div className="tab-content pt-7">
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
            handleCPersonList={(arr) =>
              setFormData({ ...formData, cpersonList: arr })
            }
          />
        )}

        {selectedIndex === 2 && (
          <AccountTNC formData={formData} handleChange={handleChange} />
        )}
      </div>
      <div className="col-md-12 text-right">
        {selectedIndex !== 0 && (
          <Button
            variant="contained"
            className="mr-2"
            onClick={() => setSeletedIndex(selectedIndex - 1)}
            disableElevation
          >
            Back
          </Button>
        )}
        {selectedIndex !== 2 && (
          <Button
            variant="contained"
            onClick={() => setSeletedIndex(selectedIndex + 1)}
            color="primary"
            className="mr-2"
            disableElevation
          >
            Next
          </Button>
        )}

        <Button
          variant="contained"
          onClick={saveForm}
          color="primary"
          disableElevation
        >
          Submit
        </Button>
      </div>
    </React.Fragment>
  );
};

export default AddAccountMaster;
