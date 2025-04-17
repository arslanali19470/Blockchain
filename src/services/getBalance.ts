import { JsonRpcProvider, formatEther } from 'ethers';

export const getBalance = async (walletAddress: string): Promise<string | null> => {
    try {
        const provider = new JsonRpcProvider('https://ethereum-sepolia-rpc.publicnode.com');
        const balance = await provider.getBalance(walletAddress);
        return formatEther(balance);
    } catch (error) {
        console.error('Error getting balance:', error);
        return null;
    }
};
