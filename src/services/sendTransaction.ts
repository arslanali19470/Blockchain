import { ethers } from 'ethers';

export const sendTransaction = async (
    privateKey: string,
    toAddress: string,
    amountInEth: string,
    rpcUrl: string
) => {
    try {
        const provider = new ethers.JsonRpcProvider(rpcUrl);
        const wallet = new ethers.Wallet(privateKey, provider);

        const tx = await wallet.sendTransaction({
            to: toAddress,
            value: ethers.parseEther(amountInEth),
        });

        await tx.wait(); // Wait for confirmation
        return tx;
    } catch (error: any) {
        console.error("Transaction failed:", error);
        throw new Error(error?.message || "Transaction failed");
    }
};
