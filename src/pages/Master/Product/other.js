import { MenuItem, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { showErrorToast } from "../../../components/common";
import { CommonController } from "../../../_redux/controller/common.controller";

const OtherInformation = ({ formData, handleChange }) => {
  const [diList, setDiList] = useState([]);
  const [doList, setDoList] = useState([]);
  const [aiList, setAiList] = useState([]);
  const [aoList, setAoList] = useState([]);
  const [fcList, setFcList] = useState([]);
  const [fmList, setFmList] = useState([]);

  console.log(formData);

  useEffect(() => {
    CommonController.commonApiCallFilter("Dropdown/GetProductDi")
      .then((data) => setDiList(data))
      .catch((err) => showErrorToast(err));
    CommonController.commonApiCallFilter("Dropdown/GetProductDo")
      .then((data) => setDoList(data))
      .catch((err) => showErrorToast(err));
    CommonController.commonApiCallFilter("Dropdown/GetProductAi")
      .then((data) => setAiList(data))
      .catch((err) => showErrorToast(err));
    CommonController.commonApiCallFilter("Dropdown/GetProductAo")
      .then((data) => setAoList(data))
      .catch((err) => showErrorToast(err));
    CommonController.commonApiCallFilter("Dropdown/GetUomProductFc")
      .then((data) => setFcList(data))
      .catch((err) => showErrorToast(err));
    CommonController.commonApiCallFilter("Dropdown/GetProductFm")
      .then((data) => setFmList(data))
      .catch((err) => showErrorToast(err));
  }, []);

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
            value={formData.di}
            onChange={handleChange}
            fullWidth
          >
            {diList.length > 0 &&
              diList.map((di) => {
                return (
                  <MenuItem key={di.value} value={di.value}>
                    {di.value}
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
            value={formData.di_value}
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
            value={formData.Do}
            onChange={handleChange}
            fullWidth
          >
            {doList.length > 0 &&
              doList.map((_do) => {
                return (
                  <MenuItem key={_do.value} value={_do.value}>
                    {_do.value}
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
            value={formData.do_value}
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
            value={formData.ai}
            onChange={handleChange}
            fullWidth
          >
            {aiList.length > 0 &&
              aiList.map((ai) => {
                return (
                  <MenuItem key={ai.value} value={ai.value}>
                    {ai.value}
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
            value={formData.ai_value}
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
            value={formData.ao}
            onChange={handleChange}
            fullWidth
          >
            {aiList.length > 0 &&
              aoList.map((ao) => {
                return (
                  <MenuItem key={ao.value} value={ao.value}>
                    {ao.value}
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
            value={formData.ao_value}
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
            value={formData.fc}
            onChange={handleChange}
            fullWidth
          >
            {fcList.length > 0 &&
              fcList.map((fc) => {
                return (
                  <MenuItem key={fc.value} value={fc.value}>
                    {fc.value}
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
            value={formData.fc_value}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-3 mb-5">
          <TextField
            id="outlined-select-currency2"
            select
            label="Front Connector"
            variant="outlined"
            name="fm"
            size="small"
            value={formData.fm}
            onChange={handleChange}
            fullWidth
          >
            {fmList.length > 0 &&
              fmList.map((fm) => {
                return (
                  <MenuItem key={fm.value} value={fm.value}>
                    {fm.value}
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
            value={formData.fm_value}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default OtherInformation;
