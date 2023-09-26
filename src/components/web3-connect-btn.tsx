import React from 'react';
import {Component} from 'react';
import {Button,Tooltip} from 'antd';
import {Web3Store} from '../stores/web3-store';
import {StoreState} from '../stores/store-state';
import {observer} from 'mobx-react'
import {simplifyAccount} from "../utils/contractUtils";

interface IWeb3ConnecBtnProps {
    web3Store: Web3Store
    isConnectingWallet: boolean

}

const Web3ConnectBtn = observer(class Web3ConnectBtn extends Component<IWeb3ConnecBtnProps> {

        state = {
            isConnectingWallet: false
        }

        private askAccounts: boolean = true;

        constructor(props: IWeb3ConnecBtnProps) {
            super(props);
            this.state = {
                isConnectingWallet: props.isConnectingWallet
            }
            this.onClick = this.onClick.bind(this);
        }

        onClick() {
            this.setState({isConnectingWallet: true})
            this.props.web3Store.EnableAsync();
        }

        render() {
            const {web3Store} = this.props;

            if (this.askAccounts && web3Store.state !== StoreState.Pending && !web3Store.account) {
                web3Store.fetchAccount();
                this.askAccounts = false;
                return <Button loading={this.state.isConnectingWallet} shape={"round"}
                               className={"btn-pink"}>{"connecting"}</Button>;
            }

            // if (web3Store.account) {
            //     return <Button loading={false} shape={"round"} style={{fontSize: "0.3rem"}}
            //                    className={"wallet-address"}>{web3Store.account.substring(0, 3) + "···" + web3Store.account.substring(web3Store.account.length - 3, web3Store.account.length)}</Button>;
            // }
            if (web3Store.account) {
                return <Tooltip placement='left' title={web3Store.account}><span
                               className={"wallet-address dark-text"}>{simplifyAccount(web3Store.account)}</span></Tooltip>;
            }
            return <Button loading={this.state.isConnectingWallet} shape={"round"} className={"btn-pink"}
                           onClick={this.onClick}>Connect Wallet</Button>;
        }
    }
);

export default Web3ConnectBtn;
