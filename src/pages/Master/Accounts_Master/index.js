import React, { useState,useEffect } from "react";
import BrowseAccount from "./browse";
import AddAccountMaster from "./form";
import { useDispatch, useSelector } from "react-redux";
import { getAccountMasterFiltersList, previewSelectedAccount } from "../../../_redux/actions/masters/account.action";
import { clearSelectedAccountId } from "../../../_redux/actions/masters/all.action";
import { TCSAccount } from "./tcs";
import { getBrowseUserRight } from "../../../components/common";

const AccountsMaster = (props) => {
  const userRight = useSelector((state) => state.common.userRightResponse);
  const dispatch = useDispatch();
  const [selectedIndex, setSeletedIndex] = useState(0);
  const handleActionClick = (id) => {
    var param = {
      company_id: id,
    };
    dispatch(previewSelectedAccount(param));
    setSeletedIndex(1);
  };

  const handleIndex = (index) => {
    dispatch(clearSelectedAccountId());
    setSeletedIndex(index);
  };
  useEffect(()=>{
    dispatch(getAccountMasterFiltersList());
  },[]);
  
// useEffect(() => {
// setuserRight(getBrowseUserRight(thirdMenu.data))
// }, [thirdMenu])

  return (
    <div className="card card-custom gutter-b  px-5 py-3">
      <ul className="menu-nav mb-0 list-unstyled d-flex flex-wrap">
        <li className={" menu-item mb-2  border-bottom-0 rounded mr-2 "+ (selectedIndex === 0 ? "menu-level2-color" : "")}>
          <a
            className={`menu-link py-2 px-4 rounded d-inline-block  fw-bold ` + (selectedIndex === 0 ? "submenu-link-color" : "")}
            onClick={() => handleIndex(0)}
          >
            Browse
          </a>
        </li>
     {/* {userRight?.insert_right&& */}
     {userRight?.insert_right&& <li className={" menu-item mb-2  border-bottom-0 rounded mr-2 "+ (selectedIndex === 1 ? "menu-level2-color" : "")}>
      <a
        className={`menu-link py-2 px-4  d-inline-block   ` }
        onClick={() => handleIndex(1)}
      >
        New Account
      </a>
    </li>}
     {/* }   */}
     {userRight?.insert_right&&  <li className={" menu-item mb-2  border-bottom-0 rounded mr-2 "+ (selectedIndex === 2 ? "menu-level2-color" : "")}>
          <a
            className={`menu-link py-2 px-4  d-inline-block  `}
            onClick={() => handleIndex(2)}
          >
            TCS
          </a>
        </li>}
      </ul>
      <div className="container-fluid">
        {selectedIndex === 0 && (
          <BrowseAccount
            onPreview={() => setSeletedIndex(1)}
            onEdit={() => setSeletedIndex(1)}
            onActionClick={handleActionClick}
            accountType={props.accountType}
            browse_id={props.browse_id}
          />
        )}
        {(selectedIndex === 1 &&userRight?.insert_right) && <AddAccountMaster handleAddAccount={()=>setSeletedIndex(0)} />}
        {(selectedIndex === 2&&userRight?.insert_right) && <TCSAccount accountType={props.accountType}/>}
      </div>
    </div>
  );
};

export default AccountsMaster;
