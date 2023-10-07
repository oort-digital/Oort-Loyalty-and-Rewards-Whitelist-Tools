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
}

/**
 * 
stakes
Max(x/100 * 20,20)

tokens
Max(x/50 * 20,20)

nfts
Max(x/100 * 20,20)

transactions
Max(x/200 * 20,20)

Games
Random(0,20)

only total points above 60 can clain MultivesX heroes
 */
export const apiName = {
    STAKES: "stake",
    NFTS: "nfts/count",
    TRANSACTIONS: "transactions/count",
    TOKENS: "tokens/count",
    GAMES: "games?"
};

export default class MyServerApi {

    public async commonCall(params: ICommonRequestParams): Promise<IMyServerResponse> {
        if (params.apiName !== apiName.GAMES) {
            let url = `https://api.multiversx.com/accounts/erd1ualxrmc444eha0h5gwq4nal9kktyj4z572acyelp8enlyjml23vqu2hezk/${params.apiName}`
           
            let response: AxiosResponse = await axios.get(url);
            console.log(response.data);
            // eslint-disable-next-line valid-typeof
            let  points = 0;
            if (typeof response.data === "object") {
                points = Math.min(Number(response.data.totalStaked)/100*20+10, 20);
            } else if (params.apiName === apiName.NFTS){
                points = Math.min(response.data/100 * 20, 20);
            } else if (params.apiName === apiName.TOKENS) {
                points = Math.min(response.data/50 * 20, 20);
            } else if (params.apiName === apiName.TRANSACTIONS) {
                points = Math.min(response.data/200 * 20, 20);
            }
            const result: IMyServerResponse = {
                resultCode: ServerResultCode.SUCCESS,
                resultMessage: 'request success',
                resultValue: [{ points: points, content: `qurey the data success` }]
            };
            return result;
        } 

        return this.mockApi();
    }


    private async mockApi(): Promise<IMyServerResponse> {
        await this.waitAsync(1000);
        let resultCode: number = ServerResultCode.SUCCESS;
        
        const result: IMyServerResponse = {
            resultCode: resultCode,
            resultMessage: 'mock request',
            resultValue: [{ points: Math.random()*20, content: "qurey the data success" }]
        };
        return result;
    }

    private waitAsync = (ms: number) => new Promise(res => setTimeout(res, ms))

}
