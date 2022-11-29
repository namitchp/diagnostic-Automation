import { MenuItem, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { CommonController } from "../../../_redux/controller/common.controller";

const AccountTNC = ({ formData, handleChange }) => {
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

  console.log(dropDownValues);

  useEffect(() => {
    CommonController.commonApiCallFilter(
      "Dropdown/AccountTermConditionDropdown"
    ).then((data) => {
      const list = {
        pfList: data.pfList,
        exciseDutyList: data.exciseDutyList,
        salesTaxList: data.salesTaxList,
        freightList: data.freightList,
        insuranceList: data.insuranceList,
        inspectionList: data.inspectionList,
        modList: data.modList,
        deliveryList: data.deliveryList,
        octroiList: data.octroiList,
        servicetaxList: data.servicetaxList,
        travelChgrList: data.travelChgrList,
        conveyanceList: data.conveyanceList,
        loadingList: data.loadingList,
        boardingList: data.boardingList,
        validityList: data.validityList,
        paymentList: data.paymentList,
        financeList: data.financeList,
        ldList: data.ldList,
      };
      setDropDownValues(list);
    });
  }, []);

  return (
    <div className="row">
      <div className="col-md-4 mb-3">
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
          {dropDownValues?.pfList.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div className="col-md-4 mb-3">
        <TextField
          id="outlined-select-currency3"
          select
          label="Service Tax"
          fullWidth
          name="pf_id"
          value={formData.pf_id}
          onChange={handleChange}
          variant="outlined"
          size="small"
        >
          {dropDownValues?.servicetaxList.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div className="col-md-4 mb-3">
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
          {dropDownValues?.exciseDutyList.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div className="col-md-4 mb-3">
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
            <MenuItem key={option.id} value={option.id}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div className="col-md-4 mb-3">
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
          {dropDownValues?.salesTaxList.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div className="col-md-4 mb-3">
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
            <MenuItem key={option.id} value={option.id}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div className="col-md-4 mb-3">
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
            <MenuItem key={option.id} value={option.id}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div className="col-md-4 mb-3">
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
            <MenuItem key={option.id} value={option.id}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div className="col-md-4 mb-3">
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
            <MenuItem key={option.id} value={option.id}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div className="col-md-4 mb-3">
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
            <MenuItem key={option.id} value={option.id}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div className="col-md-4 mb-3">
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
            <MenuItem key={option.id} value={option.id}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div className="col-md-4 mb-3">
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
            <MenuItem key={option.id} value={option.id}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div className="col-md-4 mb-3">
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
            <MenuItem key={option.id} value={option.id}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div className="col-md-4 mb-3">
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
            <MenuItem key={option.id} value={option.id}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div className="col-md-4 mb-3">
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
            <MenuItem key={option.id} value={option.id}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div className="col-md-4 mb-3">
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
            <MenuItem key={option.id} value={option.id}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div className="col-md-4 mb-3">
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
            <MenuItem key={option.id} value={option.id}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div className="col-md-4 mb-3">
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
            <MenuItem key={option.id} value={option.id}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>
      </div>
    </div>
  );
};

export default AccountTNC;
