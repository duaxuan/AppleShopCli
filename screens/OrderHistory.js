import React, {useState, useEffect} from 'react';
import {FlatList, StyleSheet, Text, View, Image} from 'react-native';

const OrderHistory = ({navigation, route}) => {
  const {purchasedProduct, quantity} = route.params;
  const [arrray, setArray] = useState([]); // Danh sách sản phẩm trong giỏ hàng

  useEffect(() => {
    // useEffect sẽ được gọi mỗi khi purchasedProduct hoặc quantity thay đổi
    if (purchasedProduct && quantity) {
      // Tạo một bản sao của mảng arrray để tránh việc thay đổi trực tiếp state
      const updatedArray = [...arrray];
      // Kiểm tra xem sản phẩm đã mua có trong danh sách chưa
      const existingProductIndex = updatedArray.findIndex(
        item => item.id === purchasedProduct.id,
      );

      if (existingProductIndex === -1) {
        // Nếu sản phẩm chưa có trong danh sách, thêm vào danh sách với số lượng mua là quantity
        updatedArray.push({
          id: purchasedProduct.id,
          name: purchasedProduct.name,
          image: purchasedProduct.image,
          price: purchasedProduct.price,
          thuoctinh: purchasedProduct.thuoctinh,
          soluong: quantity,
        });
      } else {
        // Nếu sản phẩm đã có trong danh sách, cập nhật số lượng mua của sản phẩm đó
        updatedArray[existingProductIndex].soluong += quantity;
      }

      // Cập nhật state với danh sách đã được cập nhật
      setArray(updatedArray);
    }
  }, [purchasedProduct, quantity]);

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Image style={styles.image} source={item.image} resizeMode="contain" />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description}>{item.thuoctinh}</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.quantity}>Số lượng: {item.soluong}</Text>
          <Text style={styles.price}>{formatPrice(item.price)}</Text>
        </View>
      </View>
    </View>
  );

  const formatPrice = price => {
    const formattedPrice = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
    return formattedPrice;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Lịch sử đơn hàng</Text>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={arrray}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.flatlistContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  header: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  flatlistContent: {
    paddingHorizontal: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    marginTop: 16,
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 4,
    padding: 16,
  },
  image: {
    width: 120,
    height: 100,
    borderRadius: 8,
  },
  textContainer: {
    marginLeft: 16,
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 15,
    color: '#666',
    marginVertical: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quantity: {
    fontSize: 15,
    color: '#666',
  },
  price: {
    fontSize: 18,
    color: '#FC6D26',
    fontWeight: 'bold',
  },
});

export default OrderHistory;
