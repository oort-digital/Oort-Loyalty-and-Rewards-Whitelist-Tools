function GetEnvVar(name: string): string {
    const envName = `REACT_APP_${name}`;
    const env = process.env[envName] || undefined;
    if(env === undefined) {
        throw new Error(`${envName} not set`);
    }
    return env;
}


export enum ChainEnum {
    BscTestNet = 97,
    BscMainNet = 56,
    GanacheNet = 1337
}

let networks: { [name: string]: ChainEnum } = {
    'mainnet': ChainEnum.BscMainNet,
    'testnet': ChainEnum.BscTestNet,
    'ganache': ChainEnum.GanacheNet
};


const NETWORK = GetEnvVar('NETWORK');

const ChainId = networks[NETWORK];

export { ChainId };


export const MYTH_ERC1155_ADDRESS = GetEnvVar('MYTH_ERC1155_ADDRESS');
export const MY_COMMON_TOOL_ADDRESS= GetEnvVar('MY_COMMON_TOOL_ADDRESS');
