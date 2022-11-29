import React, { useEffect, useState } from "react";

const TCSAccount = () => {
  const [companyList, setCompanyList] = useState([]);

  useEffect(() => {
    CommonController.commonApiCallFilter("Dropdown/GetCompanyList").then(
      (data) => {
        set;
      }
    );
  }, []);

  return (
    <div className="row">
      <div className="col-md-4">
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
    </div>
  );
};
