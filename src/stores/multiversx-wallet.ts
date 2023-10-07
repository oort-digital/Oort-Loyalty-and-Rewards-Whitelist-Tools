import {action, makeObservable, observable, runInAction} from 'mobx'
import { ExtensionProvider } from "@multiversx/sdk-extension-provider"
import {StoreState} from './store-state';

export class MultiversxWallet {
    state: StoreState = StoreState.Done;
    account: string = "";
    provider: any = undefined;

    constructor() {
        makeObservable(this, {
            state: observable,
            account: observable,
            fetchAccount: action,
            EnableAsync: action
        })

        this.provider = ExtensionProvider.getInstance();
    }

    async fetchAccount() {
        this.account = "";
        this.state = StoreState.Pending;
        await this.provider.init();
        try {
            
            const acc = await this.provider.login();

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
            // after await, modifying state again, needs an actions:
            runInAction(() => {
                this.state = StoreState.Done;
                if (acc) {
                    this.account = acc;
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
            await this.fetchAccount();
        } catch (error) {
            runInAction(() => {
                this.state = StoreState.Error;
            })
        }
    }

}
