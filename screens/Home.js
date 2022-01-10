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

const Home = () => {

  const featuresData = [
    {
      id: 1,
      icon: icons.createBill,
      backgroundColor: COLORS.lightGreen,
      description: 'Create Bill',
    },
    {
      id: 2,
      icon: icons.addItems,
      backgroundColor: COLORS.lightPurple,
      description: 'List Items',
    },
    {
      id: 3,
      icon: icons.wallet,
      backgroundColor: COLORS.lightRed,
      description: 'Your Wallet',
    },
    {
      id: 4,
      icon: icons.addMoney,
      backgroundColor: COLORS.lightRed,
      description: 'Add Money',
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
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          height: 100,
          marginVertical: 10,
          borderRadius: 20,
          backgroundColor: COLORS.lime,
        }}>

        <Image
        source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfBJS0q2ic-kebF3uQrjD2p7nMWjL_OLFzqw&usqp=CAU'}}
        resizeMode="cover"
        style={{width:'100%', height:'100%', borderRadius: 20,
      }}
        />
        <Text
        style={{fontSize:30, fontWeight: '700', color: COLORS.white, position: 'absolute'}}
        >Community Block</Text>
      </View>
    );
  };

  const renderPromos = () => {
    const HeaderComponent = () => <View>{renderHeader()}</View>;

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

export default Home;
