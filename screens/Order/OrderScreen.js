import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const OrderScreen = ({navigation}) => {
  const [object, setObject] = useState({
    name: 'Apple Watch S5',
    image:
      'https://th.bing.com/th/id/OIP.8Isx8EUN0ilB4nOCohRf6gHaHR?w=218&h=214&c=7&r=0&o=5&pid=1.7',
    price: 3120000,
    description: 'Là sản phẩm đồng hồ thương hiệu đến từ nhà táo',
    quantity: 500,
    typeProduct: 3,
    created: '10/09/2023',
    updated: '12/09/2023',
  });

  return (
    <View style={styles.container}>
      {/* Back */}
      <View style={styles.header}>
        <AntDesign
          onPress={() => navigation.goBack()}
          name="arrowleft"
          size={25}
          color="black"
        />
        <Text style={styles.txtHeader}>Thanh toán</Text>
      </View>
      {/* Scroll view */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Địa chỉ */}
        <Text style={styles.txtTitle}>Địa chỉ</Text>
        <View style={styles.viewBox}>
          <View style={styles.viewBox1}>
            <Text style={{color: '#33CCFF'}}>Thông tin người nhận hàng</Text>
            <View style={{marginTop: '2%'}}>
              <Text>Tên người nhận</Text>
              <Text style={{fontWeight: 'bold'}}>Nguyen Xuan Duan</Text>
            </View>
            <View style={{marginTop: '2%'}}>
              <Text>Số điênj thoại người nhận</Text>
              <Text style={{fontWeight: 'bold'}}>0964863417</Text>
            </View>
            <View style={{marginTop: '2%'}}>
              <Text>Địa chỉ giao hàng</Text>
              <Text style={{fontWeight: 'bold'}}>
                Ngõ 193/220/41 Phú Diễn, Bắc Từ Liêm, Hà Nội{' '}
              </Text>
            </View>
          </View>
        </View>
        {/* Sản phẩm */}
        <Text style={styles.txtTitle}>Sản phẩm</Text>
        <View style={[styles.viewBox, {height: 70}]}>
          <View style={styles.viewBox3}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                style={styles.imageProdduct}
                source={{uri: object.image}}
              />
              <View style={{left: '5%'}}>
                <Text style={styles.txtItemName}>{object.name}</Text>
                <Text style={styles.txtItemPrice}>
                  đ {object.price.toLocaleString().replace(/,/g, '.')}
                </Text>
              </View>
            </View>
            <Text style={styles.txtItemPrice}>X1</Text>
          </View>
        </View>
        {/* Khuyến mãi */}
        <Text style={styles.txtTitle}>Khuyến mãi</Text>
        <View style={[styles.viewBox, {height: 50}]}>
          <View style={styles.viewBox3}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <MaterialCommunityIcons name="sale" size={30} color="#555555" />
              <View style={{left: '30%'}}>
                <Text style={{color: '#999999'}}>Voicher khuyến mãi </Text>
              </View>
            </View>
            <AntDesign name="right" size={24} color="#999999" />
          </View>
        </View>
        {/* Thanh toán */}
        <Text style={styles.txtTitle}>Thanh toán</Text>
        <View style={[styles.viewBox, {height: 250}]}>
          <View style={styles.itemPay}>
            <Text style={{color: '#999999'}}>Giá sản phẩm:</Text>
            <Text style={{fontWeight: '500'}}>
              {object.price.toLocaleString().replace(/,/g, '.')} đ
            </Text>
          </View>
          <View style={styles.itemPay}>
            <Text style={{color: '#999999'}}>Khuyến mãi:</Text>
            <Text style={{fontWeight: '500'}}>0 đ</Text>
          </View>
          <View style={styles.itemPay}>
            <Text style={{color: '#999999'}}>Phí vận chuyển:</Text>
            <Text style={{fontWeight: '500'}}>0 đ</Text>
          </View>
          <View style={styles.hr} />
          <View style={styles.itemPay}>
            <Text style={{fontWeight: 'bold'}}>Tổng tiền thanh toán:</Text>
            <Text style={{fontWeight: '500', color: '#FF5C00'}}>
              {object.price.toLocaleString().replace(/,/g, '.')} đ
            </Text>
          </View>
        </View>
      </ScrollView>
      {/* Button Pay */}
      <Pressable style={styles.btnPay}>
        <Text style={styles.txtPay}>Đặt hàng</Text>
      </Pressable>
    </View>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: '5%',
  },
  header: {
    flexDirection: 'row',
    height: '7%',
    alignItems: 'center',
    borderColor: '#888888',
    borderBottomWidth: 0.5,
  },
  txtHeader: {
    left: '30%',
    fontSize: 20,
    fontWeight: '500',
  },
  txtTitle: {
    fontSize: 18,
    marginTop: '3%',
    fontWeight: '500',
  },
  viewBox: {
    height: 180,
    marginTop: '2%',
    borderRadius: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  viewBox1: {
    marginHorizontal: '5%',
    marginVertical: '2%',
  },
  viewBox3: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: '5%',
    justifyContent: 'space-between',
  },
  imageProdduct: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  txtItemName: {
    fontSize: 15,
    fontWeight: '500',
  },
  txtItemPrice: {
    marginTop: '7%',
    fontSize: 12,
    fontWeight: '500',
  },
  btnPay: {
    height: 50,
    backgroundColor: 'black',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: '3%',
  },
  txtPay: {
    fontSize: 17,
    color: 'white',
    fontWeight: '600',
  },
  itemPay: {
    flexDirection: 'row',
    marginVertical: '4%',
    justifyContent: 'space-between',
    marginHorizontal: '5%',
  },
  hr: {
    width: '90%',
    borderBottomWidth: 1,
    alignSelf: 'center',
    marginVertical: '3%',
  },
});
