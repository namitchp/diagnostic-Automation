import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  MenuItem,
  TextField,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { DatePicker } from "@material-ui/pickers";
import moment from "moment";
import React from "react";

const GeneralInfoEmp = ({
  formData,
  handleChange,
  handleDateChange,
  handleAutoChange,
  getAutoValue,
  listValues,
  onCheckChange,
}) => {
  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-md-12">
          <FormGroup className="flex-row justify-content-end col-8">
            <FormControlLabel
              label="Edit"
              checked={formData?.edit === true}
              control={<Checkbox color="primary" />}
              // onChange={(e) => handleCheckChange("edit", e.target.checked)}
            />
            <FormControlLabel
              label="Disable"
              checked={formData.deactivate === true}
              control={<Checkbox color="primary" />}
              // onChange={(e) =>
              // handleCheckChange("deactivate", e.target.checked)
              // }
            />
          </FormGroup>
        </div>
        <div className="col-md-5">
          <div className="row">
            <div className="col-md-6 mb-4">
              <TextField
                variant="outlined"
                fullWidth
                disabled
                value={formData.user_id}
                size="small"
                name="user_id"
                label="Employee ID"
              />
            </div>
            <div className="col-md-6 mb-4">
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                onChange={handleChange}
                name={"attendance_emp_code"}
                value={formData.attendance_emp_code}
                label="Attendance Code"
              />
            </div>
            <div className="col-md-6 mb-4">
              <TextField
                variant="outlined"
                fullWidth
                name={"user_code"}
                size="small"
                onChange={handleChange}
                value={formData.user_code}
                label="Employee Code"
              />
            </div>
            <div className="col-md-6 mb-4">
              <TextField
                variant="outlined"
                fullWidth
                name={"card_no"}
                onChange={handleChange}
                value={formData.card_no}
                size="small"
                label="Card No."
              />
            </div>
            <div className="col-md-6 mb-4">
              <TextField
                variant="outlined"
                fullWidth
                onChange={handleChange}
                name={"first_name"}
                size="small"
                value={formData.first_name}
                label="First Name"
              />
            </div>
            <div className="col-md-6 mb-4">
              <TextField
                variant="outlined"
                fullWidth
                onChange={handleChange}
                name={"last_name"}
                value={formData.last_name}
                size="small"
                label="Last Name"
              />
            </div>
            <div className="col-md-12 mb-4">
              <TextField
                variant="outlined"
                value={formData.f_h_name}
                name={"f_h_name"}
                size="small"
                onChange={handleChange}
                label="Father/Husband Name"
                fullWidth
              />
            </div>
            <div className="col-md-12 mb-4">
              <TextField
                variant="outlined"
                fullWidth
                name="mother_name"
                value={formData.mother_name}
                onChange={handleChange}
                size="small"
                label="Mother name"
              />
            </div>
            <div className="col-md-6 mb-4">
              <TextField
                id="outlined-select-currency1"
                select
                name="m_status"
                label="Martial Status"
                onChange={handleChange}
                value={formData.m_status}
                variant="outlined"
                size="small"
                fullWidth
              >
                <MenuItem value={"Maried"}>Married</MenuItem>
                <MenuItem value={"Unmaried"}>Unmarried</MenuItem>
              </TextField>
            </div>
            <div className="col-md-6 mb-4">
              <TextField
                id="outlined-select-currency2"
                select
                label="Gender"
                variant="outlined"
                name="gender"
                size="small"
                value={formData.gender}
                onChange={handleChange}
                fullWidth
              >
                <MenuItem value={"Male"}>Male</MenuItem>
                <MenuItem value={"Female"}>Female</MenuItem>
              </TextField>
            </div>
            {console.log(moment(formData.dob).format())}
            {console.log(formData.dob)}
            <div className="col-md-6 mb-4">
              <DatePicker
                autoOk
                variant="inline"
                format="MM/dd/yyyy"
                inputVariant="outlined"
                label="Date of Birth (mm/dd/yyyy)"
                value={
                  formData.dob === null ? null : moment(formData.dob).format()
                }
                name="dob"
                onChange={(date) => handleDateChange("dob", date)}
                size="small"
                fullWidth
              />
            </div>
            <div className="col-md-12 mb-4">
              <TextField
                variant="outlined"
                fullWidth
                multiline
                size="small"
                name="pt_add1"
                value={formData.pt_add1}
                onChange={handleChange}
                label="Present Address"
              />
            </div>
            <div className="col-md-6 mb-4">
              <TextField
                variant="outlined"
                fullWidth
                name="pt_mobile"
                value={formData.pt_mobile}
                onChange={handleChange}
                size="small"
                label="Mobile No."
              />
            </div>
            <div className="col-md-6 mb-4">
              <TextField
                variant="outlined"
                fullWidth
                name="pt_phone"
                value={formData.pt_phone}
                onChange={handleChange}
                size="small"
                label="Phone No."
              />
            </div>
            <div className="col-md-12 mb-4">
              <p>
                Same as present address
                <Checkbox
                  color="primary"
                  checked={formData.pr_check}
                  onChange={(e) => onCheckChange(e)}
                />{" "}
              </p>
              <TextField
                variant="outlined"
                fullWidth
                multiline
                disabled={formData.pr_check}
                name="pr_add1"
                value={formData.pr_add1}
                onChange={handleChange}
                size="small"
                label="Permanent Address"
              />
            </div>
            <div className="col-md-6 mb-4">
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                name="pr_phone"
                value={formData.pr_phone}
                onChange={handleChange}
                label="Phone No."
              />
            </div>
            <div className="col-md-6 mb-4">
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                name="pr_mobile"
                value={formData.pr_mobile}
                onChange={handleChange}
                label="Mobile No."
              />
            </div>
          </div>
        </div>
        {/*  */}
        <div className="col-md-5">
          <div className="row">
            <div className="col-md-12 mb-4">
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                name="short_name"
                value={formData.short_name}
                onChange={handleChange}
                label="Short Name"
              />
            </div>

            <div className="col-md-12 mb-4">
              <Autocomplete
                disablePortal
                id="combo-box-demo1"
                options={listValues.empList}
                getOptionLabel={(option) => option.department_name}
                fullWidth
                onChange={(event, value) =>
                  handleAutoChange(
                    "department_id",
                    "department_name",
                    value,
                    "department_id",
                    "department_name"
                  )
                }
                value={{ department_name: formData.department_name }}
                size="small"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Department"
                  />
                )}
              />
            </div>
            <div className="col-md-12 mb-4">
              <Autocomplete
                disablePortal
                id="combo-box-demo2"
                options={listValues.desgnList}
                getOptionLabel={(option) => option.designation_name}
                onChange={(event, value) =>
                  handleAutoChange(
                    "designation_id",
                    "designation_name",
                    value,
                    "designation_id",
                    "designation_name"
                  )
                }
                value={{ designation_name: formData.designation_name }}
                fullWidth
                size="small"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Designation"
                  />
                )}
              />
            </div>
            <div className="col-md-6 mb-4">
              <DatePicker
                autoOk
                format="dd/MM/yyyy"
                variant="inline"
                inputVariant="outlined"
                label="Joining Date"
                value={
                  formData.joining_date === "" ? null : formData.joining_date
                }
                onChange={(date) => handleDateChange("joining_date", date)}
                size="small"
                fullWidth
              />
            </div>
            <div className="col-md-6 mb-4">
              <DatePicker
                autoOk
                format="dd/MM/yyyy"
                variant="inline"
                inputVariant="outlined"
                label="Leaving Date"
                value={
                  formData.leaving_date === "" ? null : formData.leaving_date
                }
                onChange={(date) => handleDateChange("leaving_date", date)}
                size="small"
                fullWidth
              />
            </div>
            <div className="col-md-12 mb-4">
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                name="leaving_reason"
                onChange={handleChange}
                value={formData.leaving_reason}
                label="Leaving Reason"
              />
            </div>
            <div className="col-md-12 mb-4">
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                name="dispensary"
                onChange={handleChange}
                value={formData.dispensary}
                label="Dispensary"
              />
            </div>
            <div className="col-md-12 mb-4">
              <TextField
                variant="outlined"
                multiline
                fullWidth
                size="small"
                name="remarks"
                onChange={handleChange}
                value={formData.remarks}
                label="Remark"
              />
            </div>
            {console.log(formData)}
            <div className="col-md-12 mb-4">
              <Autocomplete
                disablePortal
                id="combo-box-demo2"
                options={listValues.depInchrList}
                fullWidth
                getOptionLabel={(option) => option.user_name}
                size="small"
                onChange={(event, value) =>
                  handleAutoChange(
                    "department_inch_id",
                    "department_incharge",
                    value,
                    "user_id",
                    "user_name"
                  )
                }
                value={{
                  user_name: formData.department_incharge,
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Department Incharge"
                  />
                )}
              />
            </div>
            <div className="col-md-12 mb-4">
              <TextField
                variant="outlined"
                multiline
                fullWidth
                size="small"
                name="user_name"
                onChange={handleChange}
                value={formData.user_name}
                label="User Name"
              />
            </div>
            <div className="col-md-12 mb-4">
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                type="password"
                name="password"
                onChange={handleChange}
                value={formData.password}
                label="Password"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralInfoEmp;
