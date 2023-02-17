import React from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

const MainMenu = (props) => {
  const { list, onMenuChange } = props;
  const selectedMenu = window.location.pathname.split("/")[1];
  return (
    <div className="header_menu_wrapper">
      <Container fluid>
        <div className="header-navs header-navs-left">
          <ul className="menu-nav mb-0 list-unstyled d-flex flex-wrap">
            {list?.length > 0
              ? list?.map((item, index) => {
                  return (
                    <li
                      className={
                        "menu-item menu-level1-color " +
                        (selectedMenu ===
                        item.transaction_name.replace(/\s+/g, "-").toLowerCase()
                          ? "menu-level1-bg"
                          : "")
                      }
                      key={"menulist" + index}
                    >
                      <Link
                        onClick={() => onMenuChange(item.transaction_id, index)}
                        className={
                          "menu-link d-inline-block " +
                          (selectedMenu ===
                          item.transaction_name
                            .replace(/\s+/g, "-")
                            .toLowerCase()
                            ? " text-dark"
                            : "text-white")
                        }
                        to={`/${item.transaction_name.toLowerCase()}/${
                          item.transaction_id
                        }`}
                      >
                        {" "}
                        <span className="">{item.display_name}</span>
                      </Link>
                    </li>
                  );
                })
              : null}
          </ul>
        </div>
      </Container>
    </div>
  );
};

export default MainMenu;

// + (selectedSubMenu === (item.menu_name.replace(/\s+/g, '-').toLowerCase()) ? "active" : "")
