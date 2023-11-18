import React, {useState, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  checkValidatePassword,
  checkValidateEmail,
} from '../compoment/checkValidate';
import {API_User} from '../API/getAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const BLACK_COLOR = 'black';

const LoginScreen = ({navigation}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isCheck, setIsCheck] = useState(false);

  const checkValidateLogin = () => {
    if (email.length <= 0) {
      setErrorEmail('Email không được bỏ trống!');
      return false;
    }
    if (password.length <= 0) {
      setErrorPassword('Password không được bỏ trống!');
      return false;
    }
    if (errorEmail !== '' || errorPassword !== '') {
      return false;
    } else {
      onLogin();
    }
  };

  const onLogin = async () => {
    setIsCheck(true);
    try {
      const res = await axios.post(`${API_User}signIn`, {email, password});
      if (res.data.error) {
        setError(res.data.error);
      } else {
        if (res.data.role != 'Shop') {
          AsyncStorage.setItem('_idUser', res.data._id);
          navigation.replace('Main');
        } else {
          console.warn('Vui lòng đăng nhập với vai trò user');
        }
      }
      setIsCheck(false);
    } catch (error) {
      setIsCheck(false);
      console.log('Call api: ', error.message);
    }
  };

  const navigateToSignup = () => {
    navigation.navigate('SigupScreen'); // Chuyển đến màn hình SignupScreen
  };
  const togglePassword = useCallback(() => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleBig}>Hi, Welcome Back! 👋</Text>
        <Text style={styles.titleSm}>Hello again, you’ve been missed!</Text>
      </View>
      <KeyboardAvoidingView
        style={styles.containeredt}
        behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <View>
          <Text style={styles.label}>Email</Text>
          <TextInput
            onChangeText={text => {
              if (checkValidateEmail(text)) {
                setEmail(text);
                setErrorEmail('');
              } else {
                setErrorEmail('Email không hợp lệ!');
                setEmail(text);
              }
            }}
            style={styles.input}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        {errorEmail && <Text style={styles.errorText}>{errorEmail}</Text>}
        <View style={{marginTop: 16}}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Enter your password"
              secureTextEntry={!showPassword}
              onChangeText={text => {
                if (checkValidatePassword(text)) {
                  setErrorPassword('');
                  setPassword(text);
                } else {
                  setErrorPassword('Password không được quá 15 ký tự!');
                  setPassword(text);
                }
              }}
            />

            <TouchableOpacity
              style={styles.togglePasswordButton}
              onPress={togglePassword}>
              <Ionicons
                name={showPassword ? 'eye' : 'eye-off'}
                size={18}
                color={BLACK_COLOR}
              />
            </TouchableOpacity>
          </View>
          {errorPassword && (
            <Text style={styles.errorText}>{errorPassword}</Text>
          )}
        </View>
        {error && <Text style={styles.errorText}>{error}</Text>}
        <Pressable
          style={styles.loginButton}
          onPress={() => {
            checkValidateLogin();
          }}
          disabled={isCheck}>
          {isCheck ? (
            <ActivityIndicator size={'small'} color={'white'} />
          ) : (
            <Text style={styles.loginButtonText}>Login</Text>
          )}
        </Pressable>
        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>Or With</Text>
          <View style={styles.divider} />
        </View>
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don’t have an account?</Text>
          <Text style={styles.signupLink} onPress={navigateToSignup}>
            Sign Up
          </Text>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    marginTop: '20%',
    marginLeft: '6%',
  },
  titleBig: {
    fontSize: 25,
    fontWeight: '600',
  },
  titleSm: {
    fontSize: 14,
    color: '#999EA1',
    fontWeight: '600',
  },
  containeredt: {
    marginHorizontal: '6%',
    marginTop: '16%',
  },
  label: {
    color: 'black',
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    height: 45,
    borderColor: '#C6C6C6',
    paddingLeft: 13,
    marginTop: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#C6C6C6',
    height: 45,
    marginTop: 10,
  },
  passwordInput: {
    flex: 1,
    paddingLeft: 13,
  },
  togglePasswordButton: {
    paddingHorizontal: 10,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
  loginButton: {
    marginTop: 20,
    backgroundColor: '#242424',
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
  },
  dividerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 32,
    alignItems: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: 'black',
    width: '40%',
    marginVertical: 10,
    marginHorizontal: 6,
  },
  dividerText: {
    color: 'black',
    fontSize: 16,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '50%',
  },
  signupText: {
    color: '#999EA1',
  },
  signupLink: {
    color: '#242424',
    marginLeft: 5,
  },
});

export default LoginScreen;
