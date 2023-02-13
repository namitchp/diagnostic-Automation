import React from "react";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { userRight } from "../_redux/actions/common.action";

const ThirdMenu = (props) => {
  const dispatch = useDispatch();
  const { list, onMenuChange } = props;
  const selectedMenu = window.location.pathname.split("/")[1];
  const id1 = window.location.pathname.split("/")[2];
  const selectedSubMenu = window.location.pathname.split("/")[3];
  const id2 = window.location.pathname.split("/")[4];
  const thirdMenu = window.location.pathname.split("/")[5];

  return (
    <Container className="header-bottom" fluid>
      <div className="third">
        <div className="header-navs header-navs-left">
          <ul className="menu-nav mb-0 list-unstyled d-flex flex-wrap">
            {list?.length > 0
              ? list.map((item, index) => {
                  if (item.level === 3) {
                    return (
                      <li
                        className={
                          "menu-item mr-2 " +
                          (thirdMenu ===
                          item.transaction_name
                            .replace(/[^a-zA-Z ]/g, "")
                            .replace(/\s+/g, "-")
                            .toLowerCase()
                            ? "menu-level2-color"
                            : "")
                        }
                        key={"sublist" + index}
                      >
                        <Link
                          onClick={() => {
                            onMenuChange(item, index);
                          }}
                          className={
                            "menu-link d-inline-block " +
                            (thirdMenu ===
                            item.transaction_name
                              .replace(/[^a-zA-Z ]/g, "")
                              .replace(/\s+/g, "-")
                              .toLowerCase()
                              ? "submenu-link-color"
                              : "")
                          }
                          to={`/${selectedMenu?.toLowerCase()}/${id1}/${selectedSubMenu?.toLowerCase()}/${id2}/${item.transaction_name
                            .replace(/[^a-zA-Z ]/g, "")
                            .replace(/\s+/g, "-")
                            .toLowerCase()}/${item.transaction_id}`}
                        >
                          {" "}
                          {item.display_name}
                        </Link>
                      </li>
                    );
                  }
                })
              : null}
          </ul>
        </div>
      </div>
    </Container>
  );
};

export default ThirdMenu;

// + (selectedSubMenu === (item.transaction_name.replace(/\s+/g, '-').toLowerCase()) ? "active" : "")
