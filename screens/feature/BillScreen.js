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
  const [qrCode, setQrCode] = useState();
  const [totalAmount, onChangeTotalAmount] = useState(null);
  const [theArray, setTheArray] = useState([]);
  const [count, setCount] = useState(null);
  const [description, onChangeDescription] = useState();

  useEffect(() => {
    generateQr();
  }, [theArray]);

  const generateQr = () => {
    RNQRGenerator.generate({
      value: JSON.stringify(theArray),
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
    const obj = {
      id: theArray.length + 1,
      price: totalAmount,
      description: description,
    };

    return (
      <TouchableOpacity
        style={{
          height: 40,
          width: 40,
          borderRadius: 20,
        }}
        onPress={() => {
          setCount(count + 1);
          setTheArray(oldArray => [...oldArray, obj]);
          onChangeTotalAmount(null);
          onChangeDescription(null);
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
    const array = theArray.map((v, k) => (
      <View
        key={k}
        style={{
          backgroundColor: COLORS.lightGrey,
          padding: 5,
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'flex-end',
          margin: 2,
        }}>
        <View
          key={k}
          style={{
            flex: 5,
            justifyContent: 'space-evenly',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Text>{v.description}</Text>
        </View>
        <View
          style={{
            flex: 1,
            width: 0,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <Text
            style={{
              color: COLORS.grey,
              fontSize: SIZES.body3,
              minWidth: 20,
            }}>
            $
          </Text>
          <Text
            style={{
              color: COLORS.darkGrey,
              fontSize: 14,
              minWidth: 60,
              paddingRight: 10,
            }}>
            {v.price}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            setTheArray(theArray.filter(obj => theArray[k] !== obj));
            generateQr();
          }}>
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
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginVertical: 20,
          }}>
          {renderAddItem()}
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
              fontSize: SIZES.body3,
            }}
            placeholderTextColor={COLORS.darkGrey}
            onChangeText={onChangeDescription}
            value={description}
            placeholder="item"
            keyboardType='default'
            placeholderTextColor={COLORS.grey}
          />
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
              fontSize: SIZES.body3,
            }}
            placeholderTextColor={COLORS.darkGrey}
            onChangeText={onChangeTotalAmount}
            value={totalAmount}
            placeholder="$ Price"
            keyboardType="numeric"
            placeholderTextColor={COLORS.grey}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BillScreen;
