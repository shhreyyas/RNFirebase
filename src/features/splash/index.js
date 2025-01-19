import {Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Images from '../../assets/images';
import { SIGNIN, SIGNUP } from '../../navigtion/ScreenName';

const MainSplash = props => {
  const {navigation} = props;

  useEffect(() => {
    setTimeout(() => {
       navigation.replace(SIGNUP);
    }, 2000);
  }, [navigation]);

  return (
    <View style={styles.mainComponent}>
      <StatusBar backgroundColor={'#000000'} barStyle="light-content" />
      <Image source={Images.img_splash} style={styles.splash} />
    </View>
  );
};

export default MainSplash;

const styles = StyleSheet.create({
  mainComponent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
  },
  splash: {
    height: 190,
    width: 150,
  },
});
