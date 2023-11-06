import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { API_User } from '../API/getAPI';
import { checkValidateEmail, checkValidatePassword, checkValidatePhone } from '../compoment/checkValidate';

// Biến cho các giá trị cố định
const BLACK_COLOR = 'black';
const LINE_HEIGHT = 0.5;
const LINE_WIDTH = '40%';
const LINE_MARGIN_VERTICAL = 10;
const LINE_MARGIN_HORIZONTAL = 6;

const Line = () => <View style={styles.line}></View>;

const SigupScreen = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState('')
  const [errorEmail, setErrorEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [errorPhone, setErrorPhone] = useState('')
  const [password, setPassword] = useState('')
  const [errorPassword, setErrorPassword] = useState('')
  const [error, setError] = useState('')
  const validateLogin = () => {

    if (email.length <= 0) {
      setErrorEmail("Email không được bỏ trống!")
      return false
    }
    else if (phone.length <= 0) {
      setErrorPhone("Phone không được bỏ trống!")
      return false
    }
    else if (password.length <= 0) {
      setErrorPassword("Password không được bỏ trống!")
      return false
    }
    else if (errorEmail !== "" || errorPassword !== "" || errorPhone !== "") {
      return false
    } else {
      onSignup()
    }
  }


  const onSignup = async () => {
    const data = { email, phone, password, role: "User" }
    fetch(API_User + "signup", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(repose => repose.json())
      .then(data => {
        if (data.error) {
          setError(data.error)
        } else {
          navigation.navigate("LoginScreen")
        }
      })
      .catch(err => console.log(err));
  }

  const navigateToLogin = () => {
    navigation.navigate('LoginScreen'); // Chuyển đến màn hình SignupScreen
  };
  const togglePassword = useCallback(() => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  }, []);

  const countryPrefix = '+84'; // Mã quốc gia

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
          <Text style={{ color: 'black' }}>Email</Text>
          <TextInput
            onChangeText={(text) => {
              if (checkValidateEmail(text)) {
                setEmail(text);
                setErrorEmail("")
              } else {
                setErrorEmail("Email không hợp lệ!")
                setEmail(text);
              }

            }}
            style={styles.edt}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        {errorEmail && <Text style={{ color: "red" }}>{errorEmail}</Text>}
        <View style={{ marginTop: 16 }}>
          <Text style={{ color: 'black' }}>Phone Number</Text>
          <View style={styles.phoneInputContainer}>
            <Text style={styles.countryCode}>{countryPrefix}</Text>
            <TextInput
              onChangeText={(text) => {
                if (checkValidatePhone(text)) {
                  setPhone(text)
                  setErrorPhone("")
                } else {
                  setPhone(text)
                  setErrorPhone("Số điện thoại không hợp lệ!")
                }
              }}
              style={styles.phoneNumberInput}
              placeholder="Enter your phone number"
              keyboardType="numeric"
            />
          </View>
          {errorPhone && <Text style={{ color: "red" }}>{errorPhone}</Text>}
        </View>
        <View style={{ marginTop: 16 }}>
          <Text style={{ color: 'black' }}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              onChangeText={(text) => {
                if (checkValidatePassword(text)) {
                  setPassword(text)
                  setErrorPassword("")
                } else {
                  setErrorPassword("Password không được quá 15 ký tự")
                  setPassword(text)
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
          {errorPassword && <Text style={{ color: "red" }}>{errorPassword}</Text>}
        </View>
        {error && <Text style={{ color: "red", }}>{error}</Text>}
        <Pressable onPress={() => {
          if (validateLogin()) {
            onSignup()
          }
        }}
          style={styles.btnLog}>
          <Text style={styles.titleLog}>Sign Up</Text>
        </Pressable>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 32,
          }}>
          <Line />
          <Text style={{ color: 'black' }}> Or With </Text>
          <Line />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: '10%',
          }}>
          <Text style={{ color: '#999EA1' }}>Already have an account ? </Text>
          <Text style={{ color: '#242424' }} onPress={navigateToLogin}>
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
    color: 'black',
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
  edt: {
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
  btnLog: {
    marginTop: 50,
    backgroundColor: '#242424',
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleLog: {
    color: '#FFFFFF',
    fontSize: 17,
  },
  line: {
    height: LINE_HEIGHT,
    backgroundColor: BLACK_COLOR,
    width: LINE_WIDTH,
    alignSelf: 'center',
    marginVertical: LINE_MARGIN_VERTICAL,
    marginHorizontal: LINE_MARGIN_HORIZONTAL,
  },
});

export default SigupScreen;
