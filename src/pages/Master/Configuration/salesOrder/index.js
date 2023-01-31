import { Tab, Tabs } from "@material-ui/core";
import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import IdClauseIndex from "./ldClause";
import FrightIndex from "./fright";
import InsuranceIndex from "./insurance";
import OctrolIndex from "./octrol";
import Pfindex from "./p&f";
import LoadingIndex from "./loading";
import BoardingIndex from "./boarding";
import TravelChargeIndex from "./travelCharge";
import ConveyanceIndex from "./conveyance";
import PaymentTermsIndex from "./paymentTerms";
import DeliveryIndex from "./delivery";
import ValidityIndex from "./validity";
import ModeOfDispatchIndex from "./modeOfDispatch";
import InspectionIndex from "./inspection";



const ConfigSalesOrder = ({list}) => {
  const [selectedIndex, setSeletedIndex] = useState(0);

  const handleIndex = (event, newValue) => {
    setSeletedIndex(newValue);
  };

  const getSelectedComponent = () => {
    switch (selectedIndex) {
      case 0:
        return <IdClauseIndex/>;
        break;
      case 1:
        return < FrightIndex/>;
        break;
      case 2:
        return <InsuranceIndex />;
        break;
      case 3:
        return <OctrolIndex />;
        break;
      case 4:
        return <Pfindex />;
        break;
      case 5:
        return <LoadingIndex />;
        break;
      case 6:
        return <BoardingIndex/>;
        break;
      case 7:
        return <TravelChargeIndex />;
        break;
        case 8:
          return <ConveyanceIndex />;
          break;
          case 9:
            return <PaymentTermsIndex />;
            break;
            case 10:
              return <DeliveryIndex />;
              break;
              case 11:
                return <ValidityIndex />;
                break;
                case 12:
                  return <ModeOfDispatchIndex />;
                  break;
                  case 13:
                    return <InspectionIndex />;
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

export default ConfigSalesOrder;
