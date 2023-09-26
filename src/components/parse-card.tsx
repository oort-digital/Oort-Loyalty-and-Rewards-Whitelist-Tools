import React, { Component } from "react";
import ethIcon from "../images/icons/ETH.svg";
import bnbIcon from "../images/icons/BNB.svg";
import polygonIcon from "../images/icons/Polygon.svg";
import checkIcon from "../images/icons/check.svg";
// test code
import { observer } from "mobx-react";
import {
  Gene3ParseProvider,
  IParseResult,
  IParseResultItem,
} from "../data/gene3ParseProvider";
import { Web3Store } from "../stores/web3-store";


interface ParseProps {
  gen3ParseProvider: Gene3ParseProvider;
  web3Store: Web3Store;
}

interface ParseState {
  parseProgress: number;
}

const ParseCard = observer(
  class ParseCard extends Component<ParseProps, ParseState> {
    constructor(props: ParseProps, state: ParseState) {
      super(props);
      this.state = {
        parseProgress: 0,
      };
    }

    private parseList: any[] = [
      {
        name: "eth",
        className: "bg-eth",
        img: ethIcon,
        showData: false,
        parsing: false,
        data: 0,
        progress: 0,
      },
      {
        name: "bnb",
        className: "bg-bnb",
        img: bnbIcon,
        showData: false,
        parsing: false,
        data: 0,
        progress: 0,
      },
      {
        name: "polygon",
        className: "bg-polygon",
        img: polygonIcon,
        showData: false,
        parsing: false,
        data: 0,
        progress: 0,
      },
    ];

    renderParseList() {
      const { gen3ParseProvider } = this.props;

      let totalScore = 0;
      gen3ParseProvider.responseData.forEach((parseResult, index) => {
        totalScore += parseResult.totalScore;
      });

      this.parseList[0].data = Math.ceil(totalScore);
      this.parseList[0].progress = gen3ParseProvider.progress;

      return (
        <div className="flex-row flex-wrap">
          {this.parseList.map((item: any, index: number) => (
            <div
              className={`${item.className} parse-card  flex-row space-around items-center`}
              key={index}
            >
              <img src={item.img} alt="" />
              <div className="parse-data">
                <div className="font-30" style={{ marginBottom: "-10px" }}>
                  {item.data.toLocaleString()}
                </div>
                <span className="font-12">Score</span>
              </div>
              <div className="parse-data">
                <span
                  className="parse-progress"
                  style={{ width: `${item.progress}%` }}
                ></span>
              </div>
            </div>
          ))}
        </div>
      );
    }

    renderScrollBars() {
      const { gen3ParseProvider } = this.props;

      return  <div>
        {gen3ParseProvider.responseData.map(
          (parseResult: IParseResult, index: number) => (
            <div className="dimension" key={index}>
              <span className="parse-tag">{parseResult.dimension}</span>
              <div className="score-list">
                {parseResult.items.map(
                  (parseResultItem: IParseResultItem, i: number) => (
                    <div className="flex-row score-item items-center" key={i}>
                      <div className="score text-right">
                        {parseResultItem.score.toFixed(0).toLocaleString()}
                      </div>
                      <div className="text">{parseResultItem.text}</div>
                      <img src={checkIcon} alt="" />
                    </div>
                  )
                )}
              </div>
            </div>
          )
        )}
      </div>;
    }

    render() {
      return (
        <div className="parse-container">
          {this.renderParseList()}
          {this.renderScrollBars()}
        </div>
      );
    }
  }
);

export default ParseCard;
