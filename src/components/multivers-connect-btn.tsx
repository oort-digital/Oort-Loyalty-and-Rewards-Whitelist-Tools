import React from 'react';
import {Component} from 'react';
import {Button,Tooltip} from 'antd';
import {StoreState} from '../stores/store-state';
import {observer} from 'mobx-react'
import {simplifyAccount} from "../utils/contractUtils";
import { MultiversxWallet } from '../stores/multiversx-wallet';

interface IWeb3ConnecBtnProps {
    walletProvider: MultiversxWallet
    isConnectingWallet: boolean
}

const MultiversxConncetBtn = observer(class Web3ConnectBtn extends Component<IWeb3ConnecBtnProps> {

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
            this.props.walletProvider.EnableAsync();
        }

        render() {
            const {walletProvider} = this.props;

            // if (this.askAccounts && walletProvider.state !== StoreState.Pending && !walletProvider.account) {
            //     // walletProvider.fetchAccount();
            //     this.askAccounts = false;
            //     return <Button loading={this.state.isConnectingWallet} shape={"round"}
            //                    className={"btn-pink"}>{"connecting"}</Button>;
            // }

            // if (web3Store.account) {
            //     return <Button loading={false} shape={"round"} style={{fontSize: "0.3rem"}}
            //                    className={"wallet-address"}>{web3Store.account.substring(0, 3) + "···" + web3Store.account.substring(web3Store.account.length - 3, web3Store.account.length)}</Button>;
            // }
            if (walletProvider.account) {
                return <Tooltip placement='left' title={walletProvider.account}><span
                               className={"wallet-address dark-text"}>{simplifyAccount(walletProvider.account)}</span></Tooltip>;
            }
            return <Button loading={this.state.isConnectingWallet} shape={"round"} className={"btn-pink"}
                           onClick={this.onClick}>Connect Wallet</Button>;
        }
    }
);

export default MultiversxConncetBtn;
