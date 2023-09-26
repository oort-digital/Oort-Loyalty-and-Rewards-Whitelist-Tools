import React from "react";
import {Button,Avatar,Menu} from "antd";
import searchIcon from "../images/icons/search.png"
import unionIcon from "../images/icons/menu-icon.png"
import bell from "../images/icons/bell.png"
import {Web3Store} from "../stores/web3-store";
import Web3ConnectBtn from "../components/web3-connect-btn";
interface IHeaderProps {
  web3Store: Web3Store,
}
class NavHeader extends React.Component<IHeaderProps> {
  render() {
    const {web3Store} = this.props;
    return(
      <Menu className="nav-header flex-row space-between items-center" mode="horizontal" theme="dark">
        <Menu.Item><button className="search-btn"><img src={searchIcon} alt="" /></button></Menu.Item>
        <Menu.Item><button className="union-btn"><img src={unionIcon} alt="" /></button></Menu.Item>
        <Menu.Item><Button className="notice-btn btn-pink"><img src={bell} alt=""  style={{marginRight:"3px"}}/>15</Button></Menu.Item>
        <Menu.Item><Avatar className="user-avatar" src={require("../images/test-images/avatar1.png")}></Avatar>
        <Web3ConnectBtn web3Store={web3Store} isConnectingWallet={false}/></Menu.Item>
      </Menu>
    )
  }
}
export default NavHeader;
