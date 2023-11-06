import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {formatPrice} from '../HomeScreen';
import axios from 'axios';
import {API_User_Pay} from '../../API/getAPI';

const InfoBlog = ({navigation, route}) => {
  const {item} = route.params;

  const handleDuyet = async () => {
    // Xử lý logic duyệt từng item ở đây
    try {
      await axios.put(`${API_User_Pay}${item._id}`, {
        status: 'Đã giao',
        updateAll: false,
      });

      navigation.replace('Main', {screen: 'Order'});
    } catch (error) {
      console.error('Put API: ' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-sharp" size={25} color="#242424" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Hóa đơn</Text>
        </View>

        <Image style={styles.itemImage} source={{uri: item.productId.image}} />
        <View style={styles.content}>
          <Text style={styles.itemName}>{item.productId.name}</Text>
          <Text style={styles.sectionHeader}>Mô tả</Text>
          <View style={styles.itemDesc}>
            <Text style={styles.descText}>
              Tổng tiền thanh toán:{formatPrice(item.totalPrice)}
            </Text>
            <Text style={styles.descText}>Số lượng mua:{item.quantity}</Text>
            <Text style={styles.descText}>
              Tình trạng đơn hàng: {item.status}
            </Text>
            <Text style={styles.descText}>Ngày mua: {item.createdAt}</Text>
          </View>
        </View>
      </ScrollView>
      <View style={{position: 'absolute', bottom: '10%', left: '13%'}}>
        {item.status == 'Đang xử lý' && (
          <Pressable style={[styles.logoutButton, {backgroundColor: 'gray'}]}>
            <Text style={styles.logoutText}>Chờ xác nhận</Text>
          </Pressable>
        )}
        {item.status == 'Đang vận chuyển' && (
          <Pressable
            style={[styles.logoutButton, {backgroundColor: '#536EFF'}]}
            onPress={() => handleDuyet()}>
            <Text style={styles.logoutText}>Nhận hàng</Text>
          </Pressable>
        )}
        {item.status == 'Đã giao' && (
          <Pressable
            style={styles.logoutButton}
            onPress={() =>
              navigation.navigate('ProductdetailsScreen', {
                product: item.productId,
              })
            }>
            <Text style={styles.logoutText}>Mua lại</Text>
          </Pressable>
        )}
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
    margin: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    marginLeft: 'auto',
    fontSize: 20,
    color: 'black',
    fontWeight: '600',
  },
  itemImage: {
    height: 300,
    width: '98%',
    marginTop: 10,
    alignSelf: 'center',
    resizeMode: 'contain',
    borderRadius: 10,
  },
  content: {
    paddingHorizontal: 20,
  },
  itemName: {
    fontSize: 21,
    color: 'black',
    fontWeight: '500',
    marginBottom: 10,
  },
  sectionHeader: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  itemDesc: {
    marginTop: 10,
  },
  descText: {
    color: 'black',
  },
  logoutButton: {
    width: 300,
    height: 50,
    borderRadius: 35,
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  logoutText: {
    color: 'white',
    fontSize: 17,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
});

export default InfoBlog;
