// types/Wallet.ts
export interface WalletType {
    address: string;
    privateKey: string;
    mnemonic: string;
}



// src/Navigation/types.ts
export type RootStackParamList = {
    WelComeScreen: undefined;
    HomeScreen: undefined;
    PrivateKeyScreen: undefined;
    MnemonicScreen: undefined;
    NewWallets: undefined;
};
