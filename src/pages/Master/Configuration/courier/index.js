import { Tab, Tabs } from "@material-ui/core";
import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import CourierIndex from "./subIndex";
const ConfigCourier = ({ list }) => {
  const [selectedIndex, setSeletedIndex] = useState(0);
  const handleIndex = (event, newValue) => {
    setSeletedIndex(newValue);
  };

  const getSelectedComponent = () => {
    switch (selectedIndex) {
      case 0:
        return <CourierIndex />;
      default:
        alert("Something went wrong");
    }
  };
  return (
    <div className="px-3">
      <AppBar className="rounded light-tab" position="relative" elevation={0}>
        <Tabs
          className="w-100"
          onChange={handleIndex}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {list.map((tab, index) => {
            return (
              <Tab value={index} className={selectedIndex === index ? "tabstyle" : ""} key={"tab" + index} label={tab.display_name} />
            );
          })}
        </Tabs>
      </AppBar>
      <div className="customtab-container w-100">{getSelectedComponent()}</div>
    </div>
  );
};
export default ConfigCourier;
