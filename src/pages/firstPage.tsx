import React, { Component } from "react";
import { Web3Store } from "../stores/web3-store";
import { observer } from "mobx-react";
import ChartCard from "../components/chart-card";
import SuggestUserList from "../components/suggest-user-list";
import { Avatar, Button, Tabs, Modal } from "antd";
import twitter from "../images/icons/twitter.png";
import facebook from "../images/icons/facebook.png";
import linkedin from "../images/icons/linkedin.png";
import opensea from "../images/icons/opensea.png";
import more from "../images/icons/more.png";
import EmptyContent from "../components/empty-content";
import Badges from "../components/badges";
import ParseCard from "../components/parse-card"
import { Gene3ParseProvider } from "../data/gene3ParseProvider";
import { simplifyAccount } from "../utils/contractUtils";
import check1 from "../images/icons/check1.svg";
import deleteIcon from "../images/icons/delete.svg";
import bgTip from "../images/msg-tip.png"
import { MultiversxWallet } from "../stores/multiversx-wallet";
// import { autoAction } from "mobx/dist/internal";


const { Scrollbars } = require('react-custom-scrollbars');


interface IFirstPageProps {
  web3Store: Web3Store;
  multiverxProvider: MultiversxWallet;
  gen3PhaseProvider: Gene3ParseProvider;
}

interface IFirstPageState {
  showPopover: boolean;
  followed: boolean;
}
@observer
class FirstPage extends Component<IFirstPageProps, IFirstPageState> {
  constructor(props: IFirstPageProps, state: IFirstPageState) {
    super(props);
    this.state = {
      showPopover: false,
      followed: true,
    };
  }
  showPopover = () => {
    this.setState({
      showPopover: true,
    });
  };
  follow = () => {
    this.setState({
      followed: !this.state.followed,
    });
  };
  handleScrollStop = (val: any) => {
    console.log(val)
  }

  // componentDidMount() {
  //   Modal.info({
  //     content: 'Click Analyze on the right to start the test'
  //   });
  // }

  render() {
    const { web3Store, gen3PhaseProvider, multiverxProvider } = this.props;
    const { followed } = this.state;
    const { TabPane } = Tabs;

    return (
      <div className="main-container flex-row space-between">
        <div className="content-left flex-col">
          <Scrollbars style={{ height: "100%", width: "100%" }} onScrollFrame={this.handleScrollStop}>

            <div className="flex-row user-container">
              <div className="text-center">
                <Avatar
                  src={require("../images/test-images/avatar.png")}
                  size={148}
                  style={{ display: "block" }}
                ></Avatar>
                <Button ghost shape="round" className="btn-ghost btn-msg font-12">
                  Message
                  <div className="msg-tip flex-col space-around">
                    <img className="bg-img" src={bgTip} alt="" />
                    <p className="font-14">很抱歉，你无法向对方发起联络</p>
                    <p><img src={check1} alt="" />地址基因超过5,000分</p>
                    <p><img src={deleteIcon} alt="" />拥有以下特殊标签<span className="badge-item bg-orange-grad">BAYC Holder</span></p>
                    <p><img src={check1} alt="" />拥有任意OG标签<span className="badge-item bg-orange-grad">BAYC Holder</span></p>

                  </div>
                </Button>
                <div className="flex-row space-between link-btns">
                  <button>
                    <img src={twitter} alt="" />
                  </button>
                  <button>
                    <img src={facebook} alt="" />
                  </button>
                  <button>
                    <img src={linkedin} alt="" />
                  </button>
                  <button>
                    <img src={opensea} alt="" />
                  </button>
                  <button className="btn-more" onFocus={this.showPopover}>
                    <img src={more} alt="" />
                  </button>
                </div>
              </div>
              <div>
                <div>
                  <span className="user-addr font-30">{simplifyAccount(web3Store.account)}</span>
                  {followed ? (
                    <Button
                      className="btn-following"
                      size="small"
                      shape="round"
                      onClick={this.follow}
                      ghost
                    >
                      Following
                    </Button>
                  ) : (
                    <Button
                      className="btn-pink btn-follow"
                      size="small"
                      onClick={this.follow}
                    >
                      Follow
                    </Button>
                  )}
                </div>
                <div className="follow-data">
                  <span className="font-18 bold">381</span>
                  <span className="dark-text" style={{ marginRight: "24px" }}>
                    Following
                  </span>
                  <span className="font-18 bold">380.3k</span>
                  <span className="dark-text">Followers</span>
                </div>
                <div className="tags flex=row">
                  <span className="bg-pink-grad">Uniswap 1,000 ETH Trader</span>
                  <span className="bg-orange-grad">BAYC Holder</span>
                  <span className="bg-blue-grad">Diamond Hands</span>
                </div>
                <div className="font-12 info-text">
                  I love the Crypto world and am an avid Web3 player.I love the
                  Crypto world and am an avid Web3 player.I love the Crypto world
                  and am an avid Web3 player.I love the Crypto world and am an
                  avid Web3 player.
                </div>
              </div>
            </div>
            <Tabs
              defaultActiveKey="1"
              className="tab-container"
              tabBarGutter={49}
              style={{ marginTop: "48px" }}
            >
              <TabPane tab="Scores" key="1">
                {/* <EmptyContent/> */}
                <ParseCard web3Store={web3Store} gen3ParseProvider={gen3PhaseProvider} />
              </TabPane>
              <TabPane tab="Badges" key="2">
                <Badges />
              </TabPane>
              <TabPane tab="Endorsements" key="3">
                <EmptyContent />
              </TabPane>
            </Tabs>
          </Scrollbars>
        </div>

        <div className="content-right">
          <Scrollbars style={{ height: "100%", width: "100%" }} >
            <ChartCard multiverxProvider={multiverxProvider} gen3ParseProvider={gen3PhaseProvider} />
            <SuggestUserList web3Store={web3Store} />
          </Scrollbars>

        </div>
      </div>
    );
  }
}

export default FirstPage;
