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

const Line = () => <View style={styles.line} />;

const LoginScreen = ({navigation}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  // Cho 3s chuyển màn hình Main
  const navigateToHome = () => {
    navigation.replace('Main');
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
          <Text style={{color: 'black'}}>Email</Text>
          <TextInput
            style={styles.edt}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
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
        <Pressable style={styles.btnLog} onPress={navigateToHome}>
          <Text style={styles.titleLog}>Login</Text>
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
            marginTop: '50%',
          }}>
          <Text style={{color: '#999EA1'}}>Don’t have an account ? </Text>
          <Text style={{color: '#242424'}} onPress={navigateToSignup}>
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
    color: 'black',
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
  btnLog: {
    marginTop: 50,
    backgroundColor: '#242424',
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
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

export default LoginScreen;
