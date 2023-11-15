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
import {API_User, API_User_Info} from '../API/getAPI';
import {
  checkValidateEmail,
  checkValidatePassword,
  checkValidatePhone,
} from '../compoment/checkValidate';
import axios from 'axios';

const BLACK_COLOR = 'black';

const SignupScreen = ({navigation}) => {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errorPhone, setErrorPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [error, setError] = useState('');
  const [isCheck, setIsCheck] = useState(false);

  const validateSignup = () => {
    if (email.length <= 0) {
      setErrorEmail('Email không được bỏ trống!');
      return false;
    } else if (phone.length <= 0) {
      setErrorPhone('Phone không được bỏ trống!');
      return false;
    } else if (password.length <= 0) {
      setErrorPassword('Password không được bỏ trống!');
      return false;
    } else if (errorEmail !== '' || errorPassword !== '' || errorPhone !== '') {
      return false;
    } else {
      return true;
    }
  };

  const onSignup = async () => {
    if (validateSignup()) {
      setIsCheck(true);
      try {
        const res = await axios.post(`${API_User}signup`, {
          email,
          passWord: password,
          role: 'User',
        });
        if (res.data.error) {
          setError(res.data.error);
        } else {
          await axios.post(API_User_Info, {phone, accountID: res.data._id});
          navigation.navigate('LoginScreen');
        }
        setIsCheck(false);
      } catch (error) {
        setIsCheck(false);
        console.log('Call api: ', error.message);
      }
    }
  };

  const navigateToLogin = () => {
    navigation.navigate('LoginScreen');
  };

  const togglePassword = useCallback(() => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  }, []);

  const countryPrefix = '+84';

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleBig}>Create an account</Text>
        <Text style={styles.titleSm}>Connect with your friends today!</Text>
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
          <Text style={styles.label}>Phone Number</Text>
          <View style={styles.phoneInputContainer}>
            <Text style={styles.countryCode}>{countryPrefix}</Text>
            <TextInput
              onChangeText={text => {
                if (checkValidatePhone(text)) {
                  setPhone(text);
                  setErrorPhone('');
                } else {
                  setPhone(text);
                  setErrorPhone('Số điện thoại không hợp lệ!');
                }
              }}
              style={styles.phoneNumberInput}
              placeholder="Enter your phone number"
              keyboardType="numeric"
            />
          </View>
          {errorPhone && <Text style={styles.errorText}>{errorPhone}</Text>}
        </View>
        <View style={{marginTop: 16}}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              onChangeText={text => {
                if (checkValidatePassword(text)) {
                  setPassword(text);
                  setErrorPassword('');
                } else {
                  setErrorPassword('Password không được quá 15 ký tự');
                  setPassword(text);
                }
              }}
              style={styles.passwordInput}
              placeholder="Please Enter Your Password"
              secureTextEntry={!showPassword}
              keyboardType="default"
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
          onPress={onSignup}
          style={styles.signupButton}
          disabled={isCheck}>
          {isCheck ? (
            <ActivityIndicator size={'small'} color={'white'} />
          ) : (
            <Text style={styles.signupButtonText}>Sign Up</Text>
          )}
        </Pressable>
        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>Or With</Text>
          <View style={styles.divider} />
        </View>
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account?</Text>
          <Text
            style={styles.loginLink}
            onPress={navigateToLogin}
            disabled={isCheck}>
            Login
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
    marginTop: '10%',
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
    fontSize: 16,
  },
  togglePasswordButton: {
    paddingHorizontal: 10,
  },
  signupButton: {
    marginTop: 50,
    backgroundColor: '#242424',
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
  },
  errorText: {
    color: 'red',
  },
  dividerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 32,
  },
  divider: {
    height: 0.5,
    backgroundColor: 'black',
    width: '40%',
    alignSelf: 'center',
    marginVertical: 10,
    marginHorizontal: 6,
  },
  dividerText: {
    color: 'black',
    fontSize: 16,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '10%',
  },
  loginText: {
    color: '#999EA1',
  },
  loginLink: {
    color: '#242424',
    marginLeft: 5,
  },
});

export default SignupScreen;
