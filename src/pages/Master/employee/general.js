import { Checkbox, MenuItem, TextField} from "@material-ui/core";
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
      <div className="row">
        <div className="col-md-4 mb-3">
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
        <div className="col-md-4 mb-3">
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
        <div className="col-md-4 mb-3">
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
        <div className="col-md-4 mb-3">
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
        <div className="col-md-4 mb-3">
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
        <div className="col-md-4 mb-3">
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
        <div className="col-md-4 mb-3">
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
        <div className="col-md-4 mb-3">
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
        <div className="col-md-4 mb-3">
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
        <div className="col-md-4 mb-3">
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
        <div className="col-md-4 mb-3">
          <DatePicker
            autoOk
            variant="inline"
            format="MM/dd/yyyy"
            inputVariant="outlined"
            label="Date of Birth (mm/dd/yyyy)"
            value={formData.dob === "" ? null : moment(formData.dob).format()}
            name="dob"
            onChange={(date) => handleDateChange("dob", date)}
            size="small"
            fullWidth
          />
        </div>
        <div className="col-md-4 mb-3">
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
        <div className="col-md-4 mb-3">
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
        <div className="col-md-4 mb-3">
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
        <div className="col-md-4 mb-3">
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
          <p>
            Same as present address{" "}
            <Checkbox
              color="primary"
              checked={formData.pr_check}
              onChange={(e) => onCheckChange(e)}
            />{" "}
          </p>
        </div>
        <div className="col-md-4 mb-3">
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
        <div className="col-md-4 mb-3">
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

        <div className="col-md-4 mb-3">
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

        <div className="col-md-4 mb-3">
          <Autocomplete
            disablePortal
            id="combo-box-demo1"
            options={listValues.empList}
            getOptionLabel={(option) => option.value}
            fullWidth
            onChange={(event, value) =>
              handleAutoChange("department_name", value)
            }
            value={getAutoValue(
              "value",
              listValues.empList,
              formData.department_name
            )}
            size="small"
            renderInput={(params) => (
              <TextField {...params} variant="outlined" label="Department" />
            )}
          />
        </div>
        <div className="col-md-4 mb-3">
          <Autocomplete
            disablePortal
            id="combo-box-demo2"
            options={listValues.desgnList}
            getOptionLabel={(option) => option.value}
            onChange={(event, value) =>
              handleAutoChange("designation_name", value)
            }
            value={getAutoValue(
              "value",
              listValues.desgnList,
              formData.designation_name
            )}
            fullWidth
            size="small"
            renderInput={(params) => (
              <TextField {...params} variant="outlined" label="Designation" />
            )}
          />
        </div>
        <div className="col-md-4 mb-3">
          <DatePicker
            autoOk
            format="dd/MM/yyyy"
            variant="inline"
            inputVariant="outlined"
            label="Joining Date"
            value={formData.joining_date === "" ? null : formData.joining_date}
            onChange={(date) => handleDateChange("joining_date", date)}
            size="small"
            fullWidth
          />
        </div>
        <div className="col-md-4 mb-3">
          <DatePicker
            autoOk
            format="dd/MM/yyyy"
            variant="inline"
            inputVariant="outlined"
            label="Leaving Date"
            value={formData.leaving_date === "" ? null : formData.leaving_date}
            onChange={(date) => handleDateChange("leaving_date", date)}
            size="small"
            fullWidth
          />
        </div>
        <div className="col-md-4 mb-3">
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
        <div className="col-md-4 mb-3">
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
        <div className="col-md-4 mb-3">
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
        <div className="col-md-4 mb-3">
          <Autocomplete
            disablePortal
            id="combo-box-demo2"
            options={listValues.depInchrList}
            fullWidth
            getOptionLabel={(option) => option.value}
            size="small"
            onChange={(event, value) =>
              handleAutoChange("department_incharge", value)
            }
            value={getAutoValue(
              "value",
              listValues.depInchrList,
              formData.department_incharge
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Department Incharge"
              />
            )}
          />
        </div>
        <div className="col-md-4 mb-3">
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
        <div className="col-md-4 mb-3">
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
  );
};

export default GeneralInfoEmp;
