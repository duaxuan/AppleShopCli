import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {formatPrice} from '../HomeScreen';

const ProductdetailsScreen = ({navigation, route}) => {
  const {product} = route.params;
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    navigation.navigate('OrderPayScreen', {
      purchasedProduct: product,
      quantity,
    });
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
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            style={styles.backIcon}
            name="arrow-back-sharp"
            size={25}
            color="#242424"
          />
        </TouchableOpacity>
        <Image style={styles.productImage} source={{uri: product.image}} />
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productPrice}>{formatPrice(product.price)}</Text>
        </View>
        <Text style={styles.sectionHeader}>Thông tin sản phẩm:</Text>
        <View style={styles.productDetails}>
          <Text style={{color: 'black'}}>{product.description}</Text>
        </View>
        <View style={styles.productDetails}>
          <Text style={{color: 'black'}}>Số lượng: {product.quantity}</Text>
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
    width: '98%',
    marginTop: '2%',
    alignSelf: 'center',
    resizeMode: 'contain',
    borderRadius: 10,
  },
  productInfo: {
    padding: 20,
  },
  productName: {
    fontSize: 24,
    color: 'black',
    fontWeight: '500',
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
