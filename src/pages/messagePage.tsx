
import React from "react";
import {observer} from "mobx-react";
import {Input,List,Avatar,Badge} from "antd";
import {simplifyAccount} from "../utils/contractUtils";
import Chat from "../components/chat";

// test code
import user1 from "../images/test-images/user1.png";
import user2 from "../images/test-images/user2.png";
import user3 from "../images/test-images/avatar.png";
import user4 from "../images/test-images/avatar1.png";


const { Scrollbars} = require('react-custom-scrollbars');
interface MessageProps{

} 
interface MessageState{
  contactList:any[]
}

@observer
class MessagePage extends React.Component<MessageProps, MessageState> {
  constructor(props: MessageProps, state: MessageState) {
    super(props);
    this.state = {
      contactList: [],
    };
  }
  onSearchContacts = (e:any)=>{
    console.log(e.target.value)
  }

  private list = [
    {avatar:user1,name:"Tosin Okeowo",addr:"0x36bFa7A4be7A0ABBB8fBB00750D5B6bEE270E77d",online:false,lastMsg:"Aloha!",time:"10m",unread:120},
    {avatar:user2,name:"Tosin Okeowo",addr:"0x36bFa7A4be7A0ABBB8fBB00750D5B6bEE270E77d",online:true,lastMsg:"HOLA!",time:"20min",unread:5},
    {avatar:user3,name:"Tosin Okeowo",addr:"0x36bFa7A4be7A0ABBB8fBB00750D5B6bEE270E77d",online:false,lastMsg:"Good things come for boys who wait",time:"14:20",unread:0},
    {avatar:user4,name:"Tosin Okeowo",addr:"0x36bFa7A4be7A0ABBB8fBB00750D5B6bEE270E77d",online:false,lastMsg:"thx ^^",time:"00:35",unread:2},
    {avatar:user4,name:"Tosin Okeowo",addr:"0x36bFa7A4be7A0ABBB8fBB00750D5B6bEE270E77d",online:false,lastMsg:"Good things come for boys who wait",time:"18:49 04/19",unread:2}
  ]
  componentDidMount(){
    this.setState({contactList:this.list})
  }
render(){
  const {contactList} = this.state;
  return<div className="flex-row message-container">
      <div className="content-left">
        <div className="search-container">
        <Input className="contacts-search" placeholder="Search or start a new chat" allowClear onPressEnter={(e)=>{this.onSearchContacts(e)}}  />
        </div>
          <Scrollbars style={{width:"100%",height:"calc(100% - 40px)"}}>
          <List
            className="contact-list"
            itemLayout="horizontal"
            dataSource={contactList}
            split={false}
            renderItem={item => (
              <List.Item className="contact-item">
                <Badge 
                  className="item-badge" 
                  status={item.online?'success':'default'} 
                  offset={[-8,52]}>
                    <Avatar  size={60} src={item.avatar} />
                </Badge>
                <div className="item-content flex-row space-between">
                  <div className="content-text">
                    <div className="font-18 item-addr">{simplifyAccount(item.addr)}</div>
                    <div className="item-msg">{item.name}:{item.lastMsg}</div>
                  </div>
                  <div className="more-info text-right">
                    <div className="msg-time">{item.time}</div>
                    <Badge count={item.unread} style={{ backgroundColor: '#7D44F7'}} />
                  </div>
                </div>
              </List.Item>
          )}
          />
          </Scrollbars>
      </div>
      <div className="content-right">
        <div className="flex-row items-center" style={{marginLeft:"30px"}}><Badge 
                  className="item-badge" 
                  status="success"
                  offset={[-8,52]}>
                    <Avatar  size={60} src={user1} />
                </Badge>
                    <div className="font-18 item-addr" style={{color:"#9796CF",marginLeft:"12px"}}>0xip......JK09</div>
        </div>
        <Chat contactAddr="0xip......JK09"/>
      </div>
    </div>
  }
}
export default MessagePage;   