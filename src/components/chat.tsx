import React, { Component } from "react";
import { observer } from "mobx-react";
import { Form, Input, Button, Upload } from "antd";
import smiley from "../images/icons/Smiley.svg";
import paperclip from "../images/icons/Paperclip.svg";
import microphone from "../images/icons/microphone.svg";
import "emoji-mart/css/emoji-mart.css";
// test code
import noData from "../images/nodata.png" 


const { Picker } = require("emoji-mart");
const { Scrollbars } = require("react-custom-scrollbars");


interface ChatProps {
  contactAddr:string
}
interface ChatStates {
  messageList: any[];
  showEmoji: boolean;
  content: string;
}

@observer
class Chat extends Component<ChatProps, ChatStates> {
  constructor(props: ChatProps, state: ChatStates) {
    super(props);
    this.state = {
      showEmoji: false,
      messageList: [],
      content: "",
    };
    this.inputChange = this.inputChange.bind(this)
  }
  showEmojiPicker = () => {
    this.setState({
      showEmoji: !this.state.showEmoji,
    });
  };
  selectEmoji=(emoji:any)=>{
    this.setState({
      content:this.state.content+emoji.native,
      showEmoji:false
    })
  }
  inputChange=(event:any)=>{
    this.setState({
      content:event.target.value
    })
  }
  sendMsg=()=>{
    if(this.state.content==="")return false;
    let msg ={from:"Me",type:"text",content:this.state.content}
    let list = this.state.messageList;
    list.push(msg)
    this.setState({
      messageList:list
    },()=>{
      this.setState({
        content:""
      })
    })
  }
  private msgList=[
    {from:"Me",time:"11:59",type:"text",content:"How far that motor wey you talk say you wan dash your babe that day, your don sell am abi hin still dey house ?Be like say i don get buyer"},
    {from:"0xip......JK09",time:"12:03",content:"Naaaa bro Hin still dey house jare , I no sure say i wan sell am tho",type:"text"},
    {from:"0xip......JK09",time:"12:06",type:"image",image:noData},
  ]

  componentDidMount(){
    this.setState({messageList:this.msgList})
  }
  render() {
    const { showEmoji, messageList,content } = this.state;
    return (
      <div className="chat-container flex-col space-between">
        <div className="msg-container">
          <Scrollbars style={{width:"100%",height:"100%"}}>
            <ul className="msg-list">
              {messageList.map((item:any,index:number)=>(
              <li className={`msg-item flex-row ${item.from==="Me"?"msg-right":"msg-left"}`} key={index}>
                {(index===0||item.from!==messageList[index-1].from)&&<div className="from">{item.from}<span className="dark-text">{item.time}</span></div>}
                {item.type==="text"?(<div className="bg-msg">{item.content}</div>):(<div className="bg-msg"><img src={item.image} alt=""/></div>)}
              </li>
              ))}
            </ul>
          </Scrollbars>
        </div>
        <Form className="chat-form flex-row items-center" layout="inline">
          <Button
            className="chat-btn"
            onClick={this.showEmojiPicker}
            shape="circle"
            icon={<img src={smiley} alt="" />}
            size="large"
            ghost
          ></Button>
          <Upload showUploadList={false}>
            <Button
              className="chat-btn"
              shape="circle"
              icon={<img src={paperclip} alt="" />}
              size="large"
              ghost
            ></Button>
          </Upload>
          <Input
            bordered={false}
            className="chat-input"
            placeholder="Type a meFssage or send a voice note"
            value={content}
            onChange = {(e)=>{this.inputChange(e)}}
            onPressEnter={this.sendMsg}
          />
          <Button
            className="chat-btn"
            shape="circle"
            icon={<img src={microphone} alt="" />}
            size="large"
            ghost
          ></Button>
          {showEmoji && (
            <Picker
              set="apple"
              showPreview = {false}
              onSelect={(emoji:any)=>{this.selectEmoji(emoji)}}
              style={{ position: "absolute", left: "50px", top: "-450px" }}
            />
          )}
        </Form>
      </div>
    );
  }
}
export default Chat;
