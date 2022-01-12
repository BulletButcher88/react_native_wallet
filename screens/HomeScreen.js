import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';

import {COLORS, icons, SIZES, FONTS} from '../constants';

const HomeScreen = ({navigation}) => {
  const featuresData = [
    {
      id: 1,
      icon: icons.createBill,
      backgroundColor: COLORS.lightGreen,
      description: 'Create Bill',
      screen: 'Bill',
    },
    {
      id: 2,
      icon: icons.addItems,
      backgroundColor: COLORS.lightPurple,
      description: 'List Items',
      screen: 'Items',
    },
    {
      id: 3,
      icon: icons.wallet,
      backgroundColor: COLORS.lightRed,
      description: 'Your Wallet',
      screen: 'Wallet',
    },
    {
      id: 4,
      icon: icons.addMoney,
      backgroundColor: COLORS.lightRed,
      description: 'Add Money',
      screen: 'AddMoney',
    },
  ];

  const speicalPromoData = [
    {
      id: 1,
      title: 'Bonus Cash',
      url: 'https://www.vpnfan.com/wp-content/uploads/2020/12/cash-app-design.jpg',
      description: "Don't miss out, Grab it",
    },
    {
      id: 1,
      title: 'Community Cash',
      url: 'https://www.thestreet.com/.image/t_share/MTY3NTM5NjMzNjkyNDg1NTE4/15-best-cashback-apps-of-2019.png',
      description: "Don't miss out, Grab it",
    },
  ];

  const renderHeader = () => {
    return (
      <View style={{marginVertical: SIZES.padding * 2}}>
        <Text style={{fontSize: 25, fontWeight: '700', color: COLORS.black}}>
          G'day!
        </Text>
        <Text style={{fontSize: SIZES.body3, color: COLORS.grey}}>
          App by Mark Butcher
        </Text>
        <View
          style={{
            position: 'absolute',
            right: 0,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={{
              height: 40,
              width: 40,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: COLORS.lightGrey,
              borderRadius: 20,
            }}>
            <Image
              source={icons.notifcation}
              style={{
                height: 20,
                width: 20,
              }}
            />
            <View
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                height: 10,
                width: 10,
                borderRadius: 5,
                backgroundColor: COLORS.red,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderBanner = () => (
    <View
      style={{
        flex: 1,
      }}>
      <TouchableOpacity
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          height: 160,
          marginVertical: 10,
          borderRadius: 20,
          backgroundColor: COLORS.lime,
        }}>
        <Image
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfBJS0q2ic-kebF3uQrjD2p7nMWjL_OLFzqw&usqp=CAU',
          }}
          resizeMode="cover"
          style={{width: '100%', height: '100%', borderRadius: 20}}
        />
        <Text
          style={{
            fontSize: 30,
            fontWeight: '700',
            color: COLORS.white,
            position: 'absolute',
          }}>
          Community Link
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderFeatures = () => {
    const Header = () => (
      <View
        style={{
          marginBottom: SIZES.padding * 2,
        }}>
        <Text style={{fontSize: 20}}>Features</Text>
      </View>
    );

    const renderItem = ({item}) => (
      <View style={{marginBottom: SIZES.padding * 2}}>
        <TouchableOpacity
          style={{
            marginBottom: SIZES.padding * 2,
            width: 60,
            alignItems: 'center',
          }}
          onPress={() => navigation.navigate(`${item.screen}`)}>
          <View
            style={{
              flex: 1,
              height: 50,
              width: 50,
              marginBottom: 5,
              borderRadius: 20,
              backgroundColor: item.backgroundColor,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={item.icon}
              resizeMode="cover"
              style={{
                width: 25,
                height: 25,
                tintColor: COLORS.primary,
              }}
            />
          </View>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 12,
            color: COLORS.black,
            fontWeight: '700',
          }}>
          {item.description}
        </Text>
      </View>
    );

    return (
      <FlatList
        ListHeaderComponent={Header}
        data={features}
        numColumns={4}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        keyExtractor={item => `${item.id}`}
        renderItem={renderItem}
        style={{marginTop: SIZES.padding * 2}}
      />
    );
  };

  const renderPromos = () => {
    const HeaderComponent = () => (
      <View>
        {renderHeader()}
        {renderBanner()}
        {renderFeatures()}
      </View>
    );

    const renderItem = ({item}) => (
      <TouchableOpacity
        style={{
          marginVertical: SIZES.base,
          width: SIZES.width / 2.5,
        }}
        onPress={() => console.log(item.title)}>
        <View
          style={{
            height: 80,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: COLORS.primary,
          }}>
          <Image
            source={{uri: item.url}}
            resizeMode="cover"
            style={{
              width: '100%',
              height: '100%',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
          />
        </View>
        <View
          style={{
            padding: SIZES.padding,
            backgroundColor: COLORS.lightGrey,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}>
          <Text style={{fontSize: 16, fontWeight: '600'}}>{item.title}</Text>
          <Text style={{fontSize: 12}}>{item.description}</Text>
        </View>
      </TouchableOpacity>
    );

    return (
      <FlatList
        ListHeaderComponent={HeaderComponent}
        contentContainerStyle={{paddingHorizontal: SIZES.padding * 3}}
        numColumns={2}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        data={speicalPromoData}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<View style={{marginBottom: 80}} />}
      />
    );
  };

  const [features, setFeatures] = useState(featuresData);
  const [speicals, setSepicals] = useState(speicalPromoData);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      {renderPromos()}
    </SafeAreaView>
  );
};

export default HomeScreen;
