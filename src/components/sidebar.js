import React from "react";

const Sidebar = ({ onToggle, show, menuList }) => {
  return (
    <div className={`main-sidebar ${show ? "sidebar--show" : ""}`}>
      <div className="top-main  d-flex align-items-center">
        <div className="logo-header mr-5">
          {/* <img src={logo} className="img-fluid" /> */}
          <h4 className="mb-0 text-white" style={{ fontSize: 24 }}>
            DIAGNOSTIC
          </h4>
          <p className="logo-text mb-0 text-white">
            <small>Diagnostic Automation</small>
            <span className="ml-2">13.5</span>
          </p>
        </div>
        <img
          src={"/asset/icons/chevrons-left.svg"}
          onClick={() => onToggle()}
          className="svg-menu mr-3"
        />
        <img
          src={"/asset/icons/pin.svg"}
          className="svg-menu"
          onClick={() => onToggle()}
        />
      </div>
      <div className="sidebar-menulist mt-10">
        {console.log(menuList)}
        <ul className="list-unstyled">
          {menuList &&
            menuList.map((menu, index) => {
              return (
                <li key={index}>
                  {" "}
                  {menu.menu_name}{" "}
                  <i className="fas fa-chevron-right float-right"></i>
                </li>
              );
            })}
          <li></li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
