import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Chatbotscreen = ({navigation}) => {
  const [message, setMessage] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AntDesign
          onPress={() => navigation.goBack()}
          name="arrowleft"
          size={35}
          color="black"
        />
        <View style={styles.boxChatBox}>
          <View style={styles.avatarChatBot}>
            <Ionicons name="chatbox-ellipses" size={25} color={'blue'} />
          </View>
          <Text style={styles.nameChatbot}>Chat bot</Text>
        </View>
      </View>
      <View style={styles.acticle}></View>
      <View style={styles.footer}>
        <View style={styles.messageFooter}>
          <TextInput
            style={styles.txtInput}
            defaultValue={message}
            placeholder="Viết để nhắn tin tại đây..."
            keyboardType="default"
            onChangeText={content => setMessage(content)}
          />
          <Pressable>
            <Ionicons
              name="send"
              size={25}
              color={message ? 'blue' : '#888888'}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Chatbotscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 80,
    alignItems: 'center',
    borderColor: '#999999',
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    marginHorizontal: '5%',
  },
  boxChatBox: {
    flex: 1,
    right: '4%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  avatarChatBot: {
    width: 50,
    height: 50,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  nameChatbot: {
    fontSize: 20,
    left: '10%',
    fontWeight: '500',
  },
  acticle: {
    flex: 1,
  },
  footer: {
    flex: 0.1,
    borderTopWidth: 0.5,
    borderColor: '#999999',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  txtInput: {
    flex: 1,
    right: '50%',
    marginHorizontal: '2%',
  },
  messageFooter: {
    flexDirection: 'row',
    marginHorizontal: '8%',
  },
});
