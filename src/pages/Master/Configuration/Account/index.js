import { Tab, Tabs } from "@material-ui/core";
import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import GroupIndex from "./group";
import PincodeIndex from "./pincode";
import RegionIndex from "./region";
import RatingIndex from "./rating";
import DepartmentIndex from "./department";
import DesignationIndex from "./designation";
import SiemensIndex from "./siemens";
import SupplyItemIndex from "./supply-item";

const panel = [
  {
    name: "Group",
    component: "",
  },
  {
    name: "Pin Code",
    component: "",
  },
  {
    name: "Region",
    component: "",
  },
  {
    name: "Rating",
    component: "",
  },
  {
    name: "Department",
    component: "",
  },
  {
    name: "Designation",
    component: "",
  },
  {
    name: "Siemens",
    component: "",
  },
  {
    name: "Supply Items",
    component: "",
  },
];

const ConfigAccountIndex = () => {
  const [selectedIndex, setSeletedIndex] = useState(0);

  const handleIndex = (event, newValue) => {
    setSeletedIndex(newValue);
  };

  const getSelectedComponent = () => {
    switch (selectedIndex) {
      case 0:
        return <GroupIndex />;
        break;
      case 1:
        return <PincodeIndex />;
        break;
      case 2:
        return <RegionIndex />;
        break;
      case 3:
        return <RatingIndex />;
        break;
      case 4:
        return <DepartmentIndex />;
        break;
      case 5:
        return <DesignationIndex />;
        break;
      case 6:
        return <SiemensIndex />;
        break;
      case 7:
        return <SupplyItemIndex />;
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
          indicatorColor="primary"
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

export default ConfigAccountIndex;
