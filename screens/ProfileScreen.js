import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Chat bot
import {
  initialize,
  showMessaging,
} from '@robbywh/react-native-zendesk-messaging';

const ProfileScreen = ({navigation}) => {
  // Chat bot
  React.useEffect(() => {
    initialize(
      'eyJzZXR0aW5nc191cmwiOiJodHRwczovL25vdjI2OTIuemVuZGVzay5jb20vbW9iaWxlX3Nka19hcGkvc2V0dGluZ3MvMDFIRDFWOTdSRldQQzRHU0M5SFhWS0cyUUguanNvbiJ9',
    );
  }, []);

  return (
    <View style={styles.container}>
      {/* Avatar, name, email */}
      <View style={styles.header}>
        <Pressable style={styles.boderButtonHeader}>
          <Image
            style={styles.boderAvatar}
            source={{
              uri: 'https://th.bing.com/th?id=ORMS.23668d8eba0da20c8b8e6464c32b46be&pid=Wdp&w=612&h=304&qlt=90&c=1&rs=1&dpr=1&p=0',
            }}
          />
          <View style={styles.boderIcon}>
            <FontAwesome5 name="pen" size={15} color="#999999" />
          </View>
        </Pressable>
        <Text style={styles.txtNameHeader}>Mr.Irtan</Text>
        <View style={styles.txtEmailHeader}>
          <Text>krtolo727@gmail.com</Text>
        </View>
      </View>
      {/* Button icon */}
      <View style={styles.acticle}>
        <Text style={styles.titlePro}>Sản phẩm</Text>
        <Pressable
          style={styles.buttonView}
          onPress={() => navigation.navigate('OrderScreen')}>
          <View style={styles.rowButton}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <MaterialCommunityIcons name="shopping-outline" size={25} />
              <Text style={{left: '30%'}}>Đơn hàng</Text>
            </View>
            <AntDesign name="right" size={17} color="gray" />
          </View>
        </Pressable>
        <Pressable
          style={styles.buttonView2}
          onPress={() => navigation.navigate('FavouriteScreen')}>
          <View style={styles.rowButton}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <AntDesign name="hearto" size={24} />
              <Text style={{left: '30%'}}>Đã thích</Text>
            </View>
            <AntDesign name="right" size={17} color="gray" />
          </View>
        </Pressable>
        <Pressable style={styles.buttonView2} onPress={() => showMessaging()}>
          <View style={styles.rowButton}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Ionicons name="chatbox-ellipses-outline" size={24} />
              <Text style={{left: '30%'}}>Hỗ trợ với shop</Text>
            </View>
            <AntDesign name="right" size={17} color="gray" />
          </View>
        </Pressable>
      </View>
      {/* Button icon */}
      <View style={styles.aside}>
        <Text style={styles.titlePro}>Tài khoản</Text>
        <Pressable
          style={styles.buttonView}
          onPress={() => navigation.navigate('EditAccountScreen')}>
          <View style={styles.rowButton}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Feather name="user-check" size={24} />
              <Text style={{left: '30%'}}>Cập nhật thông tin</Text>
            </View>
            <AntDesign name="right" size={17} color="gray" />
          </View>
        </Pressable>
        <Pressable
          style={styles.buttonView2}
          onPress={() => navigation.navigate('AccountScrren')}>
          <View style={styles.rowButton}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <SimpleLineIcons name="lock" size={24} />
              <Text style={{left: '30%'}}>Đổi mật khẩu</Text>
            </View>
            <AntDesign name="right" size={17} color="gray" />
          </View>
        </Pressable>
        <Pressable style={styles.buttonView2}>
          <View style={styles.rowButton}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <AntDesign name="setting" size={24} />
              <Text style={{left: '30%'}}>Cài đặt</Text>
            </View>
            <AntDesign name="right" size={17} color="gray" />
          </View>
        </Pressable>
        {/* Button Logout */}
        <Pressable
          style={styles.buttonLogout}
          onPress={() => navigation.replace('LoginScreen')} // Chuyển đến màn hình SignupScreen
        >
          <Text style={styles.txtLogout}>LOG OUT</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginTop: '5%',
    lignSelf: 'center',
    alignItems: 'center',
  },
  boderButtonHeader: {
    width: 85,
    height: 85,
    borderRadius: 100,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  boderAvatar: {
    width: 70,
    height: 70,
    alignSelf: 'center',
    borderRadius: 100,
  },
  boderIcon: {
    width: 30,
    height: 30,
    bottom: 0,
    alignSelf: 'flex-end',
    position: 'absolute',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  txtNameHeader: {
    marginTop: '2%',
    fontSize: 20,
    fontWeight: '500',
  },
  txtEmailHeader: {
    width: 180,
    height: 25,
    marginTop: '2%',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
  },
  acticle: {
    marginTop: '5%',
    marginHorizontal: '5%',
  },
  aside: {
    marginTop: '2.5%',
    marginHorizontal: '5%',
  },
  titlePro: {
    fontSize: 17,
    fontWeight: '500',
  },
  buttonView: {
    marginTop: '3%',
    height: 45,
    borderRadius: 5,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  buttonView2: {
    marginTop: '1.5%',
    height: 45,
    borderRadius: 5,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  rowButton: {
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: '4%',
    justifyContent: 'space-between',
  },
  buttonLogout: {
    height: 50,
    marginTop: '10%',
    borderRadius: 35,
    justifyContent: 'center',
    backgroundColor: 'black',
    marginHorizontal: '4%',
  },
  txtLogout: {
    color: 'white',
    fontSize: 17,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
});
