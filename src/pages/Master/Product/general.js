import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Paper,
  TextField,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { showErrorToast } from "../../../components/common";
import { CommonController } from "../../../_redux/controller/common.controller";

const GeneralProduct = ({
  handleChange,
  formData,
  handleAutoChange,
  handleCheckChange,
}) => {
  const [categoryList, setCategoryList] = useState([]);
  const [groupList, setGroupList] = useState([]);
  const [itemList, setItemList] = useState([]);
  const [ggList, setGGList] = useState([]);
  const [uomList, setUomList] = useState([]);

  useEffect(() => {
    CommonController.commonApiCallFilter("Dropdown/GetCategoryList")
      .then((data) => setCategoryList(data))
      .catch((err) => showErrorToast(err));
    CommonController.commonApiCallFilter("Dropdown/GetpgroupList")
      .then((data) => setGroupList(data))
      .catch((err) => showErrorToast(err));
    CommonController.commonApiCallFilter("Dropdown/GetItemList")
      .then((data) => setItemList(data))
      .catch((err) => showErrorToast(err));
    CommonController.commonApiCallFilter("Dropdown/GetGGList")
      .then((data) => setGGList(data))
      .catch((err) => showErrorToast(err));
    CommonController.commonApiCallFilter("Dropdown/GetUomList")
      .then((data) => setUomList(data))
      .catch((err) => showErrorToast(err));
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <FormGroup className="flex-row justify-content-end">
            <FormControlLabel
              label="Edit"
              checked={formData.edit == "True"}
              control={<Checkbox color="primary" />}
              onChange={(e) => handleCheckChange("edit", e.target.checked)}
            />
            <FormControlLabel
              checked={formData.deactivate == "True"}
              control={<Checkbox color="primary" />}
              onChange={(e) =>
                handleCheckChange("deactivate", e.target.checked)
              }
              label="Hide"
            />
            <FormControlLabel
              checked={formData.serial == "True"}
              control={<Checkbox color="primary" />}
              onChange={(e) => handleCheckChange("serial", e.target.checked)}
              label="Multiple Line"
            />
            <FormControlLabel
              checked={formData.siemens_product == "True"}
              control={<Checkbox color="primary" />}
              onChange={(e) =>
                handleCheckChange("siemens_product", e.target.checked)
              }
              label="Siemen Product"
            />
          </FormGroup>
        </div>
        <div className="col-md-3 mb-5">
          <TextField
            variant="outlined"
            size="small"
            value={formData.product_id}
            label="Product ID"
            disabled
            fullWidth
          />
        </div>
        <div className="col-md-3 mb-5 ">
          <TextField
            variant="outlined"
            fullWidth
            size="small"
            label="ERP Code"
            value={formData.product_code}
            name="product_code"
            onChange={handleChange}
          />
        </div>
        <div className="col-md-3 mb-5">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            size="small"
            getOptionLabel={(option) => option.value}
            options={categoryList}
            onChange={(event, value) =>
              handleAutoChange("category_id", "category_name", value)
            }
            value={
              formData.category_id != ""
                ? { id: formData.category_id, value: formData.category_name }
                : ""
            }
            fullWidth
            renderInput={(params) => (
              <TextField variant="outlined" {...params} label="Category Name" />
            )}
          />
        </div>
        <div className="col-md-3 mb-5">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            size="small"
            options={groupList}
            getOptionLabel={(option) => option.value}
            onChange={(event, value) =>
              handleAutoChange("p_group_id", "p_group_name", value)
            }
            value={
              formData.p_group_id != ""
                ? { id: formData.p_group_id, value: formData.p_group_name }
                : ""
            }
            fullWidth
            renderInput={(params) => (
              <TextField variant="outlined" {...params} label="Group Name" />
            )}
          />
        </div>
        <div className="col-md-3 mb-5">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            size="small"
            options={itemList}
            onChange={(event, value) =>
              handleAutoChange("item_id", "item_name", value)
            }
            value={
              formData.item_id != ""
                ? { id: formData.item_id, value: formData.item_name }
                : ""
            }
            getOptionLabel={(option) => option.value}
            fullWidth
            renderInput={(params) => (
              <TextField variant="outlined" {...params} label="Item Name" />
            )}
          />
        </div>
        <div className="col-md-3 mb-5">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            size="small"
            options={ggList}
            getOptionLabel={(option) => option.value}
            onChange={(event, value) =>
              handleAutoChange("gg_id", "gg_name", value)
            }
            value={
              formData.gg_id != ""
                ? { id: formData.gg_id, value: formData.gg_name }
                : ""
            }
            fullWidth
            renderInput={(params) => (
              <TextField variant="outlined" {...params} label="GG Name" />
            )}
          />
        </div>
        <div className="col-md-3 mb-5">
          <TextField
            variant="outlined"
            fullWidth
            size="small"
            label="Description"
            value={formData.description}
            name="description"
            onChange={handleChange}
          />
        </div>
        <div className="col-md-3 mb-5">
          <TextField
            variant="outlined"
            fullWidth
            size="small"
            name="mlfb_no"
            value={formData.mlfb_no}
            onChange={handleChange}
            label="MLFB No. *"
          />
        </div>
        <div className="col-md-3 mb-5">
          <TextField
            variant="outlined"
            fullWidth
            size="small"
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            label="HSN / SAC"
          />
        </div>
        <div className="col-md-3 mb-5">
          <TextField
            variant="outlined"
            fullWidth
            size="small"
            name="tax_rate"
            value={formData.tax_rate}
            onChange={handleChange}
            label="Tax Rate"
          />
        </div>
        <div className="col-md-3 mb-5">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            size="small"
            options={uomList}
            getOptionLabel={(option) => option.value}
            onChange={(event, value) =>
              handleAutoChange("uom_id", "uom", value)
            }
            value={
              formData.uom_id != ""
                ? { id: formData.uom_id, value: formData.uom }
                : ""
            }
            fullWidth
            renderInput={(params) => (
              <TextField variant="outlined" {...params} label="UOM" />
            )}
          />
        </div>
        <div className="col-md-3 mb-5">
          <TextField
            variant="outlined"
            name="qty"
            onChange={handleChange}
            fullWidth
            size="small"
            value={formData.qty}
            label="Qty"
          />
        </div>
        <div className="col-md-3 mb-5">
          <TextField
            variant="outlined"
            fullWidth
            name="package"
            onChange={handleChange}
            value={formData.package}
            size="small"
            label="Package"
          />
        </div>
        <div className="col-md-3 mb-5">
          <TextField
            variant="outlined"
            fullWidth
            size="small"
            name="list_price"
            value={formData.list_price}
            onChange={handleChange}
            label="List Price"
          />
        </div>
        <div className="col-md-3 mb-5">
          <TextField
            variant="outlined"
            name="margin"
            onChange={handleChange}
            value={formData.margin}
            fullWidth
            size="small"
            label="Margin"
          />
        </div>
        <div className="col-md-3 mb-5">
          <TextField
            variant="outlined"
            fullWidth
            size="small"
            name="pur_rate"
            value={formData.pur_rate}
            onChange={handleChange}
            label="Purchase Rate"
          />
        </div>
        <div className="col-md-3 mb-5">
          <TextField
            variant="outlined"
            fullWidth
            size="small"
            name="reorder_level"
            value={formData.reorder_level}
            onChange={handleChange}
            label="Re-Order Level Qty."
          />
        </div>
        <div className="col-md-3 mb-5">
          <TextField
            variant="outlined"
            fullWidth
            size="small"
            name="lp_ref"
            value={formData.lp_ref}
            onChange={handleChange}
            label="LP Reference"
          />
        </div>
      </div>
    </div>
  );
};

export default GeneralProduct;
