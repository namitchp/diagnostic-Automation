import React, { useState,useEffect } from "react";
import BrowseAccount from "./browse";
import AddAccountMaster from "./form";
import { useDispatch, useSelector } from "react-redux";
import { getAccountMasterFiltersList, previewSelectedAccount } from "../../../_redux/actions/masters/account.action";
import { clearSelectedAccountId } from "../../../_redux/actions/masters/all.action";
import { TCSAccount } from "./tcs";
import { getBrowseUserRight } from "../../../components/common";

const AccountsMaster = (props) => {
  const dispatch = useDispatch();
  const [selectedIndex, setSeletedIndex] = useState(0);
  const [userRight, setuserRight] = useState({})
const thirdMenu=useSelector((state)=>state.common.userRightListThird)
// console.log(thirdMenu)
// console.log(getBrowseUserRight(thirdMenu.data)?.insert_right)
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
    <div className="card card-custom gutter-b  px-7 py-3">
      <ul className="nav nav-tabs nav-tabs-line">
        <li className="nav-item">
          <a
            className={`nav-link ` + (selectedIndex === 0 ? "active" : "")}
            onClick={() => handleIndex(0)}
          >
            Browse
          </a>
        </li>
     {/* {userRight?.insert_right&& */}
      <li className="nav-item">
      <a
        className={`nav-link ` + (selectedIndex === 1 ? "active" : "")}
        onClick={() => handleIndex(1)}
      >
        New Account
      </a>
    </li>
     {/* }   */}
        <li className="nav-item">
          <a
            className={`nav-link ` + (selectedIndex === 2 ? "active" : "")}
            onClick={() => handleIndex(2)}
          >
            TCS
          </a>
        </li>
      </ul>
      <div className="tab-content">
        {selectedIndex === 0 && (
          <BrowseAccount
            onPreview={() => setSeletedIndex(1)}
            onEdit={() => setSeletedIndex(1)}
            onActionClick={handleActionClick}
            accountType={props.accountType}
            browse_id={props.browse_id}
          />
        )}
        {selectedIndex === 1 && <AddAccountMaster handleAddAccount={()=>setSeletedIndex(0)} />}
        {selectedIndex === 2 && <TCSAccount accountType={props.accountType}/>}
      </div>
    </div>
  );
};

export default AccountsMaster;
