import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {formatPrice} from '../HomeScreen';

const OrderScreen2 = ({navigation, route}) => {
  const {purchasedProduct, quantity} = route.params;
  const account = {
    name: 'Nguyen Xuan Duan',
    phone: '0964863417',
    address: 'Ngõ 193/220/41 Phú Diễn, Bắc Từ Liêm, Hà Nội',
  };

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
              <Text style={{color: 'black'}}>Tên người nhận</Text>
              <Text style={{fontWeight: 'bold', color: 'black'}}>
                {account.name}
              </Text>
            </View>
            <View style={{marginTop: '2%'}}>
              <Text style={{color: 'black'}}>Số điện thoại người nhận</Text>
              <Text style={{fontWeight: 'bold', color: 'black'}}>
                {account.phone}
              </Text>
            </View>
            <View style={{marginTop: '2%'}}>
              <Text style={{color: 'black'}}>Địa chỉ giao hàng</Text>
              <Text style={{fontWeight: 'bold', color: 'black'}}>
                {account.address}
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
                source={purchasedProduct.image}
              />
              <View style={{left: '5%'}}>
                <Text style={styles.txtItemName}>{purchasedProduct.name}</Text>
                <Text style={styles.txtItemPrice}>
                  {formatPrice(purchasedProduct.price)}
                </Text>
              </View>
            </View>
            <Text style={styles.txtItemPrice}>X{quantity}</Text>
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
            <AntDesign name="right" size={20} color="#999999" />
          </View>
        </View>
        {/* Thanh toán */}
        <Text style={styles.txtTitle}>Thanh toán</Text>
        <View style={[styles.viewBox, {height: 250}]}>
          <View style={styles.itemPay}>
            <Text style={{color: '#999999'}}>Giá sản phẩm:</Text>
            <Text style={{fontWeight: '500', color: 'black'}}>
              {formatPrice(purchasedProduct.price)}
            </Text>
          </View>
          <View style={styles.itemPay}>
            <Text style={{color: '#999999'}}>Khuyến mãi:</Text>
            <Text style={{fontWeight: '500', color: 'black'}}>
              {formatPrice(0)}
            </Text>
          </View>
          <View style={styles.itemPay}>
            <Text style={{color: '#999999'}}>Phí vận chuyển:</Text>
            <Text style={{fontWeight: '500', color: 'black'}}>
              {formatPrice(0)}
            </Text>
          </View>
          <View style={styles.hr} />
          <View style={styles.itemPay}>
            <Text style={{fontWeight: 'bold'}}>Tổng tiền thanh toán:</Text>
            <Text style={{fontWeight: '500', color: '#FF5C00'}}>
              {formatPrice(purchasedProduct.price)}
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

export default OrderScreen2;

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
    color: 'black',
    fontSize: 20,
    fontWeight: '500',
  },
  txtTitle: {
    color: 'black',
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
    color: 'black',
    fontSize: 15,
    fontWeight: '500',
  },
  txtItemPrice: {
    color: 'black',
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
