import { Tab, Tabs } from "@material-ui/core";
import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import QuotationIndex from "./subIndex";

const ConfigQuotation = ({ list }) => {
  const [selectedIndex, setSeletedIndex] = useState(0);

  const handleIndex = (event, newValue) => {
    setSeletedIndex(newValue);
  };

  const getSelectedComponent = () => {
    switch (selectedIndex) {
      case 0:
        return <QuotationIndex />;
      // break;
      // case 1:
      //   return <PincodeIndex />;
      //   break;

      default:
        alert("Something went wrong");
    }
  };

  return (
    <div className="config_active_content">
      <AppBar className="rounded light-tab" position="relative" elevation={0}>
        <div className="inner_tabs">
          <Tabs
            className="w-100"
            onChange={handleIndex}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            {list.map((tab, index) => {
              return (
                <Tab
                  className={selectedIndex === index ? "tabstyle" : ""}
                  value={index}
                  key={"tab" + index}
                  label={tab.display_name}
                />
              );
            })}
          </Tabs>
        </div>
      </AppBar>
      <div className="config_inner_wrapper w-100">{getSelectedComponent()}</div>
    </div>
  );
};

export default ConfigQuotation;
