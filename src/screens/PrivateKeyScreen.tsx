import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { Wallet, JsonRpcProvider, formatEther } from 'ethers';

// Ethereum Sepolia Testnet RPC provider
const provider = new JsonRpcProvider('https://ethereum-sepolia-rpc.publicnode.com');

const PrivateKeyScreen = () => {
    const [privateKey, setPrivateKey] = useState('');
    const [walletAddress, setWalletAddress] = useState('');
    const [balance, setBalance] = useState('');

    const handleImportWallet = async () => {
        try {
            // 1. Load wallet from private key
            const wallet = new Wallet(privateKey);

            // 2. Get wallet address
            const address = wallet.address;
            setWalletAddress(address);

            // 3. Get balance using provider
            const balanceInWei = await provider.getBalance(address);
            const balanceInEth = formatEther(balanceInWei);
            setBalance(balanceInEth);
        } catch (error) {
            console.error('Error importing wallet:', error);
            Alert.alert('Invalid Private Key', 'Please check your private key and try again.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Import Ethereum Wallet</Text>
            <TextInput
                placeholder="Enter Private Key"
                value={privateKey}
                onChangeText={setPrivateKey}
                style={styles.input}
                autoCapitalize="none"
                placeholderTextColor="gray"
            />
            <Button title="Import Wallet" onPress={handleImportWallet} />
            {walletAddress !== '' && (
                <View style={styles.result}>
                    <Text style={styles.label}>Wallet Address:</Text>
                    <Text>{walletAddress}</Text>
                    <Text style={styles.label}>ETH Balance:</Text>
                    <Text>{balance} ETH</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        marginTop: 50,
        backgroundColor: 'white',
        flex: 1,
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
    },
    result: {
        marginTop: 20,
    },
    label: {
        fontWeight: 'bold',
        marginTop: 10,
    },
});

export default PrivateKeyScreen;
