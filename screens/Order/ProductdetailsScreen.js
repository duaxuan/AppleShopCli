import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ProductdetailsScreen = () => {
  const route = useRoute();
  const {product} = route.params;
  const navigation = useNavigation();
  const [quantity, setQuantity] = useState(1);

  const formatPrice = price => {
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });
    return formatter.format(price);
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleAddToCart = () => {
    Alert.alert('Thông báo', 'Sản phẩm đã được mua thành công!', [
      {
        text: 'OK',
        onPress: () =>
          navigation.navigate('Order', {purchasedProduct: product, quantity}),
      },
    ]);
  };

  const handleIncrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <TouchableOpacity onPress={handleBackPress}>
          <Ionicons
            style={styles.backIcon}
            name="arrow-back-sharp"
            size={24}
            color="#242424"
          />
        </TouchableOpacity>
        <Image
          style={styles.productImage}
          source={product.image}
          resizeMode="contain"
        />
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productPrice}>{formatPrice(product.price)}</Text>
        </View>
        <Text style={styles.sectionHeader}>Thông tin sản phẩm:</Text>
        <View style={styles.productDetails}>
          <Text>{product.a}</Text>
        </View>
        <View style={styles.productDetails}>
          <Text>{product.b}</Text>
        </View>
        <View style={styles.productDetails}>
          <Text>{product.c}</Text>
        </View>
        <View style={styles.productDetails}>
          <Text>{product.d}</Text>
        </View>
        <View style={styles.productDetails}>
          <Text>{product.e}</Text>
        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          margin: 10,
          justifyContent: 'space-between',
        }}>
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
  backIcon: {
    marginTop: 20,
    marginLeft: 20,
  },
  productImage: {
    height: 300,
    width: '100%',
  },
  productInfo: {
    padding: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: '500',
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 18,
    color: '#FC6D26',
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 20,
  },
  productDetails: {
    marginLeft: 20,
    marginTop: 10,
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
