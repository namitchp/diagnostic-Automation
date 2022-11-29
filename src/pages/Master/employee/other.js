import { Checkbox, MenuItem, TextField, Button } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { DatePicker } from "@material-ui/pickers";
import React from "react";

const OtherDetails = ({ formData, handleChange }) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4 mb-3">
          <TextField
            variant="outlined"
            fullWidth
            value={formData.first_name}
            onChange={handleChange}
            size="small"
            name="first_name"
            label="First Name"
          />
        </div>
        <div className="col-md-4 mb-3">
          <TextField
            variant="outlined"
            fullWidth
            value={formData.last_name}
            onChange={handleChange}
            size="small"
            name="last_name"
            label="Last Name"
          />
        </div>
        <div className="col-md-4 mb-3">
          <TextField
            variant="outlined"
            fullWidth
            value={formData.email}
            onChange={handleChange}
            size="small"
            name="email"
            label="Email"
          />
        </div>
        <div className="col-md-4 mb-3">
          <TextField
            variant="outlined"
            fullWidth
            value={formData.pf_code}
            onChange={handleChange}
            size="small"
            name="pf_code"
            label="P.F.Code"
          />
        </div>
        <div className="col-md-4 mb-3">
          <TextField
            variant="outlined"
            fullWidth
            value={formData.esi_code}
            onChange={handleChange}
            size="small"
            name="esi_code"
            label="ESI Code"
          />
        </div>
        <div className="col-md-4 mb-3">
          <TextField
            variant="outlined"
            fullWidth
            value={formData.pan_no}
            onChange={handleChange}
            size="small"
            name="pan_no"
            label="PAN No."
          />
        </div>
        <div className="col-md-4 mb-3">
          <TextField
            variant="outlined"
            fullWidth
            value={formData.salary_p_mode}
            onChange={handleChange}
            size="small"
            name="salary_p_mode"
            label="Salary Payment Mode"
          />
        </div>
        <div className="col-md-4 mb-3">
          <TextField
            variant="outlined"
            fullWidth
            value={formData.ctc_per_day}
            onChange={handleChange}
            size="small"
            name="ctc_per_day"
            label="CTC Per Day"
          />
        </div>
        <div className="col-md-4 mb-3">
          <TextField
            variant="outlined"
            fullWidth
            value={formData.account_no}
            onChange={handleChange}
            size="small"
            name="account_no"
            label="Account No."
          />
        </div>
        <div className="col-md-4 mb-3">
          <TextField
            variant="outlined"
            fullWidth
            value={formData.bank_name}
            onChange={handleChange}
            size="small"
            name="bank_name"
            label="Bank Name"
          />
        </div>
        <div className="col-md-4 mb-3">
          <TextField
            variant="outlined"
            fullWidth
            value={formData.nominee}
            onChange={handleChange}
            size="small"
            name="nominee"
            label="Nominee"
          />
        </div>
      </div>
    </div>
  );
};

export default OtherDetails;
