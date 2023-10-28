import {
  Image,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const EditAccountScreen = ({navigation}) => {
  const countryPrefix = '+84'; // Mã quốc gia

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
          <Text style={styles.txtHeader}>Edit account</Text>
        </View>
        <View style={{marginTop: '10%'}}>
          {/* Avatar */}
          <Pressable style={styles.boderbtnAvatar}>
            <Image
              style={styles.boderAvatar}
              source={{
                uri: 'https://th.bing.com/th?id=ORMS.23668d8eba0da20c8b8e6464c32b46be&pid=Wdp&w=612&h=304&qlt=90&c=1&rs=1&dpr=1&p=0',
              }}
            />
            <View style={styles.boderIcon}>
              <FontAwesome5 name="pen" size={15} color="#999999" />
            </View>
          </Pressable>
          {/* TexInput */}
          <View style={{marginTop: '8%'}}>
            <Text style={styles.txt}>Name</Text>
            <TextInput
              style={styles.txtInput}
              placeholder="Enter your name"
              keyboardType="default"
            />
          </View>
          {/* TexInput */}
          <View style={{marginTop: '5%'}}>
            <Text style={styles.txt}>Email Anddress</Text>
            <TextInput
              style={styles.txtInput}
              placeholder="Enter your Email Anddress"
              keyboardType="email-address"
            />
          </View>
          {/* TexInput */}
          <View style={{marginTop: '5%'}}>
            <Text style={styles.txt}>Phone Number</Text>
            <View style={styles.phoneInputContainer}>
              <Text style={styles.countryCode}>{countryPrefix}</Text>
              <TextInput
                style={styles.phoneNumberInput}
                placeholder="0123456789"
                keyboardType="numeric"
              />
            </View>
          </View>
          <Pressable style={styles.btnUpda}>
            <Text style={styles.txtUpda}>Update</Text>
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
  btnUpda: {
    height: 50,
    backgroundColor: 'black',
    borderRadius: 10,
    marginTop: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtUpda: {
    fontSize: 17,
    color: 'white',
    fontWeight: '600',
  },
});
