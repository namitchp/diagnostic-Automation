import {
  // Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@material-ui/core";
import Checkbox from '@mui/material/Checkbox';
import { Autocomplete } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
  const list = useSelector((state) => state.ProductMaster.categoryList);

  console.log(list);
  useEffect(() => {
    if (list) {
      setCategoryList(list.category);
      setGroupList(list.group);
      setItemList(list.item);
      setGGList(list.gg);
      setUomList(list.uom);
    }
  }, [list]);

  return (
    <div className="container-fluid p-0">
      <div className="row justify-content-center">
        <div className="col-md-12">
          <FormGroup className="flex-row justify-content-end col-9">
            <FormControlLabel
              label="Edit"
              checked={formData?.edit === true}
              control={
                <Checkbox
                  color="primary"                
                />
              }
              onChange={(e) => handleCheckChange("edit", e.target.checked)}
            />
            <FormControlLabel
              checked={formData?.deactivate === true}
              control={<Checkbox color="primary" />}
              onChange={(e) =>
                handleCheckChange("deactivate", e.target.checked)
              }
              label="Hide"
            />
            <FormControlLabel
              checked={formData?.serial === true}
              control={<Checkbox color="primary" />}
              onChange={(e) => handleCheckChange("serial", e.target.checked)}
              label="Multiple Line"
            />
            {/* <FormControlLabel
              checked={formData.siemens_product === true}
              control={<Checkbox color="primary" />}
              onChange={(e) =>
                handleCheckChange("siemens_product", e.target.checked)
              }
              label="Siemen Product"
            /> */}
          </FormGroup>
        </div>
        <div className="col-md-5">
          <div className="row">
            <div className="col-md-12 mb-4">
              <TextField
                variant="outlined"
                size="small"
                value={formData?.product_id}
                label="Product ID"
                disabled
                fullWidth
              />
            </div>
            <div className="col-md-12 mb-4 ">
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                label="ERP Code"
                value={formData?.product_code}
                name="product_code"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-12 mb-4">
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                size="small"
                getOptionLabel={(option) => option.category_name}
                options={categoryList}
                onChange={(event, value) =>
                  handleAutoChange("category_id", "category_name", value)
                }
                value={
                  formData?.category_id !== ""
                    ? {
                        category_id: formData?.category_id,
                        category_name: formData?.category_name,
                      }
                    : ""
                }
                fullWidth
                renderInput={(params) => (
                  <TextField
                    variant="outlined"
                    {...params}
                    label="Category Name"
                  />
                )}
              />
            </div>
            <div className="col-md-12 mb-4">
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                size="small"
                options={groupList}
                getOptionLabel={(option) => option.p_group_name}
                onChange={(event, value) =>
                  handleAutoChange("p_group_id", "p_group_name", value)
                }
                value={
                  formData?.p_group_id !== ""
                    ? {
                        p_group_id: formData?.p_group_id,
                        p_group_name: formData?.p_group_name,
                      }
                    : ""
                }
                fullWidth
                renderInput={(params) => (
                  <TextField
                    variant="outlined"
                    {...params}
                    label="Group Name"
                  />
                )}
              />
            </div>
            <div className="col-md-12 mb-4">
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                size="small"
                options={itemList}
                onChange={(event, value) =>
                  handleAutoChange("item_id", "item_name", value)
                }
                value={
                  formData?.item_id !== ""
                    ? {
                        item_id: formData?.item_id,
                        item_name: formData?.item_name,
                      }
                    : ""
                }
                getOptionLabel={(option) => option.item_name}
                fullWidth
                renderInput={(params) => (
                  <TextField variant="outlined" {...params} label="Item Name" />
                )}
              />
            </div>
            <div className="col-md-12 mb-4">
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                size="small"
                options={ggList}
                getOptionLabel={(option) => option.gg_name}
                onChange={(event, value) =>
                  handleAutoChange("gg_id", "gg_name", value)
                }
                value={
                  formData?.gg_id !== ""
                    ? { gg_id: formData?.gg_id, gg_name: formData?.gg_name }
                    : ""
                }
                fullWidth
                renderInput={(params) => (
                  <TextField variant="outlined" {...params} label="GG Name" />
                )}
              />
            </div>
            <div className="col-md-12 mb-4">
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                label="Description"
                value={formData?.description}
                name="description"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-12 mb-4">
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                name="mlfb_no"
                value={formData?.mlfb_no}
                onChange={handleChange}
                label="MLFB No. *"
              />
            </div>
            <div className="col-md-6 mb-5">
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                name="grade"
                value={formData?.grade}
                onChange={handleChange}
                label="HSN / SAC"
              />
            </div>
            <div className="col-md-6 mb-5">
              <TextField
                variant="outlined"
                type="number"
                fullWidth
                size="small"
                name="tax_rate"
                value={formData?.tax_rate}
                onChange={handleChange}
                label="Tax Rate"
              />
            </div>
          </div>
        </div>

        <div className="col-md-5">
          <div className="row">
            <div className="col-md-12 mb-4">
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                size="small"
                options={uomList}
                getOptionLabel={(option) => option.uom}
                onChange={(event, value) =>
                  handleAutoChange("uom_id", "uom", value)
                }
                value={
                  formData?.uom_id !== ""
                    ? { uom_id: formData?.uom_id, uom: formData?.uom }
                    : ""
                }
                fullWidth
                renderInput={(params) => (
                  <TextField variant="outlined" {...params} label="UOM" />
                )}
              />
            </div>
            <div className="col-md-12 mb-4">
              <TextField
                variant="outlined"
                name="qty"
                onChange={handleChange}
                type="number"
                fullWidth
                size="small"
                value={formData?.qty}
                label="Qty"
              />
            </div>
            <div className="col-md-12 mb-4">
              <TextField
                variant="outlined"
                fullWidth
                name="package"
                onChange={handleChange}
                value={formData?.package}
                size="small"
                label="Package"
              />
            </div>
            <div className="col-md-12 mb-4">
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                type="number"
                name="list_price"
                value={formData?.list_price}
                onChange={handleChange}
                label="List Price"
              />
            </div>
            <div className="col-md-12 mb-4">
              <TextField
                variant="outlined"
                name="margin"
                type="number"
                onChange={handleChange}
                value={formData?.margin}
                fullWidth
                size="small"
                label="Margin"
              />
            </div>
            <div className="col-md-12 mb-4">
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                type="number"
                name="pur_rate"
                value={formData?.pur_rate}
                onChange={handleChange}
                label="Purchase Rate"
              />
            </div>
            <div className="col-md-12 mb-4">
              <TextField
                variant="outlined"
                fullWidth
                type="number"
                size="small"
                name="reorder_level"
                value={formData?.reorder_level}
                onChange={handleChange}
                label="Re-Order Level Qty."
              />
            </div>
            <div className="col-md-12 mb-4">
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                name="lp_ref"
                value={formData?.lp_ref}
                onChange={handleChange}
                label="LP Reference"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralProduct;
