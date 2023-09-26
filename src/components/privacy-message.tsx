import React, { Component } from "react";
import { observer } from "mobx-react";
import { Input } from "antd";

const { Scrollbars } = require("react-custom-scrollbars");
interface PrivacyMessageProps {}
interface PrivacyMessageState {
  score: number | null;
  inputScore: number | null;
  selectedBadges: string[];
}
@observer
class PrivacyMessage extends Component<
  PrivacyMessageProps,
  PrivacyMessageState
> {
  constructor(props: PrivacyMessageProps, state: PrivacyMessageState) {
    super(props);
    this.state = {
      score: null,
      inputScore: null,
      selectedBadges: [],
    };
  }
  changeInput = (e: any) => {
    const reg = /^[+]{0,1}(\d+)$/g;
    const value = e.target.value;
    if (value === "") {
      this.setState({ score: null });
    } else if (!reg.test(value)) return false;
    this.setState({
      score: e.target.value,
      inputScore: e.target.value,
    });
  };
  selectScore = (score: number) => {
    this.setState({
      score: score,
    });
  };
  focusInput = (e: any) => {
    const value = e.target.value;
    if (value !== "") {
      this.setState({ score: value });
    }
  };
  getClassName = (key: number) => {
    let className;
    switch (key) {
      case 0 :
        className = "bg-blue-grad";
        break;
      case 1:
        className = "bg-pink-grad";
        break;
      case 2:
        className = "bg-yellow-grad";
        break;
      default:
        className = "bg-orange-grad";
    }
    return className;
  };
  private selectList = [2000, 3000, 4000, 5000];
  private badges = [
    {
      list: [
        "Web3",
        "Wallet",
        "Pancake",
        "Good",
        "Crypto",
        "Uniswap",
        "Bitcoin",
        "Hand",
      ],
    },
    { list: ["Intermediate", "Primary", "Hello", "DeFi"] },
    { list: ["Senior"] },
    { list: ["OG"] },
  ];
  private specialBadges = ["Uniswap 1,000 ETH Trader", "BAYC Holder"];
  toggleTag = (tag:string)=>{
    let selected = this.state.selectedBadges;
    const index = selected.indexOf(tag);
    if(index<0){
      selected.push(tag)
    }else{
      selected.splice(index,1);
    }
    this.setState({
      selectedBadges:selected
    })
  }
  render() {
    const { score, inputScore, selectedBadges } = this.state;
    return (
      <div className="privacy-message">
        <Scrollbars style={{ width: "100%", height: "calc(100vh - 145px)" }}>
          <p>符合以下条件的地址可以向你发送信息</p>
          <p className="font-18 dot-parent" style={{ marginTop: "24px" }}>
            链上分数超过{" "}
            <span style={{ color: "#fff" }}>
              {score !== null ? score.toLocaleString() : "0"}
            </span>{" "}
            分
          </p>
          <p className="font-12">若未勾选表示任何地址都可以想你发送信息</p>
          <div className="score-selector flex-row items-center">
            <div className="line"></div>
            {this.selectList.map((item: number, index: number) => (
              <div
                className={`dot ${score === item ? "active" : ""}`}
                key={index}
              >
                <div
                  className="score-btn dark-text"
                  onClick={() => {
                    this.selectScore(item);
                  }}
                >
                  {item.toLocaleString()}
                </div>
              </div>
            ))}
            <div
              className={`dot ${
                score !== null &&
                (this.selectList.indexOf(score) < 0 || score === inputScore)
                  ? "active"
                  : ""
              }`}
            >
              <div className="score-btn dark-text">
                <Input
                  className="input-score"
                  onFocus={(e) => {
                    this.focusInput(e);
                  }}
                  onChange={(e) => {
                    this.changeInput(e);
                  }}
                  bordered={false}
                  placeholder="自定义"
                />
              </div>
            </div>
          </div>
          <p className="font-18" style={{marginTop:"24px"}}>拥有以下常规标签</p>
          {this.badges.map((item, index) => (
            <div className="badge-tags" key={index}>
              {item.list.map(tag=>{
                return(
                  <span key={tag} className={"badge-item "+this.getClassName(index)+" "+(selectedBadges.indexOf(tag)<0?"unselected":"")} onClick={()=>{this.toggleTag(tag)}}>{tag}</span>
                )
              })}           
            </div>
          ))}
          <p className="font-18" style={{marginTop:"24px"}}>拥有以下特殊标签</p>
          <div className="badge-tags">
            {this.specialBadges.map(tag=>(
                  <span key={tag} 
                  className={"badge-item "+this.getClassName(3)+" "+(selectedBadges.indexOf(tag)<0?"unselected":"")} onClick={()=>{this.toggleTag(tag)}}>{tag}</span>
            ))}
          </div>
        </Scrollbars>
      </div>
    );
  }
}

export default PrivacyMessage;
