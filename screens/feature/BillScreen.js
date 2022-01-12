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
import RNQRGenerator from 'rn-qr-generator';

import BackButton from '../../components/BackButton';

import {COLORS, icons, SIZES} from '../../constants';

const BillScreen = ({navigation}) => {
  const obj = {
    id: 'text',
    instruction: '1',
  };

  const [qrCode, setQrCode] = useState();
  const [totalAmount, onChangeTotalAmount] = useState(null);
  const [form, setForm] = useState([]);

  useEffect(() => {
    generateQr();
  }, [totalAmount]);

  const renderBackButton = () => (
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
        setQrCode(null);
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

  const generateQr = () => {
    const dataString = {
      items: [
        {
          1: "dish", 
          amount: 20,
        },
        {
          2: "banana", 
          amount: 30,
        },
      ],
      total: totalAmount,
    };

    RNQRGenerator.generate({
      value: JSON.stringify(dataString),
      height: 500,
      width: 500,
    })
      .then(response => {
        const {uri, width, height, base64} = response;
        setQrCode(uri);
      })
      .catch(error => console.log('Cannot create QR code', error));
  };

  const renderQrCode = () => {
    return qrCode !== null ? (
      <Image
        source={{uri: qrCode}}
        style={{marginTop: 40, height: 300, width: 300}}
      />
    ) : (
      <View style={{marginTop: 40, height: 300, width: 300}} />
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white,
      }}>
      <BackButton navigation={navigation}/>
      <ScrollView>
        {renderQrCode()}
        <Text
          style={{fontSize: 30, color: COLORS.grey, padding: SIZES.padding}}>
          QR Bill
        </Text>
        <View>
          <TextInput
            style={{
              height: 33,
              width: 120,
              backgroundColor: COLORS.lightGrey,
              borderRadius: 5,
              borderWidth: 1,
              borderColor: COLORS.grey,
              justifyContent: 'center',
              textAlign: 'center',
            }}
            placeholderTextColor={COLORS.darkGrey}
            onChangeText={onChangeTotalAmount}
            value={totalAmount}
            placeholder="$ Amount"
            keyboardType="numeric"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BillScreen;
