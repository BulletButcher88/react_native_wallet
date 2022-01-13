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
  const [theArray, setTheArray] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    generateQr();
  }, [totalAmount]);

  const generateQr = () => {
    const dataString = {
      items: [
        {
          1: 'item1 name',
          amount: 20,
        },
        {
          2: 'item2 name',
          amount: 30,
        },
      ],
      total: totalAmount,
    };

    RNQRGenerator.generate({
      value: JSON.stringify(dataString),
      height: 500,
      width: 500,
      backgroundColor: COLORS.darkGrey,
      color: '#fff',
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

  const renderAddItem = () => {
    return (
      <TouchableOpacity
        style={{
          height: 40,
          width: 40,
          borderRadius: 20,
        }}
        onPress={() => {
          setCount(count + 1);
          setTheArray(oldArray => [...oldArray, {[count]: totalAmount}]);
        }}>
        <Image
          source={icons.add}
          style={{
            height: 40,
            width: 40,
            borderRadius: 20,
          }}
        />
      </TouchableOpacity>
    );
  };

  const list = () => {
    const handleRemoveItem = (e) => {
      const name = e.target.getAttribute("key")
      setTheArray(theArray.filter(item => item.name !== name));
     };

    const array = theArray.map((v, k) => (
      <View
        key={k}
        style={{
          backgroundColor: COLORS.lightGrey,
          padding: 2,
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}>
        <View
          key={k}
          style={{width: 14, justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{
              color: COLORS.darkGrey,
              fontSize: 14,
              minWidth: 60,
              paddingRight: 10,
            }}>
            $
          </Text>
        </View>
        <Text
          style={{
            color: COLORS.darkGrey,
            fontSize: 14,
            minWidth: 60,
            paddingRight: 10,
          }}>
          {v[k]}
        </Text>
        <TouchableOpacity
          onPress={handleRemoveItem}>
          <Image
            source={icons.cancel}
            style={{height: 10, width: 10, tintColor: COLORS.red, margin: 5}}
          />
        </TouchableOpacity>
      </View>
    ));
    return array;
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <BackButton navigation={navigation} />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <Text
          style={{fontSize: 30, color: COLORS.grey, padding: SIZES.padding}}>
          QR Bill
        </Text>
        {renderQrCode()}
        {list()}
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
          {renderAddItem()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BillScreen;
