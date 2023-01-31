import {
  TextField,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAutoValue } from "../../../components/common";
const GeneralInfo = ({ formData, handleChange, handleAutoChange }) => {
  const filterList = useSelector(
    (state) => state.AccountMaster.accountFilterList
  );
  const [dropDownValues, setDropDownValues] = useState({
    groupList: [],
    pincodeList: [],
    regionList: [],
    ratingList: [],
    employeeList: [],
    seimenggList: [],
  });
  useEffect(() => {
    if(filterList?.listengg?.length>0)
    {
        const values = {
          groupList: filterList.listGroup,
          pincodeList: filterList.pincode,
          regionList: filterList.listregion,
          ratingList: filterList.rating,
          employeeList: filterList.listengg,
          seimenggList: filterList.siemensEngg,
        };
        setDropDownValues(values);
      }
  }, [filterList]);

  const {
    groupList,
    pincodeList,
    regionList,
    employeeList,
    seimenggList,
    ratingList,
  } = dropDownValues;
  return (
    <div className="row justify-content-center">
      <div className="col-md-5 ">
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
              getOptionLabel={(option) => option.group_name}
              fullWidth
              // value={ formData.group_name}
               value={
                  { group_id: formData.group_id, group_name: formData.group_name }
              }
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
          

          <div className="col-6 mb-5">
            <Autocomplete
              size="small"
              options={pincodeList}
              getOptionLabel={(option) => option.pin_code_no}
              fullWidth
              value={
                formData.pin_code_id != ""
                  ? { pin_code_id: formData.pin_code_id, pin_code_no: formData.pin_code_no }
                  : ""
              }
              // value={formData.pin_code}
              onChange={(event, value) =>
                handleAutoChange("pin_code_id","pin_code_no",value)
              }
              variant="outlined"
              renderInput={(params) => (
                <TextField {...params} label="Pincode" variant="outlined" />
              )}
            />
          </div>
          <div className="col-6 mb-5">
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
          <div className="col-md-6 mb-5">
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
          <div className="col-md-6 mb-5">
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
        <div className="col-md-12 mb-5">
          <Autocomplete
            size="small"
            options={regionList}
            onChange={(event, value) =>
              handleAutoChange("region_id", "region_name", value)
            }
            getOptionLabel={(option) => option.region_name}
            fullWidth
            value={{ region_id: formData.region_id, region_name: formData.region_name }}
            variant="outlined"
            renderInput={(params) => (
              <TextField {...params} label="Region" variant="outlined" />
            )}
          />
        </div>
        <div className="col-md-12 mb-5">
          <TextField
            label="Add Supply Items"
            fullWidth
            variant="outlined"
            size="small"
            // name="pan_no"
            // value={formData.pan_no}
            // onChange={handleChange}
          />
        </div>
        </div>
      </div>
      <div className="col-md-5">
        <div className="row">
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
            getOptionLabel={(option) => option.rating_name}
            value={{ rating_id: formData.rating_id, rating_name: formData.rating_name }}
            // value={formData.rating_name}
            fullWidth
            variant="outlined"
            renderInput={(params) => (
              <TextField {...params} label="Rating" variant="outlined" />
            )}
          />
        </div>
        <div className="col-md-12 mb-5">
          <Autocomplete
            size="small"
            options={employeeList}
            onChange={(event, value) =>
              handleAutoChange("", "name", value)
            }
            getOptionLabel={(option) => option.name}
            fullWidth
            value={
              formData.name != ""
                ? getAutoValue("name", employeeList, formData.name)
                : ""
            }
            // value={formData.mark_engg}
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
              handleAutoChange("se_id", "Engg_name", value)
            }
            value={
              formData?.Engg_name != ""
                ? { se_id: formData?.se_id, Engg_name: formData?.Engg_name }
                : ""
            }
            // value={formData?.siem_engg}
            getOptionLabel={(option) => option.Engg_name}
            fullWidth
            variant="outlined"
            renderInput={(params) => (
              <TextField {...params} label="Siemens Engg." variant="outlined" />
            )}
          />
        </div>
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
        <div className="col-12 mb-5">
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
        <div className="col-md-6 mb-5">
          <TextField
            label="Credit Period"
            // type="number"
            fullWidth
            name="credit_period"
            value={formData.credit_period}
            onChange={handleChange}
            variant="outlined"
            size="small"
          />
        </div>
        <div className="col-md-6 mb-5">
          <TextField
            label="Credit Limit"
            type="number"
            fullWidth
            variant="outlined"
            name="credit_limit"
            value={formData.credit_limit}
            onChange={handleChange}
            size="small"
          />
        </div>
      </div>
    </div>
    </div>
  );
};

export default GeneralInfo;
