import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import {API_User_Pay} from '../API/getAPI';

const USER_ROLE = 'User';
const USER_ID = '65460fd7b1a47545e1894cfb';
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
  const [status, setStatus] = useState('Đang xử lý');
  const [imgBottom, setImgBottom] = useState(imgOrder[0]);
  const [refreshing, setRefreshing] = useState(false);
  const [array, setArray] = useState([]);

  const tabItem = tab => {
    setStatus(tab);
    setImgBottom(imgOrder[listTab.findIndex(item => item.status === tab)]);
  };

  const fetchData = async () => {
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

  const handleDuyet = async item => {
    // Xử lý logic duyệt từng item ở đây
    try {
      await axios.put(`${API_User_Pay}${item._id}`, {
        status: status === 'Đang xử lý' ? 'Đã hủy' : 'Đã giao',
        updateAll: false,
      });
      fetchData();
      {
        status === 'Đang vận chuyển' &&
          navigation.replace('Main', {screen: 'Order'});
      }
    } catch (error) {
      console.error('Put API: ' + error.message);
    }
  };

  const renderItem = array => (
    <FlatList
      keyExtractor={item => item._id}
      scrollEnabled={false}
      data={array[status]}
      renderItem={({item}) => (
        <View style={styles.viewItem}>
          <Image style={styles.imgItem} source={{uri: item.productId.image}} />
          <View style={{left: '5%', flex: 1}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.nameProductItem} numberOfLines={1}>
                {item.productId.name}
              </Text>
              <View style={styles.quantityItem}>
                <Text style={styles.txtItem}>{item.quantity}</Text>
              </View>
            </View>

            <Text style={[styles.txtItem, {fontSize: 13}]}>
              Giá: {item.productId.price}
            </Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                onPress={() => navigation.navigate('BillScreen', {item: item})}
                style={[styles.txtItem, {textDecorationLine: 'underline'}]}>
                Xem thêm
              </Text>
              {status === 'Đang xử lý' && (
                <Pressable
                  style={styles.statusItem}
                  onPress={() => handleDuyet(item)}>
                  <Text
                    style={[styles.txtItem, {color: 'white', fontSize: 10}]}
                    numberOfLines={1}>
                    Hủy
                  </Text>
                </Pressable>
              )}
              {status === 'Đang vận chuyển' && (
                <Pressable
                  style={styles.statusItem}
                  onPress={() => {
                    handleDuyet(item);
                  }}>
                  <Text
                    style={[styles.txtItem, {color: 'white', fontSize: 10}]}
                    numberOfLines={1}>
                    Nhận hàng
                  </Text>
                </Pressable>
              )}
            </View>
          </View>
        </View>
      )}
    />
  );

  return (
    <View style={styles.container} onLayout={() => fetchData(status)}>
      <View style={styles.header}>
        <Text style={styles.titleHeader}>Thông tin đơn hàng</Text>
      </View>

      <View style={{alignItems: 'center'}}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => fetchData(status)}
            />
          }
          horizontal
          showsHorizontalScrollIndicator={false}>
          {listTab.map((data, index) => (
            <Pressable
              key={index}
              style={[
                styles.tabItem,
                data.status === status ? {backgroundColor: 'white'} : null,
              ]}
              onPress={() => tabItem(data.status)}>
              <Text style={data.status === status ? styles.txtTab : null}>
                {data.status}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderItem(array)}
      </ScrollView>
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
    margin: '3%',
    alignItems: 'center',
    marginHorizontal: 5,
    justifyContent: 'center',
    borderRadius: 10,
  },
  txtTab: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  viewItem: {
    marginTop: '2%',
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: '3%',
    paddingVertical: '2%',
    marginHorizontal: '4%',
    flexDirection: 'row',
  },
  imgItem: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  nameProductItem: {
    fontSize: 19,
    color: 'black',
    fontWeight: 'bold',
  },
  txtItem: {
    color: 'black',
    fontSize: 12,
    margin: '2%',
    fontWeight: '700',
  },
  quantityItem: {
    width: 25,
    height: 25,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
  },
  statusItem: {
    width: 70,
    height: 25,
    borderRadius: 10,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBottom: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    position: 'absolute',
    zIndex: -1,
    bottom: '10%',
    alignSelf: 'center',
  },
});

export default OrderScreen1;
