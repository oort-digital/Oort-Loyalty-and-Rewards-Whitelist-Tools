import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import logo from "../images/logo@2x.png";
import routes from "../router-config";
import collapseIcon from "../images/icons/collapse.svg";
interface SideProps {
  collapseSider: () => void;
  isCollapse: boolean;
}
class SideMenu extends React.Component<SideProps>{
  handleClick = () => {
    this.props.collapseSider();
  }
  render() {

    return (
      <Menu
        style={{ width: "100%", height: "100vh" }}
        defaultSelectedKeys={["0"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="dark"
        className="side-menu"
      >
        <img src={logo} alt="" className="side-logo" />
        {routes.map((route, index) => (
          <Menu.Item key={index}>

            <Link to={route.path}><span className="icon-container"><img
              className="nav-icon"
              src={require(`../images/icons/${route.icon}`)}
              alt=""
            /></span><span className="menu-name">{route.pathName}</span></Link>
          </Menu.Item>
        ))}
        <button className="collapse-btn" onClick={this.handleClick}>
          <img src={collapseIcon} alt="" />
        </button>
      </Menu>
    );
  }
}
export default SideMenu;
