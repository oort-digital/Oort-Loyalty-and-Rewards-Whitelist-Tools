import React, { Component } from "react";
import { Web3Store } from "../stores/web3-store";
import { observer } from "mobx-react";
import { Avatar } from "antd";
// test code
import user1 from "../images/test-images/user1.png";
import user2 from "../images/test-images/user2.png";
import user3 from "../images/test-images/avatar.png";
import user4 from "../images/test-images/avatar1.png";


interface UserListProps {
  web3Store: Web3Store;
}

interface UserListStates {
  collapse:boolean;
  list:any[]
}

@observer
class SuggestUserList extends Component<UserListProps, UserListStates> {
    constructor(props: UserListProps,state:UserListStates) {
      super(props);
      this.state = {
        collapse:true,
        list:[]
      }
  }
  collapseUser = ()=>{
    if(this.state.collapse){
      this.list = this.userList;
    }else{
      this.list = this.userList.slice(0,3);
    }
    this.setState({collapse:!this.state.collapse})
  }
  private userList:any[] = [
    {avatar:user1,addr:"0xip......JK09",grade:"og"},
    {avatar:user2,addr:"0xip......JK09",grade:"primary"},
    {avatar:user4,addr:"0xip......JK09",grade:"middle"},
    {avatar:user2,addr:"0xip......JK09",grade:"middle"},
    {avatar:user3,addr:"0xip......JK09",grade:"og"},
    {avatar:user1,addr:"0xip......JK09",grade:"high"},
    {avatar:user2,addr:"0xip......JK09",grade:"primary"},
    {avatar:user4,addr:"0xip......JK09",grade:"high"},
    {avatar:user3,addr:"0xip......JK09",grade:"high"}
  ]
  getClassName = (key:string)=>{
    let className;
    switch (key){
      case "og":
          className="bg-orange-grad"
          break;
      case "high":
          className="bg-yellow-grad" 
          break;
      case "middle":
          className="bg-pink-grad"  
          break;
      default :
          className="bg-blue-grad"  
    }
    return className;
  }
  private list :any[] = this.userList.slice(0,3);

    render() {
    // const { web3Store } = this.props;
    const {collapse} = this.state;
    console.log(this.list)
    return (
      <div className="suggest-card bg-card-gray">
        <p className="dark-text ">People you may be interested in</p>

          <ul className="suggest-list">
            {this.list.map((item:any,index:number)=>(
            <li className="list-item flex-row" key={index}>
              <Avatar
                size={60}
                src={item.avatar}
                alt=""
              ></Avatar>
              <div>
                <p className="font-18 user-addr">{item.addr}</p>
                <span className={`tag ${this.getClassName(item.grade)}`}>AZUKI Holder</span>
              </div>
            </li>
           ))}
          </ul>
        <p className="text-center">
          <span style={{ color: "#70B2FF", cursor: "pointer" }} onClick={this.collapseUser}>{collapse?"See All":"Collapse"}</span>
        </p>
      </div>
    );
  }
}

export default SuggestUserList;
