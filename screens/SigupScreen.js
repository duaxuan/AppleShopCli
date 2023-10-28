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
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Biến cho các giá trị cố định
const BLACK_COLOR = 'black';
const LINE_HEIGHT = 0.5;
const LINE_WIDTH = '40%';
const LINE_MARGIN_VERTICAL = 10;
const LINE_MARGIN_HORIZONTAL = 6;

const Line = () => <View style={styles.line}></View>;

const SigupScreen = ({navigation}) => {
  const [showPassword, setShowPassword] = useState(false);

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
          <Text style={{color: 'black'}}>Email</Text>
          <TextInput
            style={styles.edt}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <View style={{marginTop: 16}}>
          <Text style={{color: 'black'}}>Phone Number</Text>
          <View style={styles.phoneInputContainer}>
            <Text style={styles.countryCode}>{countryPrefix}</Text>
            <TextInput
              style={styles.phoneNumberInput}
              placeholder="Enter your phone number"
              keyboardType="numeric"
            />
          </View>
        </View>
        <View style={{marginTop: 16}}>
          <Text style={{color: 'black'}}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
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
        </View>
        <Pressable style={styles.btnLog}>
          <Text style={styles.titleLog}>Sign Up</Text>
        </Pressable>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 32,
          }}>
          <Line />
          <Text style={{color: 'black'}}> Or With </Text>
          <Line />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: '25%',
          }}>
          <Text style={{color: '#999EA1'}}>Already have an account ? </Text>
          <Text style={{color: '#242424'}} onPress={navigateToLogin}>
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
    marginTop: '20%',
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
