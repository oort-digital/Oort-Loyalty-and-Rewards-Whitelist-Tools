import React, { Component } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { observer } from "mobx-react";
import ReactEcharts from 'echarts-for-react';
import { Button, Input } from "antd";
import Modal from "antd/es/modal";
import { Gene3ParseProvider } from "../data/gene3ParseProvider";
import { Gen3Dimension, LoadingState } from "../utils/contranst";
import { MultiversxWallet } from '../stores/multiversx-wallet';


interface CardProps {
    multiverxProvider: MultiversxWallet
    gen3ParseProvider: Gene3ParseProvider
}

interface CardStates {
    activeCard: number
    opened: boolean
}

@observer
class ChartCard extends Component<CardProps, CardStates> {
    private loadingSate: LoadingState = LoadingState.default;

    constructor(props: CardProps, state: CardStates) {
        super(props);
        this.state = {
            activeCard: 0,
            opened: false
        }
        this.onOk = this.onOk.bind(this);
    }

    switchCard = (key: number) => {
        if (key !== 0) {
            Modal.warn({
                content: `The chain is not supported at the moment.`
            });
            return;
        }
        this.setState({
            activeCard: key
        })
    };


    switchCardByNum = (num: number) => {
        if (num !== 0) {
            Modal.warn({
                content: `Only support ETH at moment.`
            });
            return;
        }
        let active = this.state.activeCard + num;
        active < 0 && (active = 2);
        active > 2 && (active = 0);
        this.setState({
            activeCard: active
        })
    };

    getData = () => {
        const { gen3ParseProvider,  multiverxProvider } = this.props;
        if (multiverxProvider && !multiverxProvider.account) {
            Modal.warn({
                content: `Please connect multiverx wallet first.`
            });
            return;
        }
        
        if (gen3ParseProvider.curRequestFailed) {
            this.loadingSate = LoadingState.retry;
            this.setState({}, () => {
                gen3ParseProvider.retryCurRequest(multiverxProvider.account);
            });
            return;
        }
        this.loadingSate = LoadingState.parseStarted;
        this.setState({}, () => {
            gen3ParseProvider.startPhase(multiverxProvider.account);
        });
    };

    renderParseBtn = () => {
        const { gen3ParseProvider } = this.props;
        let text = "Analyze";

        if (gen3ParseProvider.curRequestFailed && this.loadingSate !== LoadingState.retry) {
            //update button text and status
            text = "Retry";
            this.loadingSate = LoadingState.requestFailed;
            Modal.error({
                title: 'Request failed',
                content: `${gen3ParseProvider.resultMessage},please try again`,
                onOk: close => {
                    this.getData();
                    close();
                },
                okText: "Retry"
            });
        } else if (gen3ParseProvider.requestFinished) {
            text = "Done";
            this.loadingSate = LoadingState.finished;
            let totalScore = 0;
        gen3ParseProvider.responseData.forEach((parseResult, index) => {
            totalScore += parseResult.totalScore;
        });
        if (totalScore >= 60) {
            Modal.info({
                title: "Please fill in your Mumbai wallet address,we will  send a hero in MultiversX clan to you soon",
                content : <Input className="contacts-search" placeholder="Input the Mumbai wallet address" allowClear onPressEnter={(e)=>{this.inputTheWallet(e)}}  />,
                onOk: close => {
                    close();
                },
                okText: "I Get it!"
            })
        }
        }

        const isLoading = this.loadingSate === LoadingState.parseStarted ||
            this.loadingSate === LoadingState.retry;

        return <Button
            className="btn-parse"
            size="small"
            shape="round"
            loading={isLoading}
            disabled={gen3ParseProvider.requestFinished}
            ghost
            onClick={() => {
                this.getData()
            }}
        >
            {text}
        </Button>;
    };

    onOk = () => {
       this.setState({
        opened: false
       })
    };

    inputTheWallet = (e:any)=>{
        console.log(e.target.value)
      };
    renderClaimHeroModal = () => {
        return <Modal
        style={{width:"450px", background: "#1b1940"}}
            title="Please fill in your Mumbai wallet address,we will  send a hero in MultiversX clan to you soon"
            // eslint-disable-next-line no-restricted-globals
            open={this.state.opened}
            onOk={() => this.onOk}
            onCancel={() => {this.setState({
                opened: false
            })}}>
                    <Input className="contacts-search" placeholder="Input the Mumbai wallet address" allowClear onPressEnter={(e)=>{this.inputTheWallet(e)}}  />
        </Modal>
    };

    getOption = () => {
        const { gen3ParseProvider } = this.props;
        //逆时针
        let graphData = [[0, 0, 0, 0, 0]];
        gen3ParseProvider.responseData.forEach((parseResult, index) => {
            switch (parseResult.dimension) {
                case Gen3Dimension.DEFI:
                    if (parseResult.totalScore > 20) {
                        graphData[0][0] = 20;
                    } else {
                        graphData[0][0] = parseResult.totalScore;
                    }
                    break;
                case Gen3Dimension.NFT:
                    if (parseResult.totalScore > 20) {
                        graphData[0][0] = 20;
                    } else {
                        graphData[0][1] = parseResult.totalScore;
                    }
                    break;
                case Gen3Dimension.ACTIVITY:
                    if (parseResult.totalScore > 20) {
                        graphData[0][0] = 20;
                    } else {
                        graphData[0][2] = parseResult.totalScore;
                    }
                    break;
                case Gen3Dimension.VOLUME:
                    if (parseResult.totalScore > 20) {
                        graphData[0][0] = 20;
                    } else {
                        graphData[0][3] = parseResult.totalScore;
                    }
                    break;
                case Gen3Dimension.GAMEFI:
                    if (parseResult.totalScore > 20) {
                        graphData[0][0] = 20;
                    } else {
                        graphData[0][4] = parseResult.totalScore;
                    }
                    break;
                default:
                    break;
            }
        });

        let totalScore = 0;
        gen3ParseProvider.responseData.forEach((parseResult, index) => {
            totalScore += parseResult.totalScore;
        });

        const scoreStr = totalScore === 0 ? "" : Math.ceil(totalScore);

        const i = this.state.activeCard;
        const colors = ["#EF5DA8", "#F7D044", "#7D44F7"];

        let option = {
            radar: {
                indicator: [
                    { name: Gen3Dimension.DEFI, max: 20 },
                    { name: Gen3Dimension.NFT, max: 20 },
                    { name: Gen3Dimension.ACTIVITY, max: 20 },
                    { name: Gen3Dimension.VOLUME, max: 20 },
                    { name: Gen3Dimension.GAMEFI, max: 20 },
                ],
                splitLine: {
                    show: true,
                    lineStyle: { color: ["#5D5FEF"] }
                },
                splitArea: {
                    show: false
                },
                radius: 110
            },
            graphic: {
                type: "text",
                left: "center",
                top: "center",
                style: {
                    text: scoreStr,
                    textAlign: "center",
                    fill: "#fff",
                    fontSize: 20,
                }
            },
            color: [colors[i]],
            series: [
                {
                    type: 'radar',
                    itemStyle: {
                        emphasis: {
                            lineStyle: { width: 3 }
                        }
                    },

                    data: [
                        {
                            value: graphData[i],
                            areaStyle: {
                                color: colors[i],
                                opacity: .3
                            }
                        }
                    ]
                }
            ]
        };
        return option;
    };

    // renderLeftIcon = () => {
    //     const i = this.state.activeCard;
    //     const icons = [{ name: "eth", icon: ethIcon }, { name: "bnb", icon: bnbIcon }, { name: "eth", icon: polygonIcon }]
    //     return <div className={`left-icon bg-${icons[i].name}`}>
    //         <img src={icons[i].icon} alt="" className={icons[i].name} />
    //     </div>
    // };

    render() {
        

        return <div className='chart-card'>
            {/* <div className={`switch-btn switch-eth bg-eth  ${activeCard === 0 ? "active" : ""}`} onClick={() => {
                this.switchCard(0)
            }}><img src={ethIcon} alt="" className="eth" />ETH
            </div>
            <div className={`switch-btn switch-bnb bg-bnb ${activeCard === 1 ? "active" : ""}`} onClick={() => {
                this.switchCard(1)
            }}><img src={bnbIcon} alt="" className="bnb" />BNB
            </div>
            <div className={`switch-btn switch-polygon bg-polygon ${activeCard === 2 ? "active" : ""}`} onClick={() => {
                this.switchCard(2)
            }}><img src={polygonIcon} alt="" className="bnb" style={{ marginTop: '0px' }} /><span>Pol</span></div>
            <div className="btn-left text-center" onClick={() => {
                this.switchCardByNum(-1)
            }}><img src={leftIcon} alt="" /></div>
            <div className="btn-right text-center" onClick={() => {
                this.switchCardByNum(1)
            }}><img src={leftIcon} alt="" /></div> */}
            <div className='bg-card-gray chart-container'>
                {/* {this.renderLeftIcon()} */}
                <div style={{ paddingTop: "20px" }} className="text-center">
                    <ReactEcharts
                        option={this.getOption()}
                        style={{ width: '400px', height: '280px', top: "20px" }}
                        className='chart-content' />
                    {this.renderParseBtn()}
                    {/* {this.renderClaimHeroModal()} */}
                </div>
            </div>
        </div>
    }
}

export default ChartCard;
