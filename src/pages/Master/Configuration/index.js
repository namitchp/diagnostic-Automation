import { Tab, Tabs } from "@material-ui/core";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import ConfigAccountIndex from "./Account";
import ConfigProductIndex from "./product";
import ConfigEnquiryIndex from "./enquiry";
import ConfigCostingIndex from "./costing";

const useStyles = makeStyles((theme) => ({
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

const panel = [
  {
    name: "Account",
    component: <ConfigAccountIndex />,
  },
  {
    name: "Product",
    component: <ConfigProductIndex />,
  },
  {
    name: "Sales Enquiry",
    component: <ConfigEnquiryIndex />,
  },
  {
    name: "Costing",
    component: <ConfigCostingIndex />,
  },
  {
    name: "Sales Order",
    component: "",
  },
  {
    name: "Quotation",
    component: "",
  },
  {
    name: "Type of Invoice",
    component: "",
  },
];

const ConfigurationMaster = () => {
  const classes = useStyles();
  const [selectedIndex, setSeletedIndex] = useState(0);

  const handleIndex = (event, newValue) => {
    setSeletedIndex(newValue);
  };

  return (
    <React.Fragment>
      <div className="card card-custom gutter-b  px-7 py-3">
        <div className={"customtab-panel"}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={selectedIndex}
            onChange={handleIndex}
            indicatorColor="primary"
            className={classes.tabs}
            aria-label="Vertical tabs example"
          >
            {panel.map((tab, index) => {
              return (
                <Tab
                  className={"tab"}
                  value={index}
                  key={"tab" + index}
                  label={tab.name}
                />
              );
            })}
          </Tabs>
          <div className="customtab-container">
            {panel[selectedIndex].component}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ConfigurationMaster;
