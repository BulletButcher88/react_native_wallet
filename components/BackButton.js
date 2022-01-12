import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Image,
  TouchableOpacity,
  Button,
  ScrollView,
  StatusBar,
} from 'react-native';

import {COLORS, icons, SIZES} from '../constants/index';

const BackButton = ({navigation}) => {
  return (
    <TouchableOpacity
      style={{
        height: 30,
        width: 30,
        borderRadius: SIZES.radius / 1.5,
        position: 'absolute',
        top: 45,
        left: 10,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={() => {
        navigation.navigate('Home');
      }}>
      <Image
        source={icons.back}
        style={{
          height: 20,
          width: 20,
          tintColor: COLORS.black,
        }}
      />
    </TouchableOpacity>
  );
};

export default BackButton;
