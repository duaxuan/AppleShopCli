import React, {useEffect} from 'react';
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

const ProfileScreen = ({navigation}) => {
  // Chat bot
  useEffect(() => {
    initialize(
      'eyJzZXR0aW5nc191cmwiOiJodHRwczovL2RlbW85MDcwLnplbmRlc2suY29tL21vYmlsZV9zZGtfYXBpL3NldHRpbmdzLzAxSEVDSkY0TUVEOTdKUzYyS04xWFZITU5LLmpzb24ifQ==',
    );
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          style={styles.avatarButton}
          onPress={() => navigation.navigate('EditAccountScreen')}>
          <Image
            style={styles.avatar}
            source={{
              uri: 'https://th.bing.com/th?id=ORMS.23668d8eba0da20c8b8e6464c32b46be&pid=Wdp&w=612&h=304&qlt=90&c=1&rs=1&dpr=1&p=0',
            }}
          />
          <View style={styles.editIcon}>
            <FontAwesome5 name="pen" size={15} color="#999999" />
          </View>
        </Pressable>
        <Text style={styles.name}>{'Mr.Irtan'}</Text>
        <View style={styles.emailContainer}>
          <Text style={styles.email}>{'krtolo727@gmail.com'}</Text>
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
        <Pressable style={styles.button}>
          <View style={styles.buttonRow}>
            <View style={styles.buttonIconContainer}>
              <FontAwesome5 name="map" size={24} />
              <Text style={styles.buttonText}>{'Địa chỉ'}</Text>
            </View>
            <AntDesign name="right" size={17} color="gray" />
          </View>
        </Pressable>
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
          onPress={() => navigation.replace('LoginScreen')}>
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
    width: 85,
    height: 85,
    borderRadius: 100,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  avatar: {
    width: 70,
    height: 70,
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
