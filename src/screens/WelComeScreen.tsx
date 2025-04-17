import { Button, StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../utils/types';
import { ethers, JsonRpcProvider } from 'ethers';

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'WelComeScreen'>;
};
const provider = new JsonRpcProvider('https://ethereum-sepolia-rpc.publicnode.com');

const WelComeScreen = ({ navigation }: Props) => {

    async function checkNetwork() {
        const network = await provider.getNetwork();
        console.log('Network name:', network.name); // "sepolia" or "holesky"
        console.log('Chain ID:', network.chainId);
    }

    useEffect(() => {
        checkNetwork();
    }, [])
    return (
        <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
            <Button title="1st Wallet" onPress={() => navigation.navigate('HomeScreen')} />
            <View style={{ marginTop: 30 }} />
            <Button title="2nd Wallet" onPress={() => navigation.navigate('NewWallets')} />
            <View style={{ marginTop: 30 }} />
            <Button title="Use Private Key" onPress={() => navigation.navigate('PrivateKeyScreen')} />
            <View style={{ marginTop: 30 }} />
            <Button title="Use Mnemonic" onPress={() => navigation.navigate('MnemonicScreen')} />
        </View>
    );
};

export default WelComeScreen;

const styles = StyleSheet.create({});
