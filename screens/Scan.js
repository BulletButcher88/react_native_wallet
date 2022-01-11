import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native';

import { RNCamera } from 'react-native-camera';
import { COLORS } from '../constants';

const Scan = () => {

  const [barCodeScanned, setBarCodeScanned] = useState('')
  // const onSuccess = e => {
  //   console.log(e.data)
  //   Linking.openURL(e.data).catch(err =>
  //     console.error('An error occurred', err)
  //   );
  // };

  const renderHeader = () => {
    return (
      <View style={{ flexDirection: 'row', marginTop: 50, paddingHorizontal: 20 }}>
        <TouchableOpacity
          style={{
            width: 40,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => console.log('need to add closing navigation.navigate("payment-page")')}
        >
          <Text style={{
            fontSize: 30,
            color: '#ddd',
          }}>x</Text>
        </TouchableOpacity>

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: "#ddd" }}>Scan for Payment</Text>
        </View>
        <TouchableOpacity style={{
          height: 40,
          width: 40,
          backgroundColor: 'rgba(15,15,15,0.2)',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 10,
        }}
          onPress={() => console.log("info Module")}
        >
          <Text
            style={{
              color: '#ddd',
              fontSize: 20,
              fontWeight: '700'
            }}
          >i</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const renderScanFocus = () => {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            marginTop: "-60%",
            width: 250,
            height: 250,
            borderWidth: 2,
            borderColor: '#aaa',
            borderRadius: 18,
            opacity: 0.6
          }}
        >
         { barCodeScanned ?
          <Text
             style={{
               fontSize: 17,
                fontWeight: "700",
                backgroundColor: COLORS.white
            }}
        >{ barCodeScanned }</Text> :
      null }
        </View>
      </View>
    )
  }

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
          backgroundColor: '#ddd'
        }}>
        <Text
          style={{
            fontSize: 17,
            fontWeight: "700"
          }}
        >Payment Method</Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-around',
            marginTop: 15
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center'
            }}
            onPress={() => console.log("Phone Number")}
          >
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: '#66aa',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10
              }}
            >
              <Text
                style={{
                  color: '#ddd'
                }}
              >ph</Text>
            </View>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "700",
                paddingLeft: 10
              }}
            >Phone Number</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={() => console.log("Barcode")}
          >
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: '#66dd00',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10
              }}
            >
              <Text
                style={{
                  color: '#ddd'
                }}
              >bc</Text>
            </View>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "700",
                paddingLeft: 10
              }}
            >Barcode</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  };

  const onBarCodeRead = result => {
    setBarCodeScanned(result.data)
  }

  return (
    <View style={styles.backgroundStyle}>
      <RNCamera
        ref={ref => {
          this.camera = ref;
        }}
        style={{ flex: 1, width: '100%' }}
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

export default Scan
