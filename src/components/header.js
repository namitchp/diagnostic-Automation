import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserRightList,
  getUserRightListSecond,
  getUserRightListThird,
  redirectMenu,
  userRight,
} from "../_redux/actions/common.action";
import MainBar from "./appbar";
import MainMenu from "./main_menu";
import Submenu from "./sub_menu";
import ThirdMenu from "./third_menu";
import CustomBreadcrumb from "./breadcrumbs";
const Header = ({ onHeaderClick }) => {
  const dispatch = useDispatch();
  const [userRightListArr, setUserRightList] = useState([]);
  const [subMenuList, setSubMenuList] = useState([]);
  const [thirdMenuList, setThirdMenuList] = useState([]);
  const [firstId, setfirstId] = useState(null);
  const [secondId, setsecondId] = useState(null);
  const [thirdId, setthirdId] = useState(null);
  const [firstLevelBit, setfirstLevelBit] = useState(false);
  let urlLocation = window.location.pathname
    .split("/")
    .filter((val) => val !== "");
  // console.log(urlLocation)
  const getuserRightListResponse = useSelector(
    (state) => state.common.userRightList
  );
  const getuserLIstSecond = useSelector(
    (state) => state.common.userRightListSecond
  );
  const getuserLIstThird = useSelector(
    (state) => state.common.userRightListThird
  );
  const getredirectMenu = useSelector((state) => state.common.redirectMenu);

  const redirect = (second, third) => {
    const value =
      third?.length > 0
        ? third[thirdId ? thirdId : 0]
        : second?.length > 0
        ? second[secondId ? secondId : 0]
        : "";
    dispatch(userRight(value));
  };
  console.log(getredirectMenu);
  const handleThirdMenu = (value, index) => {
    redirect(getuserLIstSecond.data, getuserLIstThird.data);

    setthirdId(index);
    if (value.main_form) {
      dispatch(userRight(value));
    } else {
      dispatch(userRight("null"));
    }
  };
  const handleSubMenu = (id, value, index) => {
    setsecondId(index);
    if (value.main_form || value.transaction_id === 12) {
      dispatch(userRight(value));
    } else {
      dispatch(userRight("null"));
    }
    if (subMenuList.length > 0) {
      id === 12
        ? dispatch(getUserRightListThird(1))
        : dispatch(getUserRightListThird(id));
    }
  };

  const handleMenuChange = (id, index) => {
    if (id > 0) {
      setfirstId(index);
      dispatch(getUserRightListSecond(id));
      setfirstLevelBit(true);
    }
    var tempMenuIndex = userRightListArr.findIndex(
      (x) => x.transaction_id === id
    );
    if (userRightListArr[tempMenuIndex].display_name !== "Profile") {
      //  dispatch(getUserRightListSecond(id));
      //  dispatch(getUserRightListThird(1));
      //  console.log("cvgbhn")
      //  setTimeout((tt) => {
      // console.log(tt)
      //   parseInt(urlLocation[3])===12?dispatch(getUserRightListThird(1)):dispatch(getUserRightListThird(parseInt(urlLocation[3])))
      //   console.log(urlLocation[3])
      //  },8000,urlLocation);
      //  console.log("g")
    }
  };
  useEffect(() => {
    dispatch(getUserRightList());
    dispatch(getUserRightListSecond(urlLocation[1]));
    parseInt(urlLocation[3]) === 12
      ? dispatch(getUserRightListThird(1))
      : dispatch(getUserRightListThird(parseInt(urlLocation[3])));
  }, []);
  console.log(thirdId);

  useEffect(() => {
    if (getuserRightListResponse) {
      setUserRightList(getuserRightListResponse.data);
    }
    if (getuserLIstSecond) {
      setSubMenuList(getuserLIstSecond.data);
    }
    if (getuserLIstThird) {
      setThirdMenuList(getuserLIstThird.data);
    } else {
      setThirdMenuList([]);
    }
    if (getuserLIstSecond && getuserLIstThird) {
      redirect(getuserLIstSecond.data, getuserLIstThird.data);
    }
  }, [getuserRightListResponse, getuserLIstSecond, getuserLIstThird]);
  // console.log(getuserLIstThird)
  console.log(getuserLIstSecond);
  useEffect(() => {
    if (firstLevelBit) {
      dispatch(getUserRightListThird(getuserLIstSecond.data[0].transaction_id));
    }
    // setThirdMenuList(getuserLIstThird.data);
  }, [getuserLIstSecond]);

  return (
    <React.Fragment>
      <MainBar onMenuClick={() => onHeaderClick()} />
      <MainMenu list={userRightListArr} onMenuChange={handleMenuChange} />
      {/* <CustomBreadcrumb /> */}
      <div className="wrapper">
        {subMenuList?.length > 0 ? (
          <Submenu list={subMenuList} onSubMenuChange={handleSubMenu} />
        ) : null}
        {thirdMenuList?.length > 0 && subMenuList.length > 0 ? (
          <ThirdMenu list={thirdMenuList} onMenuChange={handleThirdMenu} />
        ) : null}
      </div>
    </React.Fragment>
  );
};
export default Header;
