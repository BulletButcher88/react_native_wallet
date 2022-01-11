import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';

import {COLORS, icons, SIZES} from '../constants';

const Profile = ({navigation}) => {

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 100}}>👺</Text>
      <Text style={{fontSize: 30, padding: 20}}>Profile Page Coming...</Text>
      <TouchableOpacity
      style={{
        height: 30,
        width: 90,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius / 1.5,
        alignItems: 'center',
        justifyContent: 'center'
      }}
      onPress={() => navigation.navigate("LogIn")}
    >
      <Text
        style={{
          color: COLORS.black,
          fontSize: SIZES.body4,
        }}>
        Log Out
      </Text>
    </TouchableOpacity>
    </SafeAreaView>
  ); 
};

export default Profile;