import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import RNQRGenerator from 'rn-qr-generator';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import BackButton from '../components/BackButton';

import {COLORS, icons, SIZES} from '../../constants';

const BillScreen = ({navigation}) => {
  const [qrCode, setQrCode] = useState();
  const [totalAmount, onChangeTotalAmount] = useState(null);
  const [theArray, setTheArray] = useState([]);
  const [count, setCount] = useState(null);
  const [description, onChangeDescription] = useState();
  const [billTotal, setBillTotal] = useState();
  const [payeeId, setPayeeId] = useState('DUMMY ID ******');

  console.log(theArray)

  useEffect(() => {
    let billTotalAmount = theArray.reduce(
      (accumulator, current) =>
        Number(accumulator) + Number(current.items.price),
      0,
    );
    setBillTotal(billTotalAmount);
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
    return qrCode !== undefined ? (
      <Image
        source={{uri: qrCode}}
        style={{marginTop: 40, height: 300, width: 300}}
      />
    ) : (
      <View style={{height: 300, width: 300, marginVertical: 40}} />
    );
  };

  const renderAddItem = () => {
    const obj = {
      payeeId: payeeId,
      items: {
        id: theArray.length + 1,
        price: totalAmount,
        description: description,
      },
      total: billTotal,
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
    const array = theArray.map((v, k) => {
      return (
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
            style={{
              flex: 5,
              justifyContent: 'space-evenly',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Text>{v.items.description}</Text>
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
              {v.items.price}
            </Text>
          </View>
          <Text
            style={{
              color: COLORS.darkGrey,
              fontSize: 14,
              minWidth: 60,
              paddingRight: 10,
            }}
          />
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
      );
    });
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
      <KeyboardAwareScrollView>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <Text
            style={{
              fontSize: 30,
              color: COLORS.grey,
              padding: SIZES.padding,
              textAlign: 'center',
            }}>
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
              placeholder="description"
              keyboardType="default"
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
              placeholder="$"
              keyboardType="numeric"
              placeholderTextColor={COLORS.grey}
            />
            {renderAddItem()}
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              marginVertical: 20,
            }}>
            <Text
              style={{
                color: COLORS.darkGrey,
                fontSize: 30,
                minWidth: 60,
                paddingRight: 10,
              }}>
              {billTotal ? '$ ' + billTotal : null}
            </Text>
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default BillScreen;
