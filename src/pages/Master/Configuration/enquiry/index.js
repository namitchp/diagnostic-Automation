import { Tab, Tabs } from "@material-ui/core";
import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";

import TypeIndex from "./type";
import PriorityIndex from "./priority";
import ReferenceIndex from "./reference";
import EnqStatusIndex from "./status";
const panel = [
  {
    name: "Type",
    component: "",
  },
  {
    name: "Priority",
    component: "",
  },
  {
    name: "Reference",
    component: "",
  },
  {
    name: "Status",
    component: "",
  },
];

const ConfigEnquiryIndex = () => {
  const [selectedIndex, setSeletedIndex] = useState(0);

  const handleIndex = (event, newValue) => {
    setSeletedIndex(newValue);
  };

  const getSelectedComponent = () => {
    switch (selectedIndex) {
      case 0:
        return <TypeIndex />;
        break;
      case 1:
        return <PriorityIndex />;
        break;
      case 2:
        return <ReferenceIndex />;
        break;
      case 3:
        return <EnqStatusIndex />;
        break;
      default:
        alert("Something went wrong");
    }
  };

  return (
    <div className="px-3">
      <AppBar className="rounded light-tab" position="relative" elevation={0}>
        <Tabs
          className="w-100"
          value={selectedIndex}
          onChange={handleIndex}
          textColor="secondary"
          indicatorColor="secondary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {panel.map((tab, index) => {
            return <Tab value={index} key={"tab" + index} label={tab.name} />;
          })}
        </Tabs>
      </AppBar>
      <div className="customtab-container w-100">{getSelectedComponent()}</div>
    </div>
  );
};

export default ConfigEnquiryIndex;
