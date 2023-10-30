import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text, // Import Text component
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {API_Product, API_Type_Product} from '../API/getAPI';

export const formatPrice = price => {
  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
  return formatter.format(price);
};

const HomeScreen = ({navigation}) => {
  const [DATADANHMUC, setDATADANHMUC] = useState([]);
  const [DATASANPHAM, setDATASANPHAM] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Macbook');
  const handleProductPress = product => {
    // Chuyển hướng đến màn hình chi tiết sản phẩm và truyền thông tin sản phẩm
    navigation.navigate('ProductdetailsScreen', {product});
  };

  const CategoryList = () => {
    return (
      <View style={styles.categoryList}>
        {DATADANHMUC.map(category => (
          <TouchableOpacity
            style={[
              styles.categoryItem,
              selectedCategory === category.name
                ? {borderBottomWidth: 1}
                : null,
            ]}
            key={category._id}
            onPress={() => setSelectedCategory(category.name)}>
            <Image
              style={styles.categoryImage}
              source={{uri: category.image}}
            />
            <Text style={styles.categoryName}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const ProductList = () => {
    return (
      <FlatList
        scrollEnabled={false}
        data={DATASANPHAM[selectedCategory]}
        keyExtractor={item => item._id}
        numColumns={2}
        contentContainerStyle={styles.productList}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => handleProductPress(item)}>
            <View style={styles.productItem}>
              <Image style={styles.productImage} source={{uri: item.image}} />
              <Text style={styles.productName} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={styles.productPrice} numberOfLines={1}>
                {formatPrice(item.price)}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    );
  };

  // Call api
  const getApi = async isCheck => {
    try {
      if (isCheck) {
        const res = await axios.get(API_Product);
        setDATASANPHAM(res.data.message);
      } else {
        const res = await axios.get(API_Type_Product);
        setDATADANHMUC(res.data.message);
      }
      console.log(res.data.message);
    } catch (error) {
      console.log('Call api: ' + error.message);
    }
  };

  useEffect(() => {
    // Lấy sản phẩm
    getApi(true);
    // Lấy loại sản phẩm
    getApi(false);
  }, []);

  return (
    <View style={{backgroundColor: '#F0F0F0'}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.header}>
            <FontAwesome name="apple" size={30} color="black" />
            <Text style={styles.headerText}>AppleShop</Text>
          </View>
          <View style={styles.iconsContainer}>
            <AntDesign
              name="user"
              size={24}
              color="black"
              onPress={() => navigation.navigate('Profile')}
            />
          </View>
        </View>
        <Image style={styles.image} source={require('../assets/banner.png')} />
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
  iconSearch: {
    marginLeft: 15,
  },
  image: {
    margin: 22,
    width: '95%',
    resizeMode: 'contain',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  categoryList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
  },
  categoryItem: {
    alignItems: 'center',
    width: 88,
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
    marginTop: 8,
    fontSize: 12,
    marginBottom: 5,
  },
  productList: {
    marginHorizontal: 15,
    marginTop: '2%',
    alignItems: 'center',
  },
  productItem: {
    alignItems: 'center',
    width: 180,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    margin: 10,
    height: 180,
    justifyContent: 'center',
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
});

export default HomeScreen;
