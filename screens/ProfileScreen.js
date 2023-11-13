import React, {useEffect, useState} from 'react';
import {View, Text, Image, Pressable, StyleSheet} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';

// Chat bot
import {
  initialize,
  showMessaging,
} from '@robbywh/react-native-zendesk-messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {API_URL, API_User_Info} from '../API/getAPI';

const ProfileScreen = ({navigation}) => {
  const [array, setArray] = useState();
  // Chat bot
  useEffect(() => {
    initialize(
      'eyJzZXR0aW5nc191cmwiOiJodHRwczovL2RlbW85MDcwLnplbmRlc2suY29tL21vYmlsZV9zZGtfYXBpL3NldHRpbmdzLzAxSEVDSkY0TUVEOTdKUzYyS04xWFZITU5LLmpzb24ifQ==',
    );
  }, []);

  const getApi = async () => {
    try {
      const res = await axios.get(API_User_Info, {
        params: {accountID: await AsyncStorage.getItem('_idUser')},
      });
      setArray(res.data.message);
    } catch (error) {
      console.log('Call api: ' + error.message);
    }
  };

  useEffect(() => {
    getApi();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          style={styles.avatarButton}
          onPress={() => navigation.navigate('EditAccountScreen')}>
          {array?.avatar && (
            <Image
              style={styles.avatar}
              source={{
                uri: `${API_URL}${array?.avatar}`,
              }}
            />
          )}
          <View style={styles.editIcon}>
            <FontAwesome5 name="pen" size={15} color="#999999" />
          </View>
        </Pressable>
        <Text style={styles.name}>{array?.fullName}</Text>
        <View style={styles.emailContainer}>
          <Text style={styles.email}>{array?.accountID?.email}</Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{'Sản phẩm'}</Text>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('OrderHistory')}>
          <View style={styles.buttonRow}>
            <View style={styles.buttonIconContainer}>
              <MaterialCommunityIcons name="shopping-outline" size={25} />
              <Text style={styles.buttonText}>{'Lịch sử đơn hàng'}</Text>
            </View>
            <AntDesign name="right" size={17} color="gray" />
          </View>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('FavouriteScreen')}>
          <View style={styles.buttonRow}>
            <View style={styles.buttonIconContainer}>
              <AntDesign name="hearto" size={24} />
              <Text style={styles.buttonText}>{'Đã thích'}</Text>
            </View>
            <AntDesign name="right" size={17} color="gray" />
          </View>
        </Pressable>
        <Pressable style={styles.button} onPress={showMessaging}>
          <View style={styles.buttonRow}>
            <View style={styles.buttonIconContainer}>
              <Ionicons name="chatbox-ellipses-outline" size={24} />
              <Text style={styles.buttonText}>{'Hỗ trợ với shop'}</Text>
            </View>
            <AntDesign name="right" size={17} color="gray" />
          </View>
        </Pressable>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{'Tài khoản'}</Text>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('EditAccountScreen')}>
          <View style={styles.buttonRow}>
            <View style={styles.buttonIconContainer}>
              <Feather name="user-check" size={24} />
              <Text style={styles.buttonText}>{'Cập nhật thông tin'}</Text>
            </View>
            <AntDesign name="right" size={17} color="gray" />
          </View>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('AccountScrren')}>
          <View style={styles.buttonRow}>
            <View style={styles.buttonIconContainer}>
              <SimpleLineIcons name="lock" size={24} />
              <Text style={styles.buttonText}>{'Đổi mật khẩu'}</Text>
            </View>
            <AntDesign name="right" size={17} color="gray" />
          </View>
        </Pressable>
        <Pressable
          style={styles.logoutButton}
          onPress={() => {
            AsyncStorage.clear();
            navigation.replace('LoginScreen');
          }}>
          <Text style={styles.logoutText}>{'LOG OUT'}</Text>
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
    alignSelf: 'center',
    alignItems: 'center',
  },
  avatarButton: {
    width: 100,
    height: 100,
    borderRadius: 100,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  avatar: {
    width: 90,
    height: 90,
    alignSelf: 'center',
    borderRadius: 100,
  },
  editIcon: {
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
  name: {
    color: 'black',
    marginTop: '2%',
    fontSize: 20,
    fontWeight: '500',
  },
  emailContainer: {
    width: 180,
    height: 25,
    marginTop: '2%',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
  },
  email: {
    color: 'black',
  },
  section: {
    marginTop: '5%',
    marginHorizontal: '5%',
  },
  sectionTitle: {
    color: 'black',
    fontSize: 17,
    fontWeight: '500',
  },
  button: {
    marginTop: '3%',
    height: 45,
    borderRadius: 5,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  buttonRow: {
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: '4%',
    justifyContent: 'space-between',
  },
  buttonIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    left: '30%',
    color: 'black',
  },
  logoutButton: {
    height: 50,
    marginTop: '10%',
    borderRadius: 35,
    justifyContent: 'center',
    backgroundColor: 'black',
    marginHorizontal: '4%',
  },
  logoutText: {
    color: 'white',
    fontSize: 17,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
});
