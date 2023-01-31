import { MenuItem, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { dropdownTechInformation } from "../../../_redux/actions/masters/product.action";
const OtherInformation = ({ formData, handleChange }) => {
  const dispatch=useDispatch();
  const [diList, setDiList] = useState([]);
  const [doList, setDoList] = useState([]);
  const [aiList, setAiList] = useState([]);
  const [aoList, setAoList] = useState([]);
  const [fcList, setFcList] = useState([]);
  const [fmList, setFmList] = useState([]);
  console.log(formData);
const dropdownList=useSelector(state=>state.ProductMaster.dropdownTech);
console.log(dropdownList)
useEffect(() => {
  dispatch(dropdownTechInformation());
}, [])
  useEffect(() => {
if(dropdownList){
setDiList(dropdownList.di);
setDoList(dropdownList.do);
setAiList(dropdownList.ai);
setAoList(dropdownList.ao);
setFcList(dropdownList.fc);
setFmList(dropdownList.fm);
}
  }, [dropdownList]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 mb-5">
          <TextField
            id="outlined-select-currency2"
            select
            label="Digital Input"
            variant="outlined"
            name="di"
            size="small"
            value={formData?.di}
            onChange={handleChange}
            fullWidth
          >
            {diList.length > 0 &&
              diList.map((di) => {
                return (
                  <MenuItem key={di.DI} value={di.DI}>
                    {di.DI}
                  </MenuItem>
                );
              })}
          </TextField>
        </div>
        <div className="col-md-3 mb-5">
          <TextField
            variant="outlined"
            size="small"
            label="Value"
            fullWidth
            name="di_value"
            value={formData?.di_value}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-3 mb-5">
          <TextField
            id="outlined-select-currency2"
            select
            label="Digital Output"
            variant="outlined"
            name="do"
            size="small"
            value={formData?.Do}
            onChange={handleChange}
            fullWidth
          >
            {doList.length > 0 &&
              doList.map((_do) => {
                return (
                  <MenuItem key={_do.Do} value={_do.Do}>
                    {_do.Do}
                  </MenuItem>
                );
              })}
          </TextField>
        </div>
        <div className="col-md-3 mb-5">
          <TextField
            variant="outlined"
            size="small"
            label="Value"
            fullWidth
            name="do_value"
            value={formData?.do_value}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-3 mb-5">
          <TextField
            id="outlined-select-currency2"
            select
            label="Analog Input"
            variant="outlined"
            name="ai"
            size="small"
            value={formData?.ai}
            onChange={handleChange}
            fullWidth
          >
            {aiList.length > 0 &&
              aiList.map((ai) => {
                return (
                  <MenuItem key={ai.Ai} value={ai.Ai}>
                    {ai.Ai}
                  </MenuItem>
                );
              })}
          </TextField>
        </div>
        <div className="col-md-3 mb-5">
          <TextField
            variant="outlined"
            size="small"
            label="Value"
            fullWidth
            name="ai_value"
            value={formData?.ai_value}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-3 mb-5">
          <TextField
            id="outlined-select-currency2"
            select
            label="Analog Output"
            variant="outlined"
            name="ao"
            size="small"
            value={formData?.ao}
            onChange={handleChange}
            fullWidth
          >
            {aiList.length > 0 &&
              aoList.map((ao) => {
                return (
                  <MenuItem key={ao.Ao} value={ao.Ao}>
                    {ao.Ao}
                  </MenuItem>
                );
              })}
          </TextField>
        </div>
        <div className="col-md-3 mb-5">
          <TextField
            variant="outlined"
            size="small"
            label="Value"
            fullWidth
            value={formData?.ao_value}
            name="ao_value"
            onChange={handleChange}
          />
        </div>
        <div className="col-md-3 mb-5">
          <TextField
            id="outlined-select-currency2"
            select
            label="Front Connector"
            variant="outlined"
            name="fc"
            size="small"
            value={formData?.fc}
            onChange={handleChange}
            fullWidth
          >
            {fcList.length > 0 &&
              fcList.map((fc) => {
                return (
                  <MenuItem key={fc.Fc} value={fc.Fc}>
                    {fc.Fc}
                  </MenuItem>
                );
              })}
          </TextField>
        </div>
        <div className="col-md-3 mb-5">
          <TextField
            variant="outlined"
            size="small"
            label="Value"
            fullWidth
            name="fc_value"
            value={formData?.fc_value}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-3 mb-5">
          <TextField
            id="outlined-select-currency2"
            select
            label="Function Module"
            variant="outlined"
            name="fm"
            size="small"
            value={formData?.fm}
            onChange={handleChange}
            fullWidth
          >
            {fmList.length > 0 &&
              fmList.map((fm) => {
                return (
                  <MenuItem key={fm.Fm} value={fm.Fm}>
                    {fm.Fm}
                  </MenuItem>
                );
              })}
          </TextField>
        </div>
        <div className="col-md-3 mb-5">
          <TextField
            variant="outlined"
            size="small"
            label="Value"
            fullWidth
            name="fm_value"
            value={formData?.fm_value}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default OtherInformation;
