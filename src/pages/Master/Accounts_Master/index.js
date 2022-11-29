import React, { useState } from "react";
import BrowseAccount from "./browse";
import AddAccountMaster from "./form";
import { useDispatch, useSelector } from "react-redux";
import { previewSelectedAccount } from "../../../_redux/actions/masters/account.action";
import { clearSelectedAccountId } from "../../../_redux/actions/masters/all.action";

const AccountsMaster = (props) => {
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
        <li className="nav-item">
          <a
            className={`nav-link ` + (selectedIndex === 1 ? "active" : "")}
            onClick={() => handleIndex(1)}
          >
            New Account
          </a>
        </li>
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
          />
        )}

        {selectedIndex === 1 && <AddAccountMaster />}
      </div>
    </div>
  );
};

export default AccountsMaster;
