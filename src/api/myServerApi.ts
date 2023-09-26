import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { ServerResultCode } from "../utils/ResultCode";
import { ApiEnv } from "../utils/contranst";

export interface IMyServerResponse {
    resultValue: IMyServerItem[],
    resultMessage: string
    resultCode: number
}

export interface IMyServerItem {
    points: number,
    content: string
}

interface ICommonRequestParams {
    account: string
    apiName: string
    chain: string
}

export const apiName = {
    TOTAL_NFT: "nft?",
    TRANSFER: "transfers?",
    ETH_BALANCE: "balance?",
    TRANSACTIONS: "transactions?",
    MINT: "mints?",
    AXS_TOKEN: "AXS?",
    SLP_TOKEN1: "SLP?",
    SLP_TOKEN2: "uniswap?"
};

export default class MyServerApi {
    private apiEnv = ApiEnv.production;

    private getConfig = (): AxiosRequestConfig => ({
        headers: {"Content-Type":"application/x-www-form-urlencoded"}
    });

    public async commonCall(params: ICommonRequestParams): Promise<IMyServerResponse> {
        // if (this.apiEnv !== ApiEnv.mock) {
        //     let url = "http://localhost:8080/lease/dashboard/getGames";
        //     const form = new FormData();
        //     form.append("pageNum","1");
        //     form.append("pageSize","10");
        //     form.append("chainIds","56,137");
        //     form.append("tournamentRequired","false");
        //     const response: AxiosResponse = await axios.post(url, form);
        //     console.log(response.data);
        //     return response.data;
        // }

        return this.mockApi();
    }

    private requestCount: number = 0;

    private async mockApi(): Promise<IMyServerResponse> {
        await this.waitAsync(1000);
        let resultCode: number = ServerResultCode.SUCCESS;
        if (this.requestCount++ === 3) {
            resultCode = -1;
        }
        const result: IMyServerResponse = {
            resultCode: resultCode,
            resultMessage: 'mock request failed',
            resultValue: [{ points: 10, content: "server return test" }, { points: 20, content: "server return test" }]
        };
        return result;
    }

    private waitAsync = (ms: number) => new Promise(res => setTimeout(res, ms))

}
