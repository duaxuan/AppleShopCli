import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {formatPrice} from '../HomeScreen';
import {
  API_Product,
  API_URL,
  API_User_Info,
  API_User_Pay,
} from '../../API/getAPI';
import axios from 'axios';
import queryString from 'query-string';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WebView from 'react-native-webview';
import paypalApi from '../Paypal/paypalApi';

const OrderPayScreen = ({navigation, route}) => {
  const {purchasedProduct, quantity} = route.params;
  const [userInfo, setUserInfo] = useState([]);
  const [paypalUrl, setPaypalUrl] = useState(null);
  const [isCheck, setIsCheck] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [paymentProcessed, setPaymentProcessed] = useState(false);

  const convertToUSD = amountInVND => {
    const exchangeRate = 24000;
    return (amountInVND / exchangeRate).toFixed(2);
  };

  const orderDetail = {
    intent: 'CAPTURE',
    purchase_units: [
      {
        items: [
          {
            name: purchasedProduct.name,
            description: 'Mô tả: ' + purchasedProduct.name,
            quantity: quantity,
            unit_amount: {
              currency_code: 'USD',
              value: convertToUSD(purchasedProduct.price),
            },
          },
        ],
        amount: {
          currency_code: 'USD',
          value: convertToUSD(purchasedProduct.price * quantity),
          breakdown: {
            item_total: {
              currency_code: 'USD',
              value: convertToUSD(purchasedProduct.price * quantity),
            },
          },
        },
      },
    ],
    application_context: {
      return_url: 'https://example.com/return',
      cancel_url: 'https://example.com/cancel',
    },
  };

  const onPressPaypal = async () => {
    setIsCheck(true);
    try {
      const token = await paypalApi.generateToken();
      const {links} = await paypalApi.createOrder(token, orderDetail);

      setAccessToken(token);
      if (links) {
        const approvalLink = links.find(link => link?.rel === 'approve');
        setPaypalUrl(approvalLink?.href);
      }
    } catch (error) {
      console.error('Error:', error);
      setIsCheck(false);
    }
  };

  const onUrlChange = webviewState => {
    if (webviewState.url.includes('https://example.com/cancel')) {
      clearPaypalState();
      return;
    }

    if (
      webviewState.url.includes('https://example.com/return') &&
      !paymentProcessed
    ) {
      const {token} = queryString.parseUrl(webviewState.url).query;
      if (token) {
        setPaymentProcessed(true);
        paymentSuccess(token);
      }
    }
  };

  const paymentSuccess = async id => {
    try {
      const res = await paypalApi.capturePayment(id, accessToken);
      sendDataToServer(res);
    } catch (error) {
      console.error('Error capturing payment:', error);
    }
  };

  const sendDataToServer = async paymentResponse => {
    try {
      await axios.post(API_User_Pay, {
        userId: userInfo._id,
        productId: purchasedProduct._id,
        quantity,
        totalPrice: purchasedProduct.price * quantity,
        paymentResponse,
      });

      let localUri = `${API_URL}${purchasedProduct.image}`;
      let filename = localUri.split('/').pop();
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;

      let formData = new FormData();
      formData.append('quantity', purchasedProduct.quantity - quantity);
      formData.append('image', {uri: localUri, name: filename, type});

      await axios.put(`${API_Product}${purchasedProduct._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      navigation.replace('Main', {screen: 'OrderScreen'});
      ToastAndroid.show(
        'Thanh toán thành công, chờ duyệt!',
        ToastAndroid.SHORT,
      );
      clearPaypalState();
    } catch (error) {
      setIsCheck(false);
      console.log('Error sending data to server:', error.message);
    }
  };

  const clearPaypalState = () => {
    setIsCheck(false);
    setPaypalUrl(null);
    setAccessToken(null);
  };

  const getAPI = async () => {
    try {
      const res = await axios.get(API_User_Info, {
        params: {accountID: await AsyncStorage.getItem('_idUser')},
      });
      setUserInfo(res.data.message);
    } catch (error) {
      console.log('Call api: ' + error.message);
    }
  };

  useEffect(() => {
    getAPI();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AntDesign
          onPress={() => navigation.goBack()}
          name="arrowleft"
          size={25}
          color="black"
        />
        <Text style={styles.txtHeader}>Thanh toán</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Section title="Địa chỉ">
          <View style={styles.viewBox1}>
            <Text style={{color: '#33CCFF'}}>Thông tin người nhận hàng</Text>
            {renderInfo('Tên người nhận', userInfo?.fullName)}
            {renderInfo('Số điện thoại người nhận', userInfo?.phone)}
            {renderInfo('Địa chỉ giao hàng', userInfo?.address)}
          </View>
        </Section>

        <Section title="Sản phẩm" height={70}>
          <View style={styles.viewBox3}>
            <View style={styles.productInfo}>
              <Image
                style={styles.imageProduct}
                source={{uri: `${API_URL}${purchasedProduct.image}`}}
              />
              <View style={{marginLeft: '5%'}}>
                <Text style={styles.productName}>{purchasedProduct.name}</Text>
                <Text style={styles.productPrice}>
                  {formatPrice(purchasedProduct.price)}
                </Text>
              </View>
            </View>
            <Text style={styles.productPrice}>X{quantity}</Text>
          </View>
        </Section>

        <Section title="Khuyến mãi" height={50}>
          <View style={styles.viewBox3}>
            <View style={styles.promoInfo}>
              <MaterialCommunityIcons name="sale" size={30} color="#555555" />
              <View style={{left: '30%'}}>
                <Text style={{color: '#999999'}}>Voicher khuyến mãi </Text>
              </View>
            </View>
            <AntDesign name="right" size={20} color="#999999" />
          </View>
        </Section>

        <Section title="Thanh toán" height={250}>
          {renderPaymentInfo('Giá sản phẩm', purchasedProduct.price)}
          {renderPaymentInfo('Khuyến mãi', 0)}
          {renderPaymentInfo('Số lượng mua', quantity, null)}
          <View style={styles.hr} />
          {renderPaymentInfo(
            'Tổng tiền thanh toán',
            purchasedProduct.price * quantity,
            true,
          )}
        </Section>
      </ScrollView>

      <Pressable
        disabled={isCheck}
        style={styles.btnPay}
        onPress={onPressPaypal}>
        {isCheck ? (
          <ActivityIndicator color={'white'} size={'small'} />
        ) : (
          <Text style={styles.txtPay}>Thanh toán Paypal</Text>
        )}
      </Pressable>

      <Modal visible={!!paypalUrl}>
        <TouchableOpacity
          onPress={clearPaypalState}
          style={{marginHorizontal: '5%', marginVertical: '3%'}}>
          <Text style={{color: 'black', fontWeight: '500'}}>Hủy</Text>
        </TouchableOpacity>
        <View style={{flex: 1}}>
          <WebView
            source={{uri: paypalUrl}}
            onNavigationStateChange={onUrlChange}
            incognito={true}
            thirdPartyCookiesEnabled={false}
            domStorageEnabled={false}
          />
        </View>
      </Modal>
    </View>
  );
};

const renderInfo = (label, value) => (
  <View style={{marginTop: '2%'}}>
    <Text style={{color: 'black'}}>{label}</Text>
    <Text numberOfLines={1} style={{fontWeight: 'bold', color: 'black'}}>
      {value}
    </Text>
  </View>
);

const renderPaymentInfo = (label, value, bold = false) => (
  <View style={styles.itemPay}>
    <Text style={{color: '#999999'}}>{label}:</Text>
    <Text
      style={{
        fontWeight: 'bold',
        color: bold ? 'orange' : 'black',
      }}>
      {bold == null ? `X${value}` : formatPrice(value)}
    </Text>
  </View>
);

const Section = ({title, height, children}) => (
  <>
    <Text style={styles.txtTitle}>{title}</Text>
    <View style={[styles.viewBox, {height}]}>{children}</View>
  </>
);

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
    marginHorizontal: '4%',
    justifyContent: 'space-between',
  },
  imageProduct: {
    width: 45,
    height: 45,
    borderRadius: 10,
    resizeMode: 'contain',
  },
  productInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productName: {
    color: 'black',
    fontSize: 15,
    fontWeight: '500',
  },
  productPrice: {
    color: 'black',
    marginTop: '7%',
    fontSize: 12,
    fontWeight: '500',
  },
  promoInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnPay: {
    height: 50,
    backgroundColor: 'black',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: '4%',
  },
  txtPay: {
    fontStyle: 'italic',
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

export default OrderPayScreen;
