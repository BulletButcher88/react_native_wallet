import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';

import BackButton from '../components/BackButton.js';
import {COLORS, icons, SIZES} from '../constants';

const Profile = ({navigation}) => {

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 100}}>👺</Text>
      <Text style={{fontSize: 30, padding: 20}}>Profile Page Coming...</Text>
      <BackButton navigation={navigation}/>
    </SafeAreaView>
  ); 
};

export default Profile;
