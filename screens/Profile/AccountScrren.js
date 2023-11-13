import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios';
import {API_User} from '../../API/getAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AccountScrren = ({navigation}) => {
  const [showPasswordOld, setShowPasswordOld] = useState(false);
  const [showPasswordNew, setShowPasswordNew] = useState(false);
  const [showPasswordRe, setShowPasswordRe] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [reNewPassword, setReNewPassword] = useState('');
  const [error, setError] = useState('');
  const [isCheck, setIsCheck] = useState(false);

  const togglePasswordOld = useCallback(() => {
    setShowPasswordOld(prevShowPassword => !prevShowPassword);
  }, []);

  const togglePasswordNew = useCallback(() => {
    setShowPasswordNew(prevShowPassword => !prevShowPassword);
  }, []);

  const togglePasswordRe = useCallback(() => {
    setShowPasswordRe(prevShowPassword => !prevShowPassword);
  }, []);

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword || !reNewPassword) {
      setError('Vui lòng nhập đủ các trường dữ liệu');
      return;
    }
    if (newPassword !== reNewPassword) {
      setError('Mật khẩu mới không khớp nhau');
      return;
    }

    setIsCheck(true);

    try {
      const res = await axios.put(
        `${API_User}${await AsyncStorage.getItem('_idUser')}`,
        {
          oldPassword,
          newPassword,
        },
      );
      if (res.data.status) {
        ToastAndroid.show('Thay đổi mật khẩu thành công', ToastAndroid.SHORT);
        navigation.replace('Main', {screen: 'Profile'});
      } else {
        setError(res.data.message);
      }
      setIsCheck(false);
    } catch (error) {
      setIsCheck(false);
      console.error('Put api: ' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={styles.containeredt}
        behavior={Platform.OS === 'ios' ? 'padding' : null}>
        {/* Back */}
        <View style={styles.header}>
          <AntDesign
            onPress={() => navigation.goBack()}
            name="arrowleft"
            size={25}
            color="black"
          />
          <Text style={styles.txttHeader}>Account</Text>
        </View>
        <View>
          <Text style={styles.txtActicle}>Change Password</Text>
          {/* TexInput */}
          <View style={{marginTop: '10%'}}>
            <Text style={styles.txt}>Old passwold</Text>
            <View style={styles.passwordActicle}>
              <TextInput
                style={styles.passwordInput}
                onChangeText={setOldPassword}
                placeholder="Enter your old password"
                secureTextEntry={!showPasswordOld}
                keyboardType="default"
              />
              <TouchableOpacity
                style={styles.togglePasswordButton}
                onPress={togglePasswordOld}>
                <Feather
                  name={showPasswordOld ? 'eye' : 'eye-off'}
                  size={20}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          </View>
          {/* TexInput */}
          <View style={{marginTop: '5%'}}>
            <Text style={styles.txt}>New passwold</Text>
            <View style={styles.passwordActicle}>
              <TextInput
                style={styles.passwordInput}
                onChangeText={setNewPassword}
                placeholder="Enter your new password"
                secureTextEntry={!showPasswordNew}
                keyboardType="default"
              />
              <TouchableOpacity
                style={styles.togglePasswordButton}
                onPress={togglePasswordNew}>
                <Feather
                  name={showPasswordNew ? 'eye' : 'eye-off'}
                  size={20}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          </View>
          {/* TexInput */}
          <View style={{marginTop: '5%'}}>
            <Text style={styles.txt}>Re_new passwold</Text>
            <View style={styles.passwordActicle}>
              <TextInput
                style={styles.passwordInput}
                onChangeText={setReNewPassword}
                placeholder="Enter re_new password"
                secureTextEntry={!showPasswordRe}
                keyboardType="default"
              />
              <TouchableOpacity
                style={styles.togglePasswordButton}
                onPress={togglePasswordRe}>
                <Feather
                  name={showPasswordRe ? 'eye' : 'eye-off'}
                  size={20}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          </View>
          {error && <Text style={{color: 'red'}}>{error}</Text>}
          <Pressable
            disabled={isCheck}
            style={styles.btnChange}
            onPress={handleChangePassword}>
            {isCheck ? (
              <ActivityIndicator size={'small'} color={'white'} />
            ) : (
              <Text style={styles.txtChange}>Change</Text>
            )}
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default AccountScrren;

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
  txttHeader: {
    color: 'black',
    left: '30%',
    fontSize: 18,
    fontWeight: '500',
  },
  txtActicle: {
    fontSize: 25,
    fontWeight: '600',
    marginTop: '10%',
  },
  passwordActicle: {
    height: 45,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#C6C6C6',
  },
  txt: {
    color: 'black',
    fontWeight: '600',
  },
  passwordInput: {
    flex: 1,
    paddingLeft: 13,
  },
  togglePasswordButton: {
    paddingHorizontal: 10,
  },
  btnChange: {
    height: 50,
    backgroundColor: 'black',
    borderRadius: 10,
    marginTop: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtChange: {
    fontSize: 17,
    color: 'white',
    fontWeight: '600',
  },
});
