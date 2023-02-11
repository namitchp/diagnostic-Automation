import React from 'react';
import { Link } from 'react-router-dom';
const MainMenu = (props) => {
    const { list, onMenuChange } = props;
    const selectedMenu = window.location.pathname.split("/")[1];
    return(
        <div className="header-bottom">
                <div className="px-3">
                    <div className="header-navs header-navs-left">
                    <ul className="menu-nav mb-0 list-unstyled d-flex  flex-wrap">
                            {list.length > 0 ? list?.map(( item, index ) => {
                                return <li className={"menu-item rounded  px-4 mr-2  menu-level1-color "+ (selectedMenu === (item.transaction_name.replace(/\s+/g, '-').toLowerCase()) ? "menu-level1-bg" :"")} key={"menulist" + index}>
                                    <Link onClick={() => onMenuChange(item.transaction_id,index)} className={"menu-link py-2 px-4 rounded  d-inline-block "+ (selectedMenu === (item.transaction_name.replace(/\s+/g, '-').toLowerCase()) ? " text-dark" : "text-white") } to={`/${item.transaction_name.toLowerCase()}/${item.transaction_id}`}> <span className="">{item.display_name}</span></Link>
                                </li>
                            }) : null}
                     </ul>
                </div>
            </div>
        </div>
    )
}

export default MainMenu;

// + (selectedSubMenu === (item.menu_name.replace(/\s+/g, '-').toLowerCase()) ? "active" : "")