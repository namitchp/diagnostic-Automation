import {
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { SimpleTable } from "../../../components/basic-table";
import { showSuccessToast } from "../../../components/common";
import { CommonController } from "../../../_redux/controller/common.controller";
const ContactPerson = ({ formData, handleChange,removeIndex, handleCPersonList }) => {
  const filterList = useSelector(
    (state) => state.AccountMaster.accountFilterList
  );
  console.log(filterList)
const [formContact, setformContact] = useState({
  cperson_name:"",
  company_name:"",
  department_id:"",
  department_name:"",
  designation_name:"",
  designation_id:"",
  mobile:"",
  email:"",
  phone:"",
  extn:"", 
  vcard_path:"",
})

const uploadImage=async(e)=>{
  let value = e.target.files[0];
  let formData = new FormData();
  formData.append("file_path", value);
  const response=await CommonController.imageUpoad("master/file",formData)
  if(response.status===200){
    showSuccessToast("Image Upload successfully")
    setformContact({...formContact,vcard_path:response.file_name.filename})
    console.log(response)
  }
 
}
  const columns = [
    {
      id: "cperson_name",
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
      label: "Extn",
    },
  ];
  const [dropDownValues, setDropDownValues] = useState({
    departmentList: [],
    designationList: [],
  });
  const handleSaveForm=()=>{
    handleCPersonList(formContact);

  }
  const handleOnChange=(e,value)=>{
  setformContact({...formContact,[e.target.name]:e.target.value})
if(e.target.role==="option"){
  setformContact({...formContact,department_name:value.department_name,department_id:value.department_id})
}
  }
  const handleRemoveContact = (id) => {
    let personList = formData.cpersonList;
    const itemIndex = personList.findIndex((x) => x === id);
    console.log(itemIndex)
    if (itemIndex > -1) {
      personList.splice(itemIndex, 1);
      removeIndex(personList);
    }
  };
  useEffect(() => {
    if(filterList?.listengg?.length>0)
    {
        const values = {
          departmentList: filterList.department,
          designationList: filterList.designation,
        };
        setDropDownValues(values);
      }
  }, [filterList]);

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
          disabled
          fullWidth
          variant="outlined"
          name="contact_id"
          value={formData.contact_id}
          size="small"
          onChange={handleOnChange}
        />
      </div>
      <div className="col-md-4 mb-5">
        <TextField
          label="Contact Name"
          fullWidth
          variant="outlined"
          name="cperson_name"
          value={formContact.cperson_name}
          size="small"
          onChange={handleOnChange}
        />
      </div>
      <div className="col-md-4 mb-5">
        <Autocomplete
          size="small"
          options={dropDownValues.departmentList}
          getOptionLabel={(option) => option.department_name}
          onChange={handleOnChange}
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
          getOptionLabel={(option) => option.designation_name}
          fullWidth
          onChange={(e,value)=>setformContact({...formContact,designation_name:value.designation_name,designation_id:value.designation_id})}
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
          value={formContact.mobile}
          size="small"
          onChange={handleOnChange}
        />
      </div>
      <div className="col-md-4 mb-5">
        <TextField
          label="Email"
          fullWidth
          variant="outlined"
          name="email"
          value={formContact.email}
          size="small"
          onChange={handleOnChange}
        />
      </div>
      <div className="col-md-4 mb-5">
        <TextField
          label="Phone"
          fullWidth
          variant="outlined"
          name="phone"
          value={formContact.phone}
          size="small"
          onChange={handleOnChange}
        />
      </div>
      <div className="col-md-4 mb-5">
        <TextField
          label="Extn."
          fullWidth
          variant="outlined"
          name="extn"
          value={formContact.extn}
          size="small"
          onChange={handleOnChange}
        />
      </div>
      <div className="col-md-2 mb-2">
        <InputLabel htmlFor="file-upload" style={{ cursor: "pointer" }} >
        Company Card
        </InputLabel>
        <Input
        id="file-upload"
        type="file"
        // style={{ display: "none" }}
          label="Extn."
          fullWidth
          // variant="outlined"
          name="contact_name"
          value={formData.contact_name}
          size="small"
          onChange={uploadImage}
        />
      </div>
      <div className="col-md-2 mt-5 ml-5 pt-4 ">
      <Button
          variant="contained"
          onClick={handleSaveForm}
          color="primary"
          disableElevation
        >
          Save
        </Button>
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
