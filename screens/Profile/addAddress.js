import {
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {API_Address} from '../../API/getAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddAddress = ({navigation}) => {
  const AsyncUser = async () => {
    const user = await AsyncStorage.getItem('user');
    if (user) {
      const newUser = JSON.parse(user);
      setUserID(newUser._id);
    }
  };

  useEffect(() => {
    AsyncUser();
  }, []);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [userID, setUserID] = useState('');

  const onAddress = async () => {
    try {
      const data = {name, phone, address: street, userID};
      await fetch(API_Address + 'saveAddress', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Error saving address:', error);
      // You might want to provide user feedback or log the error for debugging
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={styles.containeredt}
        behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <View style={styles.header}>
          <AntDesign
            onPress={() => navigation.goBack()}
            name="arrowleft"
            size={25}
            color="black"
          />
          <Text style={styles.txtHeader}>New Address</Text>
        </View>
        <View style={{marginTop: '25%', maxHeight: '90%'}}>
          <TextInput
            onChangeText={text => setName(text)}
            placeholder="Họ và tên"
            style={styles.inp}
          />
          <TextInput
            onChangeText={text => setPhone(text)}
            placeholder="Số điện thoại"
            style={styles.inp}
          />
          <TextInput
            onChangeText={text => setStreet(text)}
            placeholder="Địa chỉ"
            style={styles.inp}
          />

          <Pressable onPress={onAddress} style={styles.btnAppAddress}>
            <Text style={styles.txtAdd}>Hoàn thành</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

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
    height: 25,
    alignItems: 'center',
  },
  txtHeader: {
    color: 'black',
    left: '30%',
    fontSize: 18,
    fontWeight: '500',
  },
  inp: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    paddingStart: 10,
    marginBottom: 20,
  },
  btnAppAddress: {
    width: '100%',
    height: 45,
    borderWidth: 1,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  txtAdd: {
    fontSize: 12,
    color: 'black',
    fontWeight: '500',
  },
});

export default AddAddress;
