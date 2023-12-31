import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {formatPrice} from '../HomeScreen';
import {API_Favorite, API_URL} from '../../API/getAPI';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductdetailsScreen = ({navigation, route}) => {
  const {product} = route.params;
  const [quantity, setQuantity] = useState(1);
  const [like, setLike] = useState(false);

  const handleAddToCart = () => {
    if (product.quantity >= 1) {
      navigation.navigate('OrderPayScreen', {
        purchasedProduct: product,
        quantity,
      });
    } else {
      console.warn('Sản phẩm đã hết hàng');
    }
  };

  const handleIncrementQuantity = () => {
    if (quantity < product.quantity) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const putAPI_Like = async () => {
    try {
      await axios.put(
        `${API_Favorite}${await AsyncStorage.getItem('_idUser')}`,
        {productId: product._id},
      );
      setLike(!like);
    } catch (error) {
      console.error('Call api: ' + error.message);
    }
  };

  const getAPI = async () => {
    try {
      const res = await axios.get(
        `${API_Favorite}${await AsyncStorage.getItem('_idUser')}`,
      );
      const isCheck = res.data.message.includes(product._id);
      if (isCheck) setLike(true);
    } catch (error) {
      console.error('Call api: ' + error.message);
    }
  };

  useEffect(() => {
    getAPI();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-sharp" size={25} color="#242424" />
          </TouchableOpacity>
          <TouchableOpacity onPress={putAPI_Like}>
            <AntDesign
              name={like ? 'heart' : 'hearto'}
              size={24}
              color={like ? 'red' : 'black'}
            />
          </TouchableOpacity>
        </View>

        <Image
          style={styles.productImage}
          source={{uri: `${API_URL}${product.image}`}}
        />

        <View style={styles.productInfo}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productPrice}>{formatPrice(product.price)}</Text>
        </View>
        <Text style={styles.sectionHeader}>Thông tin sản phẩm:</Text>
        <View style={styles.productDetails}>
          <Text style={styles.productDetailsText}>{product.description}</Text>
        </View>
        <View style={styles.productDetails}>
          <Text style={styles.productDetailsText}>
            Số lượng: {product.quantity ? product.quantity : 'hết hàng'}
          </Text>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={handleDecrementQuantity}>
            <Text style={styles.quantityButton}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity onPress={handleIncrementQuantity}>
            <Text style={styles.quantityButton}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleAddToCart}>
          <Text style={styles.addToCartButtonText}>Mua</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
  },
  productImage: {
    height: 300,
    width: '100%',
    resizeMode: 'contain',
    borderRadius: 10,
  },
  productInfo: {
    padding: 20,
  },
  productName: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 18,
    color: '#FC6D26',
  },
  sectionHeader: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 20,
  },
  productDetails: {
    marginLeft: 20,
    marginTop: 10,
  },
  productDetailsText: {
    color: 'black',
  },
  footer: {
    flexDirection: 'row',
    margin: 10,
    justifyContent: 'space-between',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 10,
    width: '45%',
  },
  quantityButton: {
    fontSize: 26,
    color: 'black',
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  addToCartButton: {
    backgroundColor: 'black',
    padding: 15,
    alignItems: 'center',
    width: '45%',
    borderRadius: 30,
  },
  addToCartButtonText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default ProductdetailsScreen;
