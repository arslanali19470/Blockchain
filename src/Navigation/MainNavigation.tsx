import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import WelComeScreen from '../screens/WelComeScreen';
import ImportScreen from '../screens/PrivateKeyScreen';
import { RootStackParamList } from '../utils/types';
import PrivateKeyScreen from '../screens/PrivateKeyScreen';
import MnemonicScreen from '../screens/MnemonicScreen';
import NewWallets from '../screens/NewWallets';


const Stack = createNativeStackNavigator<RootStackParamList>();

const MainNavigation = () => {
    return (
        <Stack.Navigator id={undefined}>
            <Stack.Screen name="WelComeScreen" component={WelComeScreen} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="NewWallets" component={NewWallets} />
            <Stack.Screen name="PrivateKeyScreen" component={PrivateKeyScreen} options={{ headerShown: false }} />
            <Stack.Screen name="MnemonicScreen" component={MnemonicScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
};

export default MainNavigation;
