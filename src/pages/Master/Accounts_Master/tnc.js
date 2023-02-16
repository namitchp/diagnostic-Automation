import { MenuItem, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
const AccountTNC = ({ formData, handleChange, list }) => {
  const [dropDownValues, setDropDownValues] = useState({
    pfList: [],
    exciseDutyList: [],
    salesTaxList: [],
    freightList: [],
    insuranceList: [],
    inspectionList: [],
    modList: [],
    deliveryList: [],
    octroiList: [],
    servicetaxList: [],
    travelChgrList: [],
    conveyanceList: [],
    loadingList: [],
    boardingList: [],
    validityList: [],
    paymentList: [],
    financeList: [],
    ldList: [],
  });
  console.log(list);
  useEffect(() => {
    if (list) {
      setDropDownValues(list);
    }
  }, [list]);

  return (
    <div className="row justify-content-center">
      <div className="col-md-5 mb-3">
        <div className="col-md-12 mb-4">
          <TextField
            id="outlined-select-currency1"
            select
            label="P&F"
            fullWidth
            name="pf_id"
            value={formData.pf_id}
            onChange={handleChange}
            variant="outlined"
            size="small"
          >
            {dropDownValues?.pfList?.map((option) => (
              <MenuItem key={option.pf_id} value={option.pf_id}>
                {option.pf_name}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className="col-md-12 mb-4">
          <TextField
            id="outlined-select-currency2"
            select
            label="Excise Duty"
            fullWidth
            name="exciseduty_id"
            value={formData.exciseduty_id}
            onChange={handleChange}
            variant="outlined"
            size="small"
          >
            {dropDownValues?.exciseDutyList?.map((option) => (
              <MenuItem key={option.exciseduty_id} value={option.exciseduty_id}>
                {option.exciseduty_name}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className="col-md-12 mb-4">
          <TextField
            id="outlined-select-currency1"
            select
            label="Sales Tax"
            fullWidth
            name="salestax_id"
            value={formData.salestax_id}
            onChange={handleChange}
            variant="outlined"
            size="small"
          >
            {dropDownValues?.salesTaxList?.map((option) => (
              <MenuItem key={option.salestax_id} value={option.salestax_id}>
                {option.salestax_name}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className="col-md-12 mb-4">
          <TextField
            id="outlined-select-currency1"
            select
            label="Freight"
            fullWidth
            name="freight_id"
            value={formData.freight_id}
            onChange={handleChange}
            variant="outlined"
            size="small"
          >
            {dropDownValues?.freightList.map((option) => (
              <MenuItem key={option.freight_id} value={option.freight_id}>
                {option.freight_name}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className="col-md-12 mb-4">
          <TextField
            id="outlined-select-currency56"
            select
            label="Insurance"
            fullWidth
            name="insurance_id"
            value={formData.insurance_id}
            onChange={handleChange}
            variant="outlined"
            size="small"
          >
            {dropDownValues?.insuranceList.map((option) => (
              <MenuItem key={option.insurance_id} value={option.insurance_id}>
                {option.insurance_name}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className="col-md-12 mb-4">
          <TextField
            id="outlined-select-currency67"
            select
            label="Inspection"
            fullWidth
            name="inspection_id"
            value={formData.inspection_id}
            onChange={handleChange}
            variant="outlined"
            size="small"
          >
            {dropDownValues?.inspectionList.map((option) => (
              <MenuItem key={option.inspection_id} value={option.inspection_id}>
                {option.inspection_name}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className="col-md-12 mb-4">
          <TextField
            id="outlined-select-currency23"
            select
            label="Mode Of Dispatch"
            fullWidth
            name="mode_of_dispatch_id"
            value={formData.mode_of_dispatch_id}
            onChange={handleChange}
            variant="outlined"
            size="small"
          >
            {dropDownValues?.modList.map((option) => (
              <MenuItem
                key={option.mode_of_dispatch_id}
                value={option.mode_of_dispatch_id}
              >
                {option.mode_of_dispatch_name}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className="col-md-12 mb-4">
          <TextField
            id="outlined-select-currency33"
            select
            label="Delivery"
            fullWidth
            name="delivery_id"
            value={formData.delivery_id}
            onChange={handleChange}
            variant="outlined"
            size="small"
          >
            {dropDownValues?.deliveryList.map((option) => (
              <MenuItem key={option.delivery_id} value={option.delivery_id}>
                {option.delivery_name}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className="col-md-12 mb-4">
          <TextField
            id="outlined-select-currency1"
            select
            label="Octroi"
            fullWidth
            name="octroi_id"
            value={formData.octroi_id}
            onChange={handleChange}
            variant="outlined"
            size="small"
          >
            {dropDownValues?.octroiList.map((option) => (
              <MenuItem key={option.octroi_id} value={option.octroi_id}>
                {option.octroi_name}
              </MenuItem>
            ))}
          </TextField>
        </div>
      </div>
      <div className="col-md-5 mb-3">
        <div className="col-md-12 mb-4">
          <TextField
            id="outlined-select-currency3"
            select
            label="Service Tax"
            fullWidth
            name="servicetax_id"
            value={formData.servicetax_id}
            onChange={handleChange}
            variant="outlined"
            size="small"
          >
            {dropDownValues?.servicetaxList.map((option) => (
              <MenuItem key={option.servicetax_id} value={option.servicetax_id}>
                {option.servicetax_name}
              </MenuItem>
            ))}
          </TextField>
        </div>

        <div className="col-md-12 mb-4">
          <TextField
            id="outlined-select-currency4"
            select
            label="Travel Charges"
            fullWidth
            name="travel_id"
            value={formData.travel_id}
            onChange={handleChange}
            variant="outlined"
            size="small"
          >
            {dropDownValues?.travelChgrList.map((option) => (
              <MenuItem key={option.travel_id} value={option.travel_id}>
                {option.travel_name}
              </MenuItem>
            ))}
          </TextField>
        </div>

        <div className="col-md-12 mb-4">
          <TextField
            id="outlined-select-currency5"
            select
            label="Conveynance"
            fullWidth
            name="conveyance_id"
            value={formData.conveyance_id}
            onChange={handleChange}
            variant="outlined"
            size="small"
          >
            {dropDownValues?.conveyanceList.map((option) => (
              <MenuItem key={option.conveyance_id} value={option.conveyance_id}>
                {option.conveyance_name}
              </MenuItem>
            ))}
          </TextField>
        </div>

        <div className="col-md-12 mb-4">
          <TextField
            id="outlined-select-currency8"
            select
            label="Loading"
            fullWidth
            name="loading_id"
            value={formData.loading_id}
            onChange={handleChange}
            variant="outlined"
            size="small"
          >
            {dropDownValues?.loadingList.map((option) => (
              <MenuItem key={option.loading_id} value={option.loading_id}>
                {option.loading_name}
              </MenuItem>
            ))}
          </TextField>
        </div>

        <div className="col-md-12 mb-4">
          <TextField
            id="outlined-select-currency9"
            select
            label="Boarding"
            fullWidth
            name="boarding_id"
            value={formData.boarding_id}
            onChange={handleChange}
            variant="outlined"
            size="small"
          >
            {dropDownValues?.boardingList.map((option) => (
              <MenuItem key={option.boarding_id} value={option.boarding_id}>
                {option.boarding_name}
              </MenuItem>
            ))}
          </TextField>
        </div>

        <div className="col-md-12 mb-4">
          <TextField
            id="outlined-select-currency67"
            select
            label="LD Clause"
            fullWidth
            name="ld_id"
            value={formData.ld_id}
            onChange={handleChange}
            variant="outlined"
            size="small"
          >
            {dropDownValues?.ldList.map((option) => (
              <MenuItem key={option.ld_id} value={option.ld_id}>
                {option.ld_name}
              </MenuItem>
            ))}
          </TextField>
        </div>

        <div className="col-md-12 mb-4">
          <TextField
            id="outlined-select-currency34"
            select
            label="Validity"
            fullWidth
            name="validity_id"
            value={formData.validity_id}
            onChange={handleChange}
            variant="outlined"
            size="small"
          >
            {dropDownValues?.validityList.map((option) => (
              <MenuItem key={option.validity_id} value={option.validity_id}>
                {option.validity_name}
              </MenuItem>
            ))}
          </TextField>
        </div>

        <div className="col-md-12 mb-4">
          <TextField
            id="outlined-select-currency13"
            select
            label="Payment"
            fullWidth
            name="payment_id"
            value={formData.payment_id}
            onChange={handleChange}
            variant="outlined"
            size="small"
          >
            {dropDownValues?.paymentList.map((option) => (
              <MenuItem key={option.payment_id} value={option.payment_id}>
                {option.payment_name}
              </MenuItem>
            ))}
          </TextField>
        </div>

        <div className="col-md-12 mb-4">
          <TextField
            id="outlined-select-currency1"
            select
            label="Finance"
            fullWidth
            name="finance_id"
            value={formData.finance_id}
            onChange={handleChange}
            variant="outlined"
            size="small"
          >
            {dropDownValues?.financeList.map((option) => (
              <MenuItem key={option.finance_id} value={option.finance_id}>
                {option.finance_name}
              </MenuItem>
            ))}
          </TextField>
        </div>
      </div>
    </div>
  );
};

export default AccountTNC;
