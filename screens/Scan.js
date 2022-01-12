import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
  Image,
} from 'react-native';

import {RNCamera} from 'react-native-camera';
import {COLORS, icons} from '../constants';

const Scan = ({navigation}) => {
  const [barCodeScanned, setBarCodeScanned] = useState('');
  // const onSuccess = e => {
  //   console.log(e.data)
  //   Linking.openURL(e.data).catch(err =>
  //     console.error('An error occurred', err)
  //   );
  // };

  const renderHeader = () => {
    return (
      <View
        style={{flexDirection: 'row', marginTop: 50, paddingHorizontal: 20}}>
        <TouchableOpacity
          style={{
            height: 30,
            width: 30,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            navigation.navigate('Home');
            setBarCodeScanned('');
          }}>
          <Image
            source={icons.cancel}
            resizeMode="contain"
            style={{
              height: 10,
              width: 10,
              tintColor: COLORS.lightGrey,
            }}
          />
        </TouchableOpacity>

        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: COLORS.lightGrey}}>Scan</Text>
        </View>
        <TouchableOpacity
          style={{
            height: 30,
            width: 30,
            backgroundColor: 'rgba(15,15,15,0.2)',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20,
            borderColor: COLORS.lightGrey,
            borderWidth: 1
          }}
          onPress={() => console.log('info Module')}>
          <Image
            source={icons.info}
            resizeMode="contain"
            style={{
              height: 10,
              width: 10,
              tintColor: COLORS.lightGrey,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderScanFocus = () => {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            marginTop: '-60%',
            width: 250,
            height: 250,
            borderWidth: 2,
            borderColor: COLORS.lightGrey,
            borderRadius: 18,
            opacity: 0.6,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          {barCodeScanned ? (
            <View
              style={{ 
                backgroundColor: COLORS.darkGrey,
                borderRadius: 10,}}
            >
             <Text
                style={{
                  color: COLORS.white,
                  padding: 20,
                  fontSize: 17,
                  fontWeight: '700',
              }}>
              {barCodeScanned}
            </Text>
            </View>
          ) : null}
        </View>
      </View>
    );
  };

  const renderPaymentMethods = () => {
    return (
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 220,
          padding: 20,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          backgroundColor: COLORS.white,
        }}>
        <Text
          style={{
            fontSize: 17,
            fontWeight: '700',
          }}>
          Payment Method
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-around',
            marginTop: 15,
          }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={() => console.log('Phone Number')}
          >
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: '#66aa',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
              }}>
              <Text
                style={{
                  color: '#ddd',
                }}>
                ph
              </Text>
            </View>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '700',
                paddingLeft: 10,
              }}>
              Phone Number
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={() => console.log('Barcode')}
          >
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: '#66dd00',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
              }}>
              <Text
                style={{
                  color: '#ddd',
                }}>
                bc
              </Text>
            </View>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '700',
                paddingLeft: 10,
              }}>
              Barcode
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const onBarCodeRead = result => {
    setBarCodeScanned(result.data);
  };

  return (
    <View style={styles.backgroundStyle}>
      <RNCamera
        ref={ref => {
          this.camera = ref;
        }}
        style={{flex: 1, width: '100%'}}
        captureAudio={false}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.off}
        onBarCodeRead={onBarCodeRead}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'Camera is required for barcode scanning',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
        }}>
        {renderHeader()}
        {renderScanFocus()}
        {renderPaymentMethods()}
      </RNCamera>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default Scan;
