import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import { createWallet } from '../services/wallet';
// import { saveWallet, getWallet } from '../services/storage';
import WalletCard from '../components/WalletCard';
import { getBalance } from '../services/getBalance';
import { WalletType } from '../utils/types';
import { getWallet1, saveWallet1 } from '../services/storage';

const HomeScreen = () => {
    const [wallet, setWallet] = useState<WalletType | null>(null);

    const handleCreateWallet = async () => {
        try {
            const newWallet = createWallet();
            console.log('New Wallet:', newWallet);
            await saveWallet1(newWallet);
            setWallet(newWallet);
            Alert.alert('Wallet Created', 'Your Ethereum wallet has been created.');
        } catch (err) {
            console.error('Wallet creation failed:', err);
            Alert.alert('Error', 'Failed to create wallet.');
        }
    };

    const handleCheckBalance = async () => {
        if (!wallet?.address) {
            Alert.alert('Error', 'No wallet address found.');
            return;
        }
        const balance = await getBalance(wallet.address);
        Alert.alert('Wallet Balance', `${balance} ETH`);
    };

    const loadWallet = async () => {
        const saved = await getWallet1();
        if (saved) setWallet(saved);
    };

    useEffect(() => {
        loadWallet();
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Button title="Create Ethereum Wallet" onPress={handleCreateWallet} />
            <View style={{ marginVertical: 20 }}>
                <WalletCard wallet={wallet} />
            </View>
            <Button title="Check ETH Balance" onPress={handleCheckBalance} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: 'white',
    },
});

export default HomeScreen;
