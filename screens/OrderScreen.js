import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URL, API_User_Info, API_User_Pay} from '../API/getAPI';
import {useFocusEffect} from '@react-navigation/native';

const {width} = Dimensions.get('window');

const listTab = [
  {status: 'Đang xử lý'},
  {status: 'Đang vận chuyển'},
  {status: 'Đã giao'},
];

const imgOrder = [
  'https://cdn2.iconfinder.com/data/icons/customer-loyalty-6/4680/PMT_M358_05-256.png',
  'https://cdn3.iconfinder.com/data/icons/order-food-online/3000/FOO-01-256.png',
  'https://cdn0.iconfinder.com/data/icons/delivery-services-5/600/7-256.png',
];

const OrderScreen1 = ({navigation}) => {
  const [currentTab, setCurrentTab] = useState('Đang xử lý');
  const [imgBottom, setImgBottom] = useState(imgOrder[0]);
  const [array, setArray] = useState([]);

  const tabItem = tab => {
    setCurrentTab(tab);
    setImgBottom(imgOrder[listTab.findIndex(item => item.status === tab)]);
  };

  const fetchData = async () => {
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

  const handleDuyet = async item => {
    try {
      await axios.put(`${API_User_Pay}${item._id}`, {
        status: currentTab === 'Đang xử lý' ? 'Đã hủy' : 'Đã giao',
        updateAll: false,
      });
      fetchData();
      ToastAndroid.show('Xác nhận thành công', ToastAndroid.show);
    } catch (error) {
      console.error('Put API: ' + error.message);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, []),
  );

  const renderItem = () => (
    <FlatList
      keyExtractor={item => item._id}
      data={array[currentTab]}
      renderItem={({item}) => (
        <View style={styles.viewItem}>
          <Image
            style={styles.imgItem}
            source={{uri: `${API_URL}${item.productId.image}`}}
          />
          <View style={{marginLeft: 10, flex: 1}}>
            <View style={styles.productInfo}>
              <Text style={styles.productName} numberOfLines={1}>
                {item.productId.name}
              </Text>
              <View style={styles.quantityContainer}>
                <Text style={styles.quantityText}>{item.quantity}</Text>
              </View>
            </View>

            <Text style={[styles.productText, {fontSize: 13}]}>
              Giá: {item.productId.price}
            </Text>

            <View style={styles.actionContainer}>
              <Text
                onPress={() => navigation.navigate('BillScreen', {item: item})}
                style={[styles.productText, styles.underline]}>
                Xem thêm
              </Text>

              {currentTab === 'Đang xử lý' && (
                <Pressable
                  style={[styles.statusButton, {backgroundColor: 'red'}]}
                  onPress={() => handleDuyet(item)}>
                  <Text style={styles.buttonText}>Hủy</Text>
                </Pressable>
              )}

              {currentTab === 'Đang vận chuyển' && (
                <Pressable
                  style={[styles.statusButton, {backgroundColor: 'green'}]}
                  onPress={() => handleDuyet(item)}>
                  <Text style={styles.buttonText}>Nhận hàng</Text>
                </Pressable>
              )}
            </View>
          </View>
        </View>
      )}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titleHeader}>Thông tin đơn hàng</Text>
      </View>

      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {listTab.map((data, index) => (
            <Pressable
              key={index}
              style={[
                styles.tabItem,
                data.status === currentTab ? {backgroundColor: 'white'} : null,
              ]}
              onPress={() => tabItem(data.status)}>
              <Text
                style={
                  data.status === currentTab
                    ? styles.activeTabText
                    : styles.inactiveTabText
                }>
                {data.status}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {renderItem()}

      <Image style={styles.imageBottom} source={{uri: imgBottom}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  header: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  titleHeader: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  tabItem: {
    width: width / 3.25,
    height: 40,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  activeTabText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  inactiveTabText: {
    color: 'gray',
    fontWeight: 'bold',
    fontSize: 16,
  },
  viewItem: {
    marginTop: 10,
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 20,
    flexDirection: 'row',
  },
  imgItem: {
    width: 90,
    height: 90,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  productInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productName: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    maxWidth: width * 0.5,
  },
  quantityContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
  },
  quantityText: {
    color: 'black',
    fontSize: 14,
    fontWeight: '700',
  },
  productText: {
    color: 'black',
    fontSize: 12,
    marginVertical: 5,
    fontWeight: '700',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  underline: {
    textDecorationLine: 'underline',
  },
  statusButton: {
    width: 80,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
  },
  imageBottom: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    position: 'absolute',
    zIndex: -1,
    bottom: 10,
    alignSelf: 'center',
  },
});

export default OrderScreen1;
