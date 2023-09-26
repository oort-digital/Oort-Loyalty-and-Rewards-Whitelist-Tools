export const Gen3Dimension = {
    DEFI: "Defi",
    NFT: "NFT",
    ACTIVITY: "Activity",
    VOLUME: "Volume",
    GAMEFI: "GameFi"
};

export enum LoadingState {
    default, parseStarted, requestFailed, retry, finished
}

export const ApiEnv = {
    mock: '',
    development: 'http://localhost:8080/api/',
    production: 'https://jsonserver.doodleduckling.com/api/'
}