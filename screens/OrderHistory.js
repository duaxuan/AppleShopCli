import React, {useState, useEffect} from 'react';
import {FlatList, StyleSheet, Text, View, Image} from 'react-native';
import {formatPrice} from './HomeScreen';

const OrderHistory = () => {
  const array = [
    {
      id: '1',
      name: 'Macbook Air',
      image: require('../assets/macbookk.png'),
      price: 20000,
      a: 'Chip: Intel Core i5',
      b: 'Ram: 8GB',
      c: 'Bộ nhớ: 256GB SSD',
      d: 'Kích thước màn: 13.3 inches',
      quantity: 2,
    },
  ];
  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <View style={styles.rowItem}>
        <Image style={styles.image} source={item.image} resizeMode="contain" />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.quantity}>{item.a}</Text>
          <Text style={styles.quantity}>{item.b}</Text>
          <Text style={styles.quantity}>{item.c}</Text>
          <Text style={styles.quantity}>{item.d}</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.quantity}>Số lượng: {item.quantity}</Text>
            <Text style={styles.price}>{formatPrice(item.price)}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Lịch sử đơn hàng</Text>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={array}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{marginHorizontal: '3%'}}
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
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemContainer: {
    marginTop: '3%',
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 4,
  },
  rowItem: {
    margin: '1%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 110,
    height: 100,
    resizeMode: 'contain',
    borderRadius: 8,
  },
  textContainer: {
    marginLeft: 16,
    flex: 1,
  },
  name: {
    color: 'black',
    fontSize: 20,
    fontWeight: '600',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quantity: {
    fontSize: 13,
    color: 'black',
  },
  price: {
    fontSize: 18,
    color: '#FC6D26',
    fontWeight: '600',
  },
});

export default OrderHistory;
