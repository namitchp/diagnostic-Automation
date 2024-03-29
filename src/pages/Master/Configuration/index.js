import { useEffect } from "react";
import { Tab, Tabs } from "@material-ui/core";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import ConfigAccountIndex from "./Account";
import ConfigProductIndex from "./product";
import ConfigEnquiryIndex from "./enquiry";
import ConfigCostingIndex from "./costing";
import { CommonController } from "../../../_redux/controller/common.controller";
import { buttonLoader, showErrorToast } from "../../../components/common";
import ConfigSalesOrder from "./salesOrder";
import ConfigQuotation from "./quotation";
import ConfigCourier from "./courier";
import MenuStructureIndex from "./menustructure";
import { Col, Container, Row } from "react-bootstrap";
const useStyles = makeStyles((theme) => ({
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));
const ConfigurationMaster = () => {
  const classes = useStyles();
  const [transectionId, settransectionId] = useState(101);
  const [selectedIndex, setSeletedIndex] = useState(0);
  const [MenuList, setMenuList] = useState([]);
  const [SubMenuList, setSubMenuList] = useState([]);
  const [loading, setloading] = useState(true);
  const [loadingsubMenu, setloadingsubMenu] = useState(true);
  const panel = {
    101: <ConfigAccountIndex list={SubMenuList} />,
    102: <ConfigProductIndex list={SubMenuList} />,
    103: <ConfigEnquiryIndex list={SubMenuList} />,
    104: <ConfigCostingIndex list={SubMenuList} />,
    105: <ConfigQuotation list={SubMenuList} />,
    106: <ConfigSalesOrder list={SubMenuList} />,
    107: <ConfigCourier list={SubMenuList} />,
    144: <MenuStructureIndex />,
  };
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
    getThirdMenu(12);
    getfourthMenu(101);
  }, []);
  const handleTransectionID = (tab) => {
    setloadingsubMenu(true);
    getfourthMenu(tab.transaction_id);
    settransectionId(tab.transaction_id);
  };
  const handleIndex = (event, newValue) => {
    setSeletedIndex(newValue);
  };

  return (
    <div className="main_wrapper">
      <div className="inner_main_first">
        <div className="configuration_wrapper">
          <div className="inner_main_third">
            <Container fluid>
              <Row>
                <Col md={2} className="pe-0">
                  <div className="side_menu">
                    <Tabs
                      orientation="vertical"
                      variant="scrollable"
                      value={selectedIndex}
                      onChange={handleIndex}
                      className={`menu-nav`}
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
                            onClick={() => handleTransectionID(tab)}
                            className={
                              transectionId === tab.transaction_id
                                ? "tabstyle"
                                : ""
                            }
                            value={index}
                            // style={{ height: "10px" }}
                            key={"tab" + index}
                            label={tab.display_name}
                          />
                        );
                      })}
                    </Tabs>
                  </div>
                </Col>
                <Col md={10} className="ps-0">
                  <div className="customtab-container">
                    {loadingsubMenu ? (
                      <div className="text-center">
                        {buttonLoader(false, "Loading...", "")}
                      </div>
                    ) : (
                      panel[transectionId]
                    )}
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ConfigurationMaster;
