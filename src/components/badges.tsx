import React,{ Component }  from "react";
import {Progress ,Avatar} from "antd";

// test code
import user1 from "../images/test-images/user1.png";
import user2 from "../images/test-images/user2.png";
import user3 from "../images/test-images/avatar.png";
import user4 from "../images/test-images/avatar1.png";


class Badges extends Component {
  private badgesData:any[]=[
    {tag:"NFT",type:"Cryptopunks",name:"Early Minter",img:user1,Progress:100},
    {tag:"Game",type:"Axie infinity",name:"Original Gangster",img:user2,Progress:100},
    {tag:"Game",type:"MetaCartel",name:"Token Sale Participant",img:user3,Progress:100},
    {tag:"Dao",type:"Cryptopunks",name:"Token Sale Participant",img:user4,Progress:98},
    {tag:"Defi",type:"Cryptopunks",name:"Original Gangster",img:user3,Progress:43},
    {tag:"Common",type:"MetaCartel",name:"Blood Mage",img:user4,Progress:76},
    {tag:"Defi",type:"Axie infinity",name:"Early Minter",img:user2,Progress:39},
  ];
  render() {
    return <div className="badges-container">
          <div className="dark-text" style={{marginLeft:"10px"}}>Updated 1 min ago</div>
      <div className="flex-row badges-list">
      {this.badgesData.map((item: any, index: number) => (
          <div className="badges-item bg-card-gray text-center" key={index}>
            <Progress  
            type="dashboard" 
            showInfo={false} 
            strokeColor={{ '0%': '#87d068', '100%': '#108ee9'}} 
            trailColor="#3e3d79"
            percent={item.Progress} 
            width={100}/>
            <Avatar className="item-img" src={item.img} size={80}/>
            <span className="item-tag font-12">{item.tag}</span>
            <div className="item-type font-12">{item.type}</div>
            <div className="item-name font-12 bold">{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  }
}

export default Badges;
