import MyQueue from "./myQueue";
import MyServerApi, {apiName, IMyServerResponse} from "../api/myServerApi";
import {action, makeObservable, observable, runInAction} from "mobx";
import {ServerResultCode} from "../utils/ResultCode";
import {Gen3Dimension} from "../utils/contranst";

export interface IParseResultItem {
    score: number,
    text: string
}

export interface IParseResult {
    dimension: string,
    items: IParseResultItem[],
    totalScore: number;
}

interface SeverRequest {
    apiName: string,
    apiDimension: string,
    isDimensionFirst: boolean,
    isLast: boolean,
    parseIndex: number;
}

export class Gene3ParseProvider {
    private _requestQueue: MyQueue<SeverRequest> = new MyQueue<SeverRequest>();
    private _curRequest: SeverRequest | undefined = undefined;
    private _myServerApi: MyServerApi = new MyServerApi();
    private totalApiNum = 0;

    responseData: IParseResult[] = [];
    curRequestFailed: boolean = false;
    resultMessage: string = '';
    //make all request finished
    requestFinished: boolean = false;
    //request overall progress
    progress: number = 0;

    constructor() {
        //set observable config
        makeObservable(this, {
            responseData: observable,
            curRequestFailed: observable,
            requestFinished: observable,
            progress: observable,
            startPhase: action,
            retryCurRequest: action
        });
        this.initRequestQueue();
    }

    private initRequestQueue() {
        this._requestQueue.enqueue({
            apiName: apiName.STAKES,
            apiDimension: Gen3Dimension.DEFI,
            isDimensionFirst: true,
            isLast: false,
            parseIndex: 1
        });
        this._requestQueue.enqueue({
            apiName: apiName.NFTS,
            apiDimension: Gen3Dimension.NFT,
            isDimensionFirst: true,
            isLast: false,
            parseIndex: 2
        });
        this._requestQueue.enqueue({
            apiName: apiName.TRANSACTIONS,
            apiDimension: Gen3Dimension.ACTIVITY,
            isDimensionFirst: true,
            isLast: false,
            parseIndex: 3
        });
        this._requestQueue.enqueue({
            apiName: apiName.TOKENS,
            apiDimension: Gen3Dimension.VOLUME,
            isDimensionFirst: false,
            isLast: false,
            parseIndex: 4
        });
        this._requestQueue.enqueue({
            apiName: apiName.GAMES,
            apiDimension: Gen3Dimension.GAMEFI,
            isDimensionFirst: true,
            isLast: true,
            parseIndex: 5
        });
        this.totalApiNum = this._requestQueue.size();
    }

    /**
     * handle response data from server side when successful
     * @param response
     * @param serverRequest
     */
    private handleResponseSuccess(response: IMyServerResponse, serverRequest: SeverRequest) {
        runInAction(() => {
            this.curRequestFailed = false;
            this.resultMessage = "";
            const responseDataItems: IParseResultItem[] = [];
            let scoreInAdd = 0;
            response.resultValue.forEach((item, index) => {
                responseDataItems.push({
                    text: item.content,
                    score: item.points
                });
                scoreInAdd += item.points;
            });
            if (serverRequest.isDimensionFirst) {
                this.responseData.push({
                    items: responseDataItems, dimension: serverRequest.apiDimension, totalScore: scoreInAdd
                });
            } else {
                // this.responseData[this.responseData.length - 1].resultValue.push.apply(responseDataItems);
                responseDataItems.forEach(item => {
                    this.responseData[this.responseData.length - 1].items.push(item);
                    this.responseData[this.responseData.length - 1].totalScore += scoreInAdd;
                })
            }
            this.requestFinished = serverRequest.isLast;
            this.progress = serverRequest.parseIndex === this.totalApiNum ? 100 : serverRequest.parseIndex / this.totalApiNum * 100;
        });
    }

    private handleResponseFailed(response: IMyServerResponse){
        runInAction(() => {
            this.curRequestFailed = true;
            this.resultMessage = response.resultMessage;
        });
    }

    /**
     * start phase
     * @param account
     */
    public async startPhase(account: string) {
        if (!account || account.length <= 0) {
            return;
        }
        while (!this._requestQueue.isEmpty()) {
            const serverRequest = this._requestQueue.dequeue();
            this._curRequest = serverRequest;
            if (serverRequest) {
                const response = await this._myServerApi.commonCall({
                    account: account,
                    apiName: serverRequest.apiName,
                    chain: "eth"
                });
                if (response.resultCode === ServerResultCode.SUCCESS) {
                    this.handleResponseSuccess(response, serverRequest);
                } else {
                    this.handleResponseFailed(response);
                    break;
                }
            }
        }
    }

    /**
     * retry the latest failed request
     * @param account
     */
    public async retryCurRequest(account: string) {
        if (!this._curRequest) {
            return;
        }
        const response = await this._myServerApi.commonCall({
            account: account,
            apiName: this._curRequest.apiName,
            chain: "eth"
        });
        if (response.resultCode === ServerResultCode.SUCCESS) {
            this.handleResponseSuccess(response, this._curRequest);
            //continue next requests
            this.startPhase(account);
        } else {
            runInAction(() => {
                this.handleResponseFailed(response);
            })
        }
    }

}
