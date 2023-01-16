import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CommonController } from "../../../_redux/controller/common.controller";
import ContactPerson from "./contact_person";
import GeneralInfo from "./generalInfo";
import AccountTNC from "./tnc";
import { Button } from "@material-ui/core";
import { showErrorToast, showSuccessToast } from "../../../components/common";
const AddAccountMaster = ({handleAddAccount}) => {
  const selectedIdResponse = useSelector(
    (state) => state.AllReducersMaster.accountId
  );
  console.log(selectedIdResponse)
  const [selectedIndex, setSeletedIndex] = useState(0);
  const [dropdownList, setdropdownList] = useState([])
  const [formData, setFormData] = useState({
    company_id:0,
    company_name:"",  
    short_name:"",
    group_id :"", 
    group_name:"",
    address1 :"",  
    address2 :"",  
    pin_id :"",  
    pin_code:"",  
    region_id :"",  
    region_name:"",  
    phone1:"",  
    phone2:"",  
    mobile:"",  
    fax:"",  
    email :"",  
    website :"",  
    rating_id:"",  
    rating_name :"",  
    // mark_engg :"",  
    name:"",
    se_id:"",  
    Engg_name :"",  
    // sim_enng
    remarks:"" ,  
    distance:"",  
    credit_limit :null,  
    credit_period:"",  
    range:"",  
    division:"",  
    comm:"",  
    ecc_no:"",  
    ser_tax_no:"",  
    pan_no:"",  
    tin_no:"",  
    cst_no:"",  
    lst_no:"",  
    pla_no:"",  
    edit:"",  
    hide:"",  
    boarding_id:"",  
    delivery_id:"",  
    exciseduty_id:"",  
    finance_id:"",  
    freight_id:"",  
    insurance_id :"",  
    inspection_id :"",  
    ld_id:"",  
    loading_id:"",  
    mode_of_dispatch_id:"",  
    octroi_id:"",  
    payment_id:"",  
    pf_id:"",  
    salestax_id:"",  
    servicetax_id:"",  
    validity_id:"",  
    conveyance_id:"",  
    travel_id:"",  
    user_name: localStorage.getItem("userName"),
    user_id: localStorage.getItem("userId"),
    account_type:"",
    cpersonList: [],
    partyList: [],
  });
  useEffect(() => {
    CommonController.commonApiCallFilter(
      "master/dropdown_term_and_condition",{},"post","node"
    ).then((data) => {
      console.log(data)
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
    console.log(value[key1])
    console.log(value)
    console.log(key1)
    console.log(key2)
    let tempFormData = { ...formData };

    if (key1.trim() != "") {
      tempFormData[key1] = value[key1];
    }

    if (key2.trim() != "") {
      tempFormData[key2] = value[key2]
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
      _formData,"post","node"
    ).then((data) => {
      if (data.status===200) {
        handleAddAccount()
        showSuccessToast(
          `Account Details ${
            selectedIdResponse ? "updated" : "saved"
          } successfully`
        );
      }else {
        showErrorToast("something went wrong");
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
            removeIndex={(data)=>setFormData({...formData,cpersonList:data})}
            handleCPersonList={(arr) =>{
              let cperson={...formData};
              cperson.cpersonList.push(arr);
              console.log(cperson);
              setFormData(cperson);
            }
            }
          />
        )}

        {selectedIndex === 2 && (
          <AccountTNC formData={formData} handleChange={handleChange} list={dropdownList} />
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

     {selectedIndex==2&&<Button
          variant="contained"
          onClick={saveForm}
          color="primary"
          disableElevation
        >
          Submit
        </Button>
        }   
      </div>
    </React.Fragment>
  );
};

export default AddAccountMaster;
