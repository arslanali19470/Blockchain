import AsyncStorage from '@react-native-async-storage/async-storage';
import { WalletType } from '../utils/types';

export const saveWallet1 = async (wallet: WalletType) => {
    await AsyncStorage.setItem('wallet1', JSON.stringify(wallet));
};

export const saveWallet2 = async (wallet: WalletType) => {
    await AsyncStorage.setItem('wallet2', JSON.stringify(wallet));
};

export const getWallet1 = async (): Promise<WalletType | null> => {
    const data = await AsyncStorage.getItem('wallet1');
    return data ? JSON.parse(data) : null;
};

export const getWallet2 = async (): Promise<WalletType | null> => {
    const data = await AsyncStorage.getItem('wallet2');
    return data ? JSON.parse(data) : null;
};
