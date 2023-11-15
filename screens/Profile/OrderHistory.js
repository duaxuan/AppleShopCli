import React, {useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {formatPrice} from '../HomeScreen';
import {API_URL, API_User_Info, API_User_Pay} from '../../API/getAPI';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OrderHistory = ({navigation}) => {
  const [array, setArray] = useState({
    'Đã giao': [],
  });

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('BillScreen', {item: item})}
      style={styles.itemContainer}>
      <Image
        style={styles.image}
        source={{uri: `${API_URL}${item.productId.image}`}}
        resizeMode="contain"
      />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.productId.name}</Text>
        <Text style={styles.detail} numberOfLines={2}>
          {item.productId.description}
        </Text>
        <View style={styles.infoContainer}>
          <Text style={styles.quantity}>Đã mua: {item.quantity}</Text>
          <Text style={styles.price}>{formatPrice(item.totalPrice)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const getApi = async () => {
    try {
      const res1 = await axios.get(API_User_Info, {
        params: {accountID: await AsyncStorage.getItem('_idUser')},
      });

      const res2 = await axios.get(API_User_Pay, {
        params: {
          role: 'User',
          userId: res1.data.message._id,
        },
      });

      setArray(res2.data.message);
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
      {array['Đã giao'].length ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={array['Đã giao']}
          keyExtractor={item => item._id}
          renderItem={renderItem}
          contentContainerStyle={styles.flatListContent}
        />
      ) : (
        <Text style={styles.noOrderText}>
          Bạn chưa có đơn hàng nào hoàn thành
        </Text>
      )}
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
    height: '7%',
    marginHorizontal: '5%',
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
    marginTop: '1%',
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 4,
    flexDirection: 'row',
    alignItems: 'center',
    padding: '3%',
  },
  image: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    borderRadius: 8,
  },
  textContainer: {
    marginLeft: '3%',
    flex: 1,
  },
  name: {
    color: 'black',
    fontSize: 18,
    fontWeight: '600',
  },
  detail: {
    fontSize: 14,
    color: 'black',
    marginTop: 5,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  quantity: {
    fontSize: 14,
    color: 'black',
  },
  price: {
    fontSize: 18,
    color: '#FC6D26',
    fontWeight: '600',
  },
  noOrderText: {
    textAlign: 'center',
    marginTop: '50%',
    color: 'black',
    fontSize: 18,
  },
});

export default OrderHistory;
