import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import BackButton from '../../components/BackButton';

import {COLORS, icons, SIZES} from '../../constants';

const ItemsScreen = ({navigation}) => {
  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 100}}>🎫</Text>
      <Text style={{fontSize: 30, padding: 20}}>Items Screeb Coming...</Text>
      <BackButton navigation={navigation} />
    </SafeAreaView>
  );
};

export default ItemsScreen;
