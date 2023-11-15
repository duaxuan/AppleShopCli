import axios from 'axios';
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Swiper from 'react-native-swiper';
import {
  API_Product,
  API_Type_Product,
  API_URL,
  API_User_Info,
} from '../API/getAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';

export const formatPrice = price => {
  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
  return formatter.format(price);
};

const HomeScreen = ({navigation}) => {
  const [selectedCategory, setSelectedCategory] = useState('Macbook');
  const [DATADANHMUC, setDATADANHMUC] = useState([]);
  const [DATASANPHAM, setDATASANPHAM] = useState([]);

  const handleProductPress = product => {
    navigation.navigate('ProductdetailsScreen', {product});
  };

  const CategoryItem = ({category}) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedCategory === category.name ? {borderBottomWidth: 1} : null,
      ]}
      onPress={() => setSelectedCategory(category.name)}>
      <Image
        style={styles.categoryImage}
        source={{uri: `${API_URL}${category.image}`}}
      />
      <Text style={styles.categoryName}>{category.name}</Text>
    </TouchableOpacity>
  );

  const CategoryList = () => (
    <View style={styles.categoryList}>
      {DATADANHMUC.map(category => (
        <CategoryItem key={category._id} category={category} />
      ))}
    </View>
  );

  const ProductItem = ({item}) => (
    <TouchableOpacity
      style={styles.productItem}
      onPress={() => handleProductPress(item)}>
      <Image
        style={styles.productImage}
        source={{uri: `${API_URL}${item.image}`}}
      />
      <Text style={styles.productName} numberOfLines={1}>
        {item.name}
      </Text>
      <Text style={styles.productPrice} numberOfLines={1}>
        {formatPrice(item.price)}
      </Text>
    </TouchableOpacity>
  );

  const ProductList = () => (
    <FlatList
      scrollEnabled={false}
      data={DATASANPHAM[selectedCategory]}
      keyExtractor={item => item._id}
      numColumns={2}
      contentContainerStyle={styles.productList}
      renderItem={({item}) => <ProductItem item={item} />}
    />
  );

  const getApi = async () => {
    try {
      const res1 = await axios.get(API_User_Info, {
        params: {accountID: await AsyncStorage.getItem('_idUser')},
      });

      if (!res1.data.message.fullName) {
        console.warn('Hãy cập nhật thông tin để sử dụng dịch vụ của chúng tôi');
        navigation.replace('EditAccountScreen');
      }

      const res2 = await axios.get(API_Product, {params: {role: 'User'}});
      setDATASANPHAM(res2.data.message);
      const res3 = await axios.get(API_Type_Product);
      setDATADANHMUC(res3.data.message);
    } catch (error) {
      console.error('Call api: ' + error.message);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getApi();
    }, []),
  );

  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.header}>
          <FontAwesome name="apple" size={30} color="black" />
          <Text style={styles.headerText}>AppleShop</Text>
        </View>
        <View style={styles.iconsContainer}>
          <Ionicons
            name="search"
            size={24}
            color="black"
            onPress={() => navigation.navigate('FavouriteScreen')}
          />
          <AntDesign
            name="user"
            size={24}
            color="black"
            onPress={() => navigation.navigate('Profile')}
          />
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Swiper style={styles.swiperContainer} autoplay>
          {DATADANHMUC.map(category => (
            <View key={category._id} style={styles.slide}>
              <Image
                style={styles.slideImage}
                source={{uri: `${API_URL}${category.image}`}}
              />
              <Text style={styles.slideText}>{category.name}</Text>
            </View>
          ))}
        </Swiper>
        <CategoryList />
        {selectedCategory && <ProductList />}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    color: 'black',
    marginLeft: 10,
    fontSize: 14,
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  swiperContainer: {
    height: 200,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: '2%',
  },
  slideImage: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    resizeMode: 'cover',
  },
  slideText: {
    position: 'absolute',
    bottom: 20,
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  categoryList: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: '1%',
  },
  categoryItem: {
    alignItems: 'center',
    width: '23%',
    height: 88,
    borderRadius: 5,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  categoryImage: {
    width: 60,
    height: 50,
    borderRadius: 5,
    resizeMode: 'contain',
  },
  categoryName: {
    color: 'black',
    marginTop: '2%',
    fontSize: 12,
    marginBottom: 5,
  },
  productItem: {
    width: '47%',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: '2%',
    margin: '1%',
    borderRadius: 10,
  },
  productImage: {
    width: '85%',
    height: 120,
    resizeMode: 'contain',
    borderRadius: 10,
    justifyContent: 'center',
  },
  productName: {
    color: 'black',
    fontSize: 18,
    justifyContent: 'center',
  },
  productPrice: {
    fontSize: 14,
    color: '#FC6D26',
    justifyContent: 'center',
  },
  productList: {
    justifyContent: 'space-between',
    paddingHorizontal: '2%',
    marginTop: 10,
  },
});

export default HomeScreen;
