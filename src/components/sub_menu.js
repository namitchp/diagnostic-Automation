import React from "react";
import { Link } from "react-router-dom";
const Submenu = (props) => {
  const { list, onSubMenuChange } = props;
  const selectedMenu = window.location.pathname.split("/")[1];
  const selectedSubMenu = window.location.pathname.split("/")[3];
  const selectedSubMenusec = window.location.pathname.split("/")[2];
  return (
    <div className="header-bottom submenu">
      <div className="px-3">
        <div className="header-navs header-navs-left">
          <ul className="menu-nav mb-0 list-unstyled d-flex flex-wrap">
            {list.length > 0
              ? list.map((item, index) => {
                  if (item.level === 2) {
                    return (
                      <li className={"menu-item rounded  mr-2 "+ (selectedSubMenu ===
                        item.transaction_name
                          .replace(/[^a-zA-Z ]/g, "")
                          .replace(/\s+/g, "-")
                          .toLowerCase()
                          ? // ? "active text-success"
                            "menu-level2-color"
                          : "")} key={"sublist" + index}>
                        <Link
                          onClick={() => onSubMenuChange(item.transaction_id,item)}
                          className={
                            "menu-link py-2 px-4 rounded d-inline-block " +
                            (selectedSubMenu ===
                            item.transaction_name
                              .replace(/[^a-zA-Z ]/g, "")
                              .replace(/\s+/g, "-")
                              .toLowerCase()
                              ? // ? "active text-success"
                                "submenu-link-color"
                              : "")
                          }
                          to={`/${selectedMenu.toLowerCase()}/${selectedSubMenusec}/${item.transaction_name
                            .replace(/[^a-zA-Z ]/g, "")
                            .replace(/\s+/g, "-")
                            .toLowerCase()}/${item.transaction_id}`}
                        >
                          {" "}
                          <span className="menu-text">
                            {item.transaction_name}
                          </span>
                        </Link>
                      </li>
                    );
                  }
                })
              : null}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Submenu;

// + (selectedSubMenu === (item.transaction_name.replace(/\s+/g, '-').toLowerCase()) ? "active" : "")
