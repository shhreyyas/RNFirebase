import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {SIGNIN, SIGNUP, SPLASH} from './ScreenName';
import MainSplash from '../features/splash';
import SignIn from '../features/auth/signIn';
import SignUp from '../features/auth/signUp';


const RootStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={SPLASH}>
        <Stack.Screen
          name={SPLASH}
          component={MainSplash}
          options={{headerShown: false}}
        />
        <Stack.Screen name={SIGNIN} component={SignIn} />
        <Stack.Screen name={SIGNUP} component={SignUp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;

const styles = StyleSheet.create({});
