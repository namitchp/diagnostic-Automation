import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import { showErrorToast, showSuccessToast } from "../../../components/common";
import { CommonController } from "../../../_redux/controller/common.controller";
import GeneralInfoEmp from "./general";
import OtherDetails from "./other";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import KeyboardArrowLeftSharpIcon from '@mui/icons-material/KeyboardArrowLeftSharp';
import KeyboardArrowRightSharpIcon from '@mui/icons-material/KeyboardArrowRightSharp';

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
    ctc_per_day: null,
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
    department_id: null,
    designation_name: "",
    designation_id: null,
    joining_date: null,
    leaving_date: null,
    leaving_reason: "",
    dispensary: "",
    remarks: "",
    department_incharge: "",
    department_inch_id: null,
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
    login_user_id: null,
    login_user_name: "",
    sign_path: "",
    userRight: [],
  });
  useEffect(() => {
    if (selectedIdResponse) {
      CommonController.commonApiCallFilter(
        "master/preview_employee_master",
        {
          user_id: selectedIdResponse?.id,
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
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleDateChange = (name, date) => {
    setFormData({ ...formData, [name]: date });
  };
  const handleAutoChange = (id, name, value, misId, misName) => {
    if (id.trim() != "") {
      setFormData({ ...formData, [id]: value[misId] });
    }
    if (name.trim() != "") {
      setFormData({ ...formData, [name]: value[misName] });
    }
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
    CommonController.commonApiCallFilter(
      "master/dropdown_employee",
      "",
      "post",
      "node"
    )
      .then((data) => {
        console.log(data);
        setListValues({
          empList: data.department,
          desgnList: data.designation,
          depInchrList: data.incharge,
        });
      })
      .catch((err) => {
        showErrorToast(err);
      });
  }, []);
  const onNext = () => {
    setSelectedTab(1);
  };
  const onBack = () => {
    setSelectedTab(0);
  };
  const onSubmit = () => {
    CommonController.commonApiCallFilter(
      "master/insert_employee_master",
      formData,
      "post",
      "node"
    )
      .then((data) => {
        if (data.status === 200) {
          showSuccessToast(
            `Employee ${
              selectedIdResponse?.id ? "updated" : "created"
            } successfully`
          );
        }
      })
      .catch((err) => {
        showErrorToast(err);
      });
  };
  return (
    <Container className="p-0" fluid>
      <div className="inner_wrapper">
        <div className="inner_data_wrapper pt-3">
          {/* {loading && <Loader />} */}
          <ul className="nav nav-tabs nav-tabs-line">
            <li
              className={
                " menu-item " + (selectedTab === 0 ? "menu-level2-color" : "")
              }
            >
              <a className={`menu-link  `} onClick={() => handleTabChange(0)}>
                General Information
              </a>
            </li>
            <li
              className={
                " menu-item " + (selectedTab === 1 ? "menu-level2-color" : "")
              }
            >
              <a className={`menu-link `} onClick={() => handleTabChange(1)}>
                Other Details
              </a>
            </li>
          </ul>
          <div className="tab-content inner_third_level">
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
                  className="mr-3 bg-primary text-white"
                  color="primary"
                  disableElevation
                >
                  Back <KeyboardArrowLeftSharpIcon />
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
              {selectedTab === 1 && (
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
      </div>
    </Container>
  );
};

export default AddEmployee;
