import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import { Wallet, JsonRpcProvider, formatEther } from 'ethers';

// RPC provider for Sepolia Testnet (you can change it to mainnet if needed)
const provider = new JsonRpcProvider('https://ethereum-sepolia-rpc.publicnode.com');

const MnemonicScreen = () => {
    const [mnemonic, setMnemonic] = useState('');
    const [walletAddress, setWalletAddress] = useState('');
    const [balance, setBalance] = useState('');

    const handleImportWallet = async () => {
        try {
            // 1. Load wallet from mnemonic phrase
            const wallet = Wallet.fromPhrase(mnemonic.trim());

            // 2. Get wallet address
            const address = wallet.address;
            setWalletAddress(address);

            // 3. Get ETH balance from blockchain
            const balanceInWei = await provider.getBalance(address);
            const balanceInEth = formatEther(balanceInWei);
            setBalance(balanceInEth);
        } catch (error) {
            console.error('Error importing wallet with mnemonic:', error);
            Alert.alert('Invalid Mnemonic', 'Please check your seed phrase and try again.');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.heading}>Import Wallet with Mnemonic</Text>
            <TextInput
                placeholder="Enter 12 or 24-word Mnemonic Phrase"
                value={mnemonic}
                onChangeText={setMnemonic}
                style={styles.input}
                multiline
                numberOfLines={4}
                autoCapitalize="none"
                placeholderTextColor="gray"
            />
            <Button title="Import Wallet" onPress={handleImportWallet} />
            {walletAddress !== '' && (
                <View style={styles.result}>
                    <Text style={styles.label}>Wallet Address:</Text>
                    <Text selectable>{walletAddress}</Text>
                    <Text style={styles.label}>ETH Balance:</Text>
                    <Text>{balance} ETH</Text>
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 50,
        backgroundColor: 'white',
        flexGrow: 1,
    },
    heading: {
        fontSize: 22,
        marginBottom: 20,
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
        borderColor: '#ccc',
        color: 'black',
        minHeight: 80,
    },
    result: {
        marginTop: 20,
    },
    label: {
        fontWeight: 'bold',
        marginTop: 10,
    },
});

export default MnemonicScreen;
