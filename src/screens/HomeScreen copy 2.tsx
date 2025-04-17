import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import { saveWallet1, getWallet1 } from '../services/storage';
import { getBalance } from '../services/getBalance';
import WalletCard from '../components/WalletCard';
import { WalletType } from '../utils/types';
import { createWallet } from '../services/wallet';

const HomeScreen = () => {
    const [wallet, setWallet] = useState<WalletType | null>(null);

    const createWalletAcount = async () => {
        const newWallet = createWallet();
        await saveWallet1(newWallet);
        setWallet(newWallet);
        Alert.alert('Wallet 1 Created');
    };

    const checkBalance = async () => {
        if (!wallet?.address) return Alert.alert('No Wallet', 'Please create wallet first.');
        const balance = await getBalance(wallet.address);
        Alert.alert('Wallet 1 Balance', `${balance} ETH`);
    };

    const loadWallet = async () => {
        const saved = await getWallet1();
        if (saved) setWallet(saved);
        console.log(saved)
    };

    useEffect(() => {
        loadWallet();
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Button title="Create Wallet 1" onPress={createWalletAcount} />
            <View style={{ marginVertical: 20 }}>
                <WalletCard wallet={wallet} />
            </View>

            <Button title="Check Balance" onPress={checkBalance} />
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
