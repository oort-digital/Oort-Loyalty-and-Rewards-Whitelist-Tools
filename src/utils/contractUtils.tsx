export function handleErrorMessage(ex: any): string {
    console.log(ex);
    if (ex.data && ex.data.message) {
        return handleErrorCode(ex.data.message);
    } else if (ex.error) {
        //To compatible trust wallet and tp wallet
        return handleErrorCode(ex.error.toString());
    } else {
        const err: Error = ex;
        return handleErrorCode(err.message);
    }
}

export function handleErrorCode(err: string): string {
    // must put ec number max to min.
    if (err.indexOf("ec22") !== -1) {
        return "The number of VIP recharge has reached the maximum";
    } else if (err.indexOf("ec21") !== -1) {
        return "Insufficient VIP recharge balance";
    } else if (err.indexOf("ec20") !== -1) {
        return "No this VIP packet";
    } else if (err.indexOf("ec11") !== -1) {
        return "There is no such composition rule";
    } else if (err.indexOf("ec10") !== -1) {
        return "There is no such composition rule";
    } else if (err.indexOf("ec1") !== -1) {
        return "You are not in whitelist";
    } else if (err.indexOf("ec2") !== -1) {
        return "You have not been vip yet";
    } else if (err.indexOf("ec3") !== -1) {
        return "You have claimed today";
    } else if (err.indexOf("ec4") !== -1) {
        return "There is no card now";
    }
    return err;
}


export function getOriginErrorMessage(ex: any): string {
    if (ex.data && ex.data.message) {
        return ex.data.message;
    } else if (ex.error) {
        //To compatible trust wallet and tp wallet
        return ex.error.toString();
    } else {
        const err: Error = ex;
        return err.message;
    }
}

export const ChainId = 1;

export function simplifyAccount(account: string): string {
    return account.substring(0, 3) + "···" + account.substring(account.length - 3, account.length);
}
