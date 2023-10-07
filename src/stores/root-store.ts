// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {observable} from "mobx";
import {Web3Store} from "./web3-store"
import {Gene3ParseProvider} from "../data/gene3ParseProvider";
import { MultiversxWallet } from "./multiversx-wallet";
export class RootStore {

    @observable public web3Store: Web3Store;
    @observable public gen3PhaseProvider: Gene3ParseProvider;
    @observable public multiversProvider: MultiversxWallet;

    constructor() {
        this.web3Store = new Web3Store();
        this.gen3PhaseProvider = new Gene3ParseProvider();
        this.multiversProvider = new MultiversxWallet();
    }
}
