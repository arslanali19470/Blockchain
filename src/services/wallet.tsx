import { ethers } from 'ethers';

export const createWallet = () => {
    try {
        const wallet = ethers.Wallet.createRandom();
        return {
            address: wallet.address,
            privateKey: wallet.privateKey,
            mnemonic: wallet.mnemonic.phrase,
        };
    } catch (error) {
        console.error('Wallet creation failed:', error);
        return null;
    }
};
