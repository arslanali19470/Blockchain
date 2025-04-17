import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const WalletCard = ({ wallet }) => {
    if (!wallet) return null;

    return (
        <View style={styles.card}>
            <Text style={styles.label}>Address:</Text>
            <Text style={styles.value}>{wallet.address}</Text>
            <Text style={styles.label}>Private Key:</Text>
            <Text style={styles.value}>{wallet.privateKey}</Text>
            <Text style={styles.label}>Mnemonic:</Text>
            <Text style={styles.value}>{wallet.mnemonic}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        marginTop: 20,
        backgroundColor: '#f5f5f5',
        padding: 15,
        borderRadius: 10,
    },
    label: {
        fontWeight: 'bold',
        marginTop: 10,
    },
    value: {
        fontSize: 14,
        color: '#444',
    },
});

export default WalletCard;
