import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  PermissionsAndroid,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {API_URL, API_User_Info} from '../../API/getAPI';
import {launchCamera} from 'react-native-image-picker';

const EditAccountScreen = ({navigation}) => {
  const countryPrefix = '+84'; // Mã quốc gia
  const [idInfo, setIdInfo] = useState();
  const [avatar, setAvatar] = useState('');
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [birthday, setBirthday] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isCheck, setIsCheck] = useState(false);

  const openCamera = async () => {
    try {
      const cameraPermission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );

      if (cameraPermission === PermissionsAndroid.RESULTS.GRANTED) {
        const result = await launchCamera({mediaType: 'photo'});
        setAvatar(result.assets[0]);
      } else {
        console.log('Camera permission denied');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    if (!avatar.uri || !fullName || !address || !birthday || !phoneNumber) {
      ToastAndroid.show('Vui lòng nhập đầy đủ các trường', ToastAndroid.SHORT);
      return;
    }

    setIsCheck(true);

    let formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('address', address);
    formData.append('birthday', birthday);
    formData.append('phoneNumber', phoneNumber);

    let localUri = avatar.uri;
    let filename = localUri.split('/').pop();
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
    formData.append('avatar', {uri: avatar.uri, name: filename, type});

    try {
      await axios.put(`${API_User_Info}${idInfo}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      ToastAndroid.show('Lưu thông tin thành công', ToastAndroid.SHORT);
      navigation.replace('Main');
      setIsCheck(false);
    } catch (error) {
      setIsCheck(false);
      console.log('Post api: ' + error.message);
    }
  };

  const getApi = async () => {
    try {
      const res = await axios.get(API_User_Info, {
        params: {accountID: await AsyncStorage.getItem('_idUser')},
      });
      setIdInfo(res.data.message._id);
      setAvatar({uri: `${API_URL}${res.data.message?.avatar}`});
      setFullName(res.data.message?.fullName);
      setAddress(res.data.message?.address);
      setBirthday(res.data.message?.birthday);
      setPhoneNumber(res.data.message?.phone.toString());
    } catch (error) {
      console.error('Call api: ' + error.message);
    }
  };

  useEffect(() => {
    getApi();
  }, []);

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={styles.containeredt}
        behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <ScrollView></ScrollView>
        {/* Back */}
        <View style={styles.header}>
          <AntDesign
            onPress={() => navigation.goBack()}
            name="arrowleft"
            size={25}
            color="black"
          />
          <Text style={styles.txtHeader}>Edit account</Text>
        </View>
        <View style={{marginTop: '8%'}}>
          {/* Avatar */}
          <Pressable style={styles.boderbtnAvatar} onPress={openCamera}>
            {avatar.uri ? (
              <Image
                style={styles.boderAvatar}
                source={{
                  uri: avatar.uri,
                }}
              />
            ) : (
              <Image
                style={styles.boderAvatar}
                source={{
                  uri: 'https://th.bing.com/th/id/OIP.Cl56H6WgxJ8npVqyhefTdQHaHa?pid=ImgDet&rs=1',
                }}
              />
            )}
            <View style={styles.boderIcon}>
              <FontAwesome5 name="pen" size={15} color="#999999" />
            </View>
          </Pressable>
          {/* TextInput */}
          <View style={{marginTop: '5%'}}>
            <Text style={styles.txt}>Full Name</Text>
            <TextInput
              style={styles.txtInput}
              placeholder="Enter your name"
              keyboardType="default"
              value={fullName}
              onChangeText={text => setFullName(text)}
            />
          </View>
          {/* TextInput */}
          <View style={{marginTop: '5%'}}>
            <Text style={styles.txt}>Address</Text>
            <TextInput
              style={styles.txtInput}
              placeholder="Enter your address"
              keyboardType="email-address"
              value={address}
              onChangeText={text => setAddress(text)}
            />
          </View>
          {/* TextInput */}
          <View style={{marginTop: '5%'}}>
            <Text style={styles.txt}>Birthday</Text>
            <TextInput
              style={styles.txtInput}
              placeholder="Enter your birthday"
              keyboardType="email-address"
              value={birthday}
              onChangeText={text => setBirthday(text)}
            />
          </View>
          {/* TextInput */}
          <View style={{marginTop: '5%'}}>
            <Text style={styles.txt}>Phone Number</Text>
            <View style={styles.phoneInputContainer}>
              <Text style={styles.countryCode}>{countryPrefix}</Text>
              <TextInput
                style={styles.phoneNumberInput}
                placeholder="0123456789"
                keyboardType="numeric"
                value={phoneNumber}
                onChangeText={text => setPhoneNumber(text)}
              />
            </View>
          </View>
          <Pressable
            disabled={isCheck}
            style={styles.btnUpdate}
            onPress={handleUpdate}>
            {isCheck ? (
              <ActivityIndicator size={'small'} color={'white'} />
            ) : (
              <Text style={styles.txtUpdate}>Update</Text>
            )}
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};
export default EditAccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containeredt: {
    marginTop: '5%',
    marginHorizontal: '6%',
  },
  header: {
    flexDirection: 'row',
    height: '5%',
    alignItems: 'center',
  },
  txtHeader: {
    color: 'black',
    left: '30%',
    fontSize: 18,
    fontWeight: '500',
  },
  boderbtnAvatar: {
    width: 100,
    height: 100,
    borderRadius: 100,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  boderAvatar: {
    width: 100,
    height: 100,
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
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  txt: {
    color: 'black',
    fontWeight: '600',
  },
  txtInput: {
    borderWidth: 1,
    borderRadius: 10,
    height: 45,
    borderColor: '#C6C6C6',
    paddingLeft: 13,
    marginTop: 10,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#C6C6C6',
    height: 45,
    marginTop: 10,
  },
  countryCode: {
    paddingHorizontal: 10,
    fontSize: 16,
  },
  phoneNumberInput: {
    flex: 1,
    fontSize: 16,
  },
  btnUpdate: {
    height: 50,
    backgroundColor: 'black',
    borderRadius: 10,
    marginTop: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtUpdate: {
    fontSize: 17,
    color: 'white',
    fontWeight: '600',
  },
});
