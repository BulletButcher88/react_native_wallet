import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  TextInput,
  Modal,
  FlatList,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { COLORS, SIZES, icons } from '../constants'

const LogIn = ({ navigation }) => {

  const [showPassword, setShowPassword] = useState();

  const [areas, setAreas] = useState();
  const [selectedArea, setSelectedArea] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetch("https://restcountries.com/v2/all")
      .then(res => res.json())
      .then(json => {
        let areaData = json.map(item => {
          let areaInitials = item.alpha2Code.toLowerCase();
          let areaCode = item.callingCodes;
          return {
            code: areaCode,
            name: item.name,
            flag: areaInitials ? `https://flagcdn.com/32x24/${areaInitials}.png` : null
          }
        })
        setAreas(areaData);
      })
  }, []);

  function renderHeader() {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: SIZES.padding * 6,
          paddingHorizontal: SIZES.padding * 2,
        }}
        onPress={() => console.log('Sign Up')}>
        <Image
          source={icons.back}
          style={{
            height: 25,
            width: 25,
            tintColor: COLORS.yellow,
          }}
        />
        <Text
          style={{
            fontSize: 20,
            color: COLORS.yellow,
          }}>
          Sign Up
        </Text>
      </TouchableOpacity>
    )
  }

  const renderLogo = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          height: SIZES.height / 3.2,
          marginTop: 10,
        }}>
        <Image
          source={icons.community}
          resizeMode='contain'
          style={{
            height: 140,
            width: 140,
            tintColor: COLORS.yellow,
          }}
        />
      </View>
    )
  };

  const renderForm = () => {

    return (
      <View
        style={{
          marginHorizontal: SIZES.padding * 3,
        }}
      >
        <View style={{ marginTop: SIZES.padding }}>
          <TextInput
            style={{
              marginVertical: SIZES.padding,
              borderBottomColor: COLORS.yellow,
              borderBottomWidth: 1,
              height: 40,
              color: COLORS.yellow,
              fontSize: SIZES.body2
            }}
            placeholder='Name'
            placeholderTextColor={COLORS.yellow}
            selectionColor={COLORS.yellow}
          />
        </View>

        <View style={{ marginTop: SIZES.padding * 2 }}>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={{
              width: 100,
              height: 50,
              marginHorizontal: 5,
              borderBottomColor: COLORS.yellow,
              borderBottomWidth: 1,
              flexDirection: 'row',
            }}
            onPress={() => setModalVisible(true)}
          >
            <View style={{ justifyContent: 'center' }}>
              <Image
                source={icons.down}
                style={{
                  width: 15,
                  height: 15,
                  tintColor: COLORS.yellow
                }}
              />
            </View>
            <View
              style={{ justifyContent: 'center', marginLeft: 6 }}
            >
              <Image
                source={selectedArea ? {
                  uri: selectedArea.flag
                } : icons.flag}
                resizeMode='contain'
                style={{
                  width: 30,
                  height: 30,
                  tintColor: selectedArea ? null : COLORS.yellow
                }}
              />
            </View>
            <View
              style={{ justifyContent: 'center', marginLeft: 6 }}
            >
              <Text style={{ color: COLORS.yellow, fontSize: SIZES.body2 }}>
                {selectedArea ? `+` + selectedArea.code : +61}
              </Text>
            </View>
          </TouchableOpacity>
          <TextInput
            style={{
              flex: 1,
              marginVertical: SIZES.padding,
              borderBottomColor: COLORS.yellow,
              borderBottomWidth: 1,
              height: 40,
              color: COLORS.yellow,
              fontSize: SIZES.body2,
              marginLeft: 10,
            }}
            placeholder='Phone Number'
            placeholderTextColor={COLORS.yellow}
            selectionColor={COLORS.yellow}
          />
        </View>
        <View style={{ marginTop: SIZES.padding * 2 }}>
        </View>
        <TextInput
          style={{
            flex: 1,
            marginVertical: SIZES.padding,
            borderBottomColor: COLORS.yellow,
            borderBottomWidth: 1,
            height: 40,
            color: COLORS.yellow,
            fontSize: SIZES.body2,
          }}
          placeholder='Enter Password'
          placeholderTextColor={COLORS.yellow}
          selectionColor={COLORS.yellow}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          style={{
            position: 'absolute',
            right: 0,
            bottom: 10,
            height: 30,
            width: 30
          }}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Image
            source={!showPassword ? icons.eye : icons.closeEye}
            style={{
              height: 20,
              width: 20,
              tintColor: COLORS.yellow
            }}
          />
        </TouchableOpacity>
      </View>
    )
  }

  const renderButton = () => {
    return (
      <View
        style={{
          margin: SIZES.padding * 4
        }}
      >
        <TouchableOpacity
          style={{
            height: 60,
            backgroundColor: COLORS.darkGreyPurple,
            borderRadius: SIZES.radius / 1.5,
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onPress={() => navigation.navigate("Home")}
        >
          <Text
            style={{
              color: COLORS.yellow,
              fontSize: SIZES.h2,
            }}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  const renderAreaModal = () => {

    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          style={{ padding: SIZES.padding, flexDirection: 'row' }}
          onPress={() => {
            setSelectedArea(item);
            setModalVisible(false);
          }}>
          <Image
            source={{ uri: item.flag }}
            style={{
              width: 30,
              height: 20,
              marginRight: 10,
            }}
          />
          <Text style={{ fontSize: SIZES.body3 }}>{item.name}</Text>
        </TouchableOpacity>
      )
    }

    return (
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
      >
        <TouchableWithoutFeedback
          onPress={() => setModalVisible(false)}
        >
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{
              height: 400,
              width: SIZES.width * 0.9,
              backgroundColor: COLORS.lightPurple,
              borderRadius: SIZES.radius,
              position: 'absolute',
              bottom: 0,
            }}>
              <FlatList
                data={areas}
                renderItem={renderItem}
                keyExtractor={item => item.name}
                showsHorizontalScrollIndicator={false}
                style={{
                  padding: SIZES.padding * 2,
                  marginBottom: SIZES.padding * 2,
                }}
              />
            </View>
          </View>

        </TouchableWithoutFeedback>
      </Modal>
    )
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={{ flex: 1 }}>
      <LinearGradient
        colors={[COLORS.greyPurple, COLORS.midGreyPurple, COLORS.darkGreyPurple]}
        style={{ flex: 1 }}>
        <ScrollView>
          {renderHeader()}
          {renderLogo()}
          {renderForm()}
          {renderButton()}
        </ScrollView>
      </LinearGradient>
      {renderAreaModal()}
    </KeyboardAvoidingView>
  );
};


export default LogIn;
