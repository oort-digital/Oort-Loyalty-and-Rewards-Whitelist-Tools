import { ethers } from "ethers";

declare global {
    interface Window {
        ethereum: any;
    }
}

let provider: ethers.providers.Web3Provider;

function getWeb3(): ethers.providers.Web3Provider {
    if(!provider) {
        provider = new ethers.providers.Web3Provider(window.ethereum);
    }
    return provider;
}

function isSupported() {
    return !!window.ethereum;
}

function getAccountAsync(): Promise<string> {
    const provider = getWeb3();
    const signer = provider.getSigner();
    return signer.getAddress();
}

function getChainIdAsync(): Promise<number> {
    const provider = getWeb3();
    const signer = provider.getSigner();
    return signer.getChainId();
}

function enableAsync(): Promise<any> {
    const promise: Promise<any> = window.ethereum.enable();
    return promise;
}

export { getAccountAsync, isSupported, getWeb3, enableAsync,getChainIdAsync}
