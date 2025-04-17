import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import { saveWallet1, getWallet1, getWallet2 } from '../services/storage';
import { getBalance } from '../services/getBalance';
import { sendTransaction } from '../services/sendTransaction';
import WalletCard from '../components/WalletCard';
import { WalletType } from '../utils/types';
import { createWallet } from '../services/wallet';

const RPC_URL = 'https://ethereum-sepolia-rpc.publicnode.com';

const HomeScreen = () => {
    const [wallet1, setWallet1] = useState<WalletType | null>(null);
    const [wallet2, setWallet2] = useState<WalletType | null>(null);

    // Create Wallet 1
    const createWalletAcount = async () => {
        const newWallet = createWallet();
        await saveWallet1(newWallet);
        setWallet1(newWallet);
        Alert.alert('Wallet 1 Created');
    };

    // Load Wallets
    const loadWallets = async () => {
        const w1 = await getWallet1();
        const w2 = await getWallet2();
        if (w1) setWallet1(w1);
        if (w2) setWallet2(w2);
        console.log('Wallet 1:', w1);
        console.log('Wallet 2:', w2);
    };

    // Check Wallet 1 Balance
    const checkWallet1Balance = async () => {
        if (!wallet1?.address) return Alert.alert('No Wallet 1');
        const balance = await getBalance(wallet1.address);
        Alert.alert('Wallet 1 Balance', `${balance} ETH`);
    };

    // Check Wallet 2 Balance
    const checkWallet2Balance = async () => {
        if (!wallet2?.address) return Alert.alert('No Wallet 2');
        const balance = await getBalance(wallet2.address);
        Alert.alert('Wallet 2 Balance', `${balance} ETH`);
    };

    // Send ETH from Wallet 1 to Wallet 2
    const sendEthToWallet2 = async () => {
        if (!wallet1?.privateKey || !wallet2?.address) {
            return Alert.alert('Missing Wallet', 'Make sure both wallets are created');
        }

        try {
            const tx = await sendTransaction(wallet1.privateKey, wallet2.address, '0.01', RPC_URL);
            Alert.alert('Transaction Sent', `TX Hash: ${tx.hash}`);
        } catch (error: any) {
            console.error('Send failed:', error);
            Alert.alert('Error', error.message || 'Failed to send transaction');
        }
    };

    useEffect(() => {
        loadWallets();
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Button title="Create Wallet 1" onPress={createWalletAcount} />

            <View style={{ marginVertical: 20 }}>
                <WalletCard wallet={wallet1} />
            </View>

            <Button title="Check Wallet 1 Balance" onPress={checkWallet1Balance} />
            <View style={{ marginVertical: 10 }} />
            <Button title="Check Wallet 2 Balance" onPress={checkWallet2Balance} />
            <View style={{ marginVertical: 10 }} />
            <Button title="Send 0.01 ETH to Wallet 2" onPress={sendEthToWallet2} />
        </ScrollView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: 'white',
    },
});
