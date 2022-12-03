import react, { useEffect } from "react";
import { Tab, Tabs } from "@material-ui/core";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import ConfigAccountIndex from "./Account";
import ConfigProductIndex from "./product";
import ConfigEnquiryIndex from "./enquiry";
import ConfigCostingIndex from "./costing";
import { CommonController } from "../../../_redux/controller/common.controller";
import { buttonLoader, showErrorToast } from "../../../components/common";

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
  const [MenuList, setMenuList] = useState([]);
  const [thirdMenuId, setthirdMenuId] = useState(101);
  const [SubMenuList, setSubMenuList] = useState([]);
  const [loading, setloading] = useState(true);
  const [loadingsubMenu, setloadingsubMenu] = useState(true);
  const getThirdMenu = async (menu_id) => {
    try {
      let user_id = { user_id: localStorage.getItem("userId") };
      await CommonController.commonApiCallFilter(
        "menu/menu_list_level3?menu_id=" + menu_id,
        user_id,
        "post",
        "node"
      )
        .then((data) => {
          if (data.status === 200) {
            setMenuList(data.data);
            setloading(false);
          }
        })
        .catch((err) => {
          showErrorToast(err.message);
        });
    } catch (err) {
      showErrorToast(err);
    }
  };
  const getfourthMenu = async (menu_id) => {
    try {
      let user_id = { user_id: localStorage.getItem("userId") };
      await CommonController.commonApiCallFilter(
        "menu/menu_list_level4?menu_id=" + menu_id,
        user_id,
        "post",
        "node"
      )
        .then((data) => {
          if (data.status === 200) {
            setSubMenuList(data.data);
            setloadingsubMenu(false);
          }
        })
        .catch((err) => {
          showErrorToast(err.message);
        });
    } catch (err) {
      showErrorToast(err);
    }
  };
  useEffect(() => {
    getfourthMenu(thirdMenuId);
  }, [thirdMenuId]);

  useEffect(() => {
    getThirdMenu(12);
  }, []);

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
            {loading ? (
              <div className="text-center">
                {buttonLoader(false, "Loading...", "")}
              </div>
            ) : null}
            {MenuList.map((tab, index) => {
              return (
                <Tab
                  onClick={() => {
                    setloadingsubMenu(true);
                    setthirdMenuId(tab.transaction_id);
                  }}
                  className={"tab"}
                  value={index}
                  key={"tab" + index}
                  label={tab.display_name}
                />
              );
            })}
          </Tabs>
          <div className="customtab-container">
            {loadingsubMenu ? (
              <div className="text-center">
                {buttonLoader(false, "Loading...", "")}
              </div>
            ) : (
              <>
                {selectedIndex===0 && (
                  <ConfigAccountIndex list={SubMenuList} />
                )}
                {selectedIndex === 1 && (
                  <ConfigProductIndex list={SubMenuList} />
                )}
              </>
            )}
            {/* {panel[selectedIndex].component} */}

            {}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ConfigurationMaster;
