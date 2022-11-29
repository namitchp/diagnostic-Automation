import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { SimpleTable } from "../../../components/basic-table";
import { CommonController } from "../../../_redux/controller/common.controller";

const ContactPerson = ({ formData, handleChange, handleCPersonList }) => {
  const columns = [
    {
      id: "cperson",
      numeric: false,
      disablePadding: true,
      label: "Name",
    },
    {
      id: "department_name",
      numeric: false,
      disablePadding: true,
      label: "Department ",
    },
    {
      id: "designation_name",
      numeric: false,
      disablePadding: true,
      label: "Designation",
    },
    {
      id: "mobile",
      numeric: false,
      disablePadding: true,
      label: "Mobile",
    },
    {
      id: "email",
      numeric: false,
      disablePadding: true,
      label: "Email",
    },
    {
      id: "phone",
      numeric: false,
      disablePadding: true,
      label: "Phone",
    },
    {
      id: "",
      numeric: false,
      disablePadding: true,
      label: "Actions",
    },
  ];

  const [dropDownValues, setDropDownValues] = useState({
    departmentList: [],
    designationList: [],
  });

  const handleRemoveContact = (id) => {
    let personList = formData.cpersonList;
    const itemIndex = personList.findIndex((x) => x.contact_id === id);
    if (itemIndex > -1) {
      personList.splice(itemIndex, 1);
      handleCPersonList(personList);
    }
  };

  useEffect(() => {
    CommonController.commonApiCallFilter(
      "Dropdown/AccountContactDropdown"
    ).then((data) => {
      const list = {
        departmentList: data.departmentList,
        designationList: data.designationList,
      };
      setDropDownValues(list);
    });
  }, []);

  return (
    <div className="row">
      <div className="col-md-4 mb-5">
        <TextField
          label="Company Name"
          fullWidth
          variant="outlined"
          name="company_name"
          value={formData.company_name}
          size="small"
          onChange={handleChange}
        />
      </div>
      <div className="col-md-4 mb-5">
        <TextField
          label="Contact ID"
          fullWidth
          variant="outlined"
          name="contact_id"
          value={formData.contact_id}
          size="small"
          onChange={handleChange}
        />
      </div>
      <div className="col-md-4 mb-5">
        <TextField
          label="Contact Name"
          fullWidth
          variant="outlined"
          name="contact_name"
          value={formData.contact_name}
          size="small"
          onChange={handleChange}
        />
      </div>
      <div className="col-md-4 mb-5">
        <Autocomplete
          size="small"
          options={dropDownValues.departmentList}
          getOptionLabel={(option) => option.value}
          fullWidth
          variant="outlined"
          renderInput={(params) => (
            <TextField {...params} label="Department" variant="outlined" />
          )}
        />
      </div>
      <div className="col-md-4 mb-5">
        <Autocomplete
          size="small"
          options={dropDownValues.designationList}
          getOptionLabel={(option) => option.value}
          fullWidth
          variant="outlined"
          renderInput={(params) => (
            <TextField {...params} label="Designation" variant="outlined" />
          )}
        />
      </div>
      <div className="col-md-4 mb-5">
        <TextField
          label="Mobile"
          fullWidth
          variant="outlined"
          name="mobile"
          value={formData.mobile}
          size="small"
          onChange={handleChange}
        />
      </div>
      <div className="col-md-4 mb-5">
        <TextField
          label="Email"
          fullWidth
          variant="outlined"
          name="email"
          value={formData.email}
          size="small"
          onChange={handleChange}
        />
      </div>
      <div className="col-md-4 mb-5">
        <TextField
          label="Phone"
          fullWidth
          variant="outlined"
          name="phone"
          value={formData.phone}
          size="small"
          onChange={handleChange}
        />
      </div>
      <div className="col-md-4 mb-5">
        <TextField
          label="Extn."
          fullWidth
          variant="outlined"
          name="contact_name"
          value={formData.contact_name}
          size="small"
          onChange={handleChange}
        />
      </div>
      <div className="col-md-12 mb-3">
        <SimpleTable
          columns={columns}
          rows={formData.cpersonList}
          onDelete={handleRemoveContact}
        />
      </div>
    </div>
  );
};

export default ContactPerson;
