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
import { getAutoValue } from "../../../components/common";
import { CommonController } from "../../../_redux/controller/common.controller";

const GeneralInfo = ({ formData, handleChange, handleAutoChange }) => {
  const [dropDownValues, setDropDownValues] = useState({
    groupList: [],
    pincodeList: [],
    regionList: [],
    ratingList: [],
    employeeList: [],
    seimenggList: [],
  });

  useEffect(() => {
    CommonController.commonApiCallFilter("Dropdown/AccountMasterDropdown").then(
      (data) => {
        const values = {
          groupList: data.groupList,
          pincodeList: data.pincodeList,
          regionList: data.regionList,
          ratingList: data.ratingList,
          employeeList: data.employeeList,
          seimenggList: data.seimenggList,
        };
        setDropDownValues(values);
      }
    );
  }, []);

  const {
    groupList,
    pincodeList,
    regionList,
    employeeList,
    seimenggList,
    ratingList,
  } = dropDownValues;
  return (
    <div className="row">
      <div className="col-md-4">
        <div className="row">
          <div className="col-md-12 mb-5">
            <TextField
              label="Company Id"
              fullWidth
              disabled
              variant="outlined"
              size="small"
              name="company_id"
              value={formData.company_id}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-12 mb-5">
            <TextField
              label="Short Name *"
              name="short_name"
              onChange={handleChange}
              fullWidth
              variant="outlined"
              size="small"
              value={formData.short_name}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-12 mb-5">
            <TextField
              label="Company Name*"
              onChange={handleChange}
              fullWidth
              value={formData.company_name}
              variant="outlined"
              size="small"
              name="company_name"
            />
          </div>
          <div className="col-md-12 mb-5">
            <Autocomplete
              size="small"
              options={groupList}
              getOptionLabel={(option) => option.value}
              fullWidth
              value={{ id: formData?.group_id, value: formData?.group_name }}
              onChange={(event, value) =>
                handleAutoChange("group_id", "group_name", value)
              }
              variant="outlined"
              renderInput={(params) => (
                <TextField {...params} label="Group" variant="outlined" />
              )}
            />
          </div>
          <div className="col-md-12 mb-5">
            <TextField
              label="Address 1"
              fullWidth
              variant="outlined"
              size="small"
              name="address1"
              value={formData.address1}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-12 mb-5">
            <TextField
              label="Address 2"
              fullWidth
              variant="outlined"
              size="small"
              name="address2"
              value={formData.address2}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-12 mb-5">
            <Autocomplete
              size="small"
              options={pincodeList}
              getOptionLabel={(option) => option.value}
              fullWidth
              value={
                formData.pin_id != ""
                  ? { id: formData.pin_id, value: formData.pin_code }
                  : ""
              }
              onChange={(event, value) =>
                handleAutoChange("pin_id", "pin_code", value)
              }
              variant="outlined"
              renderInput={(params) => (
                <TextField {...params} label="Pincode" variant="outlined" />
              )}
            />
          </div>
          <div className="col-md-12 mb-5">
            <TextField
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              size="small"
            />
          </div>
          <div className="col-md-12 mb-5">
            <TextField
              label="District"
              fullWidth
              variant="outlined"
              onChange={handleChange}
              size="small"
              name="district"
              value={formData.district}
            />
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="col-md-12 mb-5">
          <TextField
            label="Pan No."
            fullWidth
            variant="outlined"
            size="small"
            name="pan_no"
            value={formData.pan_no}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-12 mb-5">
          <TextField
            label="GSTIN No."
            fullWidth
            variant="outlined"
            size="small"
            name="tin_no"
            value={formData.tin_no}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-12 mb-5">
          <TextField
            label="Phone No. 1"
            fullWidth
            variant="outlined"
            size="small"
            name="phone1"
            value={formData.phone1}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-12 mb-5">
          <TextField
            label="Phone No. 2"
            fullWidth
            variant="outlined"
            size="small"
            name="phone2"
            value={formData.phone2}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-12 mb-5">
          <TextField
            label="Mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            size="small"
          />
        </div>
        <div className="col-md-12 mb-5">
          <TextField
            label="Fax"
            name="fax"
            value={formData.fax}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            size="small"
          />
        </div>
        <div className="col-md-12 mb-5">
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            size="small"
          />
        </div>
        <div className="col-md-12 mb-5">
          <TextField
            label="Website"
            name="website"
            value={formData.website}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            size="small"
          />
        </div>
        <div className="col-md-12 mb-5">
          <Autocomplete
            size="small"
            options={ratingList}
            onChange={(event, value) =>
              handleAutoChange("rating_id", "rating_name", value)
            }
            getOptionLabel={(option) => option.value}
            value={{ id: formData.rating_id, value: formData.rating_name }}
            fullWidth
            variant="outlined"
            renderInput={(params) => (
              <TextField {...params} label="Rating" variant="outlined" />
            )}
          />
        </div>
      </div>
      <div className="col-md-4">
        <div className="col-md-12 mb-5">
          <TextField
            label="Remarks"
            fullWidth
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            variant="outlined"
            size="small"
          />
        </div>
        <div className="col-md-12 mb-5">
          <TextField
            label="Distance"
            fullWidth
            name="distance"
            value={formData.distance}
            onChange={handleChange}
            variant="outlined"
            size="small"
          />
        </div>
        <div className="col-md-12 mb-5">
          <TextField
            label="Credit Period"
            fullWidth
            name="credit_period"
            value={formData.credit_period}
            onChange={handleChange}
            variant="outlined"
            size="small"
          />
        </div>
        <div className="col-md-12 mb-5">
          <TextField
            label="Credit Limit"
            fullWidth
            variant="outlined"
            name="credit_limit"
            value={formData.credit_limit}
            onChange={handleChange}
            size="small"
          />
        </div>

        <div className="col-md-12 mb-5">
          <Autocomplete
            size="small"
            options={employeeList}
            onChange={(event, value) =>
              handleAutoChange("", "mark_engg", value)
            }
            getOptionLabel={(option) => option.value}
            fullWidth
            value={
              formData.mark_engg != ""
                ? getAutoValue("value", employeeList, formData.mark_engg)
                : ""
            }
            variant="outlined"
            renderInput={(params) => (
              <TextField
                {...params}
                label="Marketing Engg."
                variant="outlined"
              />
            )}
          />
        </div>
        <div className="col-md-12 mb-5">
          <Autocomplete
            size="small"
            options={seimenggList || []}
            onChange={(event, value) =>
              handleAutoChange("se_id", "siem_engg", value)
            }
            value={
              formData?.siem_engg != ""
                ? { id: formData?.se_id, value: formData?.siem_engg }
                : ""
            }
            getOptionLabel={(option) => option.value}
            fullWidth
            variant="outlined"
            renderInput={(params) => (
              <TextField {...params} label="Siemens Engg." variant="outlined" />
            )}
          />
        </div>

        <div className="col-md-12 mb-5">
          <TextField
            label="State"
            name="state"
            value={formData.state}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            size="small"
          />
        </div>
        {/* <div className="col-md-12 mb-5">
          <Autocomplete
            size="small"
            options={regionList}
            onChange={(event, value) =>
              handleAutoChange("region_id", "region_name", value)
            }
            getOptionLabel={(option) => option.value}
            fullWidth
            value={{ id: formData.region_id, value: formData.region_name }}
            variant="outlined"
            renderInput={(params) => (
              <TextField {...params} label="Region" variant="outlined" />
            )}
          />
        </div>
     */}
      </div>
    </div>
  );
};

export default GeneralInfo;
