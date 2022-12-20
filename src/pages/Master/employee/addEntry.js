import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import { showErrorToast, showSuccessToast } from "../../../components/common";
import { CommonController } from "../../../_redux/controller/common.controller";
import GeneralInfoEmp from "./general";
import OtherDetails from "./other";
import { useSelector } from "react-redux";
const AddEmployee = ({ onClose }) => {
  const selectedIdResponse = useSelector(
    (state) => state.AllReducersMaster.employeeId
  );
  const [selectedTab, setSelectedTab] = useState(0);
  const [listValues, setListValues] = useState({
    empList: [],
    desgnList: [],
    depInchrList: [],
  });

  const [formData, setFormData] = useState({
    pr_check: false,
    user_id: 0,
    user_code: "",
    attendance_emp_code: "",
    ctc_per_day: "",
    card_no: "",
    short_name: "",
    first_name: "",
    last_name: "",
    f_h_name: "",
    mother_name: "",
    m_status: "",
    gender: "",
    dob: null,
    pr_add1: "",
    pr_phone: "",
    pr_mobile: "",
    pt_add1: "",
    pt_phone: "",
    pt_mobile: "",
    department_name: "",
    designation_name: "",
    joining_date: null,
    leaving_date: null,
    leaving_reason: "",
    dispensary: "",
    remarks: "",
    department_incharge: "",
    user_name: "",
    password: "",
    email: "",
    pf_code: "",
    esi_code: "",
    pan_no: "",
    salary_p_mode: 1,
    account_no: "",
    bank_name: "",
    nominee: "",
    edit_button: "",
    disable: "",
    login_user_id: "",
    login_user_name: "",
    sign_path: "",
  });

  useEffect(() => {
    if (selectedIdResponse) {
      CommonController.commonApiCallFilter("Employee/EmployeeMasterPreview", {
        user_id: selectedIdResponse,
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (name, date) => {
    setFormData({ ...formData, [name]: date });
  };

  const handleAutoChange = (name, value) => {
    setFormData({ ...formData, [name]: value ? value.value : null });
  };

  const getAutoValue = (key, arr, val) => {
    const value = arr.filter((x) => x[key] === val);
    return value && value.length > 0 ? value[0] : null;
  };

  const handleTabChange = (index) => {
    setSelectedTab(index);
  };

  const setPRAddress = (e) => {
    if (e.target.checked) {
      setFormData({
        ...formData,
        pr_check: e.target.checked,
        pr_add1: formData.pt_add1,
      });
    } else {
      setFormData({
        ...formData,
        pr_check: e.target.checked,
        pr_add1: "",
      });
    }
  };

  useEffect(() => {
    CommonController.commonApiCallFilter("Employee/EmployeeMasterDropdown")
      .then((data) => {
        setListValues({
          empList: data.empList,
          desgnList: data.desgnList,
          depInchrList: data.depInchrList,
        });
      })
      .catch((err) => {
        showErrorToast(err);
      });
  }, []);

  const onNext = () => {
    if (selectedTab === 0) {
      setSelectedTab(1);
    } else {
      onSubmit();
    }
  };

  const onBack = () => {
    setSelectedTab(0);
  };

  const onSubmit = () => {
    CommonController.commonApiCallFilter(
      "Employee/EmployeeMasterInsert",
      formData
    )
      .then((data) => {
        if (data.valid) {
          showSuccessToast(
            `Employee ${
              selectedIdResponse ? "updated" : "created"
            } successfully`
          );
        }
      })
      .catch((err) => {
        showErrorToast(err);
      });
  };

  return (
    <div className="container-fluid mt-5 pt-5">
      {/* {loading && <Loader />} */}
      <ul className="nav nav-tabs nav-tabs-line">
        <li className="nav-item">
          <a
            className={`nav-link ` + (selectedTab === 0 ? "active" : "")}
            onClick={() => handleTabChange(0)}
          >
            General Information
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ` + (selectedTab === 1 ? "active" : "")}
            onClick={() => handleTabChange(1)}
          >
            Other Details
          </a>
        </li>
      </ul>
      <div className="tab-content mt-10">
        {selectedTab === 0 && (
          <GeneralInfoEmp
            formData={formData}
            handleChange={handleChange}
            handleDateChange={handleDateChange}
            handleAutoChange={handleAutoChange}
            getAutoValue={getAutoValue}
            listValues={listValues}
            onCheckChange={setPRAddress}
          />
        )}
        {selectedTab === 1 && (
          <OtherDetails formData={formData} handleChange={handleChange} />
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

export default AddEmployee;
