import {action, makeObservable, observable, runInAction} from 'mobx'
import {enableAsync, getAccountAsync, getChainIdAsync} from '../contracts/ether-connect';
import {StoreState} from './store-state';
import {Modal} from "antd";
import {ChainId} from "../utils/contractUtils";

export class Web3Store {
    state: StoreState = StoreState.Done;
    account: string = "";
    chainId: number = 97;

    constructor() {
        makeObservable(this, {
            state: observable,
            account: observable,
            fetchAccount: action,
            EnableAsync: action
        })
    }

    async fetchAccount() {
        this.account = "";
        this.state = StoreState.Pending;
        try {
            //publish address
            // const acc: string = '0x765C7C437578BD8fa666E86A94F59eb8Bf3903dA';
            const acc: string = await getAccountAsync();
            if (acc) {
                window.ethereum.on('accountsChanged', (accounts: Array<string>) => {
                    // Handle the new accounts, or lack thereof.
                    // "accounts" will always be an array, but it can be empty.
                    if (accounts && accounts.length > 0 &&
                        this.account && this.account.length > 0 &&
                        accounts[0].toLowerCase() !== this.account.toLowerCase()) {
                        window.location.reload()
                    }
                });
                window.ethereum.on('chainChanged', (_chainId: string) => window.location.reload());
            }
            const chainId: number = await getChainIdAsync();
            if (chainId !== ChainId) {
                Modal.warn({
                    title: 'Wrong Network',
                    content: `Please connect to the appropriate ETH network.`
                });
            }
            // after await, modifying state again, needs an actions:
            runInAction(() => {
                this.state = StoreState.Done;
                if (acc) {
                    this.account = acc;
                    this.chainId = chainId;
                }
            })
        } catch (error) {
            runInAction(() => {
                this.state = StoreState.Error;
            })
        }
    }

    async EnableAsync() {
        this.state = StoreState.Pending
        try {
            await enableAsync();
            await this.fetchAccount();
        } catch (error) {
            runInAction(() => {
                this.state = StoreState.Error;
            })
        }
    }

}
