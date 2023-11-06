import React, {useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  RefreshControl,
  Pressable,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {formatPrice} from '../HomeScreen';
import {API_User_Pay} from '../../API/getAPI';
import axios from 'axios';

const USER_ROLE = 'User';
const USER_ID = '65460fd7b1a47545e1894cfb';

const OrderHistory = ({navigation}) => {
  const [refreshing, setRefreshing] = useState();
  const [array, setArray] = useState({
    'Đã giao': [],
  });

  const renderItem = ({item}) => (
    <Pressable
      onPress={() => navigation.navigate('BillScreen', {item: item})}
      style={styles.itemContainer}>
      <Image
        style={styles.image}
        source={{uri: item.productId.image}}
        resizeMode="contain"
      />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.productId.name}</Text>
        <Text style={styles.detail}>{item.productId.description}</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.quantity}>Đã mua: {item.quantity}</Text>
          <Text style={styles.price}>{formatPrice(item.totalPrice)}</Text>
        </View>
      </View>
    </Pressable>
  );

  const getApi = async () => {
    setRefreshing(true);
    try {
      const res = await axios.get(API_User_Pay, {
        params: {role: USER_ROLE, userId: USER_ID},
      });
      setArray(res.data.message);
      setRefreshing(false);
    } catch (error) {
      console.error('Call api: ' + error.message);
    }
  };

  useEffect(() => {
    getApi();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AntDesign
          onPress={() => navigation.goBack()}
          name="arrowleft"
          size={30}
          color="black"
        />
        <Text style={styles.txtHeader}>Lịch sử mua hàng</Text>
      </View>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getApi} />
        }
        showsVerticalScrollIndicator={false}
        data={array['Đã giao']}
        keyExtractor={item => item._id}
        renderItem={renderItem}
        contentContainerStyle={styles.flatListContent}
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
    flexDirection: 'row',
    height: '5%',
    marginHorizontal: '5%',
    marginVertical: '1%',
    alignItems: 'center',
  },
  txtHeader: {
    color: 'black',
    left: '30%',
    fontSize: 20,
    fontWeight: '500',
  },
  flatListContent: {
    marginHorizontal: '3%',
  },
  itemContainer: {
    marginTop: '2%',
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 4,
    flexDirection: 'row',
    alignItems: 'center',
    padding: '2%',
  },
  image: {
    width: 110,
    height: 100,
    resizeMode: 'contain',
    borderRadius: 8,
  },
  textContainer: {
    marginLeft: '2%',
    flex: 1,
  },
  name: {
    color: 'black',
    fontSize: 20,
    fontWeight: '600',
  },
  detail: {
    fontSize: 13,
    color: 'black',
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
