import { Tab, Tabs } from "@material-ui/core";
import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";

import CategoryIndex from "./category";
import GroupIndex from "./group";
import ItemIndex from "./item";
import UnitIndex from "./unit";
import GGIndex from "./gg";
import { buttonLoader } from "../../../../components/common";

// const panel = [
//   {
//     name: "Category",
//     component: "",
//   },
//   {
//     name: "Group",
//     component: "",
//   },
//   {
//     name: "Item",
//     component: "",
//   },
//   {
//     name: "Unit",
//     component: "",
//   },
//   {
//     name: "GG",
//     component: "",
//   },
// ];

const ConfigProductIndex = ({list}) => {
  const [selectedIndex, setSeletedIndex] = useState(0);

  const handleIndex = (event, newValue) => {
    setSeletedIndex(newValue);
  };

  const getSelectedComponent = () => {
    switch (selectedIndex) {
      case 0:
        return <CategoryIndex />;
        break;
      case 1:
        return <GroupIndex />;
        break;
      case 2:
        return <ItemIndex />;
        break;
      case 3:
        return <UnitIndex />;
        break;
      case 4:
        return <GGIndex />;
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
          {list.map((tab, index) => {
            return <Tab value={index} key={"tab" + index} label={tab.display_name} />;
          })}
        </Tabs>
      </AppBar>
      
      <div className="customtab-container w-100">{getSelectedComponent()}</div>
    </div>
  );
};

export default ConfigProductIndex;
